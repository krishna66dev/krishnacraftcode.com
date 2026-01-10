document.addEventListener("DOMContentLoaded", () => {

  // Load header
  fetch("includes/header.html")
    .then(res => res.text())
    .then(data => {
      document.getElementById("header-placeholder").innerHTML = data;
      initThemeToggle();
    });

  // Load footer
  fetch("includes/footer.html")
    .then(res => res.text())
    .then(data => {
      document.getElementById("footer-placeholder").innerHTML = data;
    });

});

// Toggle theme
function initThemeToggle() {
  const btn = document.getElementById("themeToggle");
  if (!btn) return;

  updateIcon();

  btn.addEventListener("click", () => {
    const html = document.documentElement;
    const current = html.getAttribute("data-bs-theme");
    const next = current === "dark" ? "light" : "dark";

    html.setAttribute("data-bs-theme", next);
    localStorage.setItem("theme", next);
    updateIcon();
  });
}

function updateIcon() {
  const icon = document.querySelector("#themeToggle i");
  if (!icon) return;

  const theme = document.documentElement.getAttribute("data-bs-theme");
  icon.className = theme === "dark"
    ? "fa-solid fa-sun"
    : "fa-solid fa-moon";
}
