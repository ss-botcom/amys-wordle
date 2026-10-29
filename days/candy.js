/* ═════
   CANDY DAY · October 29 · "CANDY"  (trick or treat. where's my candy (medicine))

   Needs:  candy/amy.png   (the pout)
   A weekly pill organizer — except every "pill" is candy. She pouts
   above it until you give her all seven. Winning makes it rain candy.
   Test it:  index.html?peek=10-29&fresh=1
   ═════ */
(function () {
  "use strict";
  if (typeof Special === "undefined") return;
  const S = Special;

  S.subtitle("halloween's coming 🎃");
  S.title = "Treat.";

  const COLORS = ["#D9A0A5", "#E3C481", "#A8BBA0", "#E8955A", "#9FB7D9", "#C8A2D4", "#E8B7BC"];
  const DAYS = ["S", "M", "T", "W", "T", "F", "S"];
  const NOMS = ["nom", "crunch", "mmm", "nom nom", "yum", "chomp", "all better?"];
  const ASKS = ["more", "that's it?", "keep going", "mmm ok", "one more", "almost cured", "ok. cured :)"];
  const CANDY = (c) => '<svg class="cd-candy" viewBox="0 0 40 20" aria-hidden="true"><path d="M2 4l8 6-8 6zM38 4l-8 6 8 6z" fill="' + c +
    '" opacity=".75"/><ellipse cx="20" cy="10" rx="10" ry="7.5" fill="' + c + '"/><path d="M14 6c3 3 9 5 12 8" stroke="#fff" stroke-width="1.6" opacity=".6" fill="none"/></svg>';

  const plate = S.addToNote("cd",
    '<div class="cd-face"><div class="sd-photo cd-photo"><img alt="" draggable="false"></div>' +
      '<span class="cd-bubble">where\'s my candy</span></div>' +
    '<div class="cd-box">' +
      DAYS.map((d, i) => '<button type="button" class="cd-cell" aria-label="day ' + (i + 1) + '">' + CANDY(COLORS[i]) + '<span class="cd-lid">' + d + "</span></button>").join("") +
    "</div>" +
    '<div class="cd-labels"><span class="sd-name">wu\'s medicine</span><span class="sd-line">one candy a day, doctor\'s orders</span></div>' +
    '<p class="sd-hint">(tap a day)</p>' +
    '<p class="sd-count" role="status"></p>');

  const hint = plate.querySelector(".sd-hint");
  const photo = plate.querySelector(".cd-photo");
  const bubble = plate.querySelector(".cd-bubble");
  S.photo(photo.querySelector("img"), "candy/amy.png");
  const count = plate.querySelector(".sd-count");
  let taken = 0;
  plate.querySelectorAll(".cd-cell").forEach((cell) => {
    cell.addEventListener("click", () => {
      if (cell.classList.contains("open")) return;
      cell.classList.add("open");
      hint.classList.add("gone");
      const [x, y] = S.center(cell);
      S.floatText(NOMS[taken], x, y - 40, { size: "1.3rem" });
      bubble.textContent = ASKS[taken];
      photo.classList.remove("chomp");
      void photo.offsetWidth;
      photo.classList.add("chomp");
      taken++;
      plate.classList.toggle("cured", taken === 7);
      count.textContent = taken < 7 ? taken + " of 7 taken" : "all 7 taken. fully cured. you're welcome :)";
      if (taken === 7) S.burst({ x, y: y - 20, count: 18, colors: COLORS });
    });
  });

  S.on("win", () => setTimeout(() => S.ambient.set("candy", 16, "leaves", 5), 600));
  if (gameOver) S.ambient.set("candy", 10, "leaves", 5);
})();
