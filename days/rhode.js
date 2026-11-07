/* ═════
   RHODE DAY · November 27 · "RHODE"  (a rhode trip?)

   In the note: a "greetings from providence" postcard. Tap to flip it
   over to the back (stamp, postmark, to wu).
   Test it:  index.html?peek=11-27&fresh=1
   ═════ */
(function () {
  "use strict";
  if (typeof Special === "undefined") return;
  const S = Special;

  S.subtitle("hi wu :)");
  S.title = "Greetings";

  /* front: a little providence skyline, river, and the big letters */
  const FRONT =
    '<svg viewBox="0 0 260 170" aria-hidden="true">' +
      '<rect width="260" height="170" fill="#F6D9B8"/>' +
      '<circle cx="210" cy="44" r="18" fill="#F2C96B"/>' +
      '<path d="M0 118 H40 V96 H58 V110 H70 V84 H88 V104 H100 V118 Z" fill="#C9A27E"/>' +
      '<path d="M150 118 H160 V92 H200 V118 H260 V104 H236 V96 H222 V118 Z" fill="#C9A27E"/>' +
      '<rect x="168" y="70" width="24" height="24" fill="#E8DCC8"/><path d="M164 72 Q180 44 196 72 Z" fill="#E8DCC8"/><rect x="178" y="38" width="4" height="12" fill="#E8DCC8"/>' +
      '<rect y="118" width="260" height="52" fill="#9FB7D9"/>' +
      '<path d="M0 132 Q30 126 60 132 T120 132 T180 132 T240 132 T300 132" stroke="#fff" stroke-width="2" fill="none" opacity=".6"/>' +
      '<path d="M0 148 Q30 142 60 148 T120 148 T180 148 T240 148 T300 148" stroke="#fff" stroke-width="2" fill="none" opacity=".4"/>' +
      '<text x="130" y="30" text-anchor="middle" font-family="Caveat, cursive" font-size="20" fill="#6B5142">greetings from</text>' +
      '<text x="130" y="64" text-anchor="middle" font-family="Playfair Display, serif" font-weight="700" font-size="30" fill="#C25E68" stroke="#fff" stroke-width="1.2" letter-spacing="1">PROVIDENCE</text>' +
    "</svg>";

  const BACK =
    '<div class="rh-back-inner">' +
      '<div class="rh-left"><span class="rh-scrawl">a rhode trip :)</span></div>' +
      '<div class="rh-right">' +
        '<span class="rh-stamp">♥</span>' +
        '<span class="rh-post">PVD<br>NOV 27</span>' +
        '<span class="rh-line">to: amy wu</span>' +
        '<span class="rh-line">from: me</span>' +
      "</div>" +
    "</div>";

  const plate = S.addToNote("rh",
    '<div class="rh-card" role="button" aria-label="flip the postcard">' +
      '<div class="rh-inner">' +
        '<div class="rh-side rh-front">' + FRONT + "</div>" +
        '<div class="rh-side rh-back">' + BACK + "</div>" +
      "</div>" +
    "</div>" +
    '<p class="sd-hint">(flip it)</p>');

  const card = plate.querySelector(".rh-card");
  const hint = plate.querySelector(".sd-hint");
  card.addEventListener("click", () => {
    card.classList.toggle("flipped");
    hint.classList.add("gone");
  });
  S.on("open", () => card.classList.remove("flipped"));
})();
