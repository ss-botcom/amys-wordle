/* ═════
   COUNT DAY · November 19 · "COUNT"  (1 more week until thanksgiving :)

   In the note: a tear-off calendar. Tap to tear a page; it counts
   7, 6, 5 … 1, then the last page is thanksgiving.
   Test it:  index.html?peek=11-19&fresh=1
   ═════ */
(function () {
  "use strict";
  if (typeof Special === "undefined") return;
  const S = Special;

  S.subtitle("hi wu :)");
  S.title = "7 days";

  const PAGES = ["7", "6", "5", "4", "3", "2", "1", "🦃"];

  const plate = S.addToNote("ct",
    '<div class="ct-pad" role="button" aria-label="tear a page">' +
      '<div class="ct-rings"><i></i><i></i><i></i></div>' +
      '<div class="ct-pages"></div>' +
    "</div>" +
    '<p class="sd-hint">(tear it)</p>');

  const pad = plate.querySelector(".ct-pad");
  const pages = plate.querySelector(".ct-pages");
  const hint = plate.querySelector(".sd-hint");

  function build() {
    pages.innerHTML = PAGES.slice().reverse().map((p, i) =>
      '<div class="ct-page' + (i === 0 ? " last" : "") + '"><span class="ct-band">' + (i === 0 ? "NOV 26" : "NOV") + '</span><span class="ct-num">' + p + "</span></div>").join("");
  }
  build();

  pad.addEventListener("click", () => {
    const all = pages.querySelectorAll(".ct-page:not(.torn)");
    if (all.length <= 1) return;                     // thanksgiving stays
    hint.classList.add("gone");
    const top = all[all.length - 1];
    top.classList.add("torn");
    setTimeout(() => top.remove(), 600);
    if (all.length === 2) {
      const [x, y] = S.center(pad);
      S.later(() => S.burst({ x, y, count: 18, colors: ["#D9772E", "#E3C481", "#A8BBA0", "#C9692A"] }), 350);
    }
  });

  S.on("open", build);                               // full pad again each time the note opens
})();
