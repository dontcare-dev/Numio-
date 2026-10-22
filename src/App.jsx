import { useState } from 'react';
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";

const styles = `
  :root {
    --bg-dark: #1a1a1a;
    --bg-card: #242424;
    --text-main: #f0f0f0;
    --text-muted: #888888;
    --accent-red: #ff4757;
    --accent-green: #2ed573;
  }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    background-color: var(--bg-dark);
    color: var(--text-main);
    font-family: 'Space Mono', monospace;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-image: url('data:image/svg+xml;utf8,<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><filter id="noiseFilter"><feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch"/></filter><rect width="100%" height="100%" filter="url(%23noiseFilter)" opacity="0.05"/></svg>');
  }
  .app-container {
    width: 100%; max-width: 400px; height: 90vh; max-height: 850px;
    background: rgba(26, 26, 26, 0.85); backdrop-filter: blur(10px);
    border: 1px solid #333; border-radius: 20px; padding: 25px;
    display: flex; flex-direction: column; box-shadow: 0 10px 30px rgba(0,0,0,0.5);
  }
  .pixel-font { font-family: 'VT323', monospace; }
  .setup-screen { display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; text-align: center; }
  .setup-title { font-size: 2.5rem; margin-bottom: 10px; }
  .setup-sub { color: var(--text-muted); font-size: 0.9rem; margin-bottom: 30px; }
  .grade-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px; width: 100%; }
  .grade-btn { background: var(--bg-card); border: 1px solid #444; color: var(--text-main); padding: 15px 0; font-size: 1.2rem; font-family: 'VT323', monospace; border-radius: 10px; cursor: pointer; transition: 0.2s; }
  .grade-btn:hover { background: #333; border-color: #666; }
  .game-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px; border-bottom: 1px dashed #333; padding-bottom: 15px; }
  .game-header h2 { font-family: 'VT323', monospace; font-size: 1.8rem; }
  .exit-btn { background: none; border: none; color: var(--accent-red); cursor: pointer; font-family: inherit; }
  .question-area { flex: 1; display: flex; flex-direction: column; justify-content: center; align-items: center; }
  .loading-text { color: var(--text-muted); font-style: italic; }
  .question-text { font-family: 'VT323', monospace; font-size: 4rem; text-align: center; margin-bottom: 40px; text-shadow: 0 0 10px rgba(255,255,255,0.2); }
  .options-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; width: 100%; }
  .option-btn { background: var(--bg-card); border: 1px solid #444; color: var(--text-main); padding: 20px; font-size: 1.5rem; font-family: 'Space Mono', monospace; border-radius: 10px; cursor: pointer; transition: 0.2s; }
  .option-btn:hover { background: #333; border-color: #666; }
  .footer-stats { display: flex; justify-content: space-between; align-items: flex-end; margin-top: 30px; }
  .stat-block { text-align: center; }
  .stat-label { font-size: 0.7rem; color: var(--text-muted); text-transform: uppercase; letter-spacing: 1px; }
  .stat-value { font-size: 2rem; }
  .custom-google-btn {
    background: var(--bg-card); border: 1px solid #444; color: var(--text-main);
    padding: 15px 25px; font-size: 1rem; font-family: 'Space Mono', monospace;
    border-radius: 30px; cursor: pointer; display: flex; align-items: center; gap: 10px; transition: 0.2s;
  }
  .custom-google-btn:hover { background: #333; }
`;

export default function App() {
  const [user, setUser] = useState(null);
  const [grade, setGrade] = useState(null);
  const [question, setQuestion] = useState(null);
  const [loading, setLoading] = useState(false);
  const [score, setScore] = useState(0);

  const auth = getAuth();

  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const handleLogout = () => {
    signOut(auth).then(() => {
      setUser(null);
      setGrade(null);
    });
  };

  const startGame = async (selectedGrade) => {
    setGrade(selectedGrade);
    setLoading(true);
    
    setTimeout(() => {
      setQuestion({
        question: `Class ${selectedGrade} Math: 10 + 15`,
        answer: 25,
        options: [20, 25, 30, 35]
      });
      setLoading(false);
    }, 1000); 
  };

  const handleAnswer = (selectedOption) => {
    if (selectedOption === question.answer) {
      setScore(score + 10);
      alert("Correct! +10 Points");
    } else {
      alert(`Wrong! The answer was ${question.answer}`);
    }
  };

  return (
    <>
      <style>{styles}</style>
      <link href="https://fonts.googleapis.com/css2?family=VT323&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet" />
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
      
      <div className="app-container">
        {!user ? (
          <div className="setup-screen">
            <h1 className="pixel-font setup-title">Numio Login</h1>
            <p className="setup-sub">Authentication required.</p>
            <button className="custom-google-btn" onClick={handleLogin}>
              <i className="fa-brands fa-google" style={{color: '#DB4437'}}></i> Sign in with Google
            </button>
          </div>
        ) : !grade ? (
          <div className="setup-screen">
            <h1 className="pixel-font setup-title">Select Class</h1>
            <p className="setup-sub">Welcome, {user.displayName}</p>
            <div className="grade-grid">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                <button key={num} className="grade-btn" onClick={() => startGame(num)}>
                  Class {num}
                </button>
              ))}
            </div>
            <button className="exit-btn" style={{marginTop: '20px'}} onClick={handleLogout}>[ Logout ]</button>
          </div>
        ) : (
          <>
            <div className="game-header">
              <h2>Class {grade} Math</h2>
              <button className="exit-btn" onClick={() => { setGrade(null); setQuestion(null); setScore(0); }}>
                [ Exit ]
              </button>
            </div>
            <div className="question-area">
              {loading ? (
                <p className="loading-text">Querying Gemini AI...</p>
              ) : (
                <>
                  <div className="question-text">{question?.question}</div>
                  <div className="options-grid">
                    {question?.options.map((opt, index) => (
                      <button key={index} className="option-btn" onClick={() => handleAnswer(opt)}>
                        {opt}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
            <div className="footer-stats">
              <div className="stat-block">
                <div className="stat-label">Score</div>
                <div className="stat-value pixel-font">{score}</div>
              </div>
              <div className="stat-block">
                <div className="stat-label">Player</div>
                <div className="stat-value pixel-font" style={{color: 'var(--accent-green)', fontSize: '1.2rem'}}>{user.displayName.split(' ')[0]}</div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}