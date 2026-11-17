# Who Is Lying? — Detective + Online Multiplayer (v3)

Holberton final-project inspired detective investigation platform with a separate real-time multiplayer party game.

## Features
- **Detective Cases:** three mysteries with difficulty levels, suspect profiles, digital messages, timelines, collectible evidence, final accusation, and score feedback.
- **Progress:** detective case progress and best result persist in the same browser with `localStorage`.
- **Online Party:** room codes, 3–12 players, private roles, secret words, live voting and scoreboard.
- **Room chat:** real-time text chat for everyone in the same multiplayer room; 400-character message limit and basic spam throttling.
- Responsive dark interface; no database or paid service required to test.

## Run locally
Requires Node.js 18 or later.

```bash
npm start
```

Open http://localhost:3000. To test multiplayer, use separate browsers or devices on the same network. For friends in different homes, deploy the Node.js app to a hosting provider such as Render.

## Render deployment
Use a **Web Service**, root directory blank (if these files are in the repo root), build command `npm install`, start command `npm start`. Upload the entire `public/` folder, not just its contents.

## Notes
- Chat and rooms are stored **in server memory**, not in a database. They disappear on a server restart or a free-host sleep/redeploy.
- Detective cases are authored examples, not AI-generated or verified real-world incidents.
- Party chat is not encrypted end-to-end and has no moderation. Avoid sharing personal information.
- Case investigations are **single-player** in this MVP; the online party mode has multiplayer chat. Collaborative case investigation would require additional server-side state.
- For production use, add authentication, durable persistence, moderation, stronger rate limiting, and automated tests.
