# ScamShield AI Backend

Express.js backend for ScamShield AI.

## Setup

```bash
cd backend
npm install
```

## Run

```bash
# Development (auto-restart on file change)
npm run dev

# Production
npm start
```

Server runs on `http://localhost:3000` by default.

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/health` | Health check |
| POST | `/api/analyze` | Analyze a message for scams |
| POST | `/api/report` | Report a scam |
| GET | `/api/reports` | List all reports (debug) |

## Analyze Request

```bash
curl -X POST http://localhost:3000/api/analyze \
  -H "Content-Type: application/json" \
  -d '{"message": "Claim RM500 bantuan here: bit.ly/freecash"}'
```

## Frontend Integration

The Vite dev server is already configured to proxy `/api` requests to this backend during local development.
