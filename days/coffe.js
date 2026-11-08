/* ═════
   COFFE DAY · November 9 · "COFFE"  (make another coffee :)

   Needs:  coffe/amy.jpg   (tall photo — it fills the whole board)
   The big picture: when she wins, every tile on the board turns into a
   piece of her photo, corner to corner, then the whole picture settles
   in and steam rises off the top. The note waits until it's done.
   After that, the picture stays on the board for the rest of the day.
   Test it:  index.html?peek=11-09&fresh=1
   ═════ */
(function () {
  "use strict";
  if (typeof Special === "undefined") return;
  const S = Special;

  const SRC = "coffe/amy.jpg";
  const STEP = 55;                                  // ms between tiles in the reveal

  S.subtitle("monday :)");
  S.title = "Coffee?";

  const pre = new Image();                          // load it early so the reveal isn't blank
  pre.src = SRC;

  const STEAM = '<svg class="cf-steam" viewBox="0 0 60 40" aria-hidden="true">' +
    '<path d="M16 38 C10 30 22 24 16 14 C12 8 18 4 16 0"/><path d="M30 38 C24 30 36 24 30 14 C26 8 32 4 30 0"/><path d="M44 38 C38 30 50 24 44 14 C40 8 46 4 44 0"/></svg>';

  function reveal(animate) {
    if (boardEl.classList.contains("cf-done")) return;
    if (getComputedStyle(boardEl).position === "static") boardEl.style.position = "relative";
    const br = boardEl.getBoundingClientRect();
    boardTiles.forEach((row, r) => row.forEach((t, c) => {
      const tr = t.getBoundingClientRect();
      t.style.setProperty("--cf-img", 'url("' + SRC + '")');
      t.style.setProperty("--cf-size", br.width + "px " + br.height + "px");
      t.style.setProperty("--cf-pos", -(tr.left - br.left) + "px " + -(tr.top - br.top) + "px");
      if (animate) S.later(() => t.classList.add("cf-pic"), (r + c) * STEP);
      else t.classList.add("cf-pic");
    }));

    /* once every tile is a piece, the whole picture fades in over the gaps */
    const whole = document.createElement("div");
    whole.className = "cf-whole";
    whole.style.backgroundImage = 'url("' + SRC + '")';
    whole.innerHTML = STEAM;
    boardEl.appendChild(whole);
    const done = () => boardEl.classList.add("cf-done");
    if (animate) S.later(done, (ROWS + COLS) * STEP + 700);
    else done();
  }

  S.on("win", () => {
    S.noteDelay = (ROWS + COLS) * STEP + 2600;      // let her look at it before the note opens
    S.later(() => reveal(!S.reducedMotion), 700);
  });

  /* reloaded after already winning: picture is just there */
  const last = guessResults[guessResults.length - 1];
  if (gameOver && last && last.every((x) => x === "correct")) reveal(false);
})();
