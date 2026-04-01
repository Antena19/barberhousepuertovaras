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

  /* Presentación corta (#intro-home): fade-in al entrar en viewport */
  var intro = document.getElementById("intro-home");
  if (intro) {
    var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function introIsVisible() {
      var r = intro.getBoundingClientRect();
      var vh = window.innerHeight || document.documentElement.clientHeight;
      return r.top < vh * 0.9 && r.bottom > vh * 0.1;
    }

    function markIntroInView() {
      intro.classList.add("is-inview");
    }

    if (reduceMotion || !("IntersectionObserver" in window)) {
      markIntroInView();
    } else if (introIsVisible()) {
      markIntroInView();
    } else {
      var obs = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (e) {
            if (e.isIntersecting) {
              markIntroInView();
              obs.disconnect();
            }
          });
        },
        { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
      );
      obs.observe(intro);
    }
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
