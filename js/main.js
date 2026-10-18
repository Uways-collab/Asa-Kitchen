/* ============================================================
   Àṣà Kitchen — interactions
   ============================================================ */
(function () {
  "use strict";

  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------------------------------------------------------- Header */
  const header = $("#site-header");
  const progress = $("#scroll-progress");

  function onScroll() {
    const y = window.scrollY;
    header.classList.toggle("is-scrolled", y > 40);

    const doc = document.documentElement;
    const max = doc.scrollHeight - window.innerHeight;
    if (progress) progress.style.width = `${max > 0 ? (y / max) * 100 : 0}%`;
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ------------------------------------------------------ Mobile nav */
  const navToggle = $("#nav-toggle");
  const nav = $("#site-nav");

  function closeNav() {
    nav.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
    navToggle.setAttribute("aria-label", "Open menu");
    document.body.style.overflow = "";
  }

  navToggle.addEventListener("click", () => {
    const open = nav.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(open));
    navToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    document.body.style.overflow = open ? "hidden" : "";
  });

  $$("a", nav).forEach((a) => a.addEventListener("click", closeNav));
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeNav();
  });

  /* ------------------------------------------------- Reveal on scroll */
  const revealEls = $$(".reveal");

  // Stagger siblings for a graceful cascade
  const groups = new Map();
  revealEls.forEach((el) => {
    const parent = el.parentElement;
    if (!groups.has(parent)) groups.set(parent, []);
    groups.get(parent).push(el);
  });
  groups.forEach((els) => {
    els.forEach((el, i) => {
      if (els.length > 1 && els.length <= 8) {
        el.style.setProperty("--reveal-delay", `${Math.min(i * 0.09, 0.6)}s`);
      }
    });
  });

  if ("IntersectionObserver" in window && !prefersReducedMotion) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("is-visible"));
  }

  /* ------------------------------------------------------- Menu tabs */
  const tabButtons = $$(".menu-tab");
  const tabPanels = $$(".menu-panel");

  tabButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      tabButtons.forEach((b) => {
        b.classList.toggle("is-active", b === btn);
        b.setAttribute("aria-selected", String(b === btn));
      });
      tabPanels.forEach((panel) => {
        const active = panel.id === `tab-${btn.dataset.tab}`;
        panel.classList.toggle("is-active", active);
        panel.hidden = !active;
      });
    });
  });

  /* ------------------------------------------------ Quote slider */
  const slides = $$(".quote-slide");
  const dotsWrap = $("#quote-dots");
  let current = 0;
  let timer = null;
  const AUTOPLAY_MS = 7000;

  if (slides.length && dotsWrap) {
    slides.forEach((_, i) => {
      const dot = document.createElement("button");
      dot.className = `quote-dot${i === 0 ? " is-active" : ""}`;
      dot.type = "button";
      dot.setAttribute("role", "tab");
      dot.setAttribute("aria-label", `Testimonial ${i + 1}`);
      dot.addEventListener("click", () => goTo(i, true));
      dotsWrap.appendChild(dot);
    });

    const dots = $$(".quote-dot", dotsWrap);

    function goTo(index, userInitiated) {
      current = (index + slides.length) % slides.length;
      slides.forEach((s, i) => s.classList.toggle("is-active", i === current));
      dots.forEach((d, i) => d.classList.toggle("is-active", i === current));
      if (userInitiated) restartAutoplay();
    }

    function restartAutoplay() {
      if (prefersReducedMotion) return;
      clearInterval(timer);
      timer = setInterval(() => goTo(current + 1, false), AUTOPLAY_MS);
    }

    $("#quote-prev").addEventListener("click", () => goTo(current - 1, true));
    $("#quote-next").addEventListener("click", () => goTo(current + 1, true));

    // swipe support
    const slider = $("#quote-slider");
    let startX = 0;
    slider.addEventListener("touchstart", (e) => (startX = e.touches[0].clientX), { passive: true });
    slider.addEventListener(
      "touchend",
      (e) => {
        const dx = e.changedTouches[0].clientX - startX;
        if (Math.abs(dx) > 48) goTo(current + (dx < 0 ? 1 : -1), true);
      },
      { passive: true }
    );

    restartAutoplay();
  }

  /* -------------------------------------------- Open / closed status */
  const statusWrap = $("#open-status");

  function updateOpenStatus() {
    if (!statusWrap) return;

    // Lagos time (UTC+1)
    const now = new Date();
    const fmt = new Intl.DateTimeFormat("en-NG", {
      timeZone: lagosTimeZone(),
      weekday: "short",
      hour: "numeric",
      minute: "numeric",
      hour12: false,
    });
    const parts = fmt.formatToParts(now);
    const get = (type) => parts.find((p) => p.type === type)?.value;
    const weekday = get("weekday");
    const hour = parseInt(get("hour"), 10);
    const minute = parseInt(get("minute"), 10);
    const time = hour + minute / 60;

    // Hours: Mon closed, Tue-Thu 17.5-23, Fri-Sat 17.5-24.5, Sun 12-21
    let open = false;
    let message = "";

    const dayMap = { Mon: 0, Tue: 1, Wed: 2, Thu: 3, Fri: 4, Sat: 5, Sun: 6 };
    const day = dayMap[weekday];

    if (day === 0) {
      message = "Closed Mondays — see you Tuesday at 5:30 pm";
    } else if (day >= 1 && day <= 3) {
      open = time >= 17.5 && time < 23;
      message = open ? "Open now — dinner service until 11:00 pm" : "Closed now — opens 5:30 pm";
    } else if (day === 4 || day === 5) {
      open = time >= 17.5 || time < 0.5;
      message = open ? "Open now — kitchen until 12:30 am" : "Closed now — opens 5:30 pm";
    } else {
      open = time >= 12 && time < 21;
      message = open ? "Open now — Sunday table until 9:00 pm" : "Closed now — opens 12:00 pm";
    }

    statusWrap.classList.toggle("is-open", open);
    statusWrap.classList.toggle("is-closed", !open);
    $(".status-text", statusWrap).textContent = message;
  }

  function lagosTimeZone() {
    try {
      Intl.DateTimeFormat(undefined, { timeZone: "Africa/Lagos" });
      return "Africa/Lagos";
    } catch {
      return "UTC";
    }
  }

  updateOpenStatus();
  setInterval(updateOpenStatus, 60000);

  /* --------------------------------------------- Reservation form */
  const form = $("#reserve-form");

  if (form) {
    const dateInput = $("#r-date");
    // prevent past dates
    const today = new Date();
    const iso = today.toISOString().split("T")[0];
    dateInput.min = iso;

    const showError = (field, msg) => {
      const wrap = field.closest(".field");
      wrap.classList.add("has-error");
      const slot = wrap.querySelector(".field-error");
      if (slot) slot.textContent = msg;
    };
    const clearError = (field) => {
      const wrap = field.closest(".field");
      wrap.classList.remove("has-error");
      const slot = wrap.querySelector(".field-error");
      if (slot) slot.textContent = "";
    };

    const validators = {
      "r-name": (v) => (v.trim().length < 2 ? "Please tell us your name." : ""),
      "r-email": (v) => (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) ? "Enter a valid email address." : ""),
      "r-phone": (v) => (v.replace(/\D/g, "").length < 7 ? "Enter a reachable phone number." : ""),
      "r-guests": (v) => (!v ? "How many guests?" : ""),
      "r-date": (v) => (!v ? "Choose a date." : v < iso ? "That date has passed." : ""),
      "r-time": (v) => (!v ? "Choose a time." : ""),
    };

    Object.keys(validators).forEach((id) => {
      const field = document.getElementById(id);
      field.addEventListener("blur", () => {
        const msg = validators[id](field.value);
        if (msg) showError(field, msg);
        else clearError(field);
      });
      field.addEventListener("input", () => clearError(field));
      field.addEventListener("change", () => clearError(field));
    });

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      let valid = true;

      Object.keys(validators).forEach((id) => {
        const field = document.getElementById(id);
        const msg = validators[id](field.value);
        if (msg) {
          showError(field, msg);
          valid = false;
        } else {
          clearError(field);
        }
      });

      if (!valid) {
        const firstError = form.querySelector(".has-error input, .has-error select");
        if (firstError) firstError.focus();
        return;
      }

      // demo success — no backend
      const success = $("#form-success");
      success.hidden = false;
      form.setAttribute("aria-busy", "true");
      setTimeout(() => {
        form.reset();
        success.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth", block: "center" });
      }, 200);
      setTimeout(() => {
        success.hidden = true;
        form.removeAttribute("aria-busy");
      }, 9000);
    });
  }

  /* --------------------------------------------------- Newsletter */
  const newsForm = $("#news-form");
  if (newsForm) {
    newsForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const input = newsForm.querySelector("input[type='email']");
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value.trim())) {
        input.focus();
        input.setAttribute("aria-invalid", "true");
        return;
      }
      input.removeAttribute("aria-invalid");
      newsForm.hidden = true;
      const note = $("#news-note");
      note.hidden = false;
    });
  }

  /* ------------------------------------------------------- Footer year */
  const year = $("#year");
  if (year) year.textContent = String(new Date().getFullYear());

  /* --------------------------------------------- Hero parallax (light) */
  const heroBg = $(".hero-bg");
  if (heroBg && !prefersReducedMotion && window.matchMedia("(pointer: fine)").matches) {
    let ticking = false;
    window.addEventListener(
      "scroll",
      () => {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(() => {
          const y = Math.min(window.scrollY, window.innerHeight);
          heroBg.style.translate = `0 ${y * 0.18}px`;
          ticking = false;
        });
      },
      { passive: true }
    );
  }

  /* --------------------------------------- Smooth anchor offset safety */
  $$('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
      const id = anchor.getAttribute("href");
      if (!id || id === "#") return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth", block: "start" });
      history.pushState(null, "", id);
    });
  });
})();
