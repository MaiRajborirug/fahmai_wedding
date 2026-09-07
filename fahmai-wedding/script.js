const config = window.WEDDING_CONFIG;
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

function updateCountdown(targetTime) {
  const remaining = Math.max(0, targetTime - Date.now());
  const totalSeconds = Math.floor(remaining / 1000);
  const values = {
    weeks: Math.floor(totalSeconds / 604800),
    days: Math.floor((totalSeconds % 604800) / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
  };

  Object.entries(values).forEach(([unit, value]) => {
    const element = document.querySelector(`[data-unit="${unit}"]`);
    element.querySelector("span").textContent = String(value);
    if (unit === "days") element.hidden = value === 0;
  });
}

function initCountdown() {
  const targetTime = new Date(config.weddingDate).getTime();
  if (Number.isNaN(targetTime)) throw new Error("weddingDate must be a valid ISO date string.");
  updateCountdown(targetTime);
  window.setInterval(() => updateCountdown(targetTime), 1000);
}

function venueMarkup(venue, index) {
  const sectionId = index === 0 ? "location" : `location-${index + 1}`;
  return `
    <section class="venue section-pad" id="${sectionId}" aria-labelledby="venue-${index}">
      <header class="venue__heading reveal reveal--up">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0
            Zm-8 3a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/>
        </svg>
        <p>The Venue</p>
        <h2 id="venue-${index}">${venue.name}</h2>
      </header>
      <iframe
        class="venue__map reveal reveal--up"
        src="${venue.mapEmbedUrl}"
        title="Map of ${venue.name}"
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
        allowfullscreen
      ></iframe>
      <p class="venue__address reveal reveal--up">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0
            Zm-8 3a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/>
        </svg>
        <span>${venue.address}</span>
      </p>
      <a
        class="pill-button pill-button--wide reveal reveal--up"
        href="${venue.directionsUrl}"
        target="_blank"
        rel="noopener"
      >Direction</a>
    </section>`;
}

function initVenues() {
  document.querySelector("#venues").innerHTML = config.venues.map(venueMarkup).join("");
}

function initReveals() {
  const elements = document.querySelectorAll(".reveal");
  if (reducedMotion.matches || !("IntersectionObserver" in window)) {
    elements.forEach((element) => element.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { rootMargin: "0px 0px -8%", threshold: 0.08 },
  );
  elements.forEach((element) => observer.observe(element));
}

function gallerySlide(source, index) {
  return `
    <figure class="carousel__slide">
      <img src="${source}" alt="Wedding gallery photo ${index + 1}" loading="lazy">
    </figure>`;
}

function initGallery() {
  const carousel = document.querySelector(".carousel");
  const track = document.querySelector("#gallery-track");
  const dots = document.querySelector("#gallery-dots");
  track.innerHTML = config.gallery.map(gallerySlide).join("");
  let current = 0;
  let startX = 0;
  let timer;

  const perView = () => {
    if (window.innerWidth >= 850) return 3;
    if (window.innerWidth >= 550) return 2;
    return 1;
  };
  const maxIndex = () => Math.max(0, config.gallery.length - perView());
  const renderDots = () => {
    dots.innerHTML = Array.from({ length: maxIndex() + 1 }, (_, index) =>
      `<button type="button" aria-label="Show photo ${index + 1}"
        data-slide="${index}"></button>`,
    ).join("");
  };
  const show = (index) => {
    current = (index + maxIndex() + 1) % (maxIndex() + 1);
    track.style.transform = `translateX(-${current * (100 / perView())}%)`;
    dots.querySelectorAll("button").forEach((dot, dotIndex) => {
      dot.classList.toggle("is-active", dotIndex === current);
      dot.setAttribute("aria-current", dotIndex === current ? "true" : "false");
    });
  };
  const start = () => {
    if (reducedMotion.matches) return;
    window.clearInterval(timer);
    timer = window.setInterval(() => show(current + 1), 2000);
  };

  renderDots();
  show(0);
  start();
  carousel
    .querySelector(".carousel__button--prev")
    .addEventListener("click", () => show(current - 1));
  carousel
    .querySelector(".carousel__button--next")
    .addEventListener("click", () => show(current + 1));
  dots.addEventListener("click", (event) => {
    const button = event.target.closest("button");
    if (button) show(Number(button.dataset.slide));
  });
  carousel.addEventListener("pointerdown", (event) => {
    startX = event.clientX;
  });
  carousel.addEventListener("pointerup", (event) => {
    const distance = event.clientX - startX;
    if (Math.abs(distance) > 40) show(current + (distance < 0 ? 1 : -1));
  });
  carousel.addEventListener("mouseenter", () => window.clearInterval(timer));
  carousel.addEventListener("mouseleave", start);
  carousel.addEventListener("focusin", () => window.clearInterval(timer));
  carousel.addEventListener("focusout", start);
  window.addEventListener("resize", () => {
    current = Math.min(current, maxIndex());
    renderDots();
    show(current);
  });
}

function initNavigation() {
  const links = document.querySelectorAll(".mobile-nav__link[href^='#']");
  const sections = [...links].map((link) => document.querySelector(link.hash));
  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).at(-1);
      if (!visible) return;
      links.forEach((link) => {
        link.classList.toggle("is-active", link.hash === `#${visible.target.id}`);
      });
    },
    { rootMargin: "-35% 0px -55%", threshold: 0 },
  );
  sections.forEach((section) => observer.observe(section));
}

function init() {
  document.querySelector("#calendar-link").href = config.calendarFile;
  document.querySelector("#instagram-link").href = config.instagramUrl;
  document.querySelector("#rsvp-link").href = config.rsvpUrl;
  initCountdown();
  initVenues();
  initGallery();
  initReveals();
  initNavigation();
}

init();
