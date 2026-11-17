# Who Is Lying? — Online Multiplayer

A real-time social deduction browser game for **3–12 players**, with private roles, room codes, live updates, voting, results, and a scoreboard.

## Run locally

1. Install Node.js 18 or newer from https://nodejs.org/
2. Open this project folder in VS Code.
3. Open Terminal → New Terminal.
4. Run:

```bash
npm start
```

5. Open **http://localhost:3000** in your browser. **Do not use Live Server for this version**: the Node.js server handles rooms and real-time updates.

## Play with friends on the same Wi-Fi

1. Run `npm start` on your computer.
2. Find your computer's local IPv4 address with `ipconfig` (Windows).
3. On friends' phones connected to the same Wi-Fi, visit `http://YOUR_IPV4:3000` (e.g. `http://192.168.1.25:3000`).
4. Allow Node.js through Windows Firewall for private networks if prompted.

## Play over the internet

Deploy this **Node.js web service** to a host that supports persistent Node.js processes (e.g. Render or Railway). Use `npm start` as the start command. Share the deployed HTTPS URL. **GitHub Pages cannot run the multiplayer backend.**

## How to play

- Host creates a room and shares the 6-character code or invite link.
- Friends join with their names (3–12 players).
- Host starts the round. Everyone except one randomly chosen liar sees the same word.
- Discuss the word without saying it directly. The liar tries to blend in.
- Everyone votes once for someone else. After all votes, the game reveals the liar.
- Detectives each earn 2 points for a correct vote outcome; otherwise the liar earns 3 points. A tie counts as a liar win.
- Host starts another round; scores carry over.

## Technical notes

- **No third-party packages**: built with Node.js built-in `http` and Server-Sent Events (SSE).
- Rooms and scores are stored **in server memory** and reset when the server restarts. No database or accounts yet.
- Each browser stores a private session token in localStorage to reconnect after refresh.
- One device/browser session per player is recommended. Rejoining mid-round is not supported for new players.
- This is a playable prototype, not a hardened production service. For a public launch, add persistent storage, rate limiting, room expiry/cleanup controls, and stronger authentication.
