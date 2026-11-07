/* ═════
   CHESS DAY · November 8 · "CHESS"  (just need the pieces... minus the queen :)

   Needs:  chess/amy.jpg   (the plaid dress mirror selfie)
   When she wins, the board turns into a chessboard in her dress plaid,
   the pieces drop in, and the white queen's square is her face with a
   crown on it. In the note: the dress photo, "the queen".
   If her face in the queen square looks off-center, nudge FACE_POS.
   Test it:  index.html?peek=11-08&fresh=1
   ═════ */
(function () {
  "use strict";
  if (typeof Special === "undefined") return;
  const S = Special;

  const SRC = "chess/amy.jpg";
  const FACE_POS = "51% 27%";                       // where her face sits in the photo
  const FACE_ZOOM = "640%";                         // how far to zoom in on it
  const STEP = 55;

  S.subtitle("hi wu :)");
  S.title = "Your move";

  /* 6 rows x 5 columns. Q = her. "" = empty square. */
  const T = "︎";                              // keep the pieces as text, not emoji
  const LAYOUT = [
    ["♜", "♞", "♛", "♚", "♝"],
    ["♟", "♟", "♟", "♟", "♟"],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["♙", "♙", "♙", "♙", "♙"],
    ["♖", "♘", "Q", "♔", "♗"],
  ];

  let faceOk = true;
  const pre = new Image();
  pre.onerror = () => { faceOk = false; };
  pre.src = SRC;

  function setUp(animate) {
    if (boardEl.classList.contains("cs-on")) return;
    boardEl.classList.add("cs-on");
    let queen = null;
    boardTiles.forEach((row, r) => row.forEach((t, c) => {
      const piece = LAYOUT[r][c];
      const square = () => {
        t.classList.add("cs-sq", (r + c) % 2 ? "cs-dark" : "cs-light");
        t.textContent = "";
      };
      const drop = () => {
        if (piece === "Q") {
          queen = t;
          if (faceOk) {
            t.classList.add("cs-queen");
            t.style.setProperty("--cs-img", 'url("' + SRC + '")');
            t.style.setProperty("--cs-pos", FACE_POS);
            t.style.setProperty("--cs-zoom", FACE_ZOOM);
          } else {
            t.textContent = "♕" + T;
            t.classList.add("cs-w", "cs-drop");
          }
          return;
        }
        if (!piece) return;
        t.textContent = piece + T;
        t.classList.add(r < 3 ? "cs-b" : "cs-w", "cs-drop");
      };
      if (animate) {
        S.later(square, (r + c) * STEP);
        if (piece !== "Q") S.later(drop, (ROWS + COLS) * STEP + 300 + (r < 3 ? r : ROWS - 1 - r) * 160 + c * 40);
        else S.later(() => {
          drop();
          const [x, y] = S.center(t);
          S.burst({ x, y, count: 18, colors: ["#E3C481", "#FFF4D6", "#2E3552", "#FFFFFF"], size: [6, 12], spread: [40, 120] });
          S.floatText("♛", x, y - 46, { size: "2rem", color: "#C9A24A" });
        }, (ROWS + COLS) * STEP + 1300);
      } else {
        square();
        drop();
      }
    }));
    return queen;
  }

  S.on("win", () => {
    S.noteDelay = (ROWS + COLS) * STEP + 3000;
    S.later(() => setUp(!S.reducedMotion), 700);
  });

  const last = guessResults[guessResults.length - 1];
  if (gameOver && last && last.every((x) => x === "correct")) setUp(false);

  /* the note: the dress */
  const plate = S.addToNote("cs",
    '<figure class="polaroid cs-pol"><img alt="" draggable="false"><figcaption>the queen ♛</figcaption></figure>');
  S.photo(plate.querySelector("img"), SRC);
})();
