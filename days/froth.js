/* ═════
   FROTH DAY · September 26 · "FROTH"

   Optional: a folder called  froth/  sitting next to index.html, holding:
     froth/amy-1.png     (a face crop — becomes a "latte portrait")
   If it's missing, that one design just quietly gets skipped.

   Runs only on the date set in FROTH_DAY. Any other day: does nothing.
   Test it early with:  index.html?peek=09-26&fresh=1
   ═══════════════════════════════════════════════════════════════════
*/
(function () {
  "use strict";

  /* ── change this one line to move the whole thing to another date ── */
  const FROTH_DAY = "09-26";

  /* optional photo for the "latte portrait", relative to index.html */
  const DIR = "froth/";
  const FACE = "amy-1.png";

  let dk;
  try { dk = dateKey; } catch (e) { return; }
  if (dk !== FROTH_DAY) return;

  const card = document.getElementById("modal-card");
  const sig = card && card.querySelector(".signature");
  const backdropEl = document.getElementById("modal-backdrop");
  const titleEl = document.getElementById("modal-title");
  if (!card || !sig || !backdropEl) return;

  document.body.classList.add("frothday");

  const sub = document.querySelector("header p");
  if (sub) sub.textContent = "one latte, extra foam :)";

  const softMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const NS = "http://www.w3.org/2000/svg";

  /* ═════════ 1. the cup, seen from above ═════════
     p = an id prefix, so the intro cup and the note cup don't share ids */

  function cupSVG(p) {
    return '<svg class="fr-cup" viewBox="0 0 200 200" aria-hidden="true"><defs>' +
        '<radialGradient id="' + p + 'Crema" cx="50%" cy="50%" r="50%">' +
          '<stop offset="0%" stop-color="#4A2E1B"/><stop offset="55%" stop-color="#6B4226"/>' +
          '<stop offset="86%" stop-color="#94602F"/><stop offset="100%" stop-color="#B98350"/>' +
        "</radialGradient>" +
        '<radialGradient id="' + p + 'Foam" gradientUnits="userSpaceOnUse" cx="100" cy="96" r="62">' +
          '<stop offset="0%" stop-color="#FFFBF4"/><stop offset="65%" stop-color="#F7EAD7"/>' +
          '<stop offset="100%" stop-color="#E8D0AE"/>' +
        "</radialGradient>" +
        '<radialGradient id="' + p + 'FoamB" cx="50%" cy="45%" r="60%">' +
          '<stop offset="0%" stop-color="#FFFBF4"/><stop offset="70%" stop-color="#F6E6D0"/>' +
          '<stop offset="100%" stop-color="#E8D0AE"/>' +
        "</radialGradient>" +
        '<radialGradient id="' + p + 'Fade">' +
          '<stop offset="0%" stop-color="#fff"/><stop offset="62%" stop-color="#fff"/>' +
          '<stop offset="100%" stop-color="#000"/>' +
        "</radialGradient>" +
        '<mask id="' + p + 'Mask" maskUnits="userSpaceOnUse" x="0" y="0" width="200" height="200">' +
          '<circle cx="100" cy="100" r="54" fill="url(#' + p + 'Fade)"/>' +
        "</mask>" +
        '<clipPath id="' + p + 'Clip"><circle cx="100" cy="100" r="60"/></clipPath>' +
      "</defs>" +
      /* saucer */
      '<circle cx="100" cy="100" r="96" fill="#FFFFFF" stroke="#E4DCD1" stroke-width="1.5"/>' +
      '<circle cx="100" cy="100" r="80" fill="none" stroke="#EFE7DA" stroke-width="1.2"/>' +
      /* handle */
      '<rect x="158" y="89" width="38" height="22" rx="11" fill="#FFFFFF" stroke="#E4DCD1" stroke-width="1.5"/>' +
      /* cup */
      '<circle cx="100" cy="100" r="70" fill="#FFFFFF" stroke="#E4DCD1" stroke-width="1.5"/>' +
      '<circle cx="100" cy="100" r="64" fill="#F4EDE3"/>' +
      '<circle class="fr-stain" cx="100" cy="100" r="46" fill="none" stroke="#B98350" stroke-width="2.2"/>' +
      /* the coffee + whatever's drawn on it */
      '<g class="fr-liquid">' +
        '<circle cx="100" cy="100" r="60" fill="url(#' + p + 'Crema)"/>' +
        '<g class="fr-art" clip-path="url(#' + p + 'Clip)"></g>' +
      "</g>" +
      /* little shine on the rim */
      '<path d="M48.7 56.9 A67 67 0 0 1 77.1 37.0" stroke="#FFFFFF" stroke-width="3" stroke-linecap="round" fill="none" opacity="0.6"/>' +
    "</svg>";
  }

  const PITCHER =
    '<svg class="fr-pitcher" viewBox="0 0 60 50" aria-hidden="true">' +
      '<path d="M46 18 C58 18 58 36 44 38" fill="none" stroke="#BFC6CB" stroke-width="4" stroke-linecap="round"/>' +
      '<path d="M2 8 L12 11 L46 11 L42 45 Q41 49 37 49 L19 49 Q15 49 14 45 L11 17 Z" fill="#DDE1E4" stroke="#BFC6CB" stroke-width="1.4" stroke-linejoin="round"/>' +
      '<path d="M16 20 L18 42" stroke="#FFFFFF" stroke-width="2" opacity="0.8" stroke-linecap="round"/>' +
    "</svg>";

  function cupHTML(p) {
    return '<div class="fr-cupwrap">' + cupSVG(p) + '<div class="fr-stream"></div>' + PITCHER + "</div>";
  }

  /* ═════════ 2. the latte art ═════════ */

  const CREMA_LINE = "#6B4226";
  const HEART_D = "M100 134 C86 122 68 110 68 92 C68 79 77 71 88 71 C95 71 99 75 100 80 C101 75 105 71 112 71 C123 71 132 79 132 92 C132 110 114 122 100 134 Z";
  const PETAL_D = "M50 50 C43.5 41 40.5 27 44 15 C45.8 8.8 50 4.5 50 4.5 C50 4.5 54.2 8.8 56 15 C59.5 27 56.5 41 50 50 Z";

  function foam(p, d) {
    return '<path d="' + d + '" fill="url(#' + p + 'Foam)" stroke="#A87548" stroke-opacity="0.4" stroke-width="1.6"/>';
  }
  function crescent(p, y, w, h) {
    return foam(p, "M" + (100 - w) + " " + y + " Q100 " + (y + 2 * h) + " " + (100 + w) + " " + y +
      " Q100 " + (y + 0.7 * h) + " " + (100 - w) + " " + y + " Z");
  }
  function pull(y1, y2) {
    return '<path d="M100 ' + y1 + " L100 " + y2 + '" stroke="' + CREMA_LINE + '" stroke-width="2.2" stroke-linecap="round"/>';
  }
  function tail(p, y1, y2) {
    return '<path d="M100 ' + y1 + " Q101 " + ((y1 + y2) / 2) + " 99 " + y2 +
      '" stroke="url(#' + p + 'Foam)" stroke-width="2.6" stroke-linecap="round" fill="none"/>';
  }

  let faceSrc = null;

  const ART = {
    heart: function (p) {
      return foam(p, HEART_D) + tail(p, 133, 150);
    },
    tulip: function (p) {
      return crescent(p, 112, 31, 20) + crescent(p, 92, 25, 17) + crescent(p, 75, 19, 14) +
        '<ellipse cx="100" cy="64" rx="10" ry="8.5" fill="url(#' + p + 'Foam)"/>' +
        pull(58, 128) + tail(p, 131, 150);
    },
    rosetta: function (p) {
      let s = "";
      for (let i = 0; i < 9; i++) s += crescent(p, 124 - i * 8.5, 34 - i * 2.9, 11 - i * 0.4);
      return s + '<ellipse cx="100" cy="47" rx="6.5" ry="5.5" fill="url(#' + p + 'Foam)"/>' +
        pull(45, 132) + tail(p, 133, 152);
    },
    lily: function (p) {
      let s = '<g transform="translate(100 100) scale(1.12) translate(-50 -50)">';
      [60, 180, 300].forEach(function (a) {
        s += '<g transform="rotate(' + a + ' 50 50) translate(50 50) scale(0.86) translate(-50 -50)">' +
          '<path d="' + PETAL_D + '" fill="url(#' + p + 'FoamB)" opacity="0.72"/></g>';
      });
      [0, 120, 240].forEach(function (a) {
        s += '<g transform="rotate(' + a + ' 50 50)">' +
          '<path d="' + PETAL_D + '" fill="url(#' + p + 'FoamB)" stroke="#A87548" stroke-opacity="0.35" stroke-width="1.2"/>' +
          '<path d="M50 45 C49.5 34 49.5 22 50 9" stroke="#C9A27E" stroke-width="0.9" opacity="0.6" fill="none"/></g>';
      });
      return s + '<circle cx="50" cy="50" r="3.4" fill="' + CREMA_LINE + '"/></g>';
    },
    wu: function (p) {
      return '<text x="100" y="118" text-anchor="middle" font-family="\'Great Vibes\', cursive" font-size="54" ' +
        'fill="url(#' + p + 'Foam)" stroke="#A87548" stroke-opacity="0.35" stroke-width="1">Wu</text>' +
        '<g transform="translate(131 72) scale(0.24) translate(-100 -100)">' +
          '<path d="' + HEART_D + '" fill="url(#' + p + 'FoamB)"/></g>';
    },
    blob: function (p) {
      return foam(p, "M76 96 C66 78 90 62 110 68 C130 74 140 94 126 108 C116 118 122 132 104 136 C86 140 68 126 78 114 C84 106 82 102 76 96 Z") +
        '<ellipse cx="134" cy="126" rx="6" ry="4" fill="url(#' + p + 'Foam)"/>' +
        '<circle cx="70" cy="74" r="3.4" fill="url(#' + p + 'Foam)"/>' +
        '<circle cx="138" cy="80" r="2" fill="url(#' + p + 'Foam)"/>';
    },
    face: function (p) {
      return '<image class="fr-face" x="46" y="46" width="108" height="108" preserveAspectRatio="xMidYMid slice" ' +
        'mask="url(#' + p + 'Mask)" href="' + faceSrc + '"/>' +
        '<circle cx="100" cy="100" r="55" fill="none" stroke="url(#' + p + 'Foam)" stroke-width="4" opacity="0.8"/>';
    }
  };

  /* the order she gets them in, one per pour */
  const DESIGNS = [
    { key: "heart",   name: "heart",        line: "the classic :)" },
    { key: "tulip",   name: "tulip",        line: "flowers for you" },
    { key: "rosetta", name: "rosetta",      line: "fancy. i had to google the name" },
    { key: "lily",    name: "lily",         line: "your favorite :)" },
    { key: "wu",      name: "custom order", line: "extra wu" },
    { key: "blob",    name: "mine",         line: "it's a swan. obviously." }
  ];

  /* the portrait only joins the rotation if the photo actually exists */
  const probe = new Image();
  probe.onload = function () {
    faceSrc = DIR + FACE;
    DESIGNS.push({ key: "face", name: "latte portrait", line: "prettiest thing i've ever put in a cup" });
  };
  probe.src = DIR + FACE;

  function drawDesign(artEl, p, key) {
    const g = document.createElementNS(NS, "g");
    g.setAttribute("class", "fr-design");
    g.innerHTML = ART[key](p);
    const im = g.querySelector("image");
    if (im) im.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", im.getAttribute("href"));
    artEl.appendChild(g);
    return g;
  }

  function clearArt(artEl, animate) {
    artEl.querySelectorAll(".fr-design").forEach(function (g) {
      if (animate && !softMotion) {
        g.classList.add("out");
        setTimeout(function () { g.remove(); }, 460);
      } else {
        g.remove();
      }
    });
  }

  /* ═════════ 3. the note ═════════ */

  const plate = document.createElement("div");
  plate.className = "fr";
  plate.setAttribute("data-sip", "0");
  plate.innerHTML =
    cupHTML("frN") +
    '<div class="fr-labels"><span class="fr-name"></span><span class="fr-line"></span></div>' +
    '<div class="fr-actions">' +
      '<button class="fr-btn pour" type="button">pour</button>' +
      '<button class="fr-btn sip" type="button">sip</button>' +
    "</div>" +
    '<p class="fr-hint">(pour another)</p>' +
    '<p class="fr-count" role="status"></p>';
  card.insertBefore(plate, sig);

  const wrap = plate.querySelector(".fr-cupwrap");
  const art = plate.querySelector(".fr-art");
  const nameEl = plate.querySelector(".fr-name");
  const lineEl = plate.querySelector(".fr-line");
  const pourBtn = plate.querySelector(".fr-btn.pour");
  const sipBtn = plate.querySelector(".fr-btn.sip");
  const hint = plate.querySelector(".fr-hint");
  const countEl = plate.querySelector(".fr-count");

  const MILESTONES = {
    1: "lattes poured: 1",
    3: "lattes poured: 3 — ok barista",
    5: "lattes poured: 5 · wu you're so caffeinated rn",
    10: "lattes poured: 10. we're opening a café. you're hired.",
    25: "lattes poured: 25. can't believe i only used to drink mochas",
    50: "lattes poured: 50. still waiting on my real one :)",
    100: "lattes poured: 100. ok now go make me an actual one"
  };
  const POURS = ["voilà :)", "ta-da", "one latte for wu", "extra foam", "*chef's kiss*"];
  const SIPS = ["sip.", "*sip*", "*foam mustache*"];

  let lattes = 0;
  try { lattes = parseInt(localStorage.getItem("amy-lattes") || "0", 10) || 0; } catch (e) {}
  function renderCount() { countEl.textContent = MILESTONES[lattes] || "lattes poured: " + lattes; }
  if (lattes > 0) renderCount();
  if (lattes > 1) hint.classList.add("gone");

  function fx(text, el) {
    if (softMotion) return;
    const r = el.getBoundingClientRect();
    const d = document.createElement("div");
    d.className = "fr-fx";
    d.textContent = text;
    d.style.left = (r.left + r.width / 2 + (Math.random() * 26 - 13)) + "px";
    d.style.top = (r.top + 26) + "px";
    document.body.appendChild(d);
    setTimeout(function () { d.remove(); }, 1050);
  }

  function sparkle(x, y) {
    if (softMotion) return;
    const colors = ["var(--rose)", "var(--blushpk)", "#FFFBF4", "var(--butter)", "#C98F3D"];
    for (let i = 0; i < 12; i++) {
      const p = document.createElement("div");
      p.className = "burst";                     /* reuses the petal-burst CSS */
      const s = 6 + Math.random() * 8;
      p.style.width = s + "px";
      p.style.height = s * 0.75 + "px";
      p.style.left = x + "px";
      p.style.top = y + "px";
      p.style.background = colors[i % colors.length];
      const a = Math.random() * Math.PI * 2;
      const d = 34 + Math.random() * 60;
      p.style.setProperty("--tx", Math.cos(a) * d + "px");
      p.style.setProperty("--ty", (Math.sin(a) * d - 30) + "px");
      p.style.setProperty("--rot", (Math.random() * 400 - 200) + "deg");
      document.body.appendChild(p);
      setTimeout(function () { p.remove(); }, 1300);
    }
  }

  let stage = null, timers = [];
  function clearTimers() { timers.forEach(clearTimeout); timers = []; }
  function later(fn, ms) { timers.push(setTimeout(fn, ms)); }

  let idx = -1, busy = false, level = 0;
  function setSip(n) { level = n; plate.setAttribute("data-sip", String(n)); }

  function pour(first) {
    if (busy) return;
    busy = true;
    pourBtn.disabled = true;
    if (!first) hint.classList.add("gone");

    idx = (idx + 1) % DESIGNS.length;
    const d = DESIGNS[idx];

    clearArt(art, true);
    setSip(0);                                   /* refills as it pours */
    wrap.classList.remove("pouring");
    void wrap.offsetWidth;
    if (!softMotion) wrap.classList.add("pouring");

    later(function () { drawDesign(art, "frN", d.key); }, softMotion ? 0 : 620);

    later(function () {
      wrap.classList.remove("pouring");
      nameEl.textContent = d.name;
      lineEl.textContent = d.line;

      lattes++;
      try { localStorage.setItem("amy-lattes", String(lattes)); } catch (e) {}
      renderCount();
      countEl.classList.remove("pop");
      void countEl.offsetWidth;
      countEl.classList.add("pop");

      fx(POURS[lattes % POURS.length], wrap);
      const r = wrap.getBoundingClientRect();
      sparkle(r.left + r.width / 2, r.top + r.height / 2);
      if (first && typeof petalBurst === "function") petalBurst();

      pourBtn.textContent = "pour another";
      pourBtn.disabled = false;
      busy = false;
    }, softMotion ? 150 : 1650);
  }

  function sip() {
    if (busy) return;
    if (!art.querySelector(".fr-design")) { fx("pour one first", sipBtn); return; }
    if (level >= 3) { fx("it's empty wu", sipBtn); return; }
    setSip(level + 1);
    plate.classList.remove("sipping");
    void plate.offsetWidth;
    plate.classList.add("sipping");
    fx(SIPS[level - 1], wrap);
    if (level === 3) {
      nameEl.textContent = "empty.";
      lineEl.textContent = "that was fast. refill?";
    }
  }

  pourBtn.addEventListener("click", function () { pour(false); });
  sipBtn.addEventListener("click", sip);

  /* ═════════ 4. the intro: me, trying ═════════ */

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
        card.scrollTo({ top: Math.max(0, plate.offsetTop - 10), behavior: "smooth" });
      }
    }, 620);
    later(function () { pour(true); }, softMotion ? 100 : 560);
  }

  function runIntro() {
    teardown();
    if (softMotion) { reveal(); return; }

    stage = document.createElement("div");
    stage.className = "fr-stage";
    stage.innerHTML = cupHTML("frS") + '<p class="fr-cap"></p><p class="fr-skip">tap to skip</p>';
    document.body.appendChild(stage);

    const bigWrap = stage.querySelector(".fr-cupwrap");
    const bigArt = stage.querySelector(".fr-art");
    const cap = stage.querySelector(".fr-cap");
    function say(text) {
      cap.classList.remove("show");
      later(function () { cap.textContent = text; cap.classList.add("show"); }, 220);
    }

    let blob = null;
    later(function () { say("one shot of espresso."); }, 300);
    later(function () { bigWrap.classList.add("shot"); }, 550);
    later(function () { say("a little milk. a lot of wrist."); bigWrap.classList.add("pouring"); }, 1800);
    later(function () { blob = drawDesign(bigArt, "frS", "blob"); }, 2450);
    later(function () { bigWrap.classList.remove("pouring"); }, 3400);
    later(function () { say("…it was supposed to be a heart."); if (blob) blob.classList.add("wobble"); }, 3550);
    later(function () { say("yours are better. teach me?"); }, 4900);
    later(function () { if (stage) stage.classList.add("clearing"); }, 6100);
    later(reveal, 6550);

    stage.addEventListener("click", reveal);
  }

  /* ═════════ 5. fire it when the note opens ═════════ */

  new MutationObserver(function () {
    if (backdropEl.classList.contains("show")) {
      if (titleEl) titleEl.textContent = "Extra foam.";
      busy = false;
      idx = -1;                                  /* always starts with the heart */
      setSip(0);
      clearArt(art, false);
      wrap.classList.remove("pouring");
      nameEl.textContent = "";
      lineEl.textContent = "";
      pourBtn.disabled = false;
      pourBtn.textContent = "pour";
      runIntro();
    } else {
      teardown();
      busy = false;
      pourBtn.disabled = false;
      wrap.classList.remove("pouring");
      plate.classList.remove("go");              /* so it replays next time she opens the note */
    }
  }).observe(backdropEl, { attributes: true, attributeFilter: ["class"] });
})();
