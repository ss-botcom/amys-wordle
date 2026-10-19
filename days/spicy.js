/* ═════
   SPICY DAY · October 5 · "SPICY"

   Needs:  toast/amy-5.png   (the scrunched-nose photo)

   Runs only on the date set in SPICY_DAY. Any other day: does nothing.
   Test it early with:  index.html?peek=10-05&fresh=1
   ═══════════════════════════════════════════════════════════════════
*/
(function () {
  "use strict";

  /* ── change this one line to move the whole thing to another date ── */
  const SPICY_DAY = "10-05";

  /* photo, relative to index.html */
  const DIR = "toast/";
  const FACE = "amy-5.png";

  let dk;
  try { dk = dateKey; } catch (e) { return; }
  if (dk !== SPICY_DAY) return;

  const card = document.getElementById("modal-card");
  const sig = card && card.querySelector(".signature");
  const backdropEl = document.getElementById("modal-backdrop");
  const titleEl = document.getElementById("modal-title");
  if (!card || !sig || !backdropEl) return;

  document.body.classList.add("spicyday");

  const sub = document.querySelector("header p");
  if (sub) sub.textContent = "handle with care :)";

  const softMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const PLACEHOLDER =
    "data:image/svg+xml;utf8," + encodeURIComponent(
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">' +
      '<rect width="100" height="100" fill="#F3E8D2"/>' +
      '<path d="M30 44 L42 40 M70 44 L58 40" stroke="#6B5142" stroke-width="3.5" stroke-linecap="round"/>' +
      '<path d="M36 64 Q50 72 64 64" stroke="#6B5142" stroke-width="3.5" fill="none" stroke-linecap="round"/>' +
      "</svg>");

  let SRC = DIR + FACE;
  const probe = new Image();
  probe.onerror = function () {
    SRC = PLACEHOLDER;
    document.querySelectorAll(".sp-frame img, .sp-bigface img").forEach(function (im) { im.src = SRC; });
  };
  probe.src = SRC;

  function CHILI(fill) {
    return '<svg viewBox="0 0 40 40" aria-hidden="true">' +
      '<path d="M10 12 C6 20 10 32 22 36 C27 37.5 31 36 33 34 C26 33 19 28 16 20 C15 16 14 13 10 12 Z" fill="' + fill + '"/>' +
      '<path d="M12.5 17 C12.5 23 15.5 28 20 31" stroke="#FFFFFF" stroke-opacity="0.45" stroke-width="1.6" stroke-linecap="round" fill="none"/>' +
      '<path d="M7 12 C9 9 13 10 14 13 C11 14 8 14 7 12 Z" fill="#8AA07F"/>' +
      '<path d="M10.5 11 C9.5 7.5 11.5 5 15 4" stroke="#7E9C6E" stroke-width="2.2" stroke-linecap="round" fill="none"/>' +
    "</svg>";
  }

  const CUP =
    '<svg viewBox="0 0 60 80" aria-hidden="true">' +
      '<path d="M22 6 C20 2 24 1 23 -2 M30 6 C28 2 32 1 31 -2 M38 6 C36 2 40 1 39 -2" stroke="#C7BCB1" stroke-width="1.6" stroke-linecap="round" fill="none"/>' +
      '<path d="M10 16 L50 16 L45 76 Q44 78 42 78 L18 78 Q16 78 15 76 Z" fill="#FFFFFF" stroke="#E4DCD1" stroke-width="1.5"/>' +
      '<path d="M8 15 L52 15 L50 9 L10 9 Z" fill="#FDFBF7" stroke="#E4DCD1" stroke-width="1.5" stroke-linejoin="round"/>' +
      '<path d="M12.5 34 L47.5 34 L45.6 56 L14.4 56 Z" fill="#E08A3C"/>' +
      '<path d="M30 50 C27 47.5 24 45.5 24 43 C24 41.3 25.4 40.2 27 40.4 C28.3 40.6 29.4 41.5 30 42.5 C30.6 41.5 31.7 40.6 33 40.4 C34.6 40.2 36 41.3 36 43 C36 45.5 33 47.5 30 50 Z" fill="#FDFBF7"/>' +
    "</svg>";

  /* ═════════ 1. her face ═════════ */

  let pips = "";
  for (let i = 0; i < 5; i++) pips += '<span class="sp-pip">' + CHILI("currentColor") + "</span>";

  const plate = document.createElement("div");
  plate.className = "sp";
  plate.setAttribute("data-lv", "0");
  plate.innerHTML =
    '<div class="sp-wrap">' +
      '<div class="sp-flames"></div>' +
      '<div class="sp-steam l"><i></i><i></i><i></i></div>' +
      '<div class="sp-steam r"><i></i><i></i><i></i></div>' +
      '<div class="sp-frame"><img src="' + SRC + '" alt="someone who cannot handle spice" draggable="false"><div class="sp-heat"></div></div>' +
      '<div class="sp-sweat"></div>' +
    "</div>" +
    '<div class="sp-meter">' + pips + "</div>" +
    '<div class="sp-labels"><span class="sp-name"></span><span class="sp-line"></span></div>' +
    '<div class="sp-actions">' +
      '<button class="sp-btn hotbtn" type="button">add a chili</button>' +
      '<button class="sp-btn milk" type="button">drink milk</button>' +
    "</div>" +
    '<p class="sp-hint">(feed her a chili)</p>' +
    '<p class="sp-count" role="status"></p>';
  card.insertBefore(plate, sig);

  const wrap = plate.querySelector(".sp-wrap");
  const frame = plate.querySelector(".sp-frame");
  const pipEls = plate.querySelectorAll(".sp-pip");
  const nameEl = plate.querySelector(".sp-name");
  const lineEl = plate.querySelector(".sp-line");
  const chiliBtn = plate.querySelector(".sp-btn.hotbtn");
  const milkBtn = plate.querySelector(".sp-btn.milk");
  const hint = plate.querySelector(".sp-hint");
  const countEl = plate.querySelector(".sp-count");

  /* ring of flames around the frame, pointing outward */
  const flameBox = plate.querySelector(".sp-flames");
  for (let i = 0; i < 12; i++) {
    const a = i * 30 - 90;
    const rad = a * Math.PI / 180;
    const f = document.createElement("i");
    f.style.left = (50 + 52 * Math.cos(rad)) + "%";
    f.style.top = (50 + 52 * Math.sin(rad)) + "%";
    f.style.setProperty("--r", (a + 90) + "deg");
    f.style.animationDelay = -(Math.random() * 0.5) + "s";
    flameBox.appendChild(f);
  }

  const LEVELS = [
    { name: "mild.",         line: "she's fine. for now." },
    { name: "a little kick", line: "barely a tingle" },
    { name: "medium",        line: "ok she felt that one" },
    { name: "hot",           line: "the nose scrunch has begun" },
    { name: "very hot",      line: "wu is sweating" },
    { name: "WU.",           line: "drink some milk. please." }
  ];
  const CHOMPS = [null, "chomp", "*crunch*", "oh.", "OH.", "WUUUUU"];
  const GULPS = ["gulp", "ahh", "*milk mustache*", "better?"];

  const MILESTONES = {
    1: "chilis eaten: 1",
    5: "chilis eaten: 5 · respect",
    10: "chilis eaten: 10. are you ok",
    25: "chilis eaten: 25. this is a cry for help",
    50: "chilis eaten: 50. drink. the. milk.",
    100: "chilis eaten: 100. WUUUUUUU"
  };

  let eaten = 0;
  try { eaten = parseInt(localStorage.getItem("amy-chilis") || "0", 10) || 0; } catch (e) {}
  function renderCount() { countEl.textContent = MILESTONES[eaten] || "chilis eaten: " + eaten; }
  if (eaten > 0) { renderCount(); hint.classList.add("gone"); }

  function fx(text, el) {
    if (softMotion) return;
    const r = el.getBoundingClientRect();
    const d = document.createElement("div");
    d.className = "sp-fx";
    d.textContent = text;
    d.style.left = (r.left + r.width / 2 + (Math.random() * 26 - 13)) + "px";
    d.style.top = (r.top + 20) + "px";
    document.body.appendChild(d);
    setTimeout(function () { d.remove(); }, 1050);
  }

  function sparkle(x, y, colors) {
    if (softMotion) return;
    for (let i = 0; i < 14; i++) {
      const p = document.createElement("div");
      p.className = "burst";                     /* reuses the petal-burst CSS */
      const s = 6 + Math.random() * 8;
      p.style.width = s + "px";
      p.style.height = s * 0.75 + "px";
      p.style.left = x + "px";
      p.style.top = y + "px";
      p.style.background = colors[i % colors.length];
      const a = Math.random() * Math.PI * 2;
      const d = 34 + Math.random() * 70;
      p.style.setProperty("--tx", Math.cos(a) * d + "px");
      p.style.setProperty("--ty", (Math.sin(a) * d - 30) + "px");
      p.style.setProperty("--rot", (Math.random() * 400 - 200) + "deg");
      document.body.appendChild(p);
      setTimeout(function () { p.remove(); }, 1300);
    }
  }
  const FIRE = ["#D9423B", "#E8643A", "#F6B45A", "#FFE9A3"];
  const MILK = ["#FFFFFF", "#FDFBF7", "#F3E8D2", "var(--blushpk)"];

  let stage = null, timers = [];
  function clearTimers() { timers.forEach(clearTimeout); timers = []; }
  function later(fn, ms) { timers.push(setTimeout(fn, ms)); }

  /* ═════════ 2. the spice ═════════ */

  let lv = 0, busy = false, gulps = 0;

  function setLv(n) {
    lv = n;
    plate.setAttribute("data-lv", String(n));
    plate.classList.toggle("sweaty", n >= 2);
    plate.classList.toggle("hot", n >= 3);
    plate.classList.toggle("max", n >= 5);
    pipEls.forEach(function (p, i) { p.classList.toggle("on", i < n); });
    nameEl.textContent = LEVELS[n].name;
    lineEl.textContent = LEVELS[n].line;
  }
  setLv(0);

  function addChili() {
    if (busy) return;
    hint.classList.add("gone");
    if (lv >= 5) { fx("no more. milk.", chiliBtn); return; }
    busy = true;

    if (!softMotion) {
      const c = document.createElement("div");
      c.className = "sp-fall";
      c.innerHTML = CHILI("#D9423B");
      wrap.appendChild(c);
      setTimeout(function () { c.remove(); }, 800);
    }

    later(function () {
      setLv(lv + 1);
      eaten++;
      try { localStorage.setItem("amy-chilis", String(eaten)); } catch (e) {}
      renderCount();
      countEl.classList.remove("pop");
      void countEl.offsetWidth;
      countEl.classList.add("pop");

      frame.classList.remove("chomp");
      void frame.offsetWidth;
      frame.classList.add("chomp");

      fx(CHOMPS[lv], frame);
      const r = frame.getBoundingClientRect();
      sparkle(r.left + r.width / 2, r.top + r.height * 0.78, FIRE);
      busy = false;
    }, softMotion ? 100 : 700);
  }

  function drinkMilk() {
    hint.classList.add("gone");
    if (lv === 0) { fx("she's not even warm yet", milkBtn); return; }
    fx(GULPS[gulps++ % GULPS.length], frame);
    const r = frame.getBoundingClientRect();
    sparkle(r.left + r.width / 2, r.top + r.height / 2, MILK);
    setLv(0);
  }

  chiliBtn.addEventListener("click", addChili);
  milkBtn.addEventListener("click", drinkMilk);

  /* ═════════ 3. the intro: pumpkin spice or just spicy? ═════════ */

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
    stage.className = "sp-stage";
    stage.innerHTML =
      '<div class="sp-duo">' +
        '<div class="sp-item cup">' + CUP + "</div>" +
        '<div class="sp-item pep">' + CHILI("#D9423B") + "</div>" +
        '<div class="sp-bigface"><img src="' + SRC + '" alt="" draggable="false"><div class="sp-heat"></div></div>' +
      "</div>" +
      '<p class="sp-cap"></p>' +
      '<p class="sp-skip">tap to skip</p>';
    document.body.appendChild(stage);

    const cup = stage.querySelector(".sp-item.cup");
    const pep = stage.querySelector(".sp-item.pep");
    const face = stage.querySelector(".sp-bigface");
    const cap = stage.querySelector(".sp-cap");
    function say(text) {
      cap.classList.remove("show");
      later(function () { cap.textContent = text; cap.classList.add("show"); }, 220);
    }

    later(function () { cup.classList.add("in"); say("pumpkin spice?"); }, 300);
    later(function () { pep.classList.add("in"); say("or just spicy?"); }, 1500);
    later(function () { cup.classList.add("merge"); pep.classList.add("merge"); }, 2800);
    later(function () {
      face.classList.add("show");
      say("both. obviously.");
      const r = face.getBoundingClientRect();
      sparkle(r.left + r.width / 2, r.top + r.height / 2, FIRE);
    }, 3150);
    later(function () { if (stage) stage.classList.add("clearing"); }, 4700);
    later(reveal, 5150);

    stage.addEventListener("click", reveal);
  }

  /* ═════════ 4. fire it when the note opens ═════════ */

  new MutationObserver(function () {
    if (backdropEl.classList.contains("show")) {
      if (titleEl) titleEl.textContent = "Too hot.";
      busy = false;
      gulps = 0;
      wrap.querySelectorAll(".sp-fall").forEach(function (n) { n.remove(); });
      setLv(0);
      runIntro();
    } else {
      teardown();
      busy = false;
      plate.classList.remove("go");                /* so it replays next time she opens the note */
    }
  }).observe(backdropEl, { attributes: true, attributeFilter: ["class"] });
})();
