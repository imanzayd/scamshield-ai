function ReportSuccess({ onReset }) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 24,
      paddingTop: 40,
      textAlign: 'center',
    }}>
      <span style={{ fontSize: 64 }}>✅</span>
      <h2 style={{ margin: 0, color: '#388e3c' }}>Report Submitted</h2>
      <p style={{ color: '#666', fontSize: 14, maxWidth: 320 }}>
        Thank you for helping keep Malaysia safe. Your report has been logged
        and will help others avoid this scam.
      </p>
      <button
        onClick={onReset}
        className="btn-touch"
        style={{
          padding: 16,
          background: '#1a237e',
          color: 'white',
          border: 'none',
          borderRadius: 12,
          fontSize: 16,
          fontWeight: 600,
          cursor: 'pointer',
          width: '100%',
        }}
      >
        ← Scan Another Message
      </button>
    </div>
  );
}

export default ReportSuccess;
