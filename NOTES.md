# Known gaps and review targets

MVP v1, 2026-10-19. No paid runtime dependencies or cloud child data.

- All 4 worlds and 16 activity entries work. Hebrew: 8 print letters, choose-letter, tap-swap 4-piece puzzle, tracing/free drawing, memory. Math: quantities 0-5 / 0-10, illustrated +/- 5 / 10, writing, memory. English: 12 picture words, A-D identification and writing, picture/audio memory. Studio: drawing/stickers and dress colors/accessories.
- 76 bundled synthetic clips. Songs are original spoken verses, not sung recordings. Need native Hebrew content/listening review, especially letter names and writing models. No paid TTS used.
- Menu cards have audio after activation, but individual game names should gain hover/long-press or preview narration and animated demonstrations for a non-reader. Current world greeting names some games.
- Local recording: parent gate, explicit tap, maximum 15 seconds, memory only, stop and revoke on exit or hidden page; no uploads/transcription. Fake device exercised, physical Android pending.
- SVG original characters and learning pictures are bundled. Decorative emoji may depend on platform font; core picture-word choices use explicit SVG.
- Drawing saved only by explicit parent-gated PNG download. No progress or child profile. No cloud backup.
- Basic parent gate is accidental-access friction, not authentication/security.
- Physical tablet/stylus/palm rejection, real device offline audio, Android install and orientation still need checking. Browser viewport checks do not prove these.
- No letter sounds curriculum, rhyming, stories, full alphabet, lowercase, 20-100, handwriting recognition or pronunciation score.
- Offline package is about 2.2MB, cache verified before readiness. Updates require service worker version bump; should add a user-friendly refresh prompt and cache-failure timeout.
- Some activities initially start from the same item each session; add optional variety and better hints without tracking.
- Review cycles are separate from this initial build. Do not describe them as completed before independent review and actual fixes.

## Review cycle 1 implemented
Cycle 1 changes: queued praise/target voice; complete math story via stitched Hebrew clips; dot-supported quantity choices and two-tap spoken numbers at challenge level; per-game speaker-preview buttons; speaker SVG; symbol-specific writing narration; revised Hebrew guided print models and shared path ghosts; numbered stroke starts and limited animation; increased canvas/ghost contrast; session flower garden and success locks; random session starts and quantity variety; parent-gated difficulty; recording pending/duplicate guard, narration blocked during recording, MIME fallback; cached readiness error timeout and versioned next-launch SW; query-insensitive cache; standalone install hidden; pen/large-contact filter; clear parent privacy caveats.
Kept deferred: full 20-100, phonics, new curriculum and mandatory five-round paths (free-choice spec), drag-and-drop (tap alternative already works), bingo expansion, singing/clap recording. Not claiming physical Android/stylus or professional letter/voice signoff. Cache remains atomic for consistency; no stale-while-revalidate across a code/audio set because that can mix versions.
