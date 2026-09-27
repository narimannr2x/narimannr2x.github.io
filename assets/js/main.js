/* =========================================================
   MAIN.JS — all page behavior lives here, in one file.
   It finds elements by data-* attributes set in index.html:

     1. Mobile nav open/close        data-nav-toggle / data-nav-menu
     2. Auto-current-year in footer  data-year
     3. Scroll progress bar + rail   data-scroll-bar / data-scroll-scale
     4. Fade-in sections             class="reveal"
     5. Clinician / engineer lens    data-lens-set
     6. Console greeting             (DevTools only)
     7. Pinned story timeline        data-story

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

  /* ---------- Clinician / engineer lens ---------- */
  const lensButtons = document.querySelectorAll("[data-lens-set]");
  const applyLens = (lens) => {
    if (lens === "engineer") {
      document.documentElement.dataset.lens = "engineer";
    } else {
      delete document.documentElement.dataset.lens;
    }
    lensButtons.forEach((button) => {
      button.setAttribute("aria-pressed", String(button.dataset.lensSet === lens));
    });
    try { localStorage.setItem("lens", lens); } catch (e) { /* storage blocked */ }
  };

  lensButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const lens = button.dataset.lensSet;
      const current = document.documentElement.dataset.lens || "clinician";
      if (lens === current) return;
      if (document.startViewTransition && !reduceMotion) {
        document.startViewTransition(() => applyLens(lens));
      } else {
        applyLens(lens);
      }
    });
  });

  if (lensButtons.length) {
    applyLens(document.documentElement.dataset.lens || "clinician");
  }

  /* ---------- Console note for curious readers ---------- */
  console.log(
    "%cNN%c  You opened the console. You're my kind of reader.\n\n" +
      "Code:  https://github.com/narimannr2x\n" +
      "Email: narimannaderi.md@gmail.com",
    "background:#0b1620;color:#f1f4ee;font:700 14px Georgia,serif;padding:4px 8px;border-bottom:2px solid #d98a2b;",
    "color:#0f6c78;font:500 12px ui-monospace,monospace;"
  );

  /* ---------- Story: pinned scroll timeline ---------- */
  const story = document.querySelector("[data-story]");
  let updateStory = () => {};

  if (story) {
    const pin = story.querySelector(".story-pin");
    const chapters = Array.from(story.querySelectorAll(".story-chapter"));
    const navButtons = Array.from(story.querySelectorAll("[data-story-go]"));
    const indexEl = story.querySelector("[data-story-index]");
    const totalEl = story.querySelector("[data-story-total]");
    const codeText = story.querySelector("[data-scrub-offset]");
    const codeIndex = codeText ? chapters.indexOf(codeText.closest(".story-chapter")) : -1;
    const hrEl = story.querySelector("[data-hr]");
    const total = chapters.length;
    const pad = (n) => String(n).padStart(2, "0");
    const clamp01 = (v) => Math.min(Math.max(v, 0), 1);
    const pinQuery = window.matchMedia(
      "(min-height: 520px) and (prefers-reduced-motion: no-preference)"
    );
    let active = -1;

    story.style.setProperty("--story-steps", total);
    if (totalEl) totalEl.textContent = pad(total);

    // SVG startOffset is an attribute, not a CSS property, so the code
    // riding the heartbeat line is scrubbed here instead of in site.css.
    const setCodeOffset = (cp) => {
      if (!codeText) return;
      const t = clamp01((cp - 0.25) / 0.6);
      codeText.setAttribute("startOffset", `${(100 - t * 96).toFixed(2)}%`);
    };

    const setActive = (i) => {
      if (i === active) return;
      active = i;
      chapters.forEach((chapter, n) => {
        chapter.classList.toggle("is-active", n === i);
        chapter.classList.toggle("is-past", n < i);
      });
      navButtons.forEach((button, n) => {
        if (n === i) button.setAttribute("aria-current", "step");
        else button.removeAttribute("aria-current");
      });
      if (indexEl) indexEl.textContent = pad(i + 1);
    };

    const travelInfo = () => {
      const stickTop = parseFloat(getComputedStyle(pin).top) || 0;
      return { stickTop, travel: story.offsetHeight - pin.offsetHeight };
    };

    updateStory = () => {
      if (!story.classList.contains("is-pinned")) return;
      const { stickTop, travel } = travelInfo();
      const scrolled = stickTop - story.getBoundingClientRect().top;
      const p = travel > 0 ? clamp01(scrolled / travel) : 0;
      const f = p * total;
      chapters.forEach((chapter, n) => {
        const cp = clamp01(f - n).toFixed(3);
        chapter.style.setProperty("--cp", cp);
        navButtons[n]?.style.setProperty("--np", cp);
      });
      setCodeOffset(clamp01(f - codeIndex));
      setActive(Math.min(total - 1, Math.floor(f)));
    };

    navButtons.forEach((button, n) => {
      button.addEventListener("click", () => {
        const { stickTop, travel } = travelInfo();
        const storyTop = story.getBoundingClientRect().top + window.scrollY - stickTop;
        window.scrollTo({ top: storyTop + ((n + 0.8) / total) * travel });
      });
    });

    const setMode = () => {
      story.classList.toggle("is-pinned", pinQuery.matches);
      active = -1;
      if (pinQuery.matches) {
        updateStory();
      } else {
        chapters.forEach((chapter) => {
          chapter.classList.remove("is-active", "is-past");
          chapter.style.removeProperty("--cp");
        });
        setCodeOffset(1);
      }
    };

    pinQuery.addEventListener("change", setMode);
    window.addEventListener("resize", updateStory, { passive: true });
    setMode();

    if (pin && !reduceMotion && window.matchMedia("(pointer: fine)").matches) {
      pin.addEventListener("pointermove", (event) => {
        const r = pin.getBoundingClientRect();
        const x = (event.clientX - r.left) / r.width;
        const y = (event.clientY - r.top) / r.height;
        pin.style.setProperty("--mx", `${(x * 100).toFixed(1)}%`);
        pin.style.setProperty("--my", `${(y * 100).toFixed(1)}%`);
        pin.style.setProperty("--tx", ((x - 0.5) * 10).toFixed(2));
        pin.style.setProperty("--ty", ((0.5 - y) * 7).toFixed(2));
      });
      pin.addEventListener("pointerleave", () => {
        pin.style.setProperty("--tx", "0");
        pin.style.setProperty("--ty", "0");
      });
    }

    if (hrEl && !reduceMotion) {
      setInterval(() => {
        if (!document.hidden) hrEl.textContent = 70 + Math.round(Math.random() * 6);
      }, 1500);
    }
  }

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
      updateStory();
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

  /* ---------- Active navigation state ---------- */
  const navLinks = document.querySelectorAll(".nav-menu a");
  const pagePath = window.location.pathname.split("/").pop() || "index.html";
  const onBlog = pagePath === "blog.html";

  if (onBlog) {
    navLinks.forEach((link) => {
      const href = link.getAttribute("href") || "";
      const isBlog = href.endsWith("blog.html");
      link.classList.toggle("is-active", isBlog);
      if (isBlog) {
        link.setAttribute("aria-current", "page");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  }

  const trackedSections = ["#about", "#publications", "#contact"]
    .map((sel) => document.querySelector(sel))
    .filter(Boolean);

  if (!onBlog && navLinks.length && trackedSections.length && "IntersectionObserver" in window) {
    const linksById = new Map(
      Array.from(navLinks)
        .filter((link) => (link.getAttribute("href") || "").startsWith("#"))
        .map((link) => [link.getAttribute("href").slice(1), link])
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
