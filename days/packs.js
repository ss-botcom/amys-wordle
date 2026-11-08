/* ═════
   PACKS DAY · November 20 · "PACKS"  (start packing wu)

   In the note: an open suitcase and her stuff. Tap each thing to toss
   it in; once it's all in, the suitcase shuts and gets a PVD tag.
   Edit ITEMS to change what she packs.
   Test it:  index.html?peek=11-20&fresh=1
   ═════ */
(function () {
  "use strict";
  if (typeof Special === "undefined") return;
  const S = Special;

  S.subtitle("hi wu :)");
  S.title = "Packed?";

  const HOODIE = '<svg viewBox="0 0 40 40" aria-hidden="true"><path d="M13 6 Q20 2 27 6 L35 12 L32 20 L29 18 L29 36 L11 36 L11 18 L8 20 L5 12 Z" fill="#6E2B33"/>' +
    '<path d="M15 6 Q20 13 25 6" fill="none" stroke="#4E1C22" stroke-width="2"/><path d="M18 11 V17 M22 11 V17" stroke="#F3E8D2" stroke-width="1.2"/></svg>';
  const ITEMS = [HOODIE, "🧣", "🪥", "🎧", "🍪", "📷", "🔌"];

  const plate = S.addToNote("pk",
    '<div class="pk-items">' + ITEMS.map((it) => '<button type="button" class="pk-item">' + it + "</button>").join("") + "</div>" +
    '<div class="pk-case">' +
      '<div class="pk-lid"></div>' +
      '<div class="pk-body"><span class="pk-strap"></span></div>' +
      '<span class="pk-handle"></span>' +
      '<span class="pk-tag">PVD</span>' +
    "</div>" +
    '<p class="sd-hint">(pack her stuff)</p>');

  const items = plate.querySelectorAll(".pk-item");
  const box = plate.querySelector(".pk-case");
  const hint = plate.querySelector(".sd-hint");

  let packed = 0;
  items.forEach((it) => it.addEventListener("click", () => {
    if (it.classList.contains("in")) return;
    hint.classList.add("gone");
    const a = it.getBoundingClientRect(), b = box.getBoundingClientRect();
    it.style.setProperty("--dx", (b.left + b.width / 2 - (a.left + a.width / 2)) + "px");
    it.style.setProperty("--dy", (b.top + b.height * 0.55 - (a.top + a.height / 2)) + "px");
    it.classList.add("in");
    packed++;
    S.later(() => {
      box.classList.remove("bump");
      void box.offsetWidth;
      box.classList.add("bump");
      if (packed === items.length) {
        box.classList.add("shut");
        const [x, y] = S.center(box);
        S.later(() => S.burst({ x, y, count: 16, colors: ["#D9A0A5", "#E3C481", "#A8BBA0", "#6E2B33"] }), 500);
      }
    }, 450);
  }));
})();
