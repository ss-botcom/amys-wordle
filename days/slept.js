/* ═════
   SLEPT DAY · September 30 · "SLEPT"

   Needs:  toast/amy-4.png   (the glasses / finger-on-lip photo)

   Runs only on the date set in SLEPT_DAY. Any other day: does nothing.
   Test it early with:  index.html?peek=09-30&fresh=1
   ═══════════════════════════════════════════════════════════════════
*/
(function () {
  "use strict";

  /* ── change this one line to move the whole thing to another date ── */
  const SLEPT_DAY = "09-30";

  /* photo, relative to index.html */
  const DIR = "toast/";
  const FACE = "amy-4.png";

  let dk;
  try { dk = dateKey; } catch (e) { return; }
  if (dk !== SLEPT_DAY) return;

  const card = document.getElementById("modal-card");
  const sig = card && card.querySelector(".signature");
  const backdropEl = document.getElementById("modal-backdrop");
  const titleEl = document.getElementById("modal-title");
  if (!card || !sig || !backdropEl) return;

  document.body.classList.add("sleptday");

  const sub = document.querySelector("header p");
  if (sub) sub.textContent = "it's past your bedtime :)";

  const softMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* if the photo is missing, this stands in so nothing breaks */
  const PLACEHOLDER =
    "data:image/svg+xml;utf8," + encodeURIComponent(
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">' +
      '<rect width="100" height="100" fill="#F3E8D2"/>' +
      '<path d="M32 44 Q38 48 44 44" stroke="#6B5142" stroke-width="3.5" fill="none" stroke-linecap="round"/>' +
      '<path d="M56 44 Q62 48 68 44" stroke="#6B5142" stroke-width="3.5" fill="none" stroke-linecap="round"/>' +
      '<path d="M40 64 Q50 70 60 64" stroke="#6B5142" stroke-width="3.5" fill="none" stroke-linecap="round"/>' +
      "</svg>");

  let SRC = DIR + FACE;
  const probe = new Image();
  probe.onerror = function () {
    SRC = PLACEHOLDER;
    document.querySelectorAll(".sl-face img, .sl-glow img").forEach(function (im) { im.src = SRC; });
  };
  probe.src = SRC;

  const SHEEP =
    '<svg viewBox="0 0 40 28" aria-hidden="true">' +
      '<g fill="#3E2C23">' +
        '<rect x="12" y="19" width="2.4" height="8" rx="1"/><rect x="17" y="20" width="2.4" height="7" rx="1"/>' +
        '<rect x="25" y="20" width="2.4" height="7" rx="1"/><rect x="30" y="19" width="2.4" height="8" rx="1"/>' +
      "</g>" +
      '<g fill="#FFFFFF" stroke="#E4DCD1" stroke-width="0.8">' +
        '<circle cx="13" cy="14" r="7"/><circle cx="20" cy="10.5" r="7.5"/><circle cx="27" cy="13" r="7"/>' +
        '<circle cx="19.5" cy="17" r="7"/><circle cx="26" cy="18" r="5.5"/>' +
      "</g>" +
      '<ellipse cx="34" cy="12" rx="5" ry="4.3" fill="#3E2C23"/>' +
      '<ellipse cx="31.5" cy="8.6" rx="2.2" ry="1.2" fill="#3E2C23" transform="rotate(-25 31.5 8.6)"/>' +
      '<circle cx="35.6" cy="11" r="0.9" fill="#FDFBF7"/>' +
    "</svg>";

  const FENCE =
    '<svg viewBox="0 0 40 22" aria-hidden="true"><g fill="#C7BCB1">' +
      '<rect x="4" y="2" width="4" height="20" rx="1"/><rect x="18" y="2" width="4" height="20" rx="1"/>' +
      '<rect x="32" y="2" width="4" height="20" rx="1"/>' +
      '<rect x="0" y="6" width="40" height="3" rx="1"/><rect x="0" y="14" width="40" height="3" rx="1"/>' +
    "</g></svg>";

  /* ═════════ 1. the bedroom ═════════ */

  const plate = document.createElement("div");
  plate.className = "sl";
  plate.setAttribute("data-drowse", "0");
  plate.innerHTML =
    '<div class="sl-scene">' +
      '<div class="sl-stars"></div>' +
      '<div class="sl-moon"></div>' +
      '<div class="sl-clock"><b>3:07</b> am</div>' +
      '<div class="sl-bubble"><div class="sl-fence">' + FENCE + "</div></div>" +
      '<div class="sl-pillow"></div>' +
      '<div class="sl-face"><img src="' + SRC + '" alt="someone who should be asleep" draggable="false"></div>' +
      '<div class="sl-phone"></div>' +
      '<div class="sl-blanket"></div>' +
    "</div>" +
    '<div class="sl-labels"><span class="sl-name"></span><span class="sl-line"></span></div>' +
    '<div class="sl-actions">' +
      '<button class="sl-btn main" type="button">count a sheep</button>' +
      '<button class="sl-btn phone" type="button">take her phone</button>' +
    "</div>" +
    '<p class="sl-hint">(she won\'t go to sleep on her own)</p>' +
    '<p class="sl-count" role="status"></p>';
  card.insertBefore(plate, sig);

  const scene = plate.querySelector(".sl-scene");
  const bubble = plate.querySelector(".sl-bubble");
  const clockEl = plate.querySelector(".sl-clock b");
  const phoneEl = plate.querySelector(".sl-phone");
  const nameEl = plate.querySelector(".sl-name");
  const lineEl = plate.querySelector(".sl-line");
  const sheepBtn = plate.querySelector(".sl-btn.main");
  const phoneBtn = plate.querySelector(".sl-btn.phone");
  const hint = plate.querySelector(".sl-hint");
  const countEl = plate.querySelector(".sl-count");

  const starBox = plate.querySelector(".sl-stars");
  for (let i = 0; i < 12; i++) {
    const s = document.createElement("i");
    s.style.left = (Math.random() * 96 + 2) + "%";
    s.style.top = (Math.random() * 46 + 2) + "%";
    s.style.animationDelay = -(Math.random() * 2.6) + "s";
    if (Math.random() < 0.3) { s.style.width = "3px"; s.style.height = "3px"; }
    starBox.appendChild(s);
  }

  const STATES = [
    { name: "wide awake.",      line: "it's 3am wu" },
    { name: "still scrolling.", line: "one sheep. she didn't notice" },
    { name: "yawning.",         line: "it's working" },
    { name: "eyes closing.",    line: "ok NOW take the phone" },
    { name: "almost…",          line: "shhh" },
    { name: "asleep.",          line: "finally. goodnight wu :)" }
  ];

  const EXCUSES = ["5 more minutes", "one more video", "i'm not even tired", "no :)", "wait i'm texting you"];

  const MILESTONES = {
    1: "sheep counted: 1",
    5: "sheep counted: 5 · she's still up isn't she",
    10: "sheep counted: 10. i've run out of sheep names",
    25: "sheep counted: 25. the sheep are tired now too",
    50: "sheep counted: 50. wu. bed.",
    100: "sheep counted: 100. ok you're doing this on purpose"
  };

  let sheep = 0;
  try { sheep = parseInt(localStorage.getItem("amy-sheep") || "0", 10) || 0; } catch (e) {}
  function renderCount() { countEl.textContent = MILESTONES[sheep] || "sheep counted: " + sheep; }
  if (sheep > 0) { renderCount(); hint.classList.add("gone"); }

  function fx(text, el) {
    if (softMotion) return;
    const r = el.getBoundingClientRect();
    const d = document.createElement("div");
    d.className = "sl-fx";
    d.textContent = text;
    d.style.left = (r.left + r.width / 2 + (Math.random() * 26 - 13)) + "px";
    d.style.top = (r.top + 20) + "px";
    document.body.appendChild(d);
    setTimeout(function () { d.remove(); }, 1050);
  }

  let stage = null, timers = [];
  function clearTimers() { timers.forEach(clearTimeout); timers = []; }
  function later(fn, ms) { timers.push(setTimeout(fn, ms)); }

  /* ═════════ 2. getting her to sleep ═════════ */

  let drowse = 0, asleep = false, minutes = 187, session = 0, sheepBusy = false, excuse = 0, zTimer = null;

  function fmt(min) {
    const h = Math.floor(min / 60) % 12 || 12;
    return h + ":" + String(min % 60).padStart(2, "0");
  }
  function setClock() { clockEl.textContent = fmt(minutes); }

  function paint() {
    plate.setAttribute("data-drowse", String(drowse));
    nameEl.textContent = STATES[drowse].name;
    lineEl.textContent = STATES[drowse].line;
  }

  function spawnZ() {
    const z = document.createElement("span");
    z.className = "sl-z";
    z.textContent = Math.random() < 0.5 ? "z" : "Z";
    z.style.fontSize = (0.8 + Math.random() * 0.5) + "rem";
    scene.appendChild(z);
    setTimeout(function () { z.remove(); }, 2500);
  }
  function zLoop() {
    if (!asleep) return;
    if (!softMotion) spawnZ();
    zTimer = setTimeout(zLoop, 1100);
  }
  function stopZ() { clearTimeout(zTimer); zTimer = null; }

  function fallAsleep() {
    if (asleep) return;
    asleep = true;
    drowse = 5;
    paint();
    plate.classList.add("asleep");
    later(function () { fx("goodnight :)", scene); }, 500);
    zLoop();
  }

  function countSheep() {
    if (sheepBusy) return;
    sheepBusy = true;
    hint.classList.add("gone");

    if (!softMotion) {
      const s = document.createElement("div");
      s.className = "sl-sheep";
      s.innerHTML = '<div class="sl-hop">' + SHEEP + "</div>";
      bubble.appendChild(s);
      setTimeout(function () { s.remove(); }, 1500);
    }

    later(function () {
      session++;
      sheep++;
      try { localStorage.setItem("amy-sheep", String(sheep)); } catch (e) {}
      renderCount();
      countEl.classList.remove("pop");
      void countEl.offsetWidth;
      countEl.classList.add("pop");

      minutes += 4;                                /* sheep take time */
      setClock();
      fx(String(session), bubble);

      if (!asleep) {
        if (drowse + 1 >= 5) fallAsleep();
        else { drowse++; paint(); }
      }
      sheepBusy = false;
    }, softMotion ? 150 : 900);
  }

  function takePhone() {
    hint.classList.add("gone");
    if (asleep) { fx("already got it :)", phoneBtn); return; }
    if (drowse < 3) {                              /* she's not tired enough to let go */
      fx(EXCUSES[excuse++ % EXCUSES.length], phoneEl);
      phoneEl.classList.remove("nope");
      void phoneEl.offsetWidth;
      phoneEl.classList.add("nope");
      return;
    }
    fx("got it.", phoneEl);
    fallAsleep();
  }

  sheepBtn.addEventListener("click", countSheep);
  phoneBtn.addEventListener("click", takePhone);

  function reset() {
    stopZ();
    asleep = false; drowse = 0; minutes = 187; session = 0; sheepBusy = false; excuse = 0;
    plate.classList.remove("asleep");
    scene.querySelectorAll(".sl-z, .sl-sheep").forEach(function (n) { n.remove(); });
    setClock();
    paint();
  }
  reset();

  /* ═════════ 3. the intro: 3am ═════════ */

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
        card.scrollTo({ top: Math.max(0, plate.offsetTop - 30), behavior: "smooth" });
      }
    }, 620);
  }

  function runIntro() {
    teardown();
    if (softMotion) { reveal(); return; }

    stage = document.createElement("div");
    stage.className = "sl-stage";
    stage.innerHTML =
      '<div class="sl-bigclock"><span>2:58</span><small>am</small></div>' +
      '<div class="sl-glow"><img src="' + SRC + '" alt="" draggable="false"></div>' +
      '<p class="sl-cap"></p>' +
      '<p class="sl-skip">tap to skip</p>';
    document.body.appendChild(stage);

    const clk = stage.querySelector(".sl-bigclock span");
    const glow = stage.querySelector(".sl-glow");
    const cap = stage.querySelector(".sl-cap");
    function say(text) {
      cap.classList.remove("show");
      later(function () { cap.textContent = text; cap.classList.add("show"); }, 220);
    }

    for (let i = 1; i <= 9; i++) {
      (function (n) { later(function () { clk.textContent = fmt(178 + n); }, 300 + n * 110); })(i);
    }
    later(function () { say("it's 3am."); }, 1400);
    later(function () { glow.classList.add("show"); say("and someone's still on her phone."); }, 2600);
    later(function () { say("go to sleep wu."); }, 4300);
    later(function () { if (stage) stage.classList.add("clearing"); }, 5500);
    later(reveal, 5950);

    stage.addEventListener("click", reveal);
  }

  /* ═════════ 4. fire it when the note opens ═════════ */

  new MutationObserver(function () {
    if (backdropEl.classList.contains("show")) {
      if (titleEl) titleEl.textContent = "Bedtime.";
      reset();
      runIntro();
    } else {
      teardown();
      stopZ();
      sheepBusy = false;
      plate.classList.remove("go");                /* so it replays next time she opens the note */
    }
  }).observe(backdropEl, { attributes: true, attributeFilter: ["class"] });
})();
