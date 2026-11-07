/* ═════
   CRAWL DAY · November 25 · "CRAWL"  (FOOD CRAWL)

   In the note: a little NYC map with food stops along a dotted route.
   Tap each stop to eat it; the "full" meter fills. After the last one
   the bus drives off to Providence.
   Edit STOPS to change the food (x/y are % across/down the map).
   Test it:  index.html?peek=11-25&fresh=1
   ═════ */
(function () {
  "use strict";
  if (typeof Special === "undefined") return;
  const S = Special;

  S.subtitle("hi wu :)");
  S.title = "Pace yourself";

  const STOPS = [
    { e: "🍕", x: 12, y: 80 },
    { e: "🥟", x: 32, y: 40 },
    { e: "🥯", x: 52, y: 72 },
    { e: "🍣", x: 70, y: 32 },
    { e: "🍰", x: 86, y: 66 },
  ];
  const END = { x: 92, y: 14 };                      // the bus to providence

  const pts = STOPS.concat([END]).map((p) => p.x * 2.6 + "," + p.y * 1.7).join(" ");
  const plate = S.addToNote("cr",
    '<div class="cr-map">' +
      '<svg class="cr-route" viewBox="0 0 260 170" preserveAspectRatio="none" aria-hidden="true"><polyline points="' + pts + '"/></svg>' +
      STOPS.map((s, i) => '<button type="button" class="cr-stop" style="left:' + s.x + "%;top:" + s.y + '%" aria-label="stop ' + (i + 1) + '">' + s.e + "</button>").join("") +
      '<span class="cr-pvd" style="left:' + END.x + "%;top:" + END.y + '%">PVD</span>' +
      '<span class="cr-bus" style="left:' + STOPS[4].x + "%;top:" + STOPS[4].y + '%">🚌</span>' +
    "</div>" +
    '<div class="cr-meter"><span class="cr-k">full</span><span class="cr-bar"><i></i></span></div>' +
    '<p class="sd-hint">(eat your way through)</p>');

  const stops = plate.querySelectorAll(".cr-stop");
  const bar = plate.querySelector(".cr-bar i");
  const bus = plate.querySelector(".cr-bus");
  const map = plate.querySelector(".cr-map");
  const hint = plate.querySelector(".sd-hint");

  let eaten = 0;
  stops.forEach((s) => s.addEventListener("click", () => {
    if (s.classList.contains("ate")) return;
    s.classList.add("ate");
    hint.classList.add("gone");
    eaten++;
    bar.style.width = (eaten / stops.length) * 100 + "%";
    const [x, y] = S.center(s);
    S.floatText("nom", x, y - 30, { size: "1.2rem" });
    if (eaten === stops.length) {
      S.later(() => {
        map.classList.add("done");
        bus.style.left = END.x + "%";
        bus.style.top = END.y + "%";
      }, 500);
    }
  }));
})();
