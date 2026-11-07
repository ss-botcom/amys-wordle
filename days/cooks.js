/* ═════
   COOKS DAY · November 14 · "COOKS"  (can you cook for me please 🙂)

   Needs:  cooks/amy.jpg   (her at the stove, blue shirt)
   In the note: a polaroid of her cooking and an order bell. Ring it and
   a dish comes out.
   Test it:  index.html?peek=11-14&fresh=1
   ═════ */
(function () {
  "use strict";
  if (typeof Special === "undefined") return;
  const S = Special;

  S.subtitle("hi wu :)");
  S.title = "Chef Wu";

  const DISHES = ["tomato egg", "green beans", "rice", "more rice", "seconds?"];

  const plate = S.addToNote("ck",
    '<figure class="polaroid ck-pol"><img alt="" draggable="false"><figcaption>chef wu</figcaption></figure>' +
    '<button class="ck-bell" type="button" aria-label="ring the bell">' +
      '<svg viewBox="0 0 60 44" aria-hidden="true"><rect x="27" y="2" width="6" height="6" rx="2" fill="#B8956A"/>' +
      '<path d="M8 36 C8 18 18 8 30 8 C42 8 52 18 52 36 Z" fill="#E3C481"/><path d="M16 30 C17 20 22 14 28 13" stroke="#fff" stroke-width="2.4" fill="none" opacity=".6" stroke-linecap="round"/>' +
      '<rect x="2" y="36" width="56" height="6" rx="3" fill="#B8956A"/></svg>' +
    "</button>" +
    '<p class="sd-hint">(ring the bell)</p>');

  const bell = plate.querySelector(".ck-bell");
  const hint = plate.querySelector(".sd-hint");
  S.photo(plate.querySelector(".ck-pol img"), "cooks/amy.jpg");

  let n = 0;
  bell.addEventListener("click", () => {
    hint.classList.add("gone");
    bell.classList.remove("ding");
    void bell.offsetWidth;
    bell.classList.add("ding");
    const [x, y] = S.center(bell);
    S.floatText(DISHES[n % DISHES.length], x, y - 50, { size: "1.4rem" });
    n++;
  });
})();
