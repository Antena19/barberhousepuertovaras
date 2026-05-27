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

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function showMotion(el) {
    el.classList.add("is-visible");
  }

  function isInicioBlock(el) {
    return Boolean(el.closest(".inicio-zone"));
  }

  var inicioWasActive = false;
  var inicioTimers = [];

  function clearInicioTimers() {
    inicioTimers.forEach(clearTimeout);
    inicioTimers = [];
  }

  function getInicioScrollLimit() {
    var servicios = document.getElementById("servicios");
    if (!servicios) return 600;
    return Math.max(200, servicios.offsetTop - 100);
  }

  function isInInicioZone() {
    return window.scrollY < getInicioScrollLimit();
  }

  function resetInicioAnimations() {
    clearInicioTimers();
    var hero = document.getElementById("inicio");
    if (hero) hero.classList.remove("hero--play");
    document.querySelectorAll(".inicio-zone .motion-reveal").forEach(function (el) {
      el.style.transition = "none";
      el.classList.remove("is-visible");
      void el.offsetWidth;
      el.style.transition = "";
    });
  }

  function playInicioAnimations() {
    clearInicioTimers();

    var hero = document.getElementById("inicio");
    var introEls = document.querySelectorAll(".inicio-zone .motion-reveal");

    if (reduceMotion) {
      if (hero) hero.classList.add("hero--play");
      introEls.forEach(showMotion);
      return;
    }

    if (hero) {
      hero.classList.remove("hero--play");
      void hero.offsetWidth;
      hero.classList.add("hero--play");
    }

    introEls.forEach(function (el) {
      el.classList.remove("is-visible");
    });

    var baseDelay = 700;
    var step = 140;

    introEls.forEach(function (el, index) {
      var timer = setTimeout(function () {
        showMotion(el);
      }, baseDelay + index * step);
      inicioTimers.push(timer);
    });
  }

  function updateInicioZone() {
    var inInicio = isInInicioZone();

    if (inInicio && !inicioWasActive) {
      inicioWasActive = true;
      playInicioAnimations();
    } else if (!inInicio && inicioWasActive) {
      inicioWasActive = false;
      resetInicioAnimations();
    }
  }

  function initInicioZone() {
    var hero = document.getElementById("inicio");
    var introEls = document.querySelectorAll(".inicio-zone .motion-reveal");

    if (reduceMotion) {
      if (hero) hero.classList.add("hero--play");
      introEls.forEach(showMotion);
      inicioWasActive = isInInicioZone();
      return;
    }

    var scrollTicking = false;

    function onScroll() {
      if (!scrollTicking) {
        scrollTicking = true;
        requestAnimationFrame(function () {
          updateInicioZone();
          scrollTicking = false;
        });
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", updateInicioZone);

    document.querySelectorAll('a[href="#inicio"]').forEach(function (link) {
      link.addEventListener("click", function () {
        if (reduceMotion) return;

        if (!isInInicioZone()) {
          inicioWasActive = false;
          resetInicioAnimations();
          return;
        }

        inicioWasActive = false;
        resetInicioAnimations();
        inicioWasActive = true;
        playInicioAnimations();
      });
    });

    inicioWasActive = false;
    updateInicioZone();
  }

  /* Animaciones al scroll (resto del sitio) */
  function initScrollMotion(selector) {
    var els = document.querySelectorAll(selector);
    if (!els.length) return;

    if (reduceMotion || !("IntersectionObserver" in window)) {
      els.forEach(showMotion);
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            showMotion(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -5% 0px" }
    );

    var vh = window.innerHeight || document.documentElement.clientHeight;

    els.forEach(function (el) {
      if (isInicioBlock(el)) return;

      var rect = el.getBoundingClientRect();
      if (rect.top < vh * 0.92 && rect.bottom > 0) {
        showMotion(el);
      } else {
        observer.observe(el);
      }
    });
  }

  initInicioZone();
  initScrollMotion(".motion-reveal");
  initScrollMotion(".motion-stagger");

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
