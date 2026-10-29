/* ═════
   CALLED IT · October 28 "TIMES" (your first guess?) + October 30 "AUDIO"
   (your second guess?)

   Today's word is her usual opener. If she plays it on the guess you
   predicted, the board gets a CALLED IT stamp and the note keeps score.
   Oct 30 also gets a polaroid of her with her AirPods in (audio/amy.png).
   Test it:  index.html?peek=10-28&fresh=1   then guess TIMES first
   ═════ */
(function () {
  "use strict";
  if (typeof Special === "undefined") return;
  const S = Special;

  const PREDICTED = { "10-28": 1, "10-30": 2 }[S.key] || 1;
  const FUTURE = {
    "10-28": "friday's prediction: you open with TIMES again. and then…",
    "10-30": "prediction for tomorrow: TIMES, then AUDIO. every day. forever.",
  }[S.key] || "";
  const ord = (n) => ["1st", "2nd", "3rd", "4th", "5th", "6th"][n - 1];

  S.subtitle("i know you :)");

  function attemptNow() {
    // after the game: how many rows she used (and whether the last one won)
    const last = guessResults[guessResults.length - 1];
    const won = !!last && last.every((x) => x === "correct");
    return won ? guessResults.length : null;
  }

  function verdict() {
    const got = attemptNow();
    return { got, hit: got === PREDICTED };
  }

  const plate = S.addToNote("ci",
    '<svg class="ci-ball" viewBox="0 0 92 92" aria-hidden="true">' +
      '<ellipse cx="46" cy="84" rx="26" ry="5" fill="#E4DCD1"/>' +
      '<path d="M26 82 L32 70 H60 L66 82 Z" fill="#C9A27E"/>' +
      '<circle cx="46" cy="42" r="30" fill="#F3D7DA" opacity="0.55"/>' +
      '<circle class="ci-glow" cx="46" cy="42" r="20" fill="#FFF4E6"/>' +
      '<path d="M30 30 Q36 22 46 20" stroke="#fff" stroke-width="3" stroke-linecap="round" fill="none" opacity="0.8"/>' +
      '<text x="46" y="48" text-anchor="middle" font-size="16" fill="#D9A0A5">♥</text>' +
    "</svg>" +
    '<div class="ci-board">' +
      '<div class="ci-cell"><span class="ci-k">i said</span><span class="ci-v">' + ord(PREDICTED) + "</span></div>" +
      '<div class="ci-cell"><span class="ci-k">you got it</span><span class="ci-v ci-got">—</span></div>' +
    "</div>" +
    '<p class="ci-verdict"></p>' +
    '<div class="sd-actions"><button class="sd-btn" type="button">predict tomorrow</button></div>' +
    '<p class="ci-future"></p>');

  if (S.key === "10-30") {
    const pol = document.createElement("figure");
    pol.className = "polaroid ci-pol";
    pol.innerHTML = '<img alt="" draggable="false"><figcaption>listening for AUDIO</figcaption>';
    S.photo(pol.querySelector("img"), "audio/amy.png");
    plate.insertBefore(pol, plate.firstChild);
    const notes = () => {
      const r = pol.getBoundingClientRect();
      ["♪", "♫", "♪"].forEach((n, i) => S.later(() =>
        S.floatText(n, r.right - 20 + Math.random() * 16, r.top + r.height * 0.5, { size: "1.5rem", color: "#B5737A" }), i * 280));
    };
    pol.addEventListener("click", notes);
    S.on("open", () => S.later(notes, 1700));
  }

  const got = plate.querySelector(".ci-got");
  const verdictEl = plate.querySelector(".ci-verdict");
  const future = plate.querySelector(".ci-future");
  plate.querySelector(".sd-btn").addEventListener("click", () => { future.textContent = FUTURE; });

  function fill() {
    const v = verdict();
    S.title = v.hit ? "Called it." : v.got ? "Huh. New strategy?" : "Not even close?";
    got.textContent = v.got ? ord(v.got) : "✗";
    verdictEl.classList.toggle("hit", v.hit);
    verdictEl.textContent = v.hit ? "called it. i know you so well :)" : v.got ? "ok you surprised me. who are you" : "the opener didn't save you today";
  }
  fill();  // for a reload after she's already played

  S.on("win", (attempt) => {
    fill();
    if (attempt === PREDICTED) setTimeout(() => {
      document.querySelectorAll(".stamp").forEach((s) => s.remove());   // replaces FIRST TRY?!
      stamp("CALLED IT");
    }, 300);
  });
  S.on("loss", fill);
  S.on("open", () => { document.getElementById("modal-title").textContent = S.title; });
})();
