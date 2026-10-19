# Amy's Daily Wordle

A word a day, with a love note when the round ends.

## Where things live

| What | Where |
| --- | --- |
| The words + messages | `WORDS` in `index.html` (`"MM-DD": { word, message }`) |
| The game, note, animations, seasons, night mode | `index.html` |
| Special days (one file pair each) | `days/<name>.js` + `days/<name>.css` |
| Which date loads which special day | `DAY_FILES` in `index.html` |
| Small one-line touches (subtitle, floating words) | `LITTLE_DAYS` in `index.html` |
| Photos | one folder per day (`teehe/`, `wolve/`, …) + `faces/` for everyday ones |

Words can have accents (Râler plays as RALER). If a word can't be typed at all
(e.g. Chinese), give a typeable `word` and the fancy version as `display`.

## Previewing (just for you)

Add these to the URL:

- `?peek=MM-DD` play any date, e.g. `?peek=10-31` for Halloween
- `&fresh=1` wipe that day's test progress and start over
- `&hour=HH` preview a time of day: morning `7`, day `14`, evening `18`, night `23`

Preview progress is saved separately, so it never touches Amy's real games.

## Special days so far

| Date | Word | What happens |
| --- | --- | --- |
| 07-24 | HAPPY | Birthday: subtitle + petal showers |
| 08-01 | GUESS | Anniversary: bouquet + fireworks |
| every 1st | — | Monthiversary: one flower per month (`days/monthsary.*`) |
| 09-26 | FROTH | Latte art |
| 09-30 | SLEPT | Bedtime |
| 10-05 | SPICY | Too hot |
| 10-18 | XIANG | Red string |
| 10-19 | FLOSS | Brushed? |
| 10-21 | TEEHE | Tap her to giggle |
| 10-23 | WOLVE | Full moon night, her howl is the moon |
| 10-25 | WANAN | Lights dim with every guess, tuck her in |
| 10-28/29 | TIMES/AUDIO | "Called it" if she opens like always |
| 10-30 | CANDY | Pill organizer full of candy |
| 10-31 | BOOOO | Halloween: bats, ghosts, carve a pumpkin |
| 11-26 | FEAST | Thankful jar (edit `REASONS` in `days/thanksgiving.js`) |

## Adding a special day

1. Make `days/myday.js` and `days/myday.css` (copy `days/teehe.*` as a starting point).
2. Add `"MM-DD": "myday"` to `DAY_FILES` in `index.html`.
3. In the JS, use the `Special` helpers: `Special.subtitle()`, `Special.title`,
   `Special.addToNote()`, `Special.on("win" | "loss" | "guess" | "open" | "close", fn)`,
   `Special.burst()`, `Special.floatText()`, `Special.stage()`, `Special.photo()`,
   `Special.ambient.set("bats", 8)`, `Special.forceNight()`.
4. Test with `?peek=MM-DD&fresh=1`.
