//header

const navToggle = document.querySelector(".nav-toggle");
const mobileMenu = document.querySelector(".mobile-dropdown");

navToggle.addEventListener("click", () => {
    mobileMenu.classList.toggle("active");
});
//footer
const yearEl = document.getElementById('year');

if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
}
