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
                document.querySelector("#current-temp").textContent = Math.round(currentData.main.temp);
                document.querySelector("#weather-desc").textContent = currentData.weather[0].description;
            }

            const responseForecast = await fetch(forecastUrl);
            if (responseForecast.ok) {
                const forecastData = await responseForecast.json();
                const forecastContainer = document.querySelector("#weather-forecast");
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
        } catch (error) {
            console.error("Error fetching weather data:", error);
        }
    }

    const membersUrl = "data/members.json";
    const spotlightsContainer = document.querySelector("#spotlights-container");

    async function getSpotlights() {
        try {
            const response = await fetch(membersUrl);
            const data = await response.json();
            
            const eligibleMembers = data.members.filter(m => 
                m.membershipLevel.toLowerCase() === "gold" || 
                m.membershipLevel.toLowerCase() === "silver"
            );
            
            const shuffled = eligibleMembers.sort(() => 0.5 - Math.random());
            const selectedSpotlights = shuffled.slice(0, 3);
            
            if (spotlightsContainer) {
                spotlightsContainer.innerHTML = "";
                selectedSpotlights.forEach(member => {
                    const spotlight = document.createElement("article");
                    spotlight.className = "spotlight-item";
                    spotlight.innerHTML = `
                        <h3>${member.name}</h3>
                        <img src="images/${member.image}" alt="${member.name} logo" loading="lazy">
                        <p><strong>Phone:</strong> ${member.phone}</p>
                        <p><strong>Address:</strong> ${member.address}</p>
                        <a href="${member.website}" target="_blank">Website</a>
                        <p class="level-badge">${member.membershipLevel} Member</p>
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