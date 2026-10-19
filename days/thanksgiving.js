/* ═════
   THANKSGIVING · November 26 · "FEAST"

   A jar of folded notes — tap it and one pops out. Extra falling leaves.
   ✏️ REASONS is yours to rewrite: these are placeholders in roughly your
   voice. Keep them short; they show up one at a time.
   (Thanksgiving moves every year — next year it's Nov 25, so move the
   date in DAY_FILES in index.html when you get there.)
   Test it:  index.html?peek=11-26&fresh=1
   ═════ */
(function () {
  "use strict";
  if (typeof Special === "undefined") return;
  const S = Special;

  const REASONS = [
    "you.",
    "your laugh. the real one, not the polite one",
    "every single WUUUU",
    "that you actually play this every day",
    "hama sushi sidehugs",
    "late night calls that go way too long",
    "pittsburgh, october 8th",
    "you. (it was always going to be you twice)",
  ];

  S.subtitle("happy thanksgiving :)");
  S.title = "Thankful.";
  S.ambient.set("leaves", 22);

  const NOTE = (x, y, r, c) => '<rect x="' + x + '" y="' + y + '" width="16" height="10" rx="1.5" fill="' + c + '" transform="rotate(' + r + " " + (x + 8) + " " + (y + 5) + ')"/>';
  const plate = S.addToNote("tg",
    '<svg class="tg-jar" viewBox="0 0 150 170" role="button" aria-label="pull a note from the jar">' +
      '<rect x="44" y="10" width="62" height="16" rx="4" fill="#C9A27E"/>' +
      '<path d="M40 30 H110 Q122 30 122 44 V148 Q122 162 108 162 H42 Q28 162 28 148 V44 Q28 30 40 30 Z" fill="#EAF2F4" stroke="#BFCDD3" stroke-width="2" opacity=".95"/>' +
      NOTE(40, 120, -12, "#FFF1B8") + NOTE(62, 128, 8, "#F3D7DA") + NOTE(84, 118, -4, "#DDEBD5") + NOTE(50, 100, 14, "#F3D7DA") +
      NOTE(76, 96, -16, "#FFF1B8") + NOTE(96, 140, 10, "#FFF1B8") + NOTE(36, 140, 4, "#DDEBD5") + NOTE(66, 78, 6, "#DDEBD5") +
      '<path d="M38 46 V140" stroke="#fff" stroke-width="4" stroke-linecap="round" opacity=".7"/>' +
      '<path d="M54 46 H96" stroke="#D9A0A5" stroke-width="3" stroke-linecap="round"/>' +
      '<text x="75" y="62" text-anchor="middle" font-size="10" fill="#6B5142" font-family="Caveat, cursive">thankful for</text>' +
    "</svg>" +
    '<p class="tg-note" role="status"></p>' +
    '<div class="tg-labels"><span class="sd-name">the thankful jar</span><span class="sd-line">happy thanksgiving, wu</span></div>' +
    '<p class="sd-hint">(tap the jar)</p>' +
    '<p class="sd-count"></p>');

  const jar = plate.querySelector(".tg-jar");
  const note = plate.querySelector(".tg-note");
  const hint = plate.querySelector(".sd-hint");
  const count = plate.querySelector(".sd-count");
  let i = 0;
  jar.addEventListener("click", () => {
    hint.classList.add("gone");
    jar.classList.remove("shake");
    void jar.offsetWidth;
    jar.classList.add("shake");
    note.classList.remove("show");
    void note.offsetWidth;
    note.textContent = REASONS[i % REASONS.length];
    note.classList.add("show");
    i++;
    count.textContent = i <= REASONS.length ? i + " of " + REASONS.length : "the jar refills itself. that's how it works";
  });
})();
