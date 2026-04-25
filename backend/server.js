// server.js - ScamShield Backend Server
const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Python AI Service URL
const CODA_AI_BASE_URL = process.env.CODA_AI_BASE_URL || 'http://localhost:5000';
const CODA_AI_ANALYZE_URL = `${CODA_AI_BASE_URL}/analyze`;
const CODA_AI_HEALTH_URL = `${CODA_AI_BASE_URL}/health`;

// Root route
app.get('/', (req, res) => {
    res.json({
        service: 'ScamShield AI Backend',
        status: 'running',
        version: '1.0.0',
        ai_server: CODA_AI_BASE_URL,
        endpoints: {
            health: 'GET /health',
            analyze: 'POST /api/analyze',
            report: 'POST /api/report',
            batchAnalyze: 'POST /api/batch-analyze',
        },
        message: 'ScamShield AI is protecting users, one message at a time.',
    });
});

// Health check endpoint
app.get('/health', async (req, res) => {
    try {
        const aiHealth = await axios.get(CODA_AI_HEALTH_URL, { timeout: 3000 });

        res.json({
            status: 'ScamShield Backend is running',
            ai_server_connected: true,
            ai_server: aiHealth.data,
        });
    } catch (error) {
        res.status(503).json({
            status: 'ScamShield Backend is running',
            ai_server_connected: false,
            ai_server_error: error.message,
        });
    }
});

// MAIN ENDPOINT: Analyze message for scams
app.post('/api/analyze', async (req, res) => {
    const { message } = req.body;

    if (!message || typeof message !== 'string') {
        return res.status(400).json({ error: 'Message is required' });
    }

    console.log(`[ANALYZING] ${message}`);

    try {
        const response = await axios.post(
            CODA_AI_ANALYZE_URL,
            { message },
            { timeout: 20000 }
        );

        console.log(`[RESULT] ${response.data.riskLevel} - Score: ${response.data.riskScore}`);

        // Pass through Coda's response as-is (must match API_CONTRACT.md)
        res.json(response.data);

    } catch (error) {
        console.error(`[AI ERROR] ${error.message}`);

        // Fallback response — same contract + fallback flag when AI is unreachable
        res.json({
            riskLevel: "Medium",
            riskScore: 50,
            scamType: "Suspicious",
            reasons: ["Unable to reach AI server. Please verify manually."],
            explanationBM: "Sistem AI sedang sibuk atau tidak dapat dihubungi. Sila jangan klik pautan mencurigakan dan semak melalui aplikasi rasmi.",
            explanationEN: "The AI system is busy or unreachable. Do not click suspicious links and verify through the official app.",
            recommendedAction: "Verify through the official app or website only.",
            fallback: true,
        });
    }
});

// In-memory report store
const reports = [];

// Report endpoint
app.post('/api/report', (req, res) => {
    const { message, result } = req.body;

    const report = {
        id: reports.length + 1,
        message: message || '',
        result: result || {},
        reportedAt: new Date().toISOString(),
    };

    reports.push(report);
    console.log(`[REPORT #${report.id}] Scam reported at ${report.reportedAt}`);

    res.json({ success: true, reportId: report.id });
});

// Batch analyze endpoint
app.post('/api/batch-analyze', async (req, res) => {
    const { messages } = req.body;

    if (!messages || !Array.isArray(messages)) {
        return res.status(400).json({ error: 'Messages array is required' });
    }

    try {
        const results = await Promise.all(
            messages.map(async (msg) => {
                try {
                    const response = await axios.post(
                        CODA_AI_ANALYZE_URL,
                        { message: msg },
                        { timeout: 20000 }
                    );
                    return { message: msg, analysis: response.data, success: true };
                } catch (err) {
                    return { message: msg, analysis: null, success: false, error: err.message };
                }
            })
        );

        res.json({ results });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`
    ╔════════════════════════════════════════════════╗
    ║        SCAMSHIELD BACKEND SERVER              ║
    ╠════════════════════════════════════════════════╣
    ║  Running on: http://localhost:${PORT}          
    ║  AI Server:  ${CODA_AI_BASE_URL}               
    ║                                                
    ║  Endpoints:                                    
    ║  POST /api/analyze         - Check message     
    ║  POST /api/batch-analyze   - Check multiple    
    ║  POST /api/report          - Report scam       
    ║  GET  /health              - Server status     
    ╚════════════════════════════════════════════════╝
    `);
});