/* ═════
   CHESS DAY · November 8 · "CHESS"  (just need the pieces... minus the queen :)

   Needs:  chess/amy.webp   (the plaid dress mirror selfie)

   Her dress is the chessboard. When she wins:
     1. the board flips into a plaid chessboard
     2. it melts into her actual dress
     3. the pieces drop onto the dress
     4. the white queen's square is her face, with a crown
     5. it zooms out to the whole photo
   The note waits for all of it, then shows the photo: "the queen".

   If the dress or her face sits off-center, nudge DRESS_* / FACE_*.
   Test it:  index.html?peek=11-08&fresh=1
   ═════ */
(function () {
  "use strict";
  if (typeof Special === "undefined") return;
  const S = Special;

  const SRC = "chess/amy.webp";
  const DRESS_POS = "54% 69%";                      // where the dress is in the photo (the skirt)
  const DRESS_ZOOM = "610%";                        // how far to zoom in so the dress fills the board
  const FACE_POS = "52% 27%";                       // where her face is
  const FACE_ZOOM = "640%";
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

  /* when each beat starts, in ms after the win */
  const SQUARES = 700;
  const DRESS = SQUARES + (ROWS + COLS) * STEP + 700;
  const UNDER = DRESS + 1100;
  const PIECES = UNDER + 250;
  const QUEEN = PIECES + 1500;
  const ZOOM = QUEEN + 1700;
  const END = ZOOM + 2400;

  let faceOk = true;
  const pre = new Image();
  pre.onerror = () => { faceOk = false; };
  pre.src = SRC;

  let layer = null;
  function makeLayer() {
    if (getComputedStyle(boardEl).position === "static") boardEl.style.position = "relative";
    layer = document.createElement("div");
    layer.className = "cs-dress";
    layer.style.setProperty("--cs-img", 'url("' + SRC + '")');
    layer.style.setProperty("--cs-dress-pos", DRESS_POS);
    layer.style.setProperty("--cs-dress-zoom", DRESS_ZOOM);
    boardEl.appendChild(layer);
  }

  function squares(animate) {
    boardTiles.forEach((row, r) => row.forEach((t, c) => {
      const go = () => {
        t.classList.add("cs-sq", (r + c) % 2 ? "cs-dark" : "cs-light");
        t.textContent = "";
      };
      animate ? S.later(go, (r + c) * STEP) : go();
    }));
  }

  function pieces(animate) {
    boardTiles.forEach((row, r) => row.forEach((t, c) => {
      const p = LAYOUT[r][c];
      if (!p || p === "Q") return;
      const go = () => {
        t.textContent = p + T;
        t.classList.add(r < 3 ? "cs-b" : "cs-w", "cs-drop");
      };
      animate ? S.later(go, (r < 3 ? r : ROWS - 1 - r) * 160 + c * 40) : go();
    }));
  }

  function queen(animate) {
    const t = boardTiles[5][2];
    if (faceOk) {
      t.classList.add("cs-queen");
      t.style.setProperty("--cs-img", 'url("' + SRC + '")');
      t.style.setProperty("--cs-pos", FACE_POS);
      t.style.setProperty("--cs-zoom", FACE_ZOOM);
    } else {
      t.textContent = "♕" + T;
      t.classList.add("cs-w", "cs-drop");
    }
    if (animate) {
      const [x, y] = S.center(t);
      S.burst({ x, y, count: 18, colors: ["#E3C481", "#FFF4D6", "#2E3552", "#FFFFFF"], size: [6, 12], spread: [40, 120] });
      S.floatText("♛", x, y - 46, { size: "2rem", color: "#C9A24A" });
    }
  }

  function play() {
    if (boardEl.classList.contains("cs-on")) return;
    boardEl.classList.add("cs-on");
    makeLayer();
    squares(true);
    S.later(() => layer.classList.add("show"), DRESS - SQUARES);           // chessboard → her dress
    S.later(() => boardEl.classList.add("cs-under"), UNDER - SQUARES);     // dress slides under the tiles
    S.later(() => pieces(true), PIECES - SQUARES);
    S.later(() => queen(true), QUEEN - SQUARES);
    S.later(() => boardEl.classList.add("cs-zoom"), ZOOM - SQUARES);       // pull back to the whole photo
  }

  /* already solved (reloaded later in the day): just the finished photo */
  function finished() {
    boardEl.classList.add("cs-on", "cs-under", "cs-zoom", "cs-still");
    makeLayer();
    layer.classList.add("show");
    squares(false);
  }

  S.on("win", () => {
    S.noteDelay = END - 900;                         // the note waits until the photo has zoomed out
    S.later(() => (S.reducedMotion ? finished() : play()), SQUARES);
  });

  const last = guessResults[guessResults.length - 1];
  if (gameOver && last && last.every((x) => x === "correct")) finished();

  /* the note: the dress */
  const plate = S.addToNote("cs",
    '<figure class="polaroid cs-pol"><img alt="" draggable="false"><figcaption>the queen ♛</figcaption></figure>');
  S.photo(plate.querySelector("img"), SRC);
})();
