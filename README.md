# הגן הקסום של רונה

A small Hebrew RTL, offline-first learning garden. Static HTML, CSS and JavaScript. No accounts, analytics, ads or child-data uploads.

## Run
Serve this directory over localhost or HTTPS. Open index.html through the server. A service worker caches the core files, including 76 embedded synthetic speech clips. Wait for the offline-ready message before disconnecting.

## Files
- index.html: shell
- style.css: responsive layout
- app.js: activities, canvas, temporary recording, parent panel
- audio.js: pre-generated public instructional clips, no user recordings
- sw.js: verified offline cache
- manifest.webmanifest and icons: Android installation
- NOTES.md: limitations and review targets

No build step. On updates bump the cache version in sw.js. Device recordings live in memory only and are destroyed on activity exit or hidden page. The server may keep normal delivery logs.
