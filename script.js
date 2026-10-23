
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

// Mobile navigation
menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");

  menuToggle.textContent = isOpen ? "✕" : "☰";
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.textContent = "☰";
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

// Automatic footer year
document.getElementById("year").textContent =
  new Date().getFullYear();

// Animate statistics when visible
const counters = document.querySelectorAll(".counter");

function animateCounter(counter) {
  const target = Number(counter.dataset.target);
  const duration = 1400;
  const startTime = performance.now();

  function update(currentTime) {
    const progress = Math.min(
      (currentTime - startTime) / duration,
      1
    );

    const easedProgress = 1 - Math.pow(1 - progress, 3);

    counter.textContent = Math.round(
      target * easedProgress
    );

    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }

  requestAnimationFrame(update);
}

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 }
);

counters.forEach((counter) => observer.observe(counter));

// Forest conservation pledge
const pledgeButton = document.getElementById("pledgeButton");
const pledgeMessage = document.getElementById("pledgeMessage");

pledgeButton.addEventListener("click", () => {
  pledgeMessage.textContent =
    "Thank you! Choose one action today to help protect nature.";

  pledgeButton.textContent = "Thank You!";
  pledgeButton.disabled = true;
  pledgeButton.style.opacity = "0.8";
});
