/* ═════
   ZAOAN DAY · November 2 · "ZAOAN"  (早安 — good morning)

   Needs:  zaoan/amy.png   (just woke up, eyes still closed)
   The page starts dim and every guess lets a little more morning in.
   In the note: she won't wake up. Keep trying — the sun comes up
   a bit more every time.
   Test it:  index.html?peek=11-02&fresh=1
   ═════ */
(function () {
  "use strict";
  if (typeof Special === "undefined") return;
  const S = Special;

  S.subtitle("hi baby :)");
  S.title = "早安.";
  setTimeOfDay("morning");                         // whenever she plays it, it's morning

  // brush font, only the two characters we need (same one as wanan)
  const fl = document.createElement("link");
  fl.rel = "stylesheet";
  fl.href = "https://fonts.googleapis.com/css2?family=Ma+Shan+Zheng&display=swap&text=" + encodeURIComponent("早安");
  document.head.appendChild(fl);

  /* the blinds: dark at first, every guess opens them a little */
  const shade = document.createElement("div");
  shade.className = "za-shade";
  document.body.appendChild(shade);
  function shadeTo(row) { shade.style.opacity = Math.max(0.34 - row * 0.065, 0).toFixed(2); }
  shadeTo(currentRow);
  S.on("guess", (row) => shadeTo(row + 1));
  S.on("win", () => {
    shadeTo(99);
    const [x, y] = S.center(boardEl);
    S.later(() => S.floatText("早安!", x, y - 40, { size: "2.2rem" }), 600);
  });
  S.on("loss", () => shadeTo(99));
  if (gameOver) shadeTo(99);

  /* ═════ the note: wake her up ═════ */
  const REPLIES = ["mmh", "5 more minutes", "nooo", "it's so early", "you wake up", "zzz", "ok… ok i'm up"];
  const WAKE = REPLIES.length;

  const plate = S.addToNote("za",
    '<div class="za-scene">' +
      '<div class="za-sun"></div>' +
      '<div class="sd-photo za-photo"><img alt="" draggable="false"></div>' +
    "</div>" +
    '<div class="za-labels"><span class="sd-name"><span class="za-han">早安</span> · zǎo ān</span><span class="sd-line">she\'s not up yet</span></div>' +
    '<div class="sd-actions"><button class="sd-btn main" type="button">wake her up</button></div>' +
    '<p class="sd-count" role="status"></p>');

  const photo = plate.querySelector(".za-photo");
  const line = plate.querySelector(".sd-line");
  const btn = plate.querySelector(".sd-btn");
  const count = plate.querySelector(".sd-count");
  S.photo(photo.querySelector("img"), "zaoan/amy.png");

  let tries = 0;
  function sunTo(n) { plate.style.setProperty("--rise", (n / WAKE).toFixed(3)); }
  sunTo(0);

  btn.addEventListener("click", () => {
    if (tries >= WAKE) return;
    const [x, y] = S.center(photo);
    S.floatText(REPLIES[tries], x + (Math.random() * 60 - 30), y - 70, { size: "1.4rem" });
    tries++;
    sunTo(tries);
    photo.classList.remove("nudge");
    void photo.offsetWidth;
    photo.classList.add("nudge");

    if (tries === WAKE) {
      plate.classList.add("up");
      line.textContent = "good morning baby :)";
      btn.textContent = "she's up :)";
      btn.disabled = true;
      S.later(() => S.burst({ x, y: y - 40, count: 20, colors: ["#F2C96B", "#F6DFA0", "#E8B7BC", "#FFF4E6"] }), 250);
    } else {
      line.textContent = tries < 3 ? "she's not up yet" : "she's still not up";
    }
  });
})();
