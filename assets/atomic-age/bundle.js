/* @ds-bundle: {"format":4,"namespace":"AtomicAge","components":[{"name":"Icon"},{"name":"Tabs"},{"name":"Toggle"},{"name":"Modal"},{"name":"Toast"}]} */
/* Atomic Age runtime — a small vanilla helper library (no framework).
   It progressively enhances markup that already uses the atm- classes.
   window.AtomicAge is the namespace global. Every enhancer is idempotent,
   guards missing nodes, and honors prefers-reduced-motion. */
(function (root) {
  "use strict";

  var SVG = "http://www.w3.org/2000/svg";
  var mq = (root.matchMedia && root.matchMedia("(prefers-reduced-motion: reduce)")) || { matches: false };
  function reduced() { return !!mq.matches; }

  // ---- Icon set: single-stroke, 24px, currentColor ----
  var ICONS = {
    star: 'M12 3l2.2 6.3H21l-5.4 4 2 6.6L12 15.9 6.4 19.9l2-6.6L3 9.3h6.8z',
    spark: 'M12 3v6M12 15v6M3 12h6M15 12h6',
    check: 'M4 12.5l5 5L20 6',
    plus: 'M12 5v14 M5 12h14',
    arrow: 'M5 12h14 M13 6l6 6-6 6',
    search: 'CIRCLE:11,11,7|M20 20l-4.3-4.3',
    close: 'M6 6l12 12 M18 6L6 18',
    bell: 'M6 9a6 6 0 1112 0c0 5 2 6 2 6H4s2-1 2-6z M10 21a2 2 0 004 0',
    info: 'CIRCLE:12,12,9|M12 11v5 M12 8h.01',
    warning: 'M12 3l9 16H3z M12 10v4 M12 17h.01',
    error: 'CIRCLE:12,12,9|M12 8v5 M12 16h.01',
    rocket: 'M12 3c3.5 1.6 5 5 5 8l-2.2 2.2H9.2L7 13c0-3 1.5-6.4 5-10z M9.5 15.5L7 20l4.5-2.5 M14.5 15.5L17 20l-4.5-2.5',
    globe: 'CIRCLE:12,12,9|M3 12h18 M12 3c3 3.5 3 14 0 18 M12 3c-3 3.5-3 14 0 18',
    signal: 'M4 20V10 M10 20V4 M16 20v-8 M22 20V7',
    user: 'CIRCLE:12,8,4|M4 21c1.5-4 5-6 8-6s6.5 2 8 6',
    heart: 'M12 20S4 14.5 4 9a4 4 0 018-1 4 4 0 018 1c0 5.5-8 11-8 11z',
    atom: 'ATOM'
  };

  function svgEl(name, size) {
    var s = document.createElementNS(SVG, "svg");
    s.setAttribute("viewBox", "0 0 24 24");
    s.setAttribute("width", size || 24);
    s.setAttribute("height", size || 24);
    s.setAttribute("fill", "none");
    s.setAttribute("stroke", "currentColor");
    s.setAttribute("stroke-width", "1.8");
    s.setAttribute("stroke-linecap", "round");
    s.setAttribute("stroke-linejoin", "round");
    s.setAttribute("aria-hidden", "true");
    var spec = ICONS[name] || ICONS.star;
    if (spec === "ATOM") {
      addCircle(s, 12, 12, 2, true);
      [0, 60, 120].forEach(function (deg) {
        var e = document.createElementNS(SVG, "ellipse");
        e.setAttribute("cx", 12); e.setAttribute("cy", 12);
        e.setAttribute("rx", 10); e.setAttribute("ry", 4);
        e.setAttribute("transform", "rotate(" + deg + " 12 12)");
        s.appendChild(e);
      });
      return s;
    }
    spec.split("|").forEach(function (part) {
      if (part.indexOf("CIRCLE:") === 0) {
        var c = part.slice(7).split(",");
        addCircle(s, +c[0], +c[1], +c[2], false);
      } else {
        var p = document.createElementNS(SVG, "path");
        p.setAttribute("d", part);
        s.appendChild(p);
      }
    });
    return s;
  }
  function addCircle(s, cx, cy, r, filled) {
    var c = document.createElementNS(SVG, "circle");
    c.setAttribute("cx", cx); c.setAttribute("cy", cy); c.setAttribute("r", r);
    if (filled) c.setAttribute("fill", "currentColor");
    s.appendChild(c);
  }

  // ---- Delight: count-up ----
  function count(el, opts) {
    if (!el) return;
    opts = opts || {};
    var to = parseFloat(el.getAttribute("data-atm-count") || opts.to || el.textContent) || 0;
    var dec = opts.decimals != null ? opts.decimals : (el.getAttribute("data-atm-decimals") || 0) | 0;
    var prefix = el.getAttribute("data-atm-prefix") || "";
    var suffix = el.getAttribute("data-atm-suffix") || "";
    if (reduced()) { el.textContent = prefix + to.toFixed(dec) + suffix; return; }
    var dur = opts.duration || 900, start = null;
    function frame(t) {
      if (start == null) start = t;
      var k = Math.min(1, (t - start) / dur);
      var e = 1 - Math.pow(1 - k, 3);
      el.textContent = prefix + (to * e).toFixed(dec) + suffix;
      if (k < 1) requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }

  // ---- Delight: sparkle burst around a node ----
  function sparkle(target, n) {
    if (!target || reduced()) return;
    var host = target;
    if (getComputedStyle(host).position === "static") host.style.position = "relative";
    host.classList.add("atm-sparkle-host");
    n = n || 6;
    for (var i = 0; i < n; i++) {
      (function (i) {
        var b = document.createElement("span");
        b.className = "atm-spark-bit";
        b.appendChild(svgEl("spark", 12));
        var ang = (Math.PI * 2 * i) / n, dist = 16 + Math.random() * 14;
        b.style.left = "calc(50% + " + Math.cos(ang) * dist + "px)";
        b.style.top = "calc(50% + " + Math.sin(ang) * dist + "px)";
        b.style.animationDelay = (Math.random() * 80) + "ms";
        host.appendChild(b);
        setTimeout(function () { b.remove(); }, 760);
      })(i);
    }
  }

  // ---- Harden: focus trap for a dialog ----
  var FOCUSABLE = 'a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])';
  var openModal = null, lastFocus = null;
  function trapKey(e) {
    if (!openModal) return;
    if (e.key === "Escape") { closeModal(); return; }
    if (e.key !== "Tab") return;
    var nodes = Array.prototype.filter.call(openModal.querySelectorAll(FOCUSABLE), function (n) { return n.offsetParent !== null; });
    if (!nodes.length) return;
    var first = nodes[0], last = nodes[nodes.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  }
  function showModal(m) {
    if (!m) return;
    lastFocus = document.activeElement;
    m.hidden = false;
    openModal = m;
    document.documentElement.classList.add("atm-scroll-lock");
    document.addEventListener("keydown", trapKey, true);
    var f = m.querySelector(FOCUSABLE); if (f) f.focus();
  }
  function closeModal() {
    if (!openModal) return;
    openModal.hidden = true;
    document.documentElement.classList.remove("atm-scroll-lock");
    document.removeEventListener("keydown", trapKey, true);
    if (lastFocus && lastFocus.focus) lastFocus.focus();
    openModal = null;
  }

  // ---- Progressive enhancement ----
  function enhance(scope) {
    scope = scope || document;

    scope.querySelectorAll("[data-atm-icon]").forEach(function (el) {
      if (el.__atm) return; el.__atm = 1;
      el.appendChild(svgEl(el.getAttribute("data-atm-icon"), el.getAttribute("data-atm-size")));
    });

    // Tabs: roving focus + arrow-key navigation
    scope.querySelectorAll("[data-atm-tabs]").forEach(function (group) {
      if (group.__atm) return; group.__atm = 1;
      var tabs = Array.prototype.slice.call(group.querySelectorAll('[role="tab"]'));
      function select(tab) {
        tabs.forEach(function (t) {
          var on = t === tab;
          t.classList.toggle("is-active", on);
          t.setAttribute("aria-selected", on ? "true" : "false");
          t.setAttribute("tabindex", on ? "0" : "-1");
          var panel = t.getAttribute("aria-controls") && document.getElementById(t.getAttribute("aria-controls"));
          if (panel) panel.hidden = !on;
        });
      }
      tabs.forEach(function (tab, i) {
        if (!tab.hasAttribute("tabindex")) tab.setAttribute("tabindex", tab.classList.contains("is-active") ? "0" : "-1");
        tab.addEventListener("click", function () { select(tab); });
        tab.addEventListener("keydown", function (e) {
          var j = i;
          if (e.key === "ArrowRight" || e.key === "ArrowDown") j = (i + 1) % tabs.length;
          else if (e.key === "ArrowLeft" || e.key === "ArrowUp") j = (i - 1 + tabs.length) % tabs.length;
          else if (e.key === "Home") j = 0;
          else if (e.key === "End") j = tabs.length - 1;
          else return;
          e.preventDefault(); tabs[j].focus(); select(tabs[j]);
        });
      });
    });

    scope.querySelectorAll("[data-atm-dismiss]").forEach(function (btn) {
      if (btn.__atm) return; btn.__atm = 1;
      btn.addEventListener("click", function () {
        var t = btn.closest("[data-atm-dismissable]") || btn.parentElement;
        if (t) t.remove();
      });
    });

    scope.querySelectorAll("[data-atm-open]").forEach(function (btn) {
      if (btn.__atm) return; btn.__atm = 1;
      btn.addEventListener("click", function () { showModal(document.getElementById(btn.getAttribute("data-atm-open"))); });
    });
    scope.querySelectorAll("[data-atm-close]").forEach(function (btn) {
      if (btn.__atm) return; btn.__atm = 1;
      btn.addEventListener("click", function () {
        var m = document.getElementById(btn.getAttribute("data-atm-close")) || btn.closest("[data-atm-modal]");
        if (m === openModal) closeModal(); else if (m) m.hidden = true;
      });
    });

    // Count-up: run when scrolled into view (or immediately if no observer)
    scope.querySelectorAll("[data-atm-count]").forEach(function (el) {
      if (el.__atm) return; el.__atm = 1;
      if (root.IntersectionObserver) {
        var io = new IntersectionObserver(function (entries) {
          entries.forEach(function (en) { if (en.isIntersecting) { count(el); io.disconnect(); } });
        }, { threshold: 0.4 });
        io.observe(el);
      } else { count(el); }
    });

    return scope;
  }

  function toast(message, opts) {
    opts = opts || {};
    var host = document.getElementById("atm-toast-host");
    if (!host) {
      host = document.createElement("div");
      host.id = "atm-toast-host";
      host.setAttribute("role", "status");
      host.setAttribute("aria-live", "polite");
      host.style.cssText = "position:fixed;bottom:24px;left:50%;transform:translateX(-50%);display:flex;flex-direction:column;gap:8px;z-index:1400;";
      document.body.appendChild(host);
    }
    while (host.children.length >= 4) host.removeChild(host.firstChild);
    var t = document.createElement("div");
    t.className = "atm-toast atm-pop-in";
    t.appendChild(svgEl(opts.icon || "check", 18));
    var span = document.createElement("span");
    span.className = "atm-toast__msg";
    span.textContent = message;
    t.appendChild(span);
    host.appendChild(t);
    if (opts.icon !== "warning" && opts.icon !== "error") sparkle(t, 5);
    setTimeout(function () { t.remove(); }, opts.duration || 3200);
    return t;
  }

  root.AtomicAge = {
    version: "1.1.0",
    namespace: "AtomicAge",
    icons: Object.keys(ICONS),
    icon: svgEl,
    enhance: enhance,
    toast: toast,
    count: count,
    sparkle: sparkle,
    openModal: showModal,
    closeModal: closeModal,
    reducedMotion: reduced
  };

  if (document.readyState !== "loading") enhance(document);
  else document.addEventListener("DOMContentLoaded", function () { enhance(document); });
})(window);
