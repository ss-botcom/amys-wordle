/* ═════
   WANAN DAY · October 25 · "WANAN"  (晚安 — goodnight)

   Needs:  wanan/amy.jpg   (cozy in bed, feet up)
   Every guess dims the lights a little; winning turns them off and the
   stars come out. In the note: lights off, then tuck her in.
   Test it:  index.html?peek=10-25&fresh=1
   ═════ */
(function () {
  "use strict";
  if (typeof Special === "undefined") return;
  const S = Special;

  S.subtitle("晚安 soon :)");
  S.title = "晚安.";

  // brush font, only the two characters we need
  const fl = document.createElement("link");
  fl.rel = "stylesheet";
  fl.href = "https://fonts.googleapis.com/css2?family=Ma+Shan+Zheng&display=swap&text=" + encodeURIComponent("晚安");
  document.head.appendChild(fl);

  const dim = document.createElement("div");
  dim.className = "wn-dim";
  document.body.appendChild(dim);
  function dimTo(row) { dim.style.opacity = Math.min(row * 0.07, 0.35).toFixed(2); }
  dimTo(currentRow);
  S.on("guess", (row) => dimTo(row + 1));
  S.on("win", () => { dim.style.opacity = "0"; S.forceNight(); });
  S.on("loss", () => { dim.style.opacity = "0"; S.forceNight(); });
  if (gameOver) { dim.style.opacity = "0"; S.forceNight(); }

  let stars = "";
  for (let i = 0; i < 14; i++) {
    stars += '<i style="left:' + (Math.random() * 100).toFixed(1) + "%;top:" + (Math.random() * 45).toFixed(1) +
      "%;animation-delay:-" + (Math.random() * 3).toFixed(2) + 's"></i>';
  }

  const plate = S.addToNote("wn",
    '<div class="wn-window">' +
      '<img alt="" draggable="false">' +
      '<div class="wn-night">' + stars + "</div>" +
      '<div class="wn-moon"></div>' +
      '<div class="wn-quilt"></div>' +
    "</div>" +
    '<div class="wn-labels"><span class="sd-name"><span class="wn-han">晚安</span> · wǎn ān</span><span class="sd-line">goodnight baby</span></div>' +
    '<div class="sd-actions">' +
      '<button class="sd-btn main" type="button">lights off</button>' +
      '<button class="sd-btn tuck" type="button" disabled>tuck in</button>' +
    "</div>" +
    '<p class="sd-count" role="status"></p>');

  const win = plate.querySelector(".wn-window");
  const lightsBtn = plate.querySelector(".sd-btn.main");
  const tuckBtn = plate.querySelector(".sd-btn.tuck");
  const count = plate.querySelector(".sd-count");
  S.photo(win.querySelector("img"), "wanan/amy.jpg");

  function zzz() {
    if (S.reducedMotion) return;
    ["z", "z", "Z"].forEach((z, i) => {
      setTimeout(() => {
        const s = document.createElement("span");
        s.className = "wn-zzz";
        s.textContent = z;
        s.style.left = 120 + i * 14 + "px";
        s.style.top = 70 + "px";
        s.style.fontSize = 1.1 + i * 0.35 + "rem";
        win.appendChild(s);
        setTimeout(() => s.remove(), 2100);
      }, i * 450);
    });
  }

  lightsBtn.addEventListener("click", () => {
    const off = !plate.classList.contains("off");
    plate.classList.toggle("off", off);
    lightsBtn.textContent = off ? "lights on" : "lights off";
    tuckBtn.disabled = !off;
    count.textContent = off ? "shh. she's falling asleep." : "";
  });
  tuckBtn.addEventListener("click", () => {
    plate.classList.add("tucked");
    tuckBtn.disabled = true;
    tuckBtn.textContent = "tucked :)";
    count.textContent = "tucked in. sweet dreams, wu.";
    zzz();
    setInterval(zzz, 2600);
  });
})();
