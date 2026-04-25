# ScamShield AI API Contract

## POST /api/analyze

**Request:**
```json
{
  "message": "string"
}
```

**Success Response (exactly 7 fields):**
```json
{
  "riskLevel": "High|Medium|Low",
  "riskScore": 0,
  "scamType": "Phishing|OTP Theft|Fake Reward|Bank Impersonation|Government Impersonation|TNG Impersonation|None",
  "reasons": ["reason 1", "reason 2"],
  "explanationBM": "Penjelasan dalam Bahasa Malaysia",
  "explanationEN": "Explanation in English",
  "recommendedAction": "What the user should do"
}
```

**Rules:**
- `riskLevel`: High = 70-100, Medium = 30-69, Low = 0-29
- `riskScore`: Integer 0-100
- `scamType`: Must be one of the enum values above. Use `"None"` for safe messages.
- `reasons`: Array of strings. Minimum 1 item. Use `["No scam indicators detected"]` for safe messages.
- `explanationBM`: 1-2 sentences in natural Bahasa Malaysia
- `explanationEN`: 1-2 sentences in English
- `recommendedAction`: Clear, actionable safety instruction

**Optional field:**
- `fallback: true` — only present when the AI server is unreachable and rule-based fallback is active.

**NO other extra fields.** No `source`, no `model`.
