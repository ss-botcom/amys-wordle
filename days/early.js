/* ═════
   EARLY DAY · November 24 · "EARLY"  (sleep on the bus wu)

   In the note: a bus ticket, NYC → PVD, two seats. Tap to tear off the
   stub; little z's float up.
   Test it:  index.html?peek=11-24&fresh=1
   ═════ */
(function () {
  "use strict";
  if (typeof Special === "undefined") return;
  const S = Special;

  S.subtitle("hi wu :)");
  S.title = "Tomorrow :)";

  const plate = S.addToNote("ea",
    '<div class="ea-ticket" role="button" aria-label="tear the ticket">' +
      '<div class="ea-main">' +
        '<span class="ea-k">bus</span>' +
        '<span class="ea-route">NYC <b>→</b> PVD</span>' +
        '<div class="ea-row"><span><span class="ea-k">date</span>NOV 25</span><span><span class="ea-k">seats</span>12A · 12B</span></div>' +
        '<div class="ea-row"><span><span class="ea-k">passengers</span>AMY WU + ME</span></div>' +
      "</div>" +
      '<div class="ea-stub"><span class="ea-k">admit</span><span class="ea-two">2</span></div>' +
    "</div>" +
    '<p class="sd-hint">(tear it)</p>');

  const ticket = plate.querySelector(".ea-ticket");
  const hint = plate.querySelector(".sd-hint");

  ticket.addEventListener("click", () => {
    if (ticket.classList.contains("torn")) return;
    ticket.classList.add("torn");
    hint.classList.add("gone");
    const [x, y] = S.center(ticket);
    ["z", "z", "Z"].forEach((z, i) => S.later(() => S.floatText(z, x - 30 + i * 22, y - 40, { size: (1.2 + i * 0.4) + "rem" }), 400 + i * 350));
  });

  S.on("open", () => ticket.classList.remove("torn"));
})();
