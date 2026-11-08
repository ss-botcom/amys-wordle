/* ═════
   FACES DAY · November 15 · "FACES"  (my favorite face to see :)

   Uses photos already in the repo (edit FACES to change the order).
   In the note: a stack of her faces. Tap to flip to the next one.
   Ends on the sweet one.
   Test it:  index.html?peek=11-15&fresh=1
   ═════ */
(function () {
  "use strict";
  if (typeof Special === "undefined") return;
  const S = Special;

  const FACES = [
    "faces/talk.png",
    "faces/uhoh.jpg",
    "toast/amy-6.png",
    "nose/amy-nose.png",
    "mochi/amy.png",
    "candy/amy.png",
    "toast/amy-5.png",
    "zaoan/amy.png",
    "faces/pout.jpg",
    "teehe/amy.jpg",
    "xiang/amy.jpg",
  ];

  S.subtitle("hi :)");
  S.title = "My favorite face";

  const plate = S.addToNote("fc",
    '<div class="fc-stack" role="button" aria-label="next face">' +
      '<div class="fc-card under"><img alt="" draggable="false"></div>' +
      '<div class="fc-card top"><img alt="" draggable="false"></div>' +
    "</div>" +
    '<p class="sd-count" role="status"></p>' +
    '<p class="sd-hint">(tap)</p>');

  const stack = plate.querySelector(".fc-stack");
  const top = plate.querySelector(".fc-card.top");
  const under = plate.querySelector(".fc-card.under");
  const count = plate.querySelector(".sd-count");
  const hint = plate.querySelector(".sd-hint");

  let i = 0;
  function show() {
    S.photo(top.querySelector("img"), FACES[i]);
    S.photo(under.querySelector("img"), FACES[(i + 1) % FACES.length]);
    count.textContent = i + 1 + " / " + FACES.length;
  }
  show();

  stack.addEventListener("click", () => {
    hint.classList.add("gone");
    if (S.reducedMotion) { i = (i + 1) % FACES.length; show(); return; }
    if (top.classList.contains("toss")) return;
    top.classList.add("toss");
    setTimeout(() => {
      i = (i + 1) % FACES.length;
      top.classList.remove("toss");
      show();
    }, 380);
  });
})();
