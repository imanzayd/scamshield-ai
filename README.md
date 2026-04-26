🚨 ScamShield AI

ScamShield AI is an AI-powered real-time fraud detection system that helps users identify scam messages before they take action.

👉 It acts at the most critical moment — before users click, reply, or transfer money.

⚠️ Why This Matters Now

With the rapid adoption of eWallets and digital financial services in Malaysia, scam attacks are evolving faster than user awareness.

Most existing protections are reactive — they act after damage is done.

👉 ScamShield AI is proactive, stopping scams at the decision point.

🚨 Problem
Scam attacks are increasing and becoming more convincing
Most protection systems act after financial transactions, not before
Users make mistakes due to urgency, confusion, and fear

👉 The real issue is not awareness — it is decision-making under pressure

🚀 Solution

ScamShield AI allows users to:

Paste a suspicious message
Instantly analyze scam risk
Receive:
Risk level and score
Scam type classification
Red flag indicators
Clear explanation (Bahasa Melayu + English)
Recommended safe action
🧠 Key Features
⚡ Real-time scam detection
📊 AI-driven risk scoring and classification
🌐 Multilingual explanation (Bahasa Melayu + English)
🛡️ AI-first analysis with rule-based fallback
📱 Simple, human-first interface
🏗️ System Architecture

🔧 How It Works
User pastes a suspicious message
Backend sends the message to Alibaba Qwen AI
AI performs context-aware scam analysis
If AI is unavailable → fallback to rule-based engine
System returns structured risk result
Example Output:
{
  "riskLevel": "High",
  "riskScore": 91,
  "scamType": "Phishing / Fake Reward",
  "reasons": [
    "Suspicious link detected",
    "Urgent or threatening language"
  ],
  "explanationBM": "Mesej ini kemungkinan scam kerana ia cuba buat anda panik dan klik link palsu.",
  "explanationEN": "This message is likely a scam because it pressures you to click a suspicious link.",
  "recommendedAction": "Do not click. Open the official app to verify."
}
🎯 Demo Flow
User pastes a suspicious message
System analyzes content using AI (Qwen)
Risk score and scam classification generated
Fallback rule engine activates if needed
User receives clear explanation and recommended action
☁️ Multi-Cloud Architecture (Key Differentiator)

ScamShield AI leverages a multi-cloud strategy to maximize performance and flexibility:

Alibaba Cloud → AI inference using Qwen (NLP analysis)
AWS → Backend APIs and application hosting

This approach enables:

Independent scaling of AI and application layers
Reduced vendor dependency
Flexibility to adopt best-in-class AI models

👉 This directly aligns with modern distributed system design principles.

🖥️ Demo

🎥 Demo Video:
https://drive.google.com/drive/folders/1j91a9AjPUcWc0dquePEsqZcJIsTr_4Bu?usp=sharing

🌐 Live Deployment:
http://56.68.89.60

🔌 Backend API:
http://56.68.89.60:3000

🛠️ Tech Stack

Frontend:

React + Vite

Backend:

Node.js (Express)

AI / NLP:

Alibaba Cloud Qwen

Cloud Infrastructure:

AWS EC2
Alibaba Cloud

Others:

Python (rule-based engine)
GitHub (version control)
📁 Project Structure
scamshield-ai/
├── backend/ (Node.js backend API)
│   ├── server.js
│   ├── package.json
│   └── .env.example
├── docs/
│   └── architecture.png
├── public/ (Frontend static assets)
├── src/ (React frontend source)
│   ├── screens/
│   │   ├── InputScreen.jsx
│   │   ├── LoadingScreen.jsx
│   │   ├── ResultScreen.jsx
│   │   └── ReportSuccess.jsx
│   ├── App.jsx
│   └── main.jsx
├── ai_service.py
├── package.json
├── vite.config.js
└── README.md
▶️ How to Run Locally
Backend
cd backend
npm install
node server.js

Backend runs at:

http://localhost:3000
Frontend

In a separate terminal:

npm install
npm run dev

Frontend runs at:

http://localhost:5173
🔐 Environment Variables

Create .env files based on .env.example.

Backend Example:
PORT=3000
QWEN_API_KEY=your_qwen_api_key_here
QWEN_API_URL=https://dashscope-intl.aliyuncs.com/compatible-mode/v1/chat/completions

⚠️ Do not commit real API keys.

📈 Impact

ScamShield AI protects:

Elderly users
First-time digital finance users
Foreign workers
Everyday users receiving suspicious messages

Value:

Prevent financial loss before it happens
Increase confidence in digital payments
Strengthen trust in fintech platforms

👉 Preventing even one scam can protect a user’s entire livelihood.

🔮 Future Enhancements
Integration into eWallet platforms (e.g., TNG ecosystem)
Real-time message scanning
Community-driven scam reporting database
Personalized scam detection
👥 Team

NusanSense

🏁 Conclusion

Scams are becoming more sophisticated.

Protection must become human-first, real-time, and proactive.

👉 ScamShield AI gives users something they’ve never had before:

Time to think before they lose everything.