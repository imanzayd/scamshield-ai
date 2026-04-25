import { useState } from 'react';

function InputScreen({ onAnalyze }) {
  const [message, setMessage] = useState('');

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) setMessage(text);
    } catch {
      alert('Could not read clipboard. Please paste manually or check permissions.');
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{
        background: '#e3f2fd',
        padding: 12,
        borderRadius: 12,
        display: 'flex',
        gap: 12,
        alignItems: 'center',
      }}>
        <span style={{ fontSize: 28 }}>🛡️</span>
        <div>
          <h3 style={{ margin: 0, fontSize: 15 }}>ScamShield AI</h3>
          <p style={{ margin: 0, fontSize: 12, color: '#555' }}>
            Paste any suspicious message for instant analysis
          </p>
        </div>
      </div>

      <textarea
        placeholder={'Paste message here...\n\nExample: "Claim RM500 bantuan: bit.ly/freecash"'}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        rows={6}
        style={{
          width: '100%',
          padding: 16,
          border: '2px solid #ddd',
          borderRadius: 12,
          fontSize: 16,
          resize: 'vertical',
          fontFamily: 'inherit',
        }}
      />

      <button
        onClick={handlePaste}
        className="btn-touch"
        style={{
          width: '100%',
          padding: '12px 16px',
          border: '2px dashed #ccc',
          borderRadius: 8,
          background: 'white',
          fontSize: 16,
          cursor: 'pointer',
        }}
      >
        📋 Paste from Clipboard
      </button>

      {message.trim() && (
        <button
          onClick={() => onAnalyze(message)}
          className="btn-touch"
          style={{
            width: '100%',
            padding: '16px',
            background: '#1a237e',
            color: 'white',
            border: 'none',
            borderRadius: 12,
            fontSize: 16,
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          🔍 Analyze Message
        </button>
      )}
    </div>
  );
}

export default InputScreen;
