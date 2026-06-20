document.addEventListener("DOMContentLoaded", () => {
  const navToggle = document.querySelector("[data-nav-toggle]");
  const navMenu = document.querySelector("[data-nav-menu]");
  const year = document.querySelector("[data-year]");

  if (year) {
    year.textContent = new Date().getFullYear();
  }

  /* ---------- Mobile nav ---------- */
  if (navToggle && navMenu) {
    const closeMenu = () => {
      navToggle.setAttribute("aria-expanded", "false");
      navMenu.classList.remove("is-open");
    };

    const openMenu = () => {
      navToggle.setAttribute("aria-expanded", "true");
      navMenu.classList.add("is-open");
    };

    navToggle.addEventListener("click", () => {
      const expanded = navToggle.getAttribute("aria-expanded") === "true";
      expanded ? closeMenu() : openMenu();
    });

    navMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", closeMenu);
    });

    document.addEventListener("click", (event) => {
      if (!navMenu.classList.contains("is-open")) return;
      if (!navMenu.contains(event.target) && !navToggle.contains(event.target)) {
        closeMenu();
      }
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeMenu();
    });
  }

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Scroll progress bar + scale ---------- */
  const scrollBar = document.querySelector("[data-scroll-bar]");
  const scrollScale = document.querySelector("[data-scroll-scale]");
  const scaleMarker = scrollScale
    ? document.createElement("div")
    : null;

  if (scaleMarker) {
    scaleMarker.style.cssText =
      "position:absolute;left:-3px;width:8px;height:2px;background:var(--cyan-deep);transform:translateY(0);transition:transform 100ms linear;";
    scrollScale.appendChild(scaleMarker);
  }

  let ticking = false;
  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      const pct = max > 0 ? doc.scrollTop / max : 0;
      if (scrollBar) scrollBar.style.width = pct * 100 + "%";
      if (scaleMarker) {
        const h = scrollScale.offsetHeight;
        scaleMarker.style.transform = `translateY(${pct * h}px)`;
      }
      ticking = false;
    });
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Calibration curve draw ---------- */
  const calCurve = document.querySelector("[data-cal-curve]");
  const calPoints = document.querySelectorAll("[data-cal-point]");

  if (calCurve && !reduceMotion) {
    const draw = () => {
      calCurve.classList.add("is-drawn");
      calPoints.forEach((p, i) => {
        setTimeout(() => p.classList.add("is-drawn"), 600 + i * 180);
      });
    };
    setTimeout(draw, 500);
  } else if (calCurve) {
    calCurve.classList.add("is-drawn");
    calPoints.forEach((p) => p.classList.add("is-drawn"));
  }

  /* ---------- IntersectionObserver reveals ---------- */
  const reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && !reduceMotion) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
    );
    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add("is-visible"));
  }

  /* ---------- Animated counters ---------- */
  const counters = document.querySelectorAll("[data-count]");
  if (counters.length && "IntersectionObserver" in window && !reduceMotion) {
    const cio = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target;
          const target = parseInt(el.dataset.count, 10);
          const dur = 1200;
          const start = performance.now();
          const tick = (now) => {
            const t = Math.min((now - start) / dur, 1);
            const eased = 1 - Math.pow(1 - t, 3);
            el.textContent = Math.round(eased * target);
            if (t < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
          cio.unobserve(el);
        });
      },
      { threshold: 0.5 }
    );
    counters.forEach((el) => cio.observe(el));
  } else {
    counters.forEach((el) => (el.textContent = el.dataset.count));
  }
});
