/* ═════
   WOLVE DAY · October 23 · "WOLVE"  (AWUUUUUU)

   Needs:  wolve/amy.jpg   (mouth wide open, mid-howl)
   The page turns to night with a full moon. In the note her howl IS the
   moon — tap "howl" and the wolf joins in.
   Test it:  index.html?peek=10-23&fresh=1
   ═════ */
(function () {
  "use strict";
  if (typeof Special === "undefined") return;
  const S = Special;

  S.subtitle("full moon tonight, wu");
  S.title = "AWUUUUU.";
  S.forceNight();
  document.body.classList.add("wolveday");

  // the moon behind the board
  const sky = document.createElement("div");
  sky.className = "wv-sky-moon";
  sky.setAttribute("aria-hidden", "true");
  document.body.appendChild(sky);

  let stars = "";
  for (let i = 0; i < 18; i++) {
    stars += '<i class="wv-star" style="left:' + (Math.random() * 100).toFixed(1) + "%;top:" + (Math.random() * 60).toFixed(1) +
      "%;animation-delay:-" + (Math.random() * 3).toFixed(2) + 's"></i>';
  }

  const plate = S.addToNote("wv",
    '<div class="wv-scene">' + stars +
      '<div class="wv-moon"><img alt="" draggable="false"></div>' +
      '<svg class="wv-hill" viewBox="0 0 230 64" preserveAspectRatio="none" aria-hidden="true">' +
        '<path d="M0 40 Q60 18 120 34 T230 30 V64 H0 Z" fill="#14111C"/>' +
        /* a little wolf sitting on the hill, nose to the moon */
        '<g transform="translate(148 6)"><g class="wv-wolf" fill="#14111C">' +
          '<path d="M10 30 C8 20 12 12 18 9 L19 2 L22 8 L26 3 L26 10 C30 13 31 18 29 22 L36 26 C40 30 40 38 36 40 L8 40 C4 38 6 32 10 30 Z"/>' +
          '<path d="M36 34 C44 32 48 26 46 20 C50 26 48 36 38 40 Z"/>' +
        "</g></g>" +
      "</svg>" +
    "</div>" +
    '<div class="wv-labels"><span class="sd-name">the wu-lf moon</span><span class="sd-line">awuuuuu :)</span></div>' +
    '<div class="sd-actions"><button class="sd-btn main" type="button">howl</button></div>' +
    '<p class="sd-count" role="status"></p>');

  const scene = plate.querySelector(".wv-scene");
  const moon = plate.querySelector(".wv-moon");
  const btn = plate.querySelector(".sd-btn");
  const count = plate.querySelector(".sd-count");
  S.photo(moon.querySelector("img"), "wolve/amy.jpg");

  let howls = 0;
  function howl() {
    howls++;
    plate.classList.add("howling");
    moon.classList.remove("howl");
    void moon.offsetWidth;
    moon.classList.add("howl");
    if (!S.reducedMotion) {
      for (let i = 0; i < 3; i++) {
        setTimeout(() => {
          const r = document.createElement("span");
          r.className = "wv-ring";
          scene.appendChild(r);
          setTimeout(() => r.remove(), 1500);
        }, i * 260);
      }
      const t = document.createElement("span");
      t.className = "wv-awu";
      t.textContent = "AW" + "U".repeat(4 + Math.min(howls, 10));
      scene.appendChild(t);
      setTimeout(() => t.remove(), 1700);
    }
    setTimeout(() => plate.classList.remove("howling"), 900);
    count.textContent = howls === 1 ? "1 howl" : howls + " howls" + (howls >= 8 ? " · the whole pack heard that" : "");
  }
  btn.addEventListener("click", howl);

  S.on("open", () => { plate.classList.remove("go"); setTimeout(() => plate.classList.add("go"), 1300); });
  S.on("close", () => plate.classList.remove("go"));

  // winning: the sky moon pulses and the word echoes
  S.on("win", () => {
    const [x, y] = S.center(sky);
    S.floatText("AWUUUU", x - 30, y + 40, { color: "#FFF4DE", size: "1.8rem" });
  });
})();
