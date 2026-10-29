/* ═════
   MONTHSARY · every 1st of the month (counted from Feb 1, 2026)

   A vase in the note with one flower for every month you've been
   together — they bloom one by one when the note opens. Nov 1 = 9.
   (Aug 1 keeps its own anniversary bouquet + fireworks.)
   Test it:  index.html?peek=11-01&fresh=1   (or 12-01, 01-01 …)
   ═════ */
(function () {
  "use strict";
  if (typeof Special === "undefined") return;
  const S = Special;

  const N = S.monthsTogether;
  const WORDS_N = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve"];
  const nWord = WORDS_N[N] || String(N);

  S.subtitle("happy monthsary wu 💐");              // no number: some months the word IS the number
  S.title = N === 12 ? "One year." : nWord.charAt(0).toUpperCase() + nWord.slice(1) + " months.";
  setTimeout(() => typeof petalBurst === "function" && petalBurst(), 1100);

  /* flowers fan out from the vase mouth; alternate lilies, roses, tulips */
  const shown = Math.min(N, 14);
  const LILY = (c) => {
    let s = "";
    for (let k = 0; k < 6; k++) s += '<ellipse rx="3.4" ry="9" cy="-8" fill="' + (k % 2 ? "#FBEDEE" : c) + '" transform="rotate(' + k * 60 + ')"/>';
    return s + '<circle r="2.6" fill="#E3C481"/>';
  };
  const ROSE = (c) => '<circle r="9" fill="' + c + '"/><path d="M-4 -1 a4 4 0 1 1 6 3 a6 6 0 1 1 -9 -4" fill="none" stroke="#B9737A" stroke-width="1.4"/>';
  const TULIP = (c) => '<path d="M-8 -2 C-8 -12 -3 -14 0 -8 C3 -14 8 -12 8 -2 C8 6 -8 6 -8 -2 Z" fill="' + c + '"/>';
  const KINDS = [LILY, ROSE, TULIP];
  const COLS = ["#F3D7DA", "#E8B7BC", "#E3C481", "#D9A0A5", "#FBEDEE", "#EFC7A8"];

  let stems = "", blooms = "";
  for (let i = 0; i < shown; i++) {
    const t = shown === 1 ? 0.5 : i / (shown - 1);
    const ang = (-62 + 124 * t) * Math.PI / 180;
    const len = 92 + 26 * Math.sin(t * Math.PI) + (i % 2 ? -10 : 6);
    const x = 115 + Math.sin(ang) * len, y = 130 - Math.cos(ang) * len;
    const delay = 1.25 + i * 0.16;
    stems += '<path class="ms-stem" pathLength="1" d="M115 132 Q' + (115 + Math.sin(ang) * len * 0.3) + " " + (130 - Math.cos(ang) * len * 0.55) + " " + x.toFixed(1) + " " + y.toFixed(1) +
      '" stroke="#8AA07F" stroke-width="1.8" fill="none" style="animation-delay:' + delay.toFixed(2) + 's"/>';
    blooms += '<g transform="translate(' + x.toFixed(1) + " " + y.toFixed(1) + ') scale(1.3)"><g class="ms-bloom" style="animation-delay:' + (delay + 0.4).toFixed(2) + 's">' +
      KINDS[i % 3](COLS[i % COLS.length]) + "</g></g>";
  }

  const plate = S.addToNote("ms",
    '<svg class="ms-vase" viewBox="0 0 230 190" role="button" aria-label="smell the flowers">' +
      stems + blooms +
      '<path d="M95 128 H135 L130 178 Q115 186 100 178 Z" fill="#DDE6EA" stroke="#BFCDD3" stroke-width="1.5" opacity=".9"/>' +
      '<path d="M100 132 L103 172" stroke="#fff" stroke-width="2" opacity=".7"/>' +
      '<rect x="93" y="124" width="44" height="7" rx="3" fill="#CFDBE0"/>' +
    "</svg>" +
    '<p class="ms-count-big">' + N + "</p>" +
    '<div class="ms-labels"><span class="sd-name">' + (N === 12 ? "one flower for every month. a whole year." : "one flower for every month") +
    '</span><span class="sd-line">happy ' + (N === 12 ? "one year" : nWord + " months") + ", wu</span></div>" +
    '<p class="sd-hint">(smell them)</p>');

  const vase = plate.querySelector(".ms-vase");
  const hint = plate.querySelector(".sd-hint");
  vase.addEventListener("click", () => {
    hint.classList.add("gone");
    plate.classList.remove("sniff");
    void plate.offsetWidth;
    plate.classList.add("sniff");
    const [x, y] = S.center(vase);
    S.burst({ x, y: y - 40, count: 14, size: [7, 13], spread: [40, 120], lift: 80 });
    S.floatText(["mmm", "smells like you", "ahh", "lilies :)"][Math.floor(Math.random() * 4)], x, y - 70);
  });

  S.on("open", () => { plate.classList.remove("go"); void plate.offsetWidth; plate.classList.add("go"); });
})();
