/* ═════
   TEEHE DAY · October 21 · "TEEHE"

   Needs:  teehe/amy.jpg   (the big pillow giggle)
   Tap her face in the note and she giggles. The winning row giggles too.
   Test it:  index.html?peek=10-21&fresh=1
   ═════ */
(function () {
  "use strict";
  if (typeof Special === "undefined") return;
  const S = Special;

  const GIGGLES = ["hehe", "tee hee", "hihi", "嘻嘻", "hehehe", "teehee :)"];

  S.subtitle("tee hee :)");
  S.title = "Tee hee.";

  const plate = S.addToNote("th",
    '<div class="sd-photo th-face"><img alt="" draggable="false"></div>' +
    '<div class="th-labels"><span class="sd-name">tee hee</span><span class="sd-line">hehehe :)</span></div>' +
    '<p class="sd-hint">(tap her)</p>' +
    '<p class="sd-count" role="status"></p>');
  const face = plate.querySelector(".th-face");
  const hint = plate.querySelector(".sd-hint");
  const count = plate.querySelector(".sd-count");
  S.photo(face.querySelector("img"), "teehe/amy.jpg");

  let n = 0;
  face.addEventListener("click", () => {
    n++;
    hint.classList.add("gone");
    face.classList.remove("giggle");
    void face.offsetWidth;
    face.classList.add("giggle");
    const [x, y] = S.center(face);
    S.floatText(GIGGLES[n % GIGGLES.length], x + (Math.random() * 80 - 40), y - 60);
    count.textContent = n >= 10 ? "giggles: " + n + " · ok you're very giggly today" : "giggles: " + n;
    count.classList.remove("pop");
    void count.offsetWidth;
    count.classList.add("pop");
  });

  /* the winning row giggles, little hehes float off it */
  S.on("win", () => {
    boardTiles[currentRow - 1].forEach((t, i) => {
      setTimeout(() => {
        t.classList.add("th-wiggle");
        const [x, y] = S.center(t);
        S.floatText(GIGGLES[i], x, y - 24, { size: "1.3rem" });
      }, 500 + i * 120);
    });
  });
})();
