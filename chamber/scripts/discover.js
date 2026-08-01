import { items } from '../data/items.mjs';

document.addEventListener("DOMContentLoaded", () => {
    handleVisitMessage();
    renderCards(items);
});

function handleVisitMessage() {
    const messageElement = document.getElementById("visitMessage");
    if (!messageElement) return;

    const msInDay = 86400000;
    const lastVisit = localStorage.getItem("lastVisitDate");
    const now = Date.now();

    if (!lastVisit) {
        messageElement.textContent = "Welcome! Let us know if you have any questions.";
    } else {
        const daysDifference = Math.floor((now - parseInt(lastVisit, 10)) / msInDay);

        if (daysDifference < 1) {
            messageElement.textContent = "Back so soon! Awesome!";
        } else if (daysDifference === 1) {
            messageElement.textContent = "You last visited 1 day ago.";
        } else {
            messageElement.textContent = `You last visited ${daysDifference} days ago.`;
        }
    }

    localStorage.setItem("lastVisitDate", now.toString());
}

function renderCards(data) {
    const container = document.getElementById("gallery");
    if (!container) return;

    container.innerHTML = "";

    data.forEach((item, index) => {
        const card = document.createElement("div");
        card.classList.add("card", `card-${index + 1}`);

        card.innerHTML = `
            <h2>${item.title}</h2>
            <figure>
                <img src="${item.image}" alt="${item.title}" loading="lazy" width="300" height="200">
            </figure>
            <address>${item.address}</address>
            <p>${item.description}</p>
            <button class="learn-more-btn">Learn More</button>
        `;

        container.appendChild(card);
    });
}