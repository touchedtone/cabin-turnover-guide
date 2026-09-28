# Open items for the guide — NOT rendered. Updated 2026-09-28 (end of the v1.1 session, before the account move).

State: v1.1 printed-ready (commit 653b66c). Web + PDF live at https://touchedtone.github.io/cabin-turnover-guide/
(PDF: /turnover-guide.pdf). Every push to main rebuilds both.

## Photos still missing — drop a file with this exact name into assets/photos/final/ and push
Each one fills the step named in brackets; the build prints this list as "missing photo" warnings.
- unit-door-lock.jpg — the room door with the Level bolt lock [room-door]
- door-screen.jpg — the screen on the door, ideally showing the bottom-right battery indicator [door-screen]
- hue-remote.jpg — the white wall switch right of the door, top button ON [lights]
- under-bed-containers.jpg — the two rows of bins under the bed [containers]
- shower-set.jpg — shower as it should look this trip [bathroom-clean]
- tp-backup.jpg — high shelf across from the toilet [bathroom-supplies]
- vacuum.jpg — stick in the kitchen / base on the basement tool wall [vacuum]
- turnover-button.jpg — tiny white button, right side of the room's door frame [leave]
- laundry-closet.jpg — the coded door at the end of the hall [laundry-bag]

## Not in the guide yet — needs Ben
- Which code opens the building front door and the unit door for a turnover person? The Codes row says "Turnover 1905"
  (values in content/private/codes.md, local only). Ben said codes may go in the guide; this one was never confirmed.
- Ben 9/24, deferred to "the next version": something about towels being scarce ("We should mention that towels are scar— no, never mind. That'll be the next version.")
- Remotes: Ben thought there was a photo of where they live; there isn't one yet.
- Web/interactive version (after print): "submit done" flow, end-of-turnover flags to Ben (lantern not red, fridge
  not left open, duvet changed, laundry nearly out, Echo status), photo attach for stains.
- Plants: which plants — the house-sitter watering guide overlaps.

## Decided (Ben, 9/24) — don't re-ask
- Codes may be published; Ben's phone 908-566-7635 is in the guide, web too. Laundry closet keypad 2880 is in.
- No lock drawing (Claude's schematic was wrong — instructions only). No stain examples. Heater ignored. No vacuum-order guidance.
- Clorox wipes dropped → bleach spray from behind the toilet + paper towels. Fridge is closed once cleaned.
- Desk: all-purpose cleaner from the kit, never bleach (wood). Draft stopper hangs behind the door. Pitcher stays.
- Sheet set = fitted + flat. Runner covers the bottom two-thirds of the bed.
- Under-bed bins: front row L→R (looking under the left side of the bed) cleaning kit · hand towels + washcloths · pillowcases;
  behind each: duvet covers · towels · sheet sets.
- Laundry bag: ONE black backpack — kitchen → hallway to Ben's apartment → behind the coded door; kept in the hallway
  between turnovers unless it started behind the door. Text Ben only for laundry.
- Done button: tiny white button, right side of the room's door frame, press once quickly; double press undoes.
- Plants: electric waterer; jars to near the rim; large 25s moving slowly; small 8s.
- Step titles name the specific items to check, not "set the wall" — people put things back; the guide lists only what needs doing.

## Where things live
- Repo: github.com/touchedtone/cabin-turnover-guide (PUBLIC). Local clone on alvin at ~/cabin-turnover-guide.
- Gitignored, alvin-only: assets/photos/raw/ (all originals, 01–25) and content/private/codes.md.
- Pushing: alvin's Cowork VM has no GitHub credential; pushes go through the Mac's own git (keychain) —
  e.g. osascript `do shell script "cd ~/cabin-turnover-guide && git push origin main"`.
- Local PDF build: `npm run pdf` on the Mac (needs Chrome), or CHROME=<chromium path> bash scripts/pdf.sh.
