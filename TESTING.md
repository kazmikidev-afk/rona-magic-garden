# V2 tests
Automated Chrome: all 22 entries at 3 levels, 320/390/1024/1280 widths, no overflow or runtime errors. Completed slime, zoo, shape choice, word assembly, word notebook and memory at each level. Completed doll styling and hardest bead pattern. Fake microphone recording exits cleanly. Fresh offline reload includes v2 code and voice. These are browser tests, not Android device or native-listener certification.

Review-source tests included in archive: test-v2.mjs and completion-v2.mjs, with JSON results. Required: independent UI/content/privacy review, adult Hebrew audio listening, educator content pass and physical tablet usage.

Round 2: all prior rendering/completion regressions pass. Ten targeted checks pass: script defer, selected pen, hard guide hint, pen aria selection, discovery sticker retained after next-stroke undo, puzzle selected state, zoo stale-error clearing, explicit hairstyle requirement, empty gate rejected and correct adult answer opens. Actual notebook/sticker pixels inspected. v1-to-v2 browser upgrade test passed for previous round; repeat with this release before completion.

Final: four prior suites pass; added empty-after-undo completion block, easy skin/hair personalisation, medium accessory check, English badge retention, shop visual retry and first-install no-false-update tests. v1-to-final upgrade/offline passed. Final live byte comparison required before delivery.

Graphics round2: focused four-scene self-only CSP check, touch-action, visible topping inspection, mix feedback, gold braid retention and care progress passed in local Chrome. Phone/tablet single-scene, overflow, recipe, offline and no-WebGL fallback checks: 22 passed. Physical Android remains untested.

## 2026-11-09 — קוראים עם רונה (reading module)
Manual browser playthrough (cloud browser, local tunnel):
- Mode screen renders (לבד/יחד + parent note); stage map locks; audio-driven rounds.
- Stage אותיות: 6 correct picks → celebration + 🐰 friend unlock; wrong pick → gentle "מקשיבים שוב לאט. בלי לחץ, אין טעויות כאן." (no star loss).
- Stage צירופים (unlocked after stage 1): 6 wins → 🦋. Stage מילים (unlocked after stage 2): 6 wins → 🦄 + "השלמת את כל מסלול הקריאה".
- קוראים יחד: all stages open, no star counters; a win does NOT change saved solo progress.
- Progress persists across reload (localStorage rona-reading-v1: stars [6,6,6]).
- Existing worlds/games still render and open; no console errors observed.
- New instruction clips rd_intro/rd_syl_q use free Hila edge-tts voice (not Achernar); pending native-listener approval.

## 2026-11-09 focused correction candidate (not deployed)
- Own SVG garden/friends. Map inspected at phone 390x844/844x390 and tablet 768x1024/1024x768; map, round and normal win fit these viewports, no horizontal overflow. No physical-device certification.
- Final automated mechanics: 54 solo wins (three stages x six wins x three levels), wrong pick before every win, all three friends unlocked; no generic medal overlay. Existing seeded collection and village state preserved. Together-mode 36 wins (three stages x four wins x three levels) left the entire localStorage snapshot identical. No page errors.
- Wrong choices are disabled for that round only; retry actually plays existing try + target audio. Target bag shuffled per stage entry, no repeat within a bag; restart sequences checked as different.
- Same-sound distractions removed, early o-notation uses vav consistently. Beginner consonant contrast, middle mixed contrast, hard vowel contrast. Word stage is described as listening/recognition, not evidence of decoding mastery. Independent teacher rereview remains required.
- Two Hila instruction clips regenerated FREE using edge-tts: actual-clip ASR transcribed the intended text correctly. This is not native-ear approval. The mixed Hila instructions/Achernar targets remain an explicit unresolved consistency caveat. No paid generation, no new recognition service.
- Cache candidate bumped to rona-magic-20261109b. This source is local only; builder owns deployment after independent review.

### Level-chip narration regression correction
Reading-owned rdNarrate temporarily bypasses the generic quiet-instruction flag only for the round's final instruction/target queue, restoring the caller's flag in finally. Existing sayQueue handles cancellation, mute and sequential clips. Other games and v2.js are unchanged.
Instrumented browser clicks: all nine stage/level combinations initiate exactly one play, syllable/word instruction queues continue to the spoken target on ended, voiceGeneration advances, quiet flag restores. Muted switch initiates zero play. No page errors. All 54 solo/36 together mechanics checks repeated successfully after this patch. Audio play instrumentation checks queue behavior, not device speaker output.
