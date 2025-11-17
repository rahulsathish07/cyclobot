# CTF Challenge: Prompt Injection

A Capture The Flag challenge where players must extract a secret flag from an AI security guard through prompt injection techniques.

**Live Demo:** https://ctf-frontend-4xxyf8wno-rahuls-projects-e3326660.vercel.app/

## About

An interactive web application demonstrating AI security vulnerabilities. Players chat with an AI security guard that has been instructed to protect a secret flag. The goal is to craft prompts that bypass these instructions.

## Tech Stack

- Frontend: React
- Backend: Flask (Python)
- AI: Groq API (Llama 3.3 70B)
- Hosting: Vercel + Render

## Features

### Checkbox

- [x] Real-time chat interface
- [x] AI-powered responses
- [x] Flag detection system
- [ ] Rate limiting
- [x] Conversation history
- [x] Deployed and accessible online
- [x] Mobile responsive design
- [ ] Customizable difficulty levels
- [ ] Leaderboard/scoring system
- [ ] Hint system
- [ ] Per-user session isolation
- [x] Updated the UI

## How to Play

1. Visit the live demo
2. Chat with the AI security guard
3. Use prompt injection techniques to extract the flag
4. Flag format: `FLAG{...}`

## Local Development

### Backend
```bash
cd ~/cyclobot
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
export GROQ_API_KEY="your-key"
python app.py
```

### Frontend
```bash
cd ctf-frontend
npm install
npm start
```

## Notes

- First request may take 20-30 seconds (Server wake up)
- Conversation history is shared across all users (for now)
- Backend resets periodically

## License

GPL
