document.addEventListener("DOMContentLoaded", () => {
    const timestampInput = document.querySelector("#timestamp");
    if (timestampInput) {
        timestampInput.value = new Date().toISOString();
    }


    const infoButtons = document.querySelectorAll(".info-btn");
    const closeButtons = document.querySelectorAll(".close-modal");

    infoButtons.forEach(button => {
        button.addEventListener("click", () => {
            const modalId = button.getAttribute("data-modal");
            const modal = document.querySelector(`#${modalId}`);
            if (modal) {
                modal.showModal();
            }
        });
    });

    closeButtons.forEach(button => {
        button.addEventListener("click", () => {
            const modal = button.closest("dialog");
            if (modal) {
                modal.close();
            }
        });
    });


    const yearSpan = document.querySelector("#currentyear");
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    const lastModifiedSpan = document.querySelector("#lastModified");
    if (lastModifiedSpan) {
        lastModifiedSpan.textContent = document.lastModified;
    }
});