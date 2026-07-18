const menuButton = document.querySelector("#menuButton");
const navLinks = document.querySelector("#navLinks");

menuButton.addEventListener("click", () => {
  navLinks.classList.toggle("open");
  
  if (navLinks.classList.contains("open")) {
    menuButton.innerHTML = "&times;"; 
  } else {
    menuButton.innerHTML = "&#9776;";
  }
});

const url = "data/members.json";
const container = document.querySelector("#directory-container");
const gridButton = document.querySelector("#grid");
const listButton = document.querySelector("#list");

document.querySelector("#currentyear").textContent = new Date().getFullYear();
document.querySelector("#lastModified").textContent = document.lastModified;

async function getMembers() {
    const response = await fetch(url);
    const data = await response.json();
    displayMembers(data);
}

function displayMembers(members) {
    container.innerHTML = "";
    
    members.forEach((member) => {
        let card = document.createElement("section");
        
        let logo = document.createElement("img");
        logo.setAttribute("src", member.image);
        logo.setAttribute("alt", member.name);
        logo.setAttribute("loading", "lazy");
        
        let name = document.createElement("h3");
        name.textContent = member.name;
        
        let address = document.createElement("p");
        address.textContent = member.address;
        
        let phone = document.createElement("p");
        phone.textContent = member.phone;
        
        let website = document.createElement("a");
        website.setAttribute("href", member.website);
        website.setAttribute("target", "_blank");
        website.textContent = "Visit Website";
        
        let membership = document.createElement("p");
        membership.className = "membership-level";
        if (member.level === 3) {
            membership.textContent = "Gold Member";
        } else if (member.level === 2) {
            membership.textContent = "Silver Member";
        } else {
            membership.textContent = "Member";
        }

        card.appendChild(logo);
        card.appendChild(name);
        card.appendChild(address);
        card.appendChild(phone);
        card.appendChild(membership);
        card.appendChild(website);
        
        container.appendChild(card);
    });
}

gridButton.addEventListener("click", () => {
    container.classList.add("grid");
    container.classList.remove("list");
});

listButton.addEventListener("click", () => {
    container.classList.add("list");
    container.classList.remove("grid");
});

getMembers();