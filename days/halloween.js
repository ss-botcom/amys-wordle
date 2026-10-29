/* ═════
   HALLOWEEN · October 31 · "BOOOO"

   Needs:  halloween/amy.png   (her face — she's the ghost)

   Before she solves it nothing says "boo": just bats, a little pumpkin
   bobbing in the header, and correct letters glowing pumpkin-orange.
   Winning: ghosts rise out of the winning row.
   The note: a ghost swoops in, the sheet comes off — it's her. Then a
   pumpkin to carve; light it and her face glows inside it. Plus a
   trick-or-treat bag. Edit TREATS to change what's in the bag.
   Test it:  index.html?peek=10-31&fresh=1
   ═════ */
(function () {
  "use strict";
  if (typeof Special === "undefined") return;
  const S = Special;

  const FACE = "halloween/amy.png";
  const TREATS = [
    "treat: one hug, redeemable in person",
    "treat: candy (medicine)",
    "treat: a forehead kiss",
    "treat: a latte, extra foam",
    "trick: BOO!",
    "treat: i carry your bag next time",
    "treat: a whole day of me saying yes",
    "trick: you have to say AWUUU out loud",
  ];

  document.body.classList.add("halloweenday");
  S.subtitle("happy halloween wu 🎃");             // no "boo" until she's solved it
  S.title = "Boo!";
  S.ambient.set("bats", 7, "leaves", 7);

  const GHOST = '<svg viewBox="0 0 40 46" aria-hidden="true"><path d="M20 2C10 2 4 10 4 20v22l5-4 5 4 6-4 6 4 5-4 5 4V20C36 10 30 2 20 2z" fill="#FFFDF9" stroke="#E4DCD1" stroke-width="1.2"/>' +
    '<ellipse cx="14.5" cy="19" rx="2.6" ry="3.4" fill="#3E2C23"/><ellipse cx="25.5" cy="19" rx="2.6" ry="3.4" fill="#3E2C23"/><ellipse cx="20" cy="28" rx="3" ry="2.4" fill="#3E2C23" opacity=".85"/>' +
    '<ellipse cx="11" cy="25" rx="2.4" ry="1.4" fill="#F3D7DA"/><ellipse cx="29" cy="25" rx="2.4" ry="1.4" fill="#F3D7DA"/></svg>';
  const MINI_PUMPKIN = '<svg viewBox="0 0 40 36" aria-hidden="true"><path d="M20 7 C19 3 21 1 24 0" stroke="#6F8F64" stroke-width="2.4" stroke-linecap="round" fill="none"/>' +
    '<ellipse cx="12" cy="21" rx="10" ry="13" fill="#D9772E"/><ellipse cx="28" cy="21" rx="10" ry="13" fill="#D9772E"/><ellipse cx="20" cy="21" rx="11" ry="14" fill="#E8893A"/>' +
    '<polygon points="13,17 18,17 15.5,13" fill="#3E2C23"/><polygon points="22,17 27,17 24.5,13" fill="#3E2C23"/><path d="M13 24 Q20 31 27 24 L24 25.5 L22 23.5 L20 26 L18 23.5 L16 25.5 Z" fill="#3E2C23"/></svg>';

  /* a little pumpkin bobbing in the header corner (a ghost would give it away) */
  const peek = document.createElement("div");
  peek.className = "hw-peek";
  peek.innerHTML = MINI_PUMPKIN;
  document.body.appendChild(peek);

  /* ghosts rise out of the winning row */
  S.on("win", () => {
    if (S.reducedMotion) return;
    boardTiles[currentRow - 1].forEach((t, i) => {
      setTimeout(() => {
        const [x, y] = S.center(t);
        const g = document.createElement("div");
        g.className = "hw-ghost-fly";
        g.innerHTML = GHOST;
        g.style.left = x + "px";
        g.style.top = y - 20 + "px";
        g.style.setProperty("--dx", (Math.random() * 80 - 40) + "px");
        g.style.setProperty("--rot", (Math.random() * 30 - 15) + "deg");
        document.body.appendChild(g);
        setTimeout(() => g.remove(), 1900);
      }, 300 + i * 150);
    });
    S.later(() => S.floatText("boo!", innerWidth / 2, 200, { size: "2.4rem" }), 900);
  });

  /* ── the note: a pumpkin to carve, with her face inside once it's lit ── */
  const plate = S.addToNote("hw",
    '<div class="hw-pk">' +
      '<svg class="hw-pumpkin" viewBox="0 0 170 150" aria-label="pumpkin — tap to carve" role="button">' +
        '<path d="M85 22 C82 12 86 6 94 4" stroke="#6F8F64" stroke-width="6" stroke-linecap="round" fill="none"/>' +
        '<ellipse cx="50" cy="86" rx="40" ry="54" fill="#D9772E"/>' +
        '<ellipse cx="120" cy="86" rx="40" ry="54" fill="#D9772E"/>' +
        '<ellipse cx="85" cy="84" rx="44" ry="58" fill="#E8893A"/>' +
        '<path d="M85 28 C70 50 70 120 85 142 M85 28 C100 50 100 120 85 142" stroke="#C9692A" stroke-width="2" fill="none" opacity=".55"/>' +
        '<g class="hw-cut c1"><polygon points="52,62 70,62 61,48"/><polygon points="100,62 118,62 109,48"/></g>' +
        '<g class="hw-cut c2"><polygon points="79,84 91,84 85,74"/></g>' +
        '<g class="hw-cut c3"><path d="M50 96 Q85 128 120 96 L112 100 L106 94 L99 103 L91 96 L85 104 L79 96 L71 103 L64 94 L58 100 Z"/></g>' +
      "</svg>" +
      '<div class="hw-glowface"><img alt="" draggable="false"></div>' +
    "</div>" +
    '<div class="hw-labels"><span class="sd-name">jack-o\'-wu-tern</span><span class="sd-line">happy halloween, my boo</span></div>' +
    '<p class="sd-hint">(tap the pumpkin to carve it)</p>' +
    '<div class="sd-actions"><button class="sd-btn main" type="button">trick or treat</button></div>' +
    '<p class="hw-treat" role="status"></p>');

  const pumpkin = plate.querySelector(".hw-pumpkin");
  const cuts = plate.querySelectorAll(".hw-cut");
  const hint = plate.querySelector(".sd-hint");
  const treat = plate.querySelector(".hw-treat");
  S.photo(plate.querySelector(".hw-glowface img"), FACE);

  let carved = 0;
  function carve() {
    if (carved < cuts.length) {
      cuts[carved++].classList.add("on");
      hint.textContent = carved < cuts.length ? "(keep carving)" : "(one more tap to light it)";
    } else if (!plate.classList.contains("lit")) {
      plate.classList.add("lit");
      hint.textContent = "(it's you)";
      const [x, y] = S.center(pumpkin);
      S.burst({ x, y, count: 16, colors: ["#FFC24A", "#E8893A", "#FFE6A8"], size: [6, 12] });
      S.later(() => S.floatText("boo :)", x, y - 70, { size: "1.6rem", color: "#B4552A" }), 500);
    }
  }
  pumpkin.addEventListener("click", carve);
  plate.querySelector(".hw-glowface").addEventListener("click", carve);

  let deck = [];
  plate.querySelector(".sd-btn").addEventListener("click", () => {
    if (!deck.length) deck = TREATS.slice().sort(() => Math.random() - 0.5);
    treat.textContent = deck.pop();
    treat.classList.remove("pop");
    void treat.offsetWidth;
    treat.classList.add("pop");
  });

  /* ── intro when the note opens: a ghost swoops in, lights flicker,
        the sheet comes off — it was her the whole time ── */
  S.on("open", () => {
    if (S.reducedMotion) return;
    const st = S.stage(
      '<div class="hw-reveal">' +
        '<div class="sd-photo hw-face"><img alt="" draggable="false"></div>' +
        '<div class="hw-sheet">' + GHOST + "</div>" +
      "</div>",
      { className: "hw-stage" });
    S.photo(st.el.querySelector(".hw-face img"), FACE);
    S.later(() => st.say("oooOOOooo…"), 700);
    S.later(() => st.el.classList.add("flicker"), 1800);
    S.later(() => st.el.classList.add("unveil"), 2500);
    S.later(() => st.say("boo."), 2700);
    S.later(() => st.say("happy halloween, my boo"), 4100);
    S.later(() => st.done(), 6000);
  });
  S.on("close", () => S.clearLater());
})();
