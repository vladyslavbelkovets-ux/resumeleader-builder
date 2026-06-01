/* ResumeLeader builder — clickable static interactivity.
   Each block is guarded by element presence so one file can serve every page. */
(function () {
  "use strict";

  /* ---- Template gallery: filter tabs ---- */
  var tabs = document.getElementById("tabs");
  var grid = document.getElementById("grid");
  if (tabs && grid) {
    tabs.addEventListener("click", function (e) {
      var btn = e.target.closest(".tab");
      if (!btn) return;
      var filter = btn.getAttribute("data-filter");
      tabs.querySelectorAll(".tab").forEach(function (t) { t.classList.remove("is-active"); });
      btn.classList.add("is-active");
      grid.querySelectorAll(".card").forEach(function (card) {
        var show = filter === "all" || card.getAttribute("data-cat") === filter;
        card.classList.toggle("is-hidden", !show);
      });
    });
  }

  /* ---- Editor: step navigation + progress + live preview ---- */
  var stepsRail = document.getElementById("steps");
  if (stepsRail) {
    var railItems = Array.prototype.slice.call(stepsRail.querySelectorAll(".step-item"));
    var forms = Array.prototype.slice.call(document.querySelectorAll(".step-form"));
    var total = railItems.length;
    var fill = document.getElementById("progress-fill");
    var badge = document.getElementById("progress-badge");
    var current = 0;

    function go(index) {
      current = Math.max(0, Math.min(total - 1, index));
      railItems.forEach(function (it, i) { it.classList.toggle("is-active", i === current); });
      forms.forEach(function (f, i) { f.classList.toggle("is-active", i === current); });
      var pct = Math.round(((current + 1) / total) * 100);
      if (fill) fill.style.width = pct + "%";
      if (badge) badge.textContent = pct + "%";
    }

    stepsRail.addEventListener("click", function (e) {
      var item = e.target.closest(".step-item");
      if (!item) return;
      go(parseInt(item.getAttribute("data-step"), 10));
    });

    document.querySelectorAll("[data-next]").forEach(function (btn) {
      btn.addEventListener("click", function () { go(current + 1); });
    });

    /* Live preview from Personal details */
    var first = document.getElementById("pv-first");
    var last = document.getElementById("pv-last");
    var title = document.getElementById("pv-title");
    var nameOut = document.getElementById("pv-name");
    var jobOut = document.getElementById("pv-job");

    function syncName() {
      var full = [first && first.value, last && last.value].filter(Boolean).join(" ").trim();
      if (nameOut) nameOut.textContent = full ? full.toUpperCase() : "YOUR NAME";
    }
    function syncJob() {
      if (jobOut) jobOut.textContent = (title && title.value) ? title.value : "Desired job title";
    }
    if (first) first.addEventListener("input", syncName);
    if (last) last.addEventListener("input", syncName);
    if (title) title.addEventListener("input", syncJob);

    go(0); /* initialize progress to step 1 of 7 */
  }
})();
