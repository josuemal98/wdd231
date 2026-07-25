document.addEventListener('DOMContentLoaded', () => {
    const menuButton = document.querySelector('#menuButton');
    const navLinks = document.querySelector('#navLinks');

    if (menuButton && navLinks) {
        menuButton.addEventListener('click', () => {
            navLinks.classList.toggle('open');
            menuButton.classList.toggle('open');
        });
    }
});