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

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initNav);
  } else {
    initNav();
  }

  window.addEventListener("load", function () {
    if (window.AtomicAge) window.AtomicAge.enhance(document);
  });
})();
