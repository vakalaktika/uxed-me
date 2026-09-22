// Mobile nav sheet (open/close/focus/escape) + wires up the Atomic Age
// runtime helpers used on this site (icon injection, tab panels).
(function () {
  function initNav() {
    var toggle = document.querySelector("[data-nav-toggle]");
    var sheet = document.querySelector("[data-nav-sheet]");
    var close = document.querySelector("[data-nav-close]");
    if (!toggle || !sheet) return;

    function open() {
      sheet.hidden = false;
      document.body.classList.add("nav-open");
      toggle.setAttribute("aria-expanded", "true");
      var firstLink = sheet.querySelector("a");
      if (firstLink) firstLink.focus();
    }
    function hide() {
      sheet.hidden = true;
      document.body.classList.remove("nav-open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.focus();
    }

    toggle.addEventListener("click", function () {
      if (sheet.hidden) open();
      else hide();
    });
    if (close) close.addEventListener("click", hide);
    sheet.addEventListener("keydown", function (e) {
      if (e.key === "Escape") hide();
    });
    sheet.addEventListener("click", function (e) {
      if (e.target.tagName === "A") hide();
    });
  }

  // One electron lap around the brand mark: once shortly after load, then on
  // hover/focus. Not on a timer — the point is a moment of delight, not motion
  // running in the corner of every page.
  function initAtomMark() {
    if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    var marks = document.querySelectorAll(".atom-mark");
    if (!marks.length) return;

    function lap(mark) {
      mark.classList.remove("is-charged");
      void mark.getBoundingClientRect(); // restart the animation mid-flight
      mark.classList.add("is-charged");
    }

    Array.prototype.forEach.call(marks, function (mark) {
      var link = mark.closest ? mark.closest("a") : null;
      if (link) {
        link.addEventListener("mouseenter", function () { lap(mark); });
        link.addEventListener("focus", function () { lap(mark); });
      }
      // animationend bubbles from the electron, so the class never sticks.
      mark.addEventListener("animationend", function () {
        mark.classList.remove("is-charged");
      });
    });

    window.setTimeout(function () {
      Array.prototype.forEach.call(marks, lap);
    }, 900);
  }

  function init() {
    initNav();
    initAtomMark();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

  window.addEventListener("load", function () {
    if (window.AtomicAge) window.AtomicAge.enhance(document);
  });
})();
