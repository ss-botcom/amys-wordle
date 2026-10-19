/* ═════
   XIANG DAY · October 18 · "XIANG" (想你)

   Needs:  xiang/me.jpg    (you, face centered)
           xiang/amy.jpg   (her, face centered)
   Missing either one → a placeholder face shows instead.

   SEAL is the character on the red stamp. Swap it for her surname
   character if you want (also add it to the font list below).

   If the gold/red split on 想 cuts in a weird spot, change --split
   (bigger % = the line moves down).

   Runs only on the date set in XIANG_DAY. Any other day: does nothing.
   Test it early with:  index.html?peek=10-18&fresh=1
   ═══════════════════════════════════════════════════════════════════
*/
(function () {
  "use strict";

  /* ── change this one line to move the whole thing to another date ── */
  const XIANG_DAY = "10-18";

  /* photos, relative to index.html */
  const DIR = "xiang/";
  const ME = "me.jpg";
  const HER = "amy.jpg";

  /* the character on the red stamp */
  const SEAL = "爱";

  let dk;
  try { dk = dateKey; } catch (e) { return; }
  if (dk !== XIANG_DAY) return;

  const card = document.getElementById("modal-card");
  const sig = card && card.querySelector(".signature");
  const backdropEl = document.getElementById("modal-backdrop");
  const titleEl = document.getElementById("modal-title");
  if (!card || !sig || !backdropEl) return;

  document.body.classList.add("xiangday");

  const sub = document.querySelector("header p");
  if (sub) sub.textContent = "missing you today :)";

  /* brush calligraphy font, only the few characters we use (tiny download) */
  const fl = document.createElement("link");
  fl.rel = "stylesheet";
  fl.href = "https://fonts.googleapis.com/css2?family=Ma+Shan+Zheng&display=swap&text=" +
    encodeURIComponent("想你相心红线" + SEAL);
  document.head.appendChild(fl);

  const softMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const NS = "http://www.w3.org/2000/svg";

  function placeholder(word) {
    return "data:image/svg+xml;utf8," + encodeURIComponent(
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">' +
      '<rect width="100" height="100" fill="#F3E8D2"/>' +
      '<text x="50" y="60" text-anchor="middle" font-family="Georgia, serif" font-style="italic" font-size="28" fill="#6B5142">' + word + "</text>" +
      "</svg>");
  }

  const HEART = "M0 4 C-3 1.5 -6 -0.5 -6 -3 C-6 -5 -4.5 -6.2 -3 -6.2 C-1.7 -6.2 -0.6 -5.4 0 -4.4 " +
    "C0.6 -5.4 1.7 -6.2 3 -6.2 C4.5 -6.2 6 -5 6 -3 C6 -0.5 3 1.5 0 4 Z";

  /* ═════════ 1. the red string ═════════ */

  const plate = document.createElement("div");
  plate.className = "xg";
  plate.innerHTML =
    '<div class="xg-scene">' +
      '<div class="xg-who me"><div class="xg-face"><img alt="" draggable="false"></div><span class="xg-tag">pittsburgh</span></div>' +
      '<div class="xg-who her"><div class="xg-face"><img alt="" draggable="false"></div><span class="xg-tag">ithaca</span></div>' +
      '<svg class="xg-string" viewBox="0 0 260 130" aria-hidden="true">' +
        '<path class="xg-red" fill="none" stroke="#C8473D" stroke-width="2.2" stroke-linecap="round"/>' +
        '<circle class="xg-knot a" r="3.2" cy="79" fill="#C8473D"/>' +
        '<circle class="xg-knot b" r="3.2" cy="79" fill="#C8473D"/>' +
      "</svg>" +
    "</div>" +
    '<div class="xg-labels"><span class="xg-name">红线 · hóng xiàn</span><span class="xg-line">red string. can\'t untie it :)</span></div>' +
    '<div class="xg-actions">' +
      '<button class="xg-btn main" type="button">想你</button>' +
      '<button class="xg-btn tug" type="button">tug</button>' +
    "</div>" +
    '<p class="xg-hint">(send one)</p>' +
    '<p class="xg-count" role="status"></p>';
  card.insertBefore(plate, sig);

  const scene = plate.querySelector(".xg-scene");
  const meEl = plate.querySelector(".xg-who.me");
  const herEl = plate.querySelector(".xg-who.her");
  const meFace = meEl.querySelector(".xg-face");
  const svg = plate.querySelector(".xg-string");
  const str = plate.querySelector(".xg-red");
  const knotA = plate.querySelector(".xg-knot.a");
  const knotB = plate.querySelector(".xg-knot.b");
  const sendBtn = plate.querySelector(".xg-btn.main");
  const tugBtn = plate.querySelector(".xg-btn.tug");
  const hint = plate.querySelector(".xg-hint");
  const countEl = plate.querySelector(".xg-count");

  const meImg = meEl.querySelector("img");
  const herImg = herEl.querySelector("img");
  meImg.onerror = function () { this.onerror = null; this.src = placeholder("me"); };
  herImg.onerror = function () { this.onerror = null; this.src = placeholder("wu"); };
  meImg.src = DIR + ME;
  herImg.src = DIR + HER;

  const REST = 24, TIGHT = 3;
  function setSag(s) {
    const k = Math.max(-0.4, (REST - s) / (REST - TIGHT));
    const dx = 9 * k;
    meEl.style.transform = "translateX(" + dx.toFixed(2) + "px)";
    herEl.style.transform = "translateX(" + (-dx).toFixed(2) + "px)";
    const x1 = 71 + dx, x2 = 189 - dx;
    str.setAttribute("d", "M" + x1.toFixed(2) + " 79 Q130 " + (79 + 2 * s).toFixed(2) + " " + x2.toFixed(2) + " 79");
    knotA.setAttribute("cx", x1.toFixed(2));
    knotB.setAttribute("cx", x2.toFixed(2));
  }
  setSag(REST);

  const MILESTONES = {
    1: "想你 sent: 1",
    5: "想你 sent: 5 · WUUUU",
    10: "想你 sent: 10. miss youu",
    25: "想你 sent: 25. string's not gonna break babyy",
    50: "想你 sent: 50. come back",
    100: "想你 sent: 100. COME HERE"
  };
  const REPLIES = ["想你 too", "me too", "got it :)", "more", "想你想你"];
  const TUGS = ["can't untie it", "*tug*", "still here", "not going anywhere"];

  let sent = 0;
  try { sent = parseInt(localStorage.getItem("amy-xiang") || "0", 10) || 0; } catch (e) {}
  function renderCount() { countEl.textContent = MILESTONES[sent] || "想你 sent: " + sent; }
  if (sent > 0) { renderCount(); hint.classList.add("gone"); }

  function fx(text, el) {
    if (softMotion) return;
    const r = el.getBoundingClientRect();
    const d = document.createElement("div");
    d.className = "xg-fx";
    d.textContent = text;
    d.style.left = (r.left + r.width / 2 + (Math.random() * 26 - 13)) + "px";
    d.style.top = (r.top + 10) + "px";
    document.body.appendChild(d);
    setTimeout(function () { d.remove(); }, 1050);
  }

  const REDS = ["#C8473D", "var(--rose)", "var(--blushpk)", "#FFFFFF", "#C9A25E"];
  function sparkle(x, y) {
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
      p.style.background = REDS[i % REDS.length];
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

  /* ═════════ 2. sending one ═════════ */

  let flying = 0;
  function send() {
    hint.classList.add("gone");
    sent++;
    try { localStorage.setItem("amy-xiang", String(sent)); } catch (e) {}
    renderCount();
    countEl.classList.remove("pop");
    void countEl.offsetWidth;
    countEl.classList.add("pop");

    function arrive() {
      meFace.classList.remove("bump");
      void meFace.offsetWidth;
      meFace.classList.add("bump");
      fx(REPLIES[sent % REPLIES.length], meFace);
      const c = center(meFace);
      sparkle(c[0], c[1]);
    }

    if (softMotion || flying >= 4) { arrive(); return; }
    flying++;

    const h = document.createElementNS(NS, "path");
    h.setAttribute("d", HEART);
    h.setAttribute("fill", "#C8473D");
    svg.appendChild(h);

    const t0 = performance.now(), D = 1300;
    function step(now) {
      const t = Math.min(1, (now - t0) / D);
      const e = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
      const L = str.getTotalLength();
      const p = str.getPointAtLength(L * (1 - e));            /* her → you */
      h.setAttribute("transform", "translate(" + p.x.toFixed(1) + " " + (p.y - 5).toFixed(1) + ") scale(1.25)");
      if (t < 1) requestAnimationFrame(step);
      else { h.remove(); flying--; arrive(); }
    }
    requestAnimationFrame(step);
  }

  /* ═════════ 3. the tug ═════════ */

  let tugRaf = 0, tugging = false, tugN = 0;
  function tug() {
    hint.classList.add("gone");
    if (tugging) return;
    fx(TUGS[tugN++ % TUGS.length], scene);
    if (softMotion) return;
    tugging = true;
    const t0 = performance.now(), D = 1100;
    function step(now) {
      const t = Math.min(1, (now - t0) / D);
      let s;
      if (t < 0.22) {
        const u = t / 0.22;
        s = REST + (TIGHT - REST) * (1 - Math.pow(1 - u, 2));
      } else {
        const u = (t - 0.22) / 0.78;
        s = REST + (TIGHT - REST) * Math.exp(-5 * u) * Math.cos(9 * u);
      }
      setSag(s);
      if (t < 1) tugRaf = requestAnimationFrame(step);
      else { setSag(REST); tugging = false; }
    }
    tugRaf = requestAnimationFrame(step);
  }

  sendBtn.addEventListener("click", send);
  tugBtn.addEventListener("click", tug);

  /* ═════════ 4. the intro: 想你 in ink ═════════ */

  function teardown() {
    clearTimers();
    if (stage) { stage.remove(); stage = null; }
  }

  function inkDrops(el) {
    const r = el.getBoundingClientRect();
    for (let i = 0; i < 7; i++) {
      const d = document.createElement("div");
      d.className = "xg-drop";
      const s = 3 + Math.random() * 7;
      d.style.width = s + "px";
      d.style.height = s + "px";
      d.style.left = (r.left - 10 + Math.random() * (r.width + 20)) + "px";
      d.style.top = (r.top - 10 + Math.random() * (r.height + 20)) + "px";
      d.style.animationDelay = (Math.random() * 0.4) + "s";
      document.body.appendChild(d);
      setTimeout(function () { d.remove(); }, 1400);
    }
  }

  function drawString() {
    const L = str.getTotalLength();
    str.style.transition = "none";
    str.style.strokeDasharray = L + " " + L;
    str.style.strokeDashoffset = String(L);
    void str.getBoundingClientRect();
    str.style.transition = "stroke-dashoffset 1.1s ease";
    str.style.strokeDashoffset = "0";
    later(function () {
      str.style.transition = "";
      str.style.strokeDasharray = "";
      str.style.strokeDashoffset = "";
    }, 1200);
  }

  function reveal() {
    teardown();
    plate.classList.add("go");
    if (!softMotion) drawString();
    later(function () {
      if (!backdropEl.classList.contains("show")) return;
      const cardRect = card.getBoundingClientRect();
      const plateRect = plate.getBoundingClientRect();
      if (plateRect.bottom > cardRect.bottom - 10) {
        card.scrollTo({ top: Math.max(0, plate.offsetTop - 20), behavior: "smooth" });
      }
      if (typeof petalBurst === "function") petalBurst();
    }, 620);
  }

  function runIntro() {
    teardown();
    if (softMotion) { reveal(); return; }

    stage = document.createElement("div");
    stage.className = "xg-stage";
    stage.innerHTML =
      '<div class="xg-chars">' +
        '<div class="xg-shift"><span class="xg-ch xg-x">想<span class="xg-top">想</span><span class="xg-bot">想</span></span></div>' +
        '<span class="xg-ch xg-n">你</span>' +
        '<div class="xg-seal">' + SEAL + "</div>" +
      "</div>" +
      '<div class="xg-parts"><span class="p1">相</span><span class="plus">+</span><span class="p2">心</span></div>' +
      '<p class="xg-say"></p>' +
      '<p class="xg-skip">tap to skip</p>';
    document.body.appendChild(stage);

    const chars = stage.querySelector(".xg-chars");
    const x = stage.querySelector(".xg-x");
    const n = stage.querySelector(".xg-n");
    const top = stage.querySelector(".xg-top");
    const bot = stage.querySelector(".xg-bot");
    const seal = stage.querySelector(".xg-seal");
    const p1 = stage.querySelector(".p1");
    const plus = stage.querySelector(".plus");
    const p2 = stage.querySelector(".p2");
    const cap = stage.querySelector(".xg-say");
    function say(text) {
      cap.classList.remove("show");
      later(function () { cap.textContent = text; cap.classList.add("show"); }, 220);
    }

    later(function () { x.classList.add("in"); inkDrops(x); }, 300);
    later(function () { say("xiǎng."); }, 1000);
    later(function () { say("it means think. or miss. same thing tbh"); }, 2300);
    later(function () {
      top.classList.add("on");
      p1.classList.add("in");
      say("top half: 相. each other.");
    }, 4000);
    later(function () {
      top.classList.remove("on");
      bot.classList.add("on");
      plus.classList.add("in");
      p2.classList.add("in");
      say("bottom half: 心. heart.");
    }, 5600);
    later(function () {
      [p1, plus, p2].forEach(function (s) { s.classList.remove("in"); });
      chars.classList.add("both");
      n.classList.add("in");
      inkDrops(n);
      say("想你.");
    }, 7300);
    later(function () {
      seal.classList.add("stamp");
      later(function () {
        chars.classList.add("thud");
        const c = center(seal);
        sparkle(c[0], c[1]);
      }, 340);
      say("i miss you, wu.");
    }, 8700);
    later(function () { if (stage) stage.classList.add("clearing"); }, 10300);
    later(reveal, 10750);

    stage.addEventListener("click", reveal);
  }

  /* ═════════ 5. fire it when the note opens ═════════ */

  new MutationObserver(function () {
    if (backdropEl.classList.contains("show")) {
      if (titleEl) titleEl.textContent = "想你.";
      cancelAnimationFrame(tugRaf);
      tugging = false;
      setSag(REST);
      runIntro();
    } else {
      teardown();
      cancelAnimationFrame(tugRaf);
      tugging = false;
      setSag(REST);
      plate.classList.remove("go");              /* so it replays next time she opens the note */
    }
  }).observe(backdropEl, { attributes: true, attributeFilter: ["class"] });
})();
