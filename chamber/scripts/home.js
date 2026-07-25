document.addEventListener("DOMContentLoaded", () => {

    const menuButton = document.querySelector("#menuButton");
    const navLinks = document.querySelector("#navLinks");

    if (menuButton && navLinks) {
        menuButton.addEventListener("click", () => {
            navLinks.classList.toggle("open");
            if (navLinks.classList.contains("open")) {
                menuButton.innerHTML = "&times;";
            } else {
                menuButton.innerHTML = "&#9776;";
            }
        });
    }

    const currentYearSpan = document.querySelector("#currentyear");
    const lastModifiedSpan = document.querySelector("#lastModified");

    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }
    if (lastModifiedSpan) {
        lastModifiedSpan.textContent = document.lastModified;
    }

    const apiKey = "f2b989aac6be9df8f85b676688e65543";
    const lat = "40.5147"; 
    const lon = "-112.0333";
    
    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;

    async function getWeatherData() {
        try {
            const responseCurrent = await fetch(currentWeatherUrl);
            if (responseCurrent.ok) {
                const currentData = await responseCurrent.json();
                const tempElem = document.querySelector("#current-temp");
                const descElem = document.querySelector("#weather-desc");
                if (tempElem) tempElem.textContent = Math.round(currentData.main.temp);
                if (descElem) descElem.textContent = currentData.weather[0].description;
            }

            const responseForecast = await fetch(forecastUrl);
            if (responseForecast.ok) {
                const forecastData = await responseForecast.json();
                const forecastContainer = document.querySelector("#weather-forecast");
                if (forecastContainer) {
                    forecastContainer.innerHTML = "";
                    
                    const dailyData = forecastData.list.filter(item => item.dt_txt.includes("12:00:00")).slice(0, 3);
                    
                    dailyData.forEach(day => {
                        const date = new Date(day.dt * 1000);
                        const dayName = date.toLocaleDateString("en-US", { weekday: "long" });
                        const temp = Math.round(day.main.temp);
                        
                        const p = document.createElement("p");
                        p.innerHTML = `<strong>${dayName}:</strong> ${temp}&deg;F`;
                        forecastContainer.appendChild(p);
                    });
                }
            }
        } catch (error) {
            console.error("Error fetching weather data:", error);
        }
    }

    const membersUrl = "data/members.json";
    const spotlightsContainer = document.querySelector("#spotlights-container") || document.querySelector("#spotlight-container");

    async function getSpotlights() {
        try {
            const response = await fetch(membersUrl);
            if (!response.ok) return;

            const data = await response.json();
            const membersList = Array.isArray(data) ? data : (data.members || []);

            const eligibleMembers = membersList.filter(m => {
                const lvl = String(m.membershipLevel || m.membership_level || "").toLowerCase();
                return lvl === "gold" || lvl === "silver" || lvl === "2" || lvl === "3";
            });

            eligibleMembers.sort(() => 0.5 - Math.random());
            const selectedSpotlights = eligibleMembers.slice(0, 3);

            if (spotlightsContainer) {
                spotlightsContainer.innerHTML = "";
                selectedSpotlights.forEach(member => {
                    const spotlight = document.createElement("article");
                    spotlight.className = "spotlight-item";
                    
                    const imageSrc = member.image ? `images/${member.image}` : (member.logo || "");
                    const lvlDisplay = (String(member.membershipLevel) === "3" || String(member.membershipLevel).toLowerCase() === "gold") ? "Gold" : "Silver";

                    spotlight.innerHTML = `
                        <h3>${member.name}</h3>
                        <img src="${imageSrc}" alt="${member.name} logo" loading="lazy" width="120" height="80">
                        <p><strong>Phone:</strong> ${member.phone}</p>
                        <p><strong>Address:</strong> ${member.address}</p>
                        <a href="${member.website}" target="_blank" rel="noopener">Website</a>
                        <p class="level-badge">${lvlDisplay} Member</p>
                    `;
                    spotlightsContainer.appendChild(spotlight);
                });
            }
        } catch (error) {
            console.error("Error fetching spotlights:", error);
        }
    }

    getWeatherData();
    getSpotlights();
});