import { useState, useCallback } from 'react';
import InputScreen from './screens/InputScreen';
import LoadingScreen from './screens/LoadingScreen';
import ResultScreen from './screens/ResultScreen';
import ReportSuccess from './screens/ReportSuccess';

function App() {
  const [screen, setScreen] = useState('input');
  const [message, setMessage] = useState('');
  const [result, setResult] = useState(null);

  const handleAnalyze = (msg) => {
    setMessage(msg);
    setScreen('loading');
  };

  const handleResult = useCallback((data) => {
    setResult(data);
    setScreen('result');
  }, []);

  const handleReport = async () => {
    try {
      await fetch('/api/report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message, result }),
      });
    } catch {
      // Demo fallback — silently continue to success screen
    }
    setScreen('reportSuccess');
  };

  const handleReset = () => {
    setScreen('input');
    setMessage('');
    setResult(null);
  };

  return (
    <div className="app-shell">
      <header className="app-header">
        <h1 style={{ fontSize: 20, margin: 0 }}>🛡️ ScamShield AI</h1>
        <p style={{ fontSize: 12, opacity: 0.8, margin: '4px 0 0' }}>
          Your second brain before you tap
        </p>
      </header>

      <main className="app-main">
        {screen === 'input' && <InputScreen onAnalyze={handleAnalyze} />}
        {screen === 'loading' && (
          <LoadingScreen message={message} onResult={handleResult} />
        )}
        {screen === 'result' && result && (
          <ResultScreen
            result={result}
            message={message}
            onReport={handleReport}
            onReset={handleReset}
          />
        )}
        {screen === 'reportSuccess' && (
          <ReportSuccess onReset={handleReset} />
        )}
      </main>
    </div>
  );
}

export default App;
