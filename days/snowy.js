/* ═════
   SNOWY DAY · November 29 · "SNOWY"  (is it snowing in ithaca...)

   Needs:  snowy/amy.png   (facetime, her hand waving)
   Snow falls on the page all day once she's solved it.
   In the note: a frosted-over window — rub it to see her.
   Test it:  index.html?peek=11-29&fresh=1
   ═════ */
(function () {
  "use strict";
  if (typeof Special === "undefined") return;
  const S = Special;

  S.subtitle("hi wu :)");
  S.title = "Brrr";

  const snow = () => S.ambient.set("snow", 34);
  S.on("win", snow);
  S.on("loss", snow);
  if (gameOver) snow();

  const plate = S.addToNote("sn",
    '<div class="sn-window">' +
      '<img alt="" draggable="false">' +
      '<canvas class="sn-frost"></canvas>' +
      '<span class="sn-bar v"></span><span class="sn-bar h"></span>' +
    "</div>" +
    '<p class="sd-hint">(rub the window)</p>');

  const win = plate.querySelector(".sn-window");
  const cv = plate.querySelector(".sn-frost");
  const hint = plate.querySelector(".sd-hint");
  S.photo(win.querySelector("img"), "snowy/amy.png");

  /* frost: a white canvas you wipe away with your finger */
  const W = 220, H = 240, DPR = Math.min(window.devicePixelRatio || 1, 2);
  cv.width = W * DPR;
  cv.height = H * DPR;
  const ctx = cv.getContext("2d");
  ctx.scale(DPR, DPR);
  function frost() {
    ctx.globalCompositeOperation = "source-over";
    const g = ctx.createLinearGradient(0, 0, 0, H);
    g.addColorStop(0, "rgba(240, 246, 250, 0.96)");
    g.addColorStop(1, "rgba(225, 236, 244, 0.96)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, W, H);
    for (let i = 0; i < 90; i++) {                  // little ice crystals
      ctx.fillStyle = "rgba(255, 255, 255, " + (0.4 + Math.random() * 0.5) + ")";
      ctx.beginPath();
      ctx.arc(Math.random() * W, Math.random() * H, 0.6 + Math.random() * 1.8, 0, 6.283);
      ctx.fill();
    }
  }
  frost();

  let rubbing = false;
  function wipe(e) {
    const r = cv.getBoundingClientRect();
    const x = (e.clientX - r.left) * (W / r.width);
    const y = (e.clientY - r.top) * (H / r.height);
    ctx.globalCompositeOperation = "destination-out";
    const g = ctx.createRadialGradient(x, y, 4, x, y, 26);
    g.addColorStop(0, "rgba(0,0,0,1)");
    g.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(x, y, 26, 0, 6.283);
    ctx.fill();
  }
  cv.addEventListener("pointerdown", (e) => { rubbing = true; hint.classList.add("gone"); cv.setPointerCapture(e.pointerId); wipe(e); });
  cv.addEventListener("pointermove", (e) => { if (rubbing) wipe(e); });
  ["pointerup", "pointercancel"].forEach((ev) => cv.addEventListener(ev, () => { rubbing = false; }));

  /* it frosts back over each time the note opens */
  S.on("open", frost);
})();
