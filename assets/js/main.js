/* =========================================================
   MAIN.JS — all page behavior lives here, in one file.
   It finds elements by data-* attributes set in index.html:

     1. Mobile nav open/close        data-nav-toggle / data-nav-menu
     2. Auto-current-year in footer  data-year
     3. Scroll progress bar + rail   data-scroll-bar / data-scroll-scale
     4. Fade-in sections             class="reveal"
     5. Count-up stats               data-count="N"

   Respects the OS "reduce motion" setting (skips animations).
   To change a behavior, look up the matching data-* block below.
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  const navToggle = document.querySelector("[data-nav-toggle]");
  const navMenu = document.querySelector("[data-nav-menu]");
  const year = document.querySelector("[data-year]");
  const navLabel = navToggle?.querySelector(".sr-only");

  if (year) {
    year.textContent = new Date().getFullYear();
  }

  /* ---------- Mobile nav ---------- */
  if (navToggle && navMenu) {
    const closeMenu = () => {
      navToggle.setAttribute("aria-expanded", "false");
      navMenu.classList.remove("is-open");
      if (navLabel) navLabel.textContent = "Open navigation";
    };

    const openMenu = () => {
      navToggle.setAttribute("aria-expanded", "true");
      navMenu.classList.add("is-open");
      if (navLabel) navLabel.textContent = "Close navigation";
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
          el.textContent = "0";
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
  }

  /* ---------- Active navigation state ---------- */
  const navLinks = document.querySelectorAll(".nav-menu a");
  const trackedSections = ["#about", "#research", "#publications", "#projects", "#insights", "#contact"]
    .map((sel) => document.querySelector(sel))
    .filter(Boolean);

  if (navLinks.length && trackedSections.length && "IntersectionObserver" in window) {
    const linksById = new Map(
      Array.from(navLinks).map((link) => [link.getAttribute("href").slice(1), link])
    );

    const setActive = (sectionId) => {
      navLinks.forEach((link) => {
        const isActive = link.getAttribute("href") === `#${sectionId}`;
        link.classList.toggle("is-active", isActive);
        if (isActive) {
          link.setAttribute("aria-current", "location");
        } else {
          link.removeAttribute("aria-current");
        }
      });
    };

    const navIo = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && linksById.has(entry.target.id)) {
            setActive(entry.target.id);
          }
        });
      },
      { rootMargin: "0px 0px -45% 0px", threshold: 0 }
    );
    trackedSections.forEach((section) => navIo.observe(section));
  }
});
