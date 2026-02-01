document.addEventListener("DOMContentLoaded", () => {
  // ===== Year =====
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ===== Mobile Nav =====
  const navToggle = document.getElementById("navToggle");
  const siteNav = document.getElementById("siteNav");

  if (navToggle && siteNav) {
    navToggle.addEventListener("click", () => {
      const isOpen = siteNav.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
      navToggle.textContent = isOpen ? "✕" : "☰";
    });
  }

// ===== Theme (localStorage) =====
const themeBtn = document.getElementById("themeBtn");
const saved = localStorage.getItem("theme");

// Default to LIGHT unless user saved DARK
document.body.classList.toggle("light", saved !== "dark");

function updateThemeIcon() {
  if (!themeBtn) return;
  themeBtn.textContent = document.body.classList.contains("light") ? "🌞" : "🌙";
}

updateThemeIcon();

if (themeBtn) {
  themeBtn.addEventListener("click", () => {
    document.body.classList.toggle("light");
    localStorage.setItem("theme", document.body.classList.contains("light") ? "light" : "dark");
    updateThemeIcon();
  });
}


  // ===== Active nav link =====
  const current = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll("#siteNav a").forEach((a) => {
    const href = a.getAttribute("href");
    if (href === current) a.classList.add("active");
  });
});
