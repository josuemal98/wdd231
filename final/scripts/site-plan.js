document.addEventListener("DOMContentLoaded", () => {
    const currentYearSpan = document.getElementById("currentYear");
    const lastModifiedPara = document.getElementById("lastModified");
    
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }
    if (lastModifiedPara) {
        lastModifiedPara.textContent = `Last Modified: ${document.lastModified}`;
    }

    const menuToggle = document.getElementById("menu-toggle");
    const primaryNav = document.getElementById("primary-nav");

    if (menuToggle && primaryNav) {
        menuToggle.addEventListener("click", () => {
            primaryNav.classList.toggle("show");
        });
    }

    const visitBanner = document.getElementById("visit-banner");
    if (visitBanner) {
        const lastVisit = localStorage.getItem("lastVisit");
        const now = Date.now();

        if (!lastVisit) {
            visitBanner.textContent = "Welcome! Thank you for visiting Valley Pet Rescue for the first time.";
        } else {
            const daysDifference = Math.floor((now - parseInt(lastVisit)) / (1000 * 60 * 60 * 24));
            if (daysDifference < 1) {
                visitBanner.textContent = "Back so soon! Feels like you were just here.";
            } else {
                visitBanner.textContent = `Welcome back! It has been ${daysDifference} ${daysDifference === 1 ? "day" : "days"} since your last visit.`;
            }
        }
        localStorage.setItem("lastVisit", now.toString());
        visitBanner.classList.remove("hidden");
    }

    const petContainer = document.getElementById("pet-cards-container");
    let petsData = [];

    async function fetchPets() {
        try {
            const response = await fetch("data/pets.json");
            if (response.ok) {
                petsData = await response.json();
                displayPets(petsData);
            }
        } catch (error) {
            console.error("Error loading pets:", error);
        }
    }

    function displayPets(pets) {
        if (!petContainer) return;
        petContainer.innerHTML = "";

        pets.forEach(pet => {
            const card = document.createElement("div");
            card.classList.add("pet-card");

            card.innerHTML = `
                <img src="${pet.image}" alt="${pet.name}" loading="lazy">
                <h3>${pet.name}</h3>
                <p><strong>Species:</strong> ${pet.species}</p>
                <p><strong>Breed:</strong> ${pet.breed}</p>
                <p><strong>Age:</strong> ${pet.age}</p>
                <button class="details-btn" data-id="${pet.id}">View Details</button>
            `;

            petContainer.appendChild(card);
        });

        const detailButtons = document.querySelectorAll(".details-btn");
        detailButtons.forEach(btn => {
            btn.addEventListener("click", (e) => {
                const petId = parseInt(e.target.dataset.id);
                const selectedPet = petsData.find(p => p.id === petId);
                if (selectedPet) {
                    showModal(selectedPet);
                }
            });
        });
    }

    const filterButtons = document.querySelectorAll(".filter-btn");
    filterButtons.forEach(btn => {
        btn.addEventListener("click", (e) => {
            filterButtons.forEach(b => b.classList.remove("active"));
            e.target.classList.add("active");

            const species = e.target.dataset.species;
            if (species === "all") {
                displayPets(petsData);
            } else {
                const filtered = petsData.filter(pet => pet.species === species);
                displayPets(filtered);
            }
        });
    });

    const petModal = document.getElementById("pet-modal");
    const modalDetails = document.getElementById("modal-details");
    const closeModal = document.getElementById("close-modal");

    function showModal(pet) {
        if (!petModal || !modalDetails) return;

        modalDetails.innerHTML = `
            <h2>${pet.name}</h2>
            <p><strong>Species:</strong> ${pet.species}</p>
            <p><strong>Breed:</strong> ${pet.breed}</p>
            <p><strong>Age:</strong> ${pet.age} | <strong>Size:</strong> ${pet.size}</p>
            <p><strong>Gender:</strong> ${pet.gender}</p>
            <p><strong>Health Record:</strong> ${pet.health}</p>
            <p style="margin-top: 1rem;">${pet.description}</p>
        `;
        petModal.showModal();
    }

    if (closeModal) {
        closeModal.addEventListener("click", () => {
            petModal.close();
        });
    }

    const formResults = document.getElementById("form-results");
    if (formResults) {
        const urlParams = new URLSearchParams(window.location.search);
        
        if (urlParams.has("fname")) {
            formResults.innerHTML = `
                <p><strong>Applicant Name:</strong> ${urlParams.get("fname")} ${urlParams.get("lname")}</p>
                <p><strong>Email:</strong> ${urlParams.get("email")}</p>
                <p><strong>Phone:</strong> ${urlParams.get("phone")}</p>
                <p><strong>Interested In:</strong> ${urlParams.get("petType")}</p>
                <p><strong>Specific Pet Name:</strong> ${urlParams.get("petName") || "None specified"}</p>
                <p><strong>Housing Status:</strong> ${urlParams.get("housing")}</p>
            `;
        } else {
            formResults.innerHTML = `<p>No application parameters were submitted.</p>`;
        }
    }

    if (petContainer) {
        fetchPets();
    }
});