const menuBtn = document.querySelector(".menu-btn");
const mobileNav = document.getElementById("mobile-nav");

menuBtn.addEventListener("click", () => {
    mobileNav.classList.toggle("open");
});