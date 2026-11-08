/* ═════
   MOVIE DAY · November 13 · "MOVIE"  (what's our watch list for the bus)

   Needs:  movie/amy.jpg   (her on the bus)
   In the note: a little cinema. The curtains open on her, and tapping
   the screen pops popcorn.
   Test it:  index.html?peek=11-13&fresh=1
   ═════ */
(function () {
  "use strict";
  if (typeof Special === "undefined") return;
  const S = Special;

  S.subtitle("hi wu :)");
  S.title = "Now showing";

  const plate = S.addToNote("mv",
    '<div class="mv-marquee">NOW SHOWING</div>' +
    '<div class="mv-theater">' +
      '<div class="mv-screen"><img alt="" draggable="false"></div>' +
      '<div class="mv-curtain l"></div><div class="mv-curtain r"></div>' +
    "</div>" +
    '<div class="mv-seats"><span></span><span></span><span></span><span></span><span></span></div>' +
    '<p class="sd-hint">(tap the screen)</p>');

  const theater = plate.querySelector(".mv-theater");
  const hint = plate.querySelector(".sd-hint");
  S.photo(plate.querySelector(".mv-screen img"), "movie/amy.jpg");

  S.on("open", () => {
    theater.classList.remove("open");
    S.later(() => theater.classList.add("open"), 1200);
  });
  S.on("close", () => S.clearLater());

  theater.addEventListener("click", () => {
    if (!theater.classList.contains("open")) { theater.classList.add("open"); return; }
    hint.classList.add("gone");
    const [x, y] = S.center(theater);
    S.burst({ x, y: y + 40, count: 14, html: "🍿", colors: ["#E3C481"], size: [14, 22], spread: [60, 160], lift: 90 });
  });
})();
