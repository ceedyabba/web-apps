// =========================
// Projects page only
// Filter projects by tag
// =========================

(function () {
  const grid = document.getElementById("projectGrid");
  if (!grid) return; // safety: only run on projects page

  const buttons = document.querySelectorAll(".filter-btn");
  const cards = grid.querySelectorAll(".project-card");

  function setActive(activeBtn) {
    buttons.forEach((btn) => btn.classList.remove("active"));
    activeBtn.classList.add("active");
  }

  function applyFilter(filterValue) {
    cards.forEach((card) => {
      const tagString = card.getAttribute("data-tags") || "";
      const tags = tagString.split(/\s+/).filter(Boolean);

      const shouldShow = filterValue === "all" || tags.includes(filterValue);
      card.style.display = shouldShow ? "" : "none";
    });
  }

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const filterValue = btn.dataset.filter;
      setActive(btn);
      applyFilter(filterValue);
    });
  });

  // Default: whichever button already has .active (your "All" button)
  const defaultBtn = document.querySelector(".filter-btn.active") || buttons[0];
  if (defaultBtn) applyFilter(defaultBtn.dataset.filter || "all");
})();
