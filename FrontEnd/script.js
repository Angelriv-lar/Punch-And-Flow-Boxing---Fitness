/* =========================
   Punch And Flow - script.js
   - Hamburger menu toggle
   - Reveal-on-scroll animation
   - Booking modal open/close
   - Footer year auto-update
   ========================= */

document.addEventListener("DOMContentLoaded", () => {
  /* ---------- Footer year ---------- */
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Hamburger menu ---------- */
  const hamburgerBtn = document.getElementById("hamburger-button");
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");

  function closeMenu() {
    if (!menu || !icon || !hamburgerBtn) return;
    menu.classList.remove("open");
    icon.classList.remove("open");
    hamburgerBtn.setAttribute("aria-expanded", "false");
  }

  function toggleMenu() {
    if (!menu || !icon || !hamburgerBtn) return;
    menu.classList.toggle("open");
    icon.classList.toggle("open");
    hamburgerBtn.setAttribute("aria-expanded", String(icon.classList.contains("open")));
  }

  if (hamburgerBtn) {
    hamburgerBtn.addEventListener("click", toggleMenu);
  }

  // Close menu when a mobile link is clicked
  document.querySelectorAll("[data-close-menu]").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  // Optional: close menu if user clicks outside it
  document.addEventListener("click", (e) => {
    if (!menu || !icon || !hamburgerBtn) return;
    const clickedInside = menu.contains(e.target) || hamburgerBtn.contains(e.target);
    if (!clickedInside) closeMenu();
  });

  /* ---------- Booking modal ---------- */
  const openBtn = document.getElementById("openBooking");
  const openBtnTop = document.getElementById("openBookingTop");
  const closeBtn = document.getElementById("closeBooking");
  const modal = document.getElementById("bookingModal");

  function openModal() {
    if (!modal) return;
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    closeMenu(); // if hamburger menu is open, close it
  }

  function closeModal() {
    if (!modal) return;
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
  }

  if (openBtn) openBtn.addEventListener("click", openModal);
  if (openBtnTop) openBtnTop.addEventListener("click", openModal);
  if (closeBtn) closeBtn.addEventListener("click", closeModal);

  if (modal) {
    // Click outside modal-content closes modal
    modal.addEventListener("click", (e) => {
      if (e.target === modal) closeModal();
    });
  }

  // ESC closes modal
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
  });

  /* ---------- Reveal-on-scroll ---------- */
  const revealEls = document.querySelectorAll(".reveal");
  if (revealEls.length) {
    const io = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    revealEls.forEach((el) => io.observe(el));
  }
});
