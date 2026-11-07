/* ═════
   SMILE DAY · November 10 · "SMILE"  (😃)

   Needs:  smile/straight.png   (straight face)
           smile/smile.png      (smiling)
   In the note: her straight face. Tap it and it flips to the smile.
   Test it:  index.html?peek=11-10&fresh=1
   ═════ */
(function () {
  "use strict";
  if (typeof Special === "undefined") return;
  const S = Special;

  S.subtitle("hi :)");
  S.title = "😃";

  const plate = S.addToNote("sm",
    '<div class="sm-card" role="button" aria-label="flip">' +
      '<div class="sm-inner">' +
        '<div class="sm-side sm-front"><img alt="" draggable="false"></div>' +
        '<div class="sm-side sm-back"><img alt="" draggable="false"></div>' +
      "</div>" +
    "</div>" +
    '<p class="sd-hint">(tap her)</p>');

  const card = plate.querySelector(".sm-card");
  const hint = plate.querySelector(".sd-hint");
  S.photo(plate.querySelector(".sm-front img"), "smile/straight.png");
  S.photo(plate.querySelector(".sm-back img"), "smile/smile.png");

  card.addEventListener("click", () => {
    const on = !card.classList.contains("flipped");
    card.classList.toggle("flipped", on);
    hint.classList.add("gone");
    if (on) {
      const [x, y] = S.center(card);
      S.later(() => S.floatText(":)", x, y - 90, { size: "2rem" }), 300);
    }
  });
})();
