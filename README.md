# Network Site Survey

A self-hosted, tablet-friendly network site survey tool for field engineers.
Covers site info, location, existing equipment, cabling, planned Cisco/Arista/VeloCloud installs, contacts, and findings.

---

## Quick start — Docker (recommended)

```bash
# 1. Clone the repo
git clone https://github.com/fatannasty/network-survey.git
cd network-survey

# 2. Build and run (runs on port 8080)
docker compose up -d

# 3. Open in browser
open http://localhost:8080
```

To use a different port, edit `docker-compose.yml` and change `"8080:80"` to `"YOUR_PORT:80"`.

---

## Pull the pre-built image from GitHub Container Registry

After pushing to GitHub, your image is auto-built and published. Pull it on any machine:

```bash
docker pull ghcr.io/fatannasty/network-survey:latest

docker run -d \
  --name netsurvey \
  --restart unless-stopped \
  -p 8080:80 \
  ghcr.io/fatannasty/network-survey:latest
```

---

## GitHub Pages (no server needed)

The app also deploys automatically to GitHub Pages on every push to `main`.

1. Go to your repo → **Settings → Pages**
2. Under **Source**, select **GitHub Actions**
3. Push to `main` — the Pages workflow deploys `app/` automatically

Your live URL will be: `https://fatannasty.github.io/network-survey/`

---

## Deploy to your own server

```bash
# On your server (Ubuntu/Debian)
sudo apt update && sudo apt install -y docker.io docker-compose-plugin

git clone https://github.com/fatannasty/network-survey.git
cd network-survey
docker compose up -d

# Check it's running
docker compose ps
curl http://localhost:8080/health
```

---

## Updating

```bash
git pull
docker compose up -d --build
```

---

## Project structure

```
network-survey/
├── app/
│   ├── index.html      # Main survey UI
│   ├── style.css       # Tablet-friendly styles
│   ├── app.js          # All interactivity + save/load
│   ├── data.js         # Cisco / Arista / VeloCloud catalog
│   └── manifest.json   # PWA manifest (installable)
├── docker/
│   └── nginx.conf      # Nginx config with gzip + security headers
├── .github/
│   └── workflows/
│       ├── docker-publish.yml   # Auto-build + push to GHCR
│       └── pages.yml            # Auto-deploy to GitHub Pages
├── Dockerfile
├── docker-compose.yml
└── README.md
```

---

## Features

- **7 sections**: Site info → Location → Existing equipment → Cabling → Planned equipment → Contacts → Findings
- **Cisco catalog**: Catalyst 9200L/9300/9300X/9400/9500, Nexus 9300/9500, SG350 switches; Catalyst + full Meraki AP lineup; ISR/ASR/Catalyst routers
- **Arista catalog**: EOS 720/7050/7280/7500 switches; VeloCloud Edge 620/640/680/3800/3810, Orchestrator, Gateway; W-118/W-128/O-235E APs
- **Port density + spec chips** auto-populate on model selection
- **Auto-save** to localStorage every 1.5 seconds
- **Export** as plain text or JSON
- **Print / PDF** via browser print
- **Tablet + mobile friendly** — sidebar collapses, grid reflows, touch targets sized for fingers
- **PWA ready** — installable on tablets via "Add to Home Screen"

---

## License

MIT
