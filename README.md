# הגן הקסום של רונה

Static Hebrew RTL learning garden, Android-first. No build step, accounts, ads or analytics.

## Contents
18 activity entries in four worlds. Eight Hebrew print letters, quantities and concrete operations up to 10, twelve English picture words and A-D, two 3x3 narrated lotto boards, memory, copying, drawing and costume colors.

## Audio and privacy
94 bundled synthetic clips in voice-0.js through voice-12.js, about 1.1MB total. No runtime speech service. Songs are spoken verses, not sung recordings. Child recording is explicit-start, parent-enabled, memory-only and capped at 15 seconds. Exit and hiding the app stop and delete it. No child voice is uploaded. Browser microphone permission is separate and can be revoked in Chrome site settings.

## Offline and updates
Serve over HTTPS or localhost. Wait for the verified offline-ready message. Cache installation is atomic to keep code and voice consistent. Increment the cache version for every release. Existing clients keep their active version until all copies close; reopen to activate a waiting update. Exported art is a local PNG with no cloud backup.

## Limits
Read NOTES.md. Physical Android installation, real microphone, stylus, tablet orientation, native voice quality and educator approval of guided print-letter paths remain device/content checks. Viewport and fake-device tests do not certify these.
