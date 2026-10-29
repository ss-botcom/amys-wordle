/* ═════
   PEARS DAY · November 3 · "PEARS"  (wanna be my pair :)

   Needs:  pears/amy.png   (her side profile, looking right)
           xiang/me.jpg    (you — already in the repo)
   Two pears: her on the left looking over at you on the right. They
   scoot together when the note opens; tap "bump" to bump them again.
   Pears rain on the board when she wins.
   Test it:  index.html?peek=11-03&fresh=1
   ═════ */
(function () {
  "use strict";
  if (typeof Special === "undefined") return;
  const S = Special;

  S.subtitle("you + me :)");
  S.title = "Pear.";

  const BUMPS = ["pear-fect", "a pair :)", "you're the cute one", "i'm the weird one", "pair for life", "bump :)", "best pair"];

  const pear = (who, src) =>
    '<div class="pr-pear pr-' + who + '">' +
      '<span class="pr-stem"></span><span class="pr-leaf"></span>' +
      '<div class="pr-body"><img alt="" draggable="false" data-src="' + src + '"></div>' +
    "</div>";

  const plate = S.addToNote("pr",
    '<div class="pr-scene">' +
      pear("her", "pears/amy.png") +
      '<span class="pr-heart">♥</span>' +
      pear("me", "xiang/me.jpg") +
    "</div>" +
    '<div class="pr-labels"><span class="sd-name">a pair of pears</span><span class="sd-line">wanna be my pair :)</span></div>' +
    '<div class="sd-actions"><button class="sd-btn main" type="button">bump</button></div>' +
    '<p class="sd-count" role="status"></p>');

  plate.querySelectorAll("img[data-src]").forEach((img) => S.photo(img, img.dataset.src));
  const scene = plate.querySelector(".pr-scene");
  const heart = plate.querySelector(".pr-heart");
  const count = plate.querySelector(".sd-count");

  let bumps = 0;
  function bump(say) {
    scene.classList.remove("bump");
    void scene.offsetWidth;
    scene.classList.add("bump");
    if (say) {
      const [x, y] = S.center(heart);
      S.later(() => S.floatText(BUMPS[bumps % BUMPS.length], x, y - 50, { size: "1.4rem" }), 220);
      bumps++;
      count.textContent = "bumps: " + bumps;
      count.classList.remove("pop");
      void count.offsetWidth;
      count.classList.add("pop");
    }
  }
  plate.querySelector(".sd-btn").addEventListener("click", () => bump(true));

  /* they scoot together every time the note opens */
  S.on("open", () => {
    scene.classList.remove("together", "bump");
    void scene.offsetWidth;
    S.later(() => scene.classList.add("together"), 900);
    S.later(() => bump(false), 1700);
  });

  S.on("win", () => S.later(() =>
    S.burst({ count: 18, html: "🍐", colors: ["#A8BBA0"], size: [16, 28], spread: [80, 240] }), 400));
})();
