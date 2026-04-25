# ai_service.py - ScamShield AI Brain with Alibaba Qwen
# COPY THIS FILE TO CODA'S MACHINE
import os
import requests
import json
import re

class ScamShieldAI:
    def __init__(self):
        self.alibaba_key = os.getenv("ALIBABA_API_KEY")
        self.use_qwen = True

    def analyze(self, message):
        if self.use_qwen and self.alibaba_key:
            try:
                return self.qwen_analyze(message)
            except Exception as e:
                print(f"[ALIBABA QWEN FAILED] {e} — using rule fallback")
                return self.rule_analyze(message)
        else:
            return self.rule_analyze(message)

    def qwen_analyze(self, message):
        """Call Alibaba Cloud Qwen via DashScope OpenAI-compatible API"""

        url = "https://dashscope-intl.aliyuncs.com/compatible-mode/v1/chat/completions"

        headers = {
            "Authorization": f"Bearer {self.alibaba_key}",
            "Content-Type": "application/json"
        }

        prompt = f"""You are ScamShield AI, a scam detection system built for Malaysian users.

Analyze the message and return ONLY valid JSON.
No markdown. No extra text.

MALAYSIAN SCAMS TO DETECT:
- Touch 'n Go / TNG impersonation with fake links
- Bank impersonation: Maybank, CIMB, Public Bank, RHB, Hong Leong
- Government impersonation: JKM, KWSP, LHDN, bantuan, zakat
- OTP / password / TAC theft
- Shortened links: bit.ly, tinyurl, t.co
- Urgent claim reward / account suspended messages

MESSAGE:
{message}

RETURN EXACTLY THIS JSON STRUCTURE (7 fields only):
{{
  "riskLevel": "High|Medium|Low",
  "riskScore": 0,
  "scamType": "Phishing|OTP Theft|Fake Reward|Bank Impersonation|Government Impersonation|TNG Impersonation|None",
  "reasons": ["reason 1", "reason 2"],
  "explanationBM": "Penjelasan ringkas dalam Bahasa Malaysia",
  "explanationEN": "Short explanation in English",
  "recommendedAction": "Clear safety action"
}}

SCORING:
- OTP/password/TAC request = score 95-100, High
- Bank/TNG/gov impersonation + link = score 80-95, High
- Shortened link + reward language = score 70-90, High
- Only urgency or only suspicious link = score 40-60, Medium
- Normal chat = score 0-20, Low
"""

        payload = {
            "model": "qwen-turbo",
            "messages": [
                {
                    "role": "system",
                    "content": "You are ScamShield AI. Always respond with valid JSON only."
                },
                {
                    "role": "user",
                    "content": prompt
                }
            ],
            "temperature": 0.2,
            "max_tokens": 700
        }

        response = requests.post(url, headers=headers, json=payload, timeout=20)

        if response.status_code != 200:
            print(f"Alibaba Qwen error: {response.status_code} - {response.text}")
            raise Exception(f"Alibaba Qwen API error: {response.status_code}")

        result = response.json()

        if "choices" not in result or len(result["choices"]) == 0:
            raise Exception("No response from Alibaba Qwen")

        content = result["choices"][0]["message"]["content"]

        content = re.sub(r"```(?:json)?\s*", "", content)
        content = re.sub(r"```\s*", "", content)
        content = content.strip()

        parsed = json.loads(content)

        # Validate all 7 required fields exist
        required = ["riskLevel", "riskScore", "scamType", "reasons", "explanationBM", "explanationEN", "recommendedAction"]
        for field in required:
            if field not in parsed:
                raise Exception(f"Missing field: {field}")

        return parsed

    def rule_analyze(self, message):
        msg = message.lower()

        score = 0
        reasons = []
        scam_type = "None"

        # HIGH RISK: OTP / password
        if any(word in msg for word in ["otp", "password", "kata laluan", "tac"]):
            score = 100
            scam_type = "OTP Theft"
            reasons.append("Requesting OTP or password — this is a major red flag")

        # HIGH RISK: shortened links
        elif any(link in msg for link in ["bit.ly", "tinyurl", "t.co"]):
            score = 80
            scam_type = "Phishing"
            reasons.append("Contains shortened link hiding real destination")
            if any(brand in msg for brand in ["tng", "touch n go", "maybank", "cimb", "bank"]):
                score = 85
                reasons.append("Impersonating official service")

        # HIGH RISK: impersonation + action
        elif any(brand in msg for brand in ["tng", "touch n go", "maybank", "cimb", "bank islam", "public bank", "rhb", "hong leong"]):
            if any(action in msg for action in ["click", "verify", "update", "claim", "daftar", "tekan", "klik"]):
                score = 75
                scam_type = "Bank Impersonation"
                reasons.append("Impersonating official service and asking for action")

        # HIGH RISK: government impersonation
        elif any(gov in msg for gov in ["jkm", "kwsp", "epf", "lhdn", "bantuan", "kerajaan", "majlis", "perkeso", "zakat"]):
            if any(action in msg for action in ["claim", "tuntut", "daftar", "verify", "klik"]):
                score = 72
                scam_type = "Government Impersonation"
                reasons.append("Impersonating government agency for personal data")

        # MEDIUM: urgency + reward
        elif any(urgency in msg for urgency in ["urgent", "segera", "suspend", "frozen", "blocked", "akan ditutup", "cepat"]):
            if any(reward in msg for reward in ["claim", "rm", "hadiah", "menang", "bonus", "wang", "percuma", "free"]):
                score = 65
                scam_type = "Fake Reward"
                reasons.append("Urgent reward claim — common scam tactic")

        # MEDIUM: just urgency
        elif any(urgency in msg for urgency in ["urgent", "segera", "now", "today", "cepat", "segera", "limited"]):
            score = 35
            scam_type = "Suspicious"
            reasons.append("Uses urgency tactics")

        # LOW: normal message
        else:
            score = 10
            scam_type = "None"
            reasons.append("No strong scam indicators detected")

        # Risk level
        if score >= 70:
            risk = "High"
        elif score >= 30:
            risk = "Medium"
        else:
            risk = "Low"

        # Explanations
        if risk == "High":
            explanation_bm = "Ini berkemungkinan besar adalah scam. Jangan klik pautan atau kongsi maklumat peribadi."
            explanation_en = "This is very likely a scam. Do not click links or share personal information."
            action = "Do NOT click. Verify using official app only."

        elif risk == "Medium":
            explanation_bm = "Mesej ini mencurigakan. Sila berhati-hati sebelum mengambil sebarang tindakan."
            explanation_en = "This message looks suspicious. Be cautious before taking any action."
            action = "Avoid clicking links. Verify manually."

        else:
            explanation_bm = "Mesej ini kelihatan selamat buat masa ini."
            explanation_en = "This message appears safe for now."
            action = "No action needed."

        # EXACTLY 7 fields — no extras (Sab adds fallback only when AI is unreachable)
        return {
            "riskLevel": risk,
            "riskScore": score,
            "scamType": scam_type,
            "reasons": reasons,
            "explanationBM": explanation_bm,
            "explanationEN": explanation_en,
            "recommendedAction": action,
        }


# ========== API SERVER ==========
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

ai = ScamShieldAI()

@app.route("/analyze", methods=["POST"])
def analyze():
    data = request.json
    message = data.get("message", "")

    if not message:
        return jsonify({"error": "No message provided"}), 400

    result = ai.analyze(message)
    return jsonify(result)

@app.route("/health", methods=["GET"])
def health():
    return jsonify({"status": "ScamShield AI is ready"})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)