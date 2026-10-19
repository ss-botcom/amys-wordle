/* ═════
   FLOSS DAY · October 19 · "FLOSS"

   Needs:  floss/amy.jpg   (her smiling, teeth showing)
   Missing → a placeholder face shows instead.

   SMILE_X / SMILE_Y = where her smile is in the photo, as % from the
   left / top. The brush, bubbles, floss, and sparkle all aim there.

   Runs only on the date set in FLOSS_DAY. Any other day: does nothing.
   Test it early with:  index.html?peek=10-19&fresh=1
   ═══════════════════════════════════════════════════════════════════
*/
(function () {
  "use strict";

  /* ── change this one line to move the whole thing to another date ── */
  const FLOSS_DAY = "10-19";

  /* photo, relative to index.html */
  const DIR = "floss/";
  const FACE = "amy.jpg";

  /* where her smile is in the photo (% from left, % from top) */
  const SMILE_X = 40;
  const SMILE_Y = 74;

  let dk;
  try { dk = dateKey; } catch (e) { return; }
  if (dk !== FLOSS_DAY) return;

  const card = document.getElementById("modal-card");
  const sig = card && card.querySelector(".signature");
  const backdropEl = document.getElementById("modal-backdrop");
  const titleEl = document.getElementById("modal-title");
  if (!card || !sig || !backdropEl) return;

  document.body.classList.add("flossday");

  const sub = document.querySelector("header p");
  if (sub) sub.textContent = "bedtime check :)";

  const softMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const PLACEHOLDER =
    "data:image/svg+xml;utf8," + encodeURIComponent(
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">' +
      '<rect width="100" height="100" fill="#F3E8D2"/>' +
      '<path d="M32 42 Q38 36 44 42" stroke="#6B5142" stroke-width="3.5" fill="none" stroke-linecap="round"/>' +
      '<path d="M56 42 Q62 36 68 42" stroke="#6B5142" stroke-width="3.5" fill="none" stroke-linecap="round"/>' +
      '<path d="M34 60 Q50 78 66 60 Z" fill="#FFFFFF" stroke="#6B5142" stroke-width="3" stroke-linejoin="round"/>' +
      "</svg>");

  function BRUSH(paste) {
    let bristles = "";
    for (let x = 72; x <= 93; x += 3) {
      bristles += '<rect x="' + x + '" y="1" width="2" height="7.5" rx="1" fill="#EAF4FB" stroke="#BFD7E8" stroke-width="0.5"/>';
    }
    const PASTE_D = "M94 -0.5 q-2.75 -3.2 -5.5 0 t-5.5 0 t-5.5 0 t-5.5 0";
    return '<svg viewBox="0 -8 100 32" aria-hidden="true" style="display:block;width:100%;overflow:visible">' +
      '<rect x="0" y="9" width="66" height="7" rx="3.5" fill="#D9A0A5"/>' +
      '<rect x="6" y="11" width="40" height="2" rx="1" fill="#FFFFFF" opacity="0.45"/>' +
      '<path d="M64 10 L72 9 L72 16 L64 15 Z" fill="#D9A0A5"/>' +
      '<rect x="70" y="8" width="27" height="8" rx="3" fill="#FFFFFF" stroke="#E4DCD1" stroke-width="1"/>' +
      bristles +
      (paste
        ? '<path class="fl-paste" pathLength="1" d="' + PASTE_D + '" stroke="#A8D5C2" stroke-width="4.2" stroke-linecap="round" fill="none"/>' +
          '<path class="fl-paste" pathLength="1" d="' + PASTE_D + '" stroke="#FFFFFF" stroke-width="1.4" stroke-linecap="round" fill="none" opacity="0.8"/>'
        : "") +
    "</svg>";
  }

  const TUBE =
    '<svg viewBox="0 0 80 30" aria-hidden="true">' +
      '<rect x="0" y="11" width="9" height="8" rx="2" fill="#A8BBA0"/>' +
      '<path d="M9 7 L70 4 L70 26 L9 23 Z" fill="#FFFFFF" stroke="#E4DCD1" stroke-width="1.2" stroke-linejoin="round"/>' +
      '<path d="M70 4 L78 3 L78 27 L70 26 Z" fill="#F1EAE0" stroke="#E4DCD1" stroke-width="1.2"/>' +
      '<path d="M72 4 L72 26 M75 3.5 L75 26.5" stroke="#E4DCD1" stroke-width="0.8"/>' +
      '<rect x="28" y="9" width="24" height="12" rx="2" fill="#A8D5C2"/>' +
      '<rect x="31" y="13" width="18" height="4" rx="1" fill="#FFFFFF" opacity="0.8"/>' +
    "</svg>";

  const TOOTH =
    '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" stroke="#BFD7E8" stroke-width="1.2" ' +
    'd="M7 3c-2.5 0-4 2-4 4.5 0 2 .8 3.4 1.5 5 .7 1.6.8 3.5 1.3 5.5.4 1.6 1 3 2 3s1.4-1.5 1.7-3c.3-1.4.6-2.5 1.5-2.5s1.2 1.1 1.5 2.5c.3 1.5.7 3 1.7 3s1.6-1.4 2-3c.5-2 .6-3.9 1.3-5.5.7-1.6 1.5-3 1.5-5C21 5 19.5 3 17 3c-2 0-3 1-5 1S9 3 7 3z"/></svg>';

  const STAR =
    '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 0 C13 8 16 11 24 12 C16 13 13 16 12 24 C11 16 8 13 0 12 C8 11 11 8 12 0 Z" fill="#FFFFFF" stroke="#BFD7E8" stroke-width="0.6"/></svg>';

  /* ═════════ 1. the mirror ═════════ */

  let pips = "";
  for (let i = 0; i < 5; i++) pips += '<span class="fl-pip">' + TOOTH + "</span>";

  const plate = document.createElement("div");
  plate.className = "fl";
  plate.innerHTML =
    '<div class="fl-mirror">' +
      '<div class="fl-frame"><img alt="someone who did not floss" draggable="false"><div class="fl-shine"></div><div class="fl-floss"></div></div>' +
      '<div class="fl-brush">' + BRUSH(true) + "</div>" +
      '<div class="fl-glint">' + STAR + "</div>" +
    "</div>" +
    '<div class="fl-meter">' + pips + "</div>" +
    '<div class="fl-labels"><span class="fl-name"></span><span class="fl-line"></span></div>' +
    '<div class="fl-actions">' +
      '<button class="fl-btn main" type="button">brush</button>' +
      '<button class="fl-btn flossb" type="button">floss</button>' +
    "</div>" +
    '<p class="fl-hint">(she needs help)</p>' +
    '<p class="fl-count" role="status"></p>';
  card.insertBefore(plate, sig);

  const frame = plate.querySelector(".fl-frame");
  const img = frame.querySelector("img");
  const flossEl = plate.querySelector(".fl-floss");
  const brushEl = plate.querySelector(".fl-brush");
  const glint = plate.querySelector(".fl-glint");
  const pipEls = plate.querySelectorAll(".fl-pip");
  const nameEl = plate.querySelector(".fl-name");
  const lineEl = plate.querySelector(".fl-line");
  const brushBtn = plate.querySelector(".fl-btn.main");
  const flossBtn = plate.querySelector(".fl-btn.flossb");
  const hint = plate.querySelector(".fl-hint");
  const countEl = plate.querySelector(".fl-count");

  img.onerror = function () { this.onerror = null; this.src = PLACEHOLDER; };
  img.src = DIR + FACE;

  /* aim everything at her smile */
  brushEl.style.top = "calc(" + SMILE_Y + "% - 12px)";
  flossEl.style.top = SMILE_Y + "%";
  glint.style.left = Math.min(SMILE_X + 14, 90) + "%";
  glint.style.top = Math.max(SMILE_Y - 6, 8) + "%";

  const SCRUB_FX = ["scrub", "scrub scrub", "*minty*", "brrr"];
  const SCRUB_LINES = ["scrub scrub", "the back ones too", "don't forget the top", "almost"];
  const EXCUSES = ["tomorrow", "i flossed last week", "the floss is all the way over there", "you're not my dentist"];

  const MILESTONES = {
    1: "teeth brushed: 1",
    5: "teeth brushed: 5 · your dentist would cry",
    10: "teeth brushed: 10. ok they're clean wu",
    25: "teeth brushed: 25. there's no teeth left",
    50: "teeth brushed: 50. go to bed",
    100: "teeth brushed: 100. i was kidding about the brushing"
  };

  let brushedCount = 0;
  try { brushedCount = parseInt(localStorage.getItem("amy-brushed") || "0", 10) || 0; } catch (e) {}
  function renderCount() { countEl.textContent = MILESTONES[brushedCount] || "teeth brushed: " + brushedCount; }
  if (brushedCount > 0) { renderCount(); hint.classList.add("gone"); }

  function fx(text, el) {
    if (softMotion) return;
    const r = el.getBoundingClientRect();
    const d = document.createElement("div");
    d.className = "fl-fx";
    d.textContent = text;
    d.style.left = (r.left + r.width / 2 + (Math.random() * 26 - 13)) + "px";
    d.style.top = (r.top + 16) + "px";
    document.body.appendChild(d);
    setTimeout(function () { d.remove(); }, 1050);
  }

  const MINT = ["#FFFFFF", "#A8D5C2", "#8FBCD4", "#EAF4FB", "var(--blushpk)"];
  function sparkle(x, y, colors) {
    if (softMotion) return;
    for (let i = 0; i < 14; i++) {
      const p = document.createElement("div");
      p.className = "burst";                     /* reuses the petal-burst CSS */
      p.style.zIndex = "65";                     /* above the intro screen */
      const s = 6 + Math.random() * 8;
      p.style.width = s + "px";
      p.style.height = s * 0.75 + "px";
      p.style.left = x + "px";
      p.style.top = y + "px";
      p.style.background = colors[i % colors.length];
      const a = Math.random() * Math.PI * 2;
      const d = 30 + Math.random() * 60;
      p.style.setProperty("--tx", Math.cos(a) * d + "px");
      p.style.setProperty("--ty", (Math.sin(a) * d - 30) + "px");
      p.style.setProperty("--rot", (Math.random() * 400 - 200) + "deg");
      document.body.appendChild(p);
      setTimeout(function () { p.remove(); }, 1300);
    }
  }
  function center(el) {
    const r = el.getBoundingClientRect();
    return [r.left + r.width / 2, r.top + r.height / 2];
  }

  let stage = null, timers = [];
  function clearTimers() { timers.forEach(clearTimeout); timers = []; }
  function later(fn, ms) { timers.push(setTimeout(fn, ms)); }

  /* ═════════ 2. brushing + flossing ═════════ */

  let scrub = 0, brushed = false, flossed = false, tries = 0, busy = false, celebrated = false;

  function setPips() { pipEls.forEach(function (p, i) { p.classList.toggle("on", i < scrub); }); }

  function paint() {
    let n, l;
    if (brushed && flossed)          { n = "brushed AND flossed."; l = "proud of you :)"; }
    else if (brushed)                { n = "brushed.";             l = "now floss :)"; }
    else if (flossed && scrub === 0) { n = "flossed.";             l = "...but not brushed??"; }
    else if (scrub > 0)              { n = "brushing…";            l = SCRUB_LINES[Math.min(scrub, 4) - 1]; }
    else                             { n = "not brushed.";         l = "it's bedtime wu"; }
    nameEl.textContent = n;
    lineEl.textContent = l;
  }

  function addBubble() {
    const b = document.createElement("span");
    b.className = "fl-bub";
    const s = 8 + Math.random() * 12;
    b.style.width = s + "px";
    b.style.height = s + "px";
    b.style.left = (SMILE_X + (Math.random() * 56 - 28)) + "%";
    b.style.top = (SMILE_Y + (Math.random() * 22 - 10)) + "%";
    frame.appendChild(b);
  }
  function popBubbles(animate) {
    frame.querySelectorAll(".fl-bub").forEach(function (b) {
      if (animate && !softMotion) {
        b.classList.add("pop");
        setTimeout(function () { b.remove(); }, 380);
      } else {
        b.remove();
      }
    });
  }

  function celebrate() {
    if (celebrated) return;
    celebrated = true;
    if (typeof petalBurst === "function") petalBurst();
  }

  function clean() {
    brushed = true;
    popBubbles(true);
    glint.classList.remove("go");
    void glint.offsetWidth;
    glint.classList.add("go");
    const c = center(glint);
    sparkle(c[0], c[1], MINT);
    fx("*ding*", glint);

    brushedCount++;
    try { localStorage.setItem("amy-brushed", String(brushedCount)); } catch (e) {}
    renderCount();
    countEl.classList.remove("pop");
    void countEl.offsetWidth;
    countEl.classList.add("pop");

    paint();
    if (flossed) celebrate();
  }

  function brush() {
    if (busy) return;
    hint.classList.add("gone");
    if (brushed) {                                /* round 2 */
      brushed = false;
      scrub = 0;
      celebrated = false;
      setPips();
      fx("round 2?", frame);
    }
    busy = true;

    if (!softMotion) {
      brushEl.classList.remove("scrub");
      void brushEl.offsetWidth;
      brushEl.classList.add("scrub");
      for (let i = 0; i < 3; i++) later(addBubble, 200 + i * 220);
    } else {
      addBubble();
      addBubble();
    }

    later(function () {
      scrub++;
      setPips();
      if (scrub >= 5) clean();
      else { fx(SCRUB_FX[(scrub - 1) % SCRUB_FX.length], frame); paint(); }
      busy = false;
    }, softMotion ? 120 : 900);
  }

  function floss() {
    if (busy) return;
    hint.classList.add("gone");
    if (flossed) { fx("already flossed :)", flossBtn); return; }

    if (tries < EXCUSES.length) {                 /* she dodges */
      fx(EXCUSES[tries++], frame);
      frame.classList.remove("dodge");
      void frame.offsetWidth;
      frame.classList.add("dodge");
      lineEl.textContent = tries === EXCUSES.length ? "one more try" : "she's avoiding it";
      return;
    }

    busy = true;
    fx("fine.", frame);
    if (!softMotion) {
      flossEl.classList.remove("go");
      void flossEl.offsetWidth;
      flossEl.classList.add("go");
    }
    later(function () {
      flossed = true;
      busy = false;
      fx("flossed!", frame);
      const c = center(frame);
      sparkle(c[0], c[1], MINT);
      paint();
      if (brushed) celebrate();
    }, softMotion ? 120 : 1250);
  }

  brushBtn.addEventListener("click", brush);
  flossBtn.addEventListener("click", floss);

  function reset() {
    scrub = 0; brushed = false; flossed = false; tries = 0; busy = false; celebrated = false;
    popBubbles(false);
    brushEl.classList.remove("scrub");
    flossEl.classList.remove("go");
    glint.classList.remove("go");
    frame.classList.remove("dodge");
    setPips();
    paint();
  }
  reset();

  /* ═════════ 3. the intro: bedtime check ═════════ */

  function teardown() {
    clearTimers();
    if (stage) { stage.remove(); stage = null; }
  }

  function reveal() {
    teardown();
    plate.classList.add("go");
    later(function () {
      if (!backdropEl.classList.contains("show")) return;
      const cardRect = card.getBoundingClientRect();
      const plateRect = plate.getBoundingClientRect();
      if (plateRect.bottom > cardRect.bottom - 10) {
        card.scrollTo({ top: Math.max(0, plate.offsetTop - 20), behavior: "smooth" });
      }
    }, 620);
  }

  function runIntro() {
    teardown();
    if (softMotion) { reveal(); return; }

    stage = document.createElement("div");
    stage.className = "fl-stage";
    stage.innerHTML =
      '<div class="fl-sink">' +
        '<div class="fl-bigbrush">' + BRUSH(true) + "</div>" +
        '<div class="fl-tube">' + TUBE + "</div>" +
      "</div>" +
      '<p class="fl-say"></p>' +
      '<p class="fl-skip">tap to skip</p>';
    document.body.appendChild(stage);

    const big = stage.querySelector(".fl-bigbrush");
    const tube = stage.querySelector(".fl-tube");
    const pastes = stage.querySelectorAll(".fl-paste");
    const cap = stage.querySelector(".fl-say");
    function say(text) {
      cap.classList.remove("show");
      later(function () { cap.textContent = text; cap.classList.add("show"); }, 220);
    }

    later(function () { big.classList.add("in"); say("it's bedtime."); }, 300);
    later(function () { tube.classList.add("in"); say("did you brush?"); }, 1500);
    later(function () {
      tube.classList.add("squeeze");
      pastes.forEach(function (p) { p.classList.add("in"); });
    }, 2200);
    later(function () { tube.classList.remove("in"); }, 3300);
    later(function () { say("did you floss?"); }, 3500);
    later(function () { say("…wu."); }, 4900);
    later(function () {
      big.classList.add("wiggle");
      say("didn't think so :)");
      const c = center(big);
      sparkle(c[0] + 60, c[1] - 10, MINT);
    }, 6000);
    later(function () { if (stage) stage.classList.add("clearing"); }, 7400);
    later(reveal, 7850);

    stage.addEventListener("click", reveal);
  }

  /* ═════════ 4. fire it when the note opens ═════════ */

  new MutationObserver(function () {
    if (backdropEl.classList.contains("show")) {
      if (titleEl) titleEl.textContent = "Brushed?";
      reset();
      runIntro();
    } else {
      teardown();
      busy = false;
      plate.classList.remove("go");              /* so it replays next time she opens the note */
    }
  }).observe(backdropEl, { attributes: true, attributeFilter: ["class"] });
})();
