document.addEventListener("DOMContentLoaded", () => {
    const currentUrl = window.location.href;
    const formData = currentUrl.split("?");

    if (formData.length > 1) {
        const queryParams = formData[1].split("&");
        const resultsContainer = document.querySelector("#results");

        const params = {};
        queryParams.forEach(param => {
            const [key, value] = param.split("=");
            params[key] = decodeURIComponent(value.replace(/\+/g, " "));
        });

        let formattedDate = "N/A";
        if (params.timestamp) {
            const dateObj = new Date(params.timestamp);
            if (!isNaN(dateObj)) {
                formattedDate = dateObj.toLocaleString();
            }
        }

        resultsContainer.innerHTML = `
            <p><strong>First Name:</strong> ${params.fname || 'N/A'}</p>
            <p><strong>Last Name:</strong> ${params.lname || 'N/A'}</p>
            <p><strong>Email Address:</strong> ${params.email || 'N/A'}</p>
            <p><strong>Mobile Phone:</strong> ${params.phone || 'N/A'}</p>
            <p><strong>Business Name:</strong> ${params.organization || 'N/A'}</p>
            <p><strong>Submission Date & Time:</strong> ${formattedDate}</p>
        `;
    }

    
    const yearSpan = document.querySelector("#currentyear");
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    const lastModifiedSpan = document.querySelector("#lastModified");
    if (lastModifiedSpan) {
        lastModifiedSpan.textContent = document.lastModified;
    }
});