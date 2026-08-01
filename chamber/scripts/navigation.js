document.addEventListener("DOMContentLoaded", () => {
    const hamburgerBtn = document.getElementById("hamburgerBtn");
    const primaryNav = document.getElementById("primaryNav");

    if (hamburgerBtn && primaryNav) {
        hamburgerBtn.addEventListener("click", () => {
            primaryNav.classList.toggle("open");
            hamburgerBtn.classList.toggle("open");
        });
    }

    
    const currentYear = document.getElementById("currentYear");
    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }

    const lastModified = document.getElementById("lastModified");
    if (lastModified) {
        lastModified.textContent = `Last Modified: ${document.lastModified}`;
    }
});