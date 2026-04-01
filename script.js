/**
 * URL de reservas AgendaPro — reemplaza por tu enlace real.
 */
const BOOKING_URL =
  "https://barberhousestudio.site.agendapro.com/cl/sucursal/479138";

(function () {
  document.querySelectorAll("[data-booking]").forEach(function (el) {
    el.setAttribute("href", BOOKING_URL);
    el.setAttribute("target", "_blank");
    el.setAttribute("rel", "noopener noreferrer");
  });

  var yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("site-nav");
  if (!toggle || !nav) return;

  function setOpen(open) {
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    nav.classList.toggle("is-open", open);
    document.body.style.overflow = open ? "hidden" : "";
  }

  toggle.addEventListener("click", function () {
    var open = toggle.getAttribute("aria-expanded") === "true";
    setOpen(!open);
  });

  nav.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener("click", function () {
      if (window.matchMedia("(max-width: 899px)").matches) {
        setOpen(false);
      }
    });
  });

  window.addEventListener("resize", function () {
    if (window.matchMedia("(min-width: 900px)").matches) {
      setOpen(false);
    }
  });
})();
