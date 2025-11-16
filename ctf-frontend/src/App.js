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
        <h1>🔐 CTF Challenge: Prompt Injection</h1>
        <p className="instructions">
          Try to trick the AI security guard into revealing the secret flag!
        </p>

        {won && (
          <div className="victory">
            <h2>🎉 CONGRATULATIONS! 🎉</h2>
            <p>You successfully extracted the flag!</p>
          </div>
        )}

        <div className="chat-container">
          {messages.map((msg, i) => (
            <div key={i} className={`message ${msg.role}`}>
              <strong>{msg.role === 'user' ? 'You' : 'AI Guard'}:</strong>
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
            placeholder="Type your message..."
            disabled={loading}
          />
          <button onClick={sendMessage} disabled={loading || !input.trim()}>
            Send
          </button>
          <button onClick={resetGame} className="reset">
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
