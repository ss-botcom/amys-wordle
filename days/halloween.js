/* ═════
   HALLOWEEN · October 31 · "BOOOO"

   Bats instead of leaves, correct letters glow pumpkin-orange, a ghost
   hangs around the header, and ghosts rise out of the winning row.
   The note: a short spooky intro, then a pumpkin to carve (tap it) and a
   trick-or-treat bag. Edit TREATS to change what's in the bag.
   Test it:  index.html?peek=10-31&fresh=1
   ═════ */
(function () {
  "use strict";
  if (typeof Special === "undefined") return;
  const S = Special;

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
  S.subtitle("boo :)");
  S.title = "Boo!";
  S.ambient.set("bats", 7, "leaves", 7);

  const GHOST = '<svg viewBox="0 0 40 46" aria-hidden="true"><path d="M20 2C10 2 4 10 4 20v22l5-4 5 4 6-4 6 4 5-4 5 4V20C36 10 30 2 20 2z" fill="#FFFDF9" stroke="#E4DCD1" stroke-width="1.2"/>' +
    '<ellipse cx="14.5" cy="19" rx="2.6" ry="3.4" fill="#3E2C23"/><ellipse cx="25.5" cy="19" rx="2.6" ry="3.4" fill="#3E2C23"/><ellipse cx="20" cy="28" rx="3" ry="2.4" fill="#3E2C23" opacity=".85"/>' +
    '<ellipse cx="11" cy="25" rx="2.4" ry="1.4" fill="#F3D7DA"/><ellipse cx="29" cy="25" rx="2.4" ry="1.4" fill="#F3D7DA"/></svg>';

  const peek = document.createElement("div");
  peek.className = "hw-peek";
  peek.innerHTML = GHOST;
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

  /* ── the note: a pumpkin to carve ── */
  const plate = S.addToNote("hw",
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
    '<div class="hw-labels"><span class="sd-name">jack-o\'-wu-tern</span><span class="sd-line">happy halloween, my boo</span></div>' +
    '<p class="sd-hint">(tap the pumpkin to carve it)</p>' +
    '<div class="sd-actions"><button class="sd-btn main" type="button">trick or treat</button></div>' +
    '<p class="hw-treat" role="status"></p>');

  const pumpkin = plate.querySelector(".hw-pumpkin");
  const cuts = plate.querySelectorAll(".hw-cut");
  const hint = plate.querySelector(".sd-hint");
  const treat = plate.querySelector(".hw-treat");
  let carved = 0;
  pumpkin.addEventListener("click", () => {
    if (carved < cuts.length) {
      cuts[carved++].classList.add("on");
      hint.textContent = carved < cuts.length ? "(keep carving)" : "(one more tap to light it)";
    } else if (!plate.classList.contains("lit")) {
      plate.classList.add("lit");
      hint.classList.add("gone");
      const [x, y] = S.center(pumpkin);
      S.burst({ x, y, count: 16, colors: ["#FFC24A", "#E8893A", "#FFE6A8"], size: [6, 12] });
    }
  });

  let deck = [];
  plate.querySelector(".sd-btn").addEventListener("click", () => {
    if (!deck.length) deck = TREATS.slice().sort(() => Math.random() - 0.5);
    treat.textContent = deck.pop();
    treat.classList.remove("pop");
    void treat.offsetWidth;
    treat.classList.add("pop");
  });

  /* ── intro when the note opens: lights flicker, a ghost swoops in ── */
  S.on("open", () => {
    if (S.reducedMotion) return;
    const st = S.stage('<div class="hw-big-ghost">' + GHOST + "</div>", { className: "hw-stage" });
    S.later(() => st.say("boo."), 600);
    S.later(() => st.el.classList.add("flicker"), 1700);
    S.later(() => st.say("happy halloween, wu"), 2400);
    S.later(() => st.done(), 4300);
  });
  S.on("close", () => S.clearLater());
})();
