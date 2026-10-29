/* ═════
   HOODY DAY · November 5 · "HOODY"  (wearing my hoodie?)

   Needs:  hoody/amy.png   (her in the maroon hoodie, sleeve over her face)
   In the note: her photo with a "property of me wu" tag. "hood up"
   drops a maroon hood around her face; pull the strings to make it
   cozier (too many pulls and she's a burrito). Maroon hearts when she wins.
   Test it:  index.html?peek=11-05&fresh=1
   ═════ */
(function () {
  "use strict";
  if (typeof Special === "undefined") return;
  const S = Special;

  S.subtitle("hi cutie :)");                        // nothing about hoodies until she's solved it
  S.title = "Cozy?";

  const MAROON = "#6E2B33";
  const PULLS = [
    { rx: 50, ry: 58, say: "cozy" },
    { rx: 42, ry: 50, say: "cozier" },
    { rx: 33, ry: 41, say: "ok that's tight" },
    { rx: 24, ry: 30, say: "burrito mode" },
  ];

  const HOOD =
    '<svg class="ho-hood" viewBox="0 0 170 190" aria-hidden="true">' +
      '<path class="ho-cloth" fill-rule="evenodd" fill="' + MAROON + '" d=""/>' +
      '<path d="M66 150 C64 166 62 176 60 186" stroke="#F3E8D2" stroke-width="2.4" stroke-linecap="round" fill="none"/>' +
      '<path d="M104 150 C106 166 108 176 110 186" stroke="#F3E8D2" stroke-width="2.4" stroke-linecap="round" fill="none"/>' +
      '<circle cx="60" cy="187" r="3" fill="#F3E8D2"/><circle cx="110" cy="187" r="3" fill="#F3E8D2"/>' +
    "</svg>";

  const plate = S.addToNote("ho",
    '<div class="ho-frame">' +
      '<div class="sd-photo ho-photo"><img alt="" draggable="false"></div>' +
      HOOD +
      '<span class="ho-tag">property of <s>me</s> <b>wu</b></span>' +
    "</div>" +
    '<div class="ho-labels"><span class="sd-name">my hoodie</span><span class="sd-line">looks better on you anyway</span></div>' +
    '<div class="sd-actions">' +
      '<button class="sd-btn main" type="button">hood up</button>' +
      '<button class="sd-btn pull" type="button" disabled>pull the strings</button>' +
    "</div>" +
    '<p class="sd-count" role="status">days since it was stolen: all of them</p>');

  const frame = plate.querySelector(".ho-frame");
  const cloth = plate.querySelector(".ho-cloth");
  const line = plate.querySelector(".sd-line");
  const upBtn = plate.querySelector(".sd-btn.main");
  const pullBtn = plate.querySelector(".sd-btn.pull");
  S.photo(plate.querySelector(".ho-photo img"), "hoody/amy.png");

  /* the hood: a big rounded shape with a face-sized hole (smaller hole = strings pulled) */
  function hole(rx, ry) {
    const cx = 85, cy = 92;
    cloth.setAttribute("d",
      "M85 4 C140 4 166 46 166 98 C166 140 150 160 126 166 L44 166 C20 160 4 140 4 98 C4 46 30 4 85 4 Z " +
      "M" + (cx - rx) + " " + cy + " a" + rx + " " + ry + " 0 1 0 " + 2 * rx + " 0 a" + rx + " " + ry + " 0 1 0 " + -2 * rx + " 0 Z");
  }
  let pulls = 0;
  hole(PULLS[0].rx, PULLS[0].ry);

  upBtn.addEventListener("click", () => {
    const up = !frame.classList.contains("up");
    frame.classList.toggle("up", up);
    upBtn.textContent = up ? "hood down" : "hood up";
    pullBtn.disabled = !up;
    pulls = 0;
    hole(PULLS[0].rx, PULLS[0].ry);
    frame.classList.remove("burrito");
    line.textContent = up ? "cozy wu" : "looks better on you anyway";
  });

  pullBtn.addEventListener("click", () => {
    pulls = (pulls + 1) % PULLS.length;
    const p = PULLS[pulls];
    hole(p.rx, p.ry);
    frame.classList.toggle("burrito", pulls === PULLS.length - 1);
    frame.classList.remove("tug");
    void frame.offsetWidth;
    frame.classList.add("tug");
    const [x, y] = S.center(frame);
    S.floatText(pulls === 0 ? "ok loosened" : p.say, x, y - 80, { size: "1.4rem" });
    line.textContent = pulls === 0 ? "cozy wu" : p.say;
  });

  S.on("win", () => S.later(() =>
    S.burst({ count: 22, html: "♥", colors: [MAROON, "#9A4A52", "var(--rose)"], size: [14, 24], spread: [90, 240] }), 400));
})();
