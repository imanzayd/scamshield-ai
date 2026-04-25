function ResultScreen({ result, message, onReport, onReset }) {
  const getRiskStyle = (level) => {
    if (level === 'High') return { color: '#d32f2f', bg: '#ffebee', icon: '🚨' };
    if (level === 'Medium') return { color: '#f57c00', bg: '#fff3e0', icon: '⚠️' };
    return { color: '#388e3c', bg: '#e8f5e9', icon: '✅' };
  };

  const risk = getRiskStyle(result.riskLevel);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {/* Risk Banner */}
      <div style={{
        background: risk.bg,
        padding: 20,
        borderRadius: 16,
        textAlign: 'center',
      }}>
        <span style={{ fontSize: 48 }}>{risk.icon}</span>
        <h2 style={{ color: risk.color, margin: '8px 0 4px' }}>
          {result.riskLevel} Risk
        </h2>
        <p style={{ color: '#666', fontSize: 14 }}>
          Confidence: {result.riskScore}%
        </p>
      </div>

      {/* Fallback Warning */}
      {result.fallback && (
        <div style={{
          background: '#fff8e1',
          border: '1px solid #ffe082',
          padding: 12,
          borderRadius: 10,
          display: 'flex',
          alignItems: 'center',
          gap: 10,
        }}>
          <span style={{ fontSize: 20 }}>⚠️</span>
          <div>
            <p style={{ margin: 0, fontSize: 13, fontWeight: 600, color: '#f57c00' }}>
              AI Service Unavailable
            </p>
            <p style={{ margin: 0, fontSize: 12, color: '#666' }}>
              Showing rule-based analysis. Results may be less accurate.
            </p>
          </div>
        </div>
      )}

      {/* Original Message */}
      <div>
        <h4 style={{
          fontSize: 13,
          color: '#999',
          marginBottom: 8,
          textTransform: 'uppercase',
          letterSpacing: 0.5,
        }}>
          📩 Message Analyzed
        </h4>
        <div style={{
          background: '#f5f5f5',
          padding: 12,
          borderRadius: 10,
          fontStyle: 'italic',
          color: '#555',
          fontSize: 14,
          wordBreak: 'break-word',
        }}>
          {message}
        </div>
      </div>

      {/* Red Flags */}
      {result.reasons && result.reasons.length > 0 && (
        <div>
          <h4 style={{
            fontSize: 13,
            color: '#999',
            marginBottom: 8,
            textTransform: 'uppercase',
            letterSpacing: 0.5,
          }}>
            🔴 Red Flags Detected
          </h4>
          {result.reasons.map((r, i) => (
            <div key={i} style={{
              padding: '6px 0',
              fontSize: 14,
              color: '#d32f2f',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
            }}>
              <span>✗</span>
              <span>{r}</span>
            </div>
          ))}
        </div>
      )}

      {/* AI Explanation */}
      <div style={{
        background: '#e3f2fd',
        padding: 16,
        borderRadius: 12,
      }}>
        <h4 style={{
          fontSize: 13,
          color: '#1a237e',
          marginBottom: 8,
          textTransform: 'uppercase',
          letterSpacing: 0.5,
        }}>
          🤖 AI Explanation
        </h4>
        <p style={{
          fontSize: 14,
          color: '#1a237e',
          fontStyle: 'italic',
          margin: '0 0 8px',
        }}>
          {result.explanationBM}
        </p>
        <p style={{ fontSize: 13, color: '#555', margin: 0 }}>
          {result.explanationEN}
        </p>
      </div>

      {/* Recommended Action */}
      <div style={{
        background: '#fff3e0',
        padding: 16,
        borderRadius: 12,
        textAlign: 'center',
      }}>
        <p style={{ fontWeight: 600, color: '#e65100', margin: 0 }}>
          🛡️ {result.recommendedAction}
        </p>
      </div>

      {/* Report Button */}
      <button
        onClick={onReport}
        className="btn-touch"
        style={{
          width: '100%',
          padding: 16,
          background: '#d32f2f',
          color: 'white',
          border: 'none',
          borderRadius: 12,
          fontSize: 16,
          fontWeight: 600,
          cursor: 'pointer',
        }}
      >
        🚩 Report Scam
      </button>

      {/* Scan Again */}
      <button
        onClick={onReset}
        className="btn-touch"
        style={{
          width: '100%',
          padding: 14,
          background: 'none',
          border: 'none',
          color: '#1a237e',
          fontSize: 15,
          cursor: 'pointer',
        }}
      >
        ← Scan Another Message
      </button>
    </div>
  );
}

export default ResultScreen;
