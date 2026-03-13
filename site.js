const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)",
);

document.querySelectorAll("[data-year]").forEach((node) => {
  node.textContent = new Date().getFullYear();
});

if (!prefersReducedMotion.matches) {
  const root = document.documentElement;
  let frameId = 0;

  window.addEventListener(
    "pointermove",
    (event) => {
      cancelAnimationFrame(frameId);
      frameId = requestAnimationFrame(() => {
        root.style.setProperty("--pointer-x", `${event.clientX}px`);
        root.style.setProperty("--pointer-y", `${event.clientY}px`);
      });
    },
    { passive: true },
  );
}

const revealItems = document.querySelectorAll("[data-reveal]");

if (prefersReducedMotion.matches) {
  revealItems.forEach((item) => item.classList.add("is-visible"));
} else if (revealItems.length) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.18,
      rootMargin: "0px 0px -6% 0px",
    },
  );

  revealItems.forEach((item) => revealObserver.observe(item));
}

const bookingForm = document.getElementById("booking-form");
const formStatus = document.getElementById("form-status");

if (bookingForm && formStatus) {
  bookingForm.addEventListener("submit", (event) => {
    event.preventDefault();
    formStatus.hidden = false;
    formStatus.textContent = "Request received. We will follow up soon.";
    bookingForm.reset();
  });
}
