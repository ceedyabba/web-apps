// =========================
// About page only
// Timeline step toggle
// =========================

(function () {
  const timeline = document.querySelector(".timeline");
  if (!timeline) return; // only run on about page

  const steps = timeline.querySelectorAll(".step");

  steps.forEach((step) => {
    const title = step.querySelector("h3");
    const desc = step.querySelector("p");

    if (!title || !desc) return;

    // make it feel clickable + accessible
    step.style.cursor = "pointer";
    step.setAttribute("role", "button");
    step.setAttribute("tabindex", "0");
    step.setAttribute("aria-expanded", "true");

    function toggle() {
      const isOpen = step.getAttribute("aria-expanded") === "true";
      step.setAttribute("aria-expanded", String(!isOpen));
      desc.style.display = isOpen ? "none" : "";
    }

    step.addEventListener("click", toggle);

    step.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        toggle();
      }
    });
  });
})();
