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
