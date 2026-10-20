# V2 tests
Automated Chrome: all 22 entries at 3 levels, 320/390/1024/1280 widths, no overflow or runtime errors. Completed slime, zoo, shape choice, word assembly, word notebook and memory at each level. Completed doll styling and hardest bead pattern. Fake microphone recording exits cleanly. Fresh offline reload includes v2 code and voice. These are browser tests, not Android device or native-listener certification.

Review-source tests included in archive: test-v2.mjs and completion-v2.mjs, with JSON results. Required: independent UI/content/privacy review, adult Hebrew audio listening, educator content pass and physical tablet usage.

Round 2: all prior rendering/completion regressions pass. Ten targeted checks pass: script defer, selected pen, hard guide hint, pen aria selection, discovery sticker retained after next-stroke undo, puzzle selected state, zoo stale-error clearing, explicit hairstyle requirement, empty gate rejected and correct adult answer opens. Actual notebook/sticker pixels inspected. v1-to-v2 browser upgrade test passed for previous round; repeat with this release before completion.

Final: four prior suites pass; added empty-after-undo completion block, easy skin/hair personalisation, medium accessory check, English badge retention, shop visual retry and first-install no-false-update tests. v1-to-final upgrade/offline passed. Final live byte comparison required before delivery.

Graphics round2: focused four-scene self-only CSP check, touch-action, visible topping inspection, mix feedback, gold braid retention and care progress passed in local Chrome. Phone/tablet single-scene, overflow, recipe, offline and no-WebGL fallback checks: 22 passed. Physical Android remains untested.
