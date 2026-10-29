/* ═════
   MOCHI DAY · November 6 · "MOCHI"  (squishy and sweet. like your cheeks)

   Needs:  mochi/amy.png   (hands squishing her cheeks)
   In the note: her face is a mochi. Press and hold to squish it, let go
   and it boings back. The winning row squishes too.
   Test it:  index.html?peek=11-06&fresh=1
   ═════ */
(function () {
  "use strict";
  if (typeof Special === "undefined") return;
  const S = Special;

  S.subtitle("hey you :)");                         // nothing squishy until she's solved it
  S.title = "Squish.";

  const SQUISHES = ["squish", "smoosh", "boing", "mochi!", "so squishy", "cheeks :)", "squish squish", "麻糬"];
  const MILESTONES = { 10: "ok she's very squishy", 25: "certified mochi", 50: "leave her cheeks alone wu" };

  const plate = S.addToNote("mo",
    '<div class="mo-plate">' +
      '<div class="mo-mochi" role="button" aria-label="squish her"><img alt="" draggable="false"><span class="mo-blush l"></span><span class="mo-blush r"></span></div>' +
    "</div>" +
    '<div class="mo-labels"><span class="sd-name">one (1) mochi</span><span class="sd-line">squishy and sweet</span></div>' +
    '<p class="sd-hint">(press and hold her)</p>' +
    '<p class="sd-count" role="status"></p>');

  const mochi = plate.querySelector(".mo-mochi");
  const hint = plate.querySelector(".sd-hint");
  const count = plate.querySelector(".sd-count");
  S.photo(mochi.querySelector("img"), "mochi/amy.png");

  let n = 0, held = false;
  function press(e) {
    if (e) e.preventDefault();
    held = true;
    mochi.classList.remove("boing");
    mochi.classList.add("held");
  }
  function release() {
    if (!held) return;
    held = false;
    mochi.classList.remove("held");
    void mochi.offsetWidth;
    mochi.classList.add("boing");
    hint.classList.add("gone");
    const [x, y] = S.center(mochi);
    S.floatText(SQUISHES[n % SQUISHES.length], x + (Math.random() * 70 - 35), y - 80, { size: "1.4rem" });
    n++;
    count.textContent = "squishes: " + n + (MILESTONES[n] ? " · " + MILESTONES[n] : "");
    count.classList.remove("pop");
    void count.offsetWidth;
    count.classList.add("pop");
  }
  mochi.addEventListener("pointerdown", press);
  ["pointerup", "pointerleave", "pointercancel"].forEach((ev) => mochi.addEventListener(ev, release));
  mochi.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { press(e); setTimeout(release, 180); } });
  mochi.tabIndex = 0;

  /* the winning row squishes like mochi, then little mochi balls pop out */
  S.on("win", () => {
    boardTiles[currentRow - 1].forEach((t, i) => setTimeout(() => t.classList.add("mo-squish"), 450 + i * 110));
    S.later(() => S.burst({ count: 20, colors: ["#FBE3E5", "#FFFFFF", "#E8F0DA", "#F3D7DA"], size: [12, 20], spread: [80, 220] }), 900);
  });
})();
