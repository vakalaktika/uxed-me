// Mobile nav sheet (open/close/focus/escape), the light/dark toggle, the
// home work-index filter, and the Atomic Age runtime helpers used on this
// site (icon injection, tab panels).
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
      // Restarting both SMIL animations together; beginElement() also
      // restarts one already in flight, so rapid hovers stay in sync.
      var anims = mark.querySelectorAll("animateMotion, animate");
      for (var i = 0; i < anims.length; i++) {
        if (anims[i].beginElement) {
          try { anims[i].beginElement(); } catch (e) {}
        }
      }
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

    function lapAll() {
      Array.prototype.forEach.call(marks, lap);
    }

    // One lap shortly after load, then an occasional one so it is not missed
    // by anyone who arrives mid-paint. Paused while the tab is in the
    // background — nothing animates where no one is looking.
    window.setTimeout(lapAll, 1200);
    window.setInterval(function () {
      if (!document.hidden) lapAll();
    }, 15000);
  }

  // Light/dark: follows the OS until the visitor picks one, then remembers
  // it. The <head> script applies a saved choice before first paint.
  function initThemeToggle() {
    var btn = document.querySelector("[data-theme-toggle]");
    if (!btn) return;
    var root = document.documentElement;
    var media = window.matchMedia ? window.matchMedia("(prefers-color-scheme: dark)") : null;
    function current() {
      return root.dataset.theme || (media && media.matches ? "dark" : "light");
    }
    function label() {
      btn.setAttribute("aria-label", current() === "dark" ? "Switch to light theme" : "Switch to dark theme");
    }
    btn.addEventListener("click", function () {
      var next = current() === "dark" ? "light" : "dark";
      root.dataset.theme = next;
      try { localStorage.setItem("uxed-theme", next); } catch (e) {}
      label();
    });
    if (media && media.addEventListener) media.addEventListener("change", label);
    label();
  }

  // Home work index: chips filter rows by tag and announce the count.
  function initWorkFilter() {
    var group = document.querySelector("[data-work-filter]");
    if (!group) return;
    var rows = document.querySelectorAll("[data-tags]");
    var status = document.querySelector("[data-work-filter-status]");
    group.addEventListener("click", function (e) {
      var btn = e.target.closest("button");
      if (!btn) return;
      var tag = btn.getAttribute("data-filter");
      Array.prototype.forEach.call(group.querySelectorAll("button"), function (b) {
        b.setAttribute("aria-pressed", String(b === btn));
      });
      var shown = 0;
      Array.prototype.forEach.call(rows, function (row) {
        var match = tag === "all" || row.getAttribute("data-tags").split("|").indexOf(tag) !== -1;
        row.hidden = !match;
        if (match) shown++;
      });
      if (status) status.textContent = shown + (shown === 1 ? " project" : " projects") + " shown";
    });
  }

  function init() {
    initNav();
    initAtomMark();
    initThemeToggle();
    initWorkFilter();
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
