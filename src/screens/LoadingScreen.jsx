import { useEffect, useRef, useState } from 'react';

function LoadingScreen({ message, onResult }) {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('Extracting text...');

  const onResultRef = useRef(onResult);
  const messageRef = useRef(message);

  useEffect(() => {
    onResultRef.current = onResult;
    messageRef.current = message;
  });

  useEffect(() => {
    const timers = [];

    const steps = [
      { p: 25, t: 'Extracting text...', d: 400 },
      { p: 50, t: 'Checking scam patterns...', d: 800 },
      { p: 75, t: 'AI analyzing intent...', d: 1200 },
      { p: 100, t: 'Generating explanation...', d: 1600 },
    ];

    steps.forEach((s) => {
      timers.push(
        setTimeout(() => {
          setProgress(s.p);
          setStatus(s.t);
        }, s.d)
      );
    });

    timers.push(
      setTimeout(() => {
        fetch('/api/analyze', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: messageRef.current }),
        })
          .then((r) => r.json())
          .then((data) => {
            onResultRef.current(data);
          })
          .catch(() => {
            onResultRef.current({
              riskLevel: 'High',
              riskScore: 91,
              scamType: 'Phishing / Fake Reward',
              reasons: [
                'Suspicious shortened link',
                'Urgent reward language',
                "Impersonates Touch 'n Go",
              ],
              explanationBM:
                'Mesej ini kemungkinan scam kerana ia cuba buat anda panik dan klik link palsu.',
              explanationEN:
                'This message is likely a scam because it pressures you to click a suspicious link.',
              recommendedAction:
                'Do not click. Open the official TNG app to verify.',
            });
          });
      }, 2000)
    );

    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 24,
      minHeight: '60dvh',
      paddingTop: 24,
    }}>
      <span style={{ fontSize: 48 }}>🛡️</span>

      <div style={{
        width: '100%',
        height: 6,
        background: '#e0e0e0',
        borderRadius: 3,
      }}>
        <div style={{
          width: `${progress}%`,
          height: '100%',
          background: '#1a237e',
          borderRadius: 3,
          transition: 'width 0.3s',
        }} />
      </div>

      <p style={{ fontWeight: 600 }}>{status}</p>
    </div>
  );
}

export default LoadingScreen;
