# Hunt Me

Real-world hide-and-seek. Runners hide. Hunters get pings. The phone keeps score.

A lightweight, fully client-side SCRAM-style manhunt app (plus Infection mode and match history) that runs on any static host — including **GitHub Pages**.

## Features

- Host a private game with a 6-character code
- Pick Hunter / Runner
- Head start, periodic location pings (with age), optional shrinking zone
- Outside the zone for 30s → live reveal to hunters
- Team radio (chat) the other side never hears
- **Standard** or **Infection** mode (tagged runners join the hunters)
- Match history stored locally
- Designed for spotty 4G: throttled GPS publishes, slim snapshots, resilient reconnects over public MQTT brokers + same-device BroadcastChannel

## Play

1. Open the site on phones (any network).
2. One person creates a hunt and shares the code.
3. Everyone joins, picks a side, host sets the zone / timers, then **Start**.
4. Runners get the head start. Hunters wait for pings and close in on foot.
5. Tag in person → the runner confirms (or the phones were clearly close enough).

Location is only shared while a round is live, and only with players in that room.

## Deploy on GitHub Pages (step-by-step)

### Option A — Easiest (recommended)

1. Create a new GitHub repository (e.g. `HuntMe`).
2. Upload **all** the files from this project into the repo (or push via git).
3. On your computer:
   ```bash
   npm install
   npm run build
   ```
4. The built static files will be in the output folder (often `dist` or `.output/public` depending on the TanStack Start / Nitro build).
5. Go to the repo on GitHub → **Settings** → **Pages**.
6. Under "Build and deployment":
   - Source: **Deploy from a branch**
   - Branch: `main` (or `gh-pages`) / folder `/ (root)` or `/docs`
7. If you put the built files in a `docs` folder on the `main` branch, select `/docs`.
8. Wait 1–2 minutes. Your site will be live at:
   `https://YOUR_USERNAME.github.io/HuntMe/`

### Option B — GitHub Actions (automatic)

Add a workflow that runs `npm ci && npm run build` and publishes the output folder to the `gh-pages` branch. Then set Pages source to that branch.

### Important notes for this app

- The Vite config already has `base: "./"` so relative asset paths work on project Pages.
- Everything is client-side. No backend required. Games use public MQTT brokers + localStorage/BroadcastChannel.
- HTTPS is required for geolocation — GitHub Pages provides it automatically.
- Test on real phones with location permission allowed.

## Local development

```bash
npm install
npm run dev
```

Opens on port 8080.

## Branding

Keep the dark forest theme, Outfit type, green accent, and **Hunt Me** wordmark.
