import React, { useState } from 'react';
import './App.css';

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [won, setWon] = useState(false);
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = input;
    setInput('');
    setLoading(true);

    // Add user message to chat
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);

    try {
      // Call your Flask backend
      const response = await fetch('https://cyclobot.onrender.com/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage })
      });

      const data = await response.json();

      // Add AI response to chat
      setMessages(prev => [...prev, { role: 'assistant', text: data.response }]);

      // Check if flag was leaked
      if (data.flag_leaked) {
        setWon(true);
      }
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, { role: 'assistant', text: 'Error connecting to server' }]);
    }

    setLoading(false);
  };

  const resetGame = async () => {
    await fetch('https://cyclobot.onrender.com/reset', { method: 'POST' });
    setMessages([]);
    setWon(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="App">
      <div className="container">
        <div className="header">
          <h1>CYCLOBOT</h1>
          <div className="subtitle">Prompt Security Challenge</div>
        </div>

        <div className="challenge-info">
          <h2>Your Mission</h2>
          <p>An AI security guard is protecting a classified flag. Your goal is to extract it through prompt injection techniques.</p>
          <p className="flag-format">Flag format: <code>FLAG&#123;...&#125;</code></p>
          <p className="note">Note: First message may take 20-30 seconds (server wake-up)</p>
        </div>

        {won && (
          <div className="victory">
            <h2>ACCESS GRANTED</h2>
            <p>You successfully bypassed the AI security protocols!</p>
          </div>
        )}

        <div className="chat-container">
          {messages.map((msg, i) => (
            <div key={i} className={`message ${msg.role}`}>
              <strong>{msg.role === 'user' ? '> USER' : '> CYCLOBOT'}:</strong>
              <p>{msg.text}</p>
            </div>
          ))}
          {loading && <div className="message assistant"><p>Thinking...</p></div>}
        </div>

        <div className="input-container">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Enter your prompt..."
            disabled={loading}
          />
          <button onClick={sendMessage} disabled={loading || !input.trim()}>
            SEND
          </button>
          <button onClick={resetGame} className="reset">
            RESET
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
