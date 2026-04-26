🚨 ScamShield AI

ScamShield AI is a Security & Fraud protection system powered by AI that helps users detect and understand scam messages before they take action.

In Malaysia, scams often begin through SMS, WhatsApp, and social messages. Users are pressured into making quick decisions through urgency, fear, or rewards.

👉 ScamShield AI intervenes at the moment of decision, giving users a fast and clear safety check before they click, reply, or transfer money.

🚨 Problem
Scam attacks are increasing and becoming more convincing
Most protection systems act after financial transactions, not before
Users make mistakes due to urgency, confusion, and fear

👉 The real issue is not awareness — it is decision-making under pressure

🚀 Solution

ScamShield AI allows users to:

Paste a suspicious message
Analyze scam risk instantly
Receive:
Risk level and risk score
Scam type
Red flag indicators (reasons)
Explanation in Bahasa Melayu and English
Recommended safe action
🧠 Key Features
⚡ Real-time scam detection
📊 Risk scoring and classification
🌐 Multilingual explanation (Bahasa Melayu + English)
🛡️ AI-first analysis with rule-based safety fallback
📱 Simple, human-first interface
🏗️ Architecture

Design Principle

AI-first with deterministic safety fallback:

Alibaba Cloud Qwen AI provides context-aware scam detection and explanation
Rule-based engine ensures reliable protection when AI is unavailable
🔧 How It Works
User pastes a suspicious message
Backend sends the message to Alibaba Qwen AI
If AI response is unavailable → fallback to rule-based analysis
System returns structured results:

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

☁️ Multi-Cloud Strategy

We use a multi-cloud architecture:

Alibaba Cloud → AI inference using Qwen
AWS → Backend API and application deployment
Benefits:
Separation of concerns
Independent scaling of AI and backend
Avoid vendor lock-in
Flexibility to upgrade AI models
🖥️ Demo

🎥 Demo Video:
https://drive.google.com/drive/folders/1j91a9AjPUcWc0dquePEsqZcJIsTr_4Bu?usp=sharing

🌐 Live Deployment:
http://56.68.89.60

🔌 Backend API:
http://56.68.89.60:3000

🛠️ Tech Stack
Frontend: React + Vite
Backend: Node.js (Express)
AI: Alibaba Cloud Qwen
Cloud: AWS + Alibaba Cloud
📁 Project Structure

scamshield-ai/
├── backend/ (Node.js backend API)
│ ├── server.js
│ ├── package.json
│ └── .env.example
├── docs/
│ └── architecture.png
├── public/ (Frontend static assets)
├── src/ (React frontend source)
│ ├── screens/
│ │ ├── InputScreen.jsx
│ │ ├── LoadingScreen.jsx
│ │ ├── ResultScreen.jsx
│ │ └── ReportSuccess.jsx
│ ├── App.jsx
│ └── main.jsx
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

Frontend:

.env.example

Backend:

backend/.env.example

Example:

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
Increase user confidence in digital payments
Improve trust in fintech platforms

👉 One prevented scam can save someone’s entire salary.

🔮 Future Enhancements
Integration into the TNG app ecosystem
Real-time message scanning
Community scam reporting database
Personalized scam detection
👥 Team

NusanSense

🏁 Conclusion

Scams are becoming more sophisticated.

Protection must become more human-first, real-time, and proactive.

👉 ScamShield AI gives users something they’ve never had before:

Time to think before they lose everything.