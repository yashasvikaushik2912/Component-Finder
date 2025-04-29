const componentTemplate = document.querySelector("[data-component-template]");
const componentContainer = document.querySelector("[data-user-cards-container]");
const searchInput = document.getElementById("searchBox");
let components = [];

fetch("examples.json")
    .then(res => res.json())
    .then(data => {
        components = data.map(component => {
            const card = componentTemplate.content.cloneNode(true).children[0];
            const link = card.querySelector("[data-url]");
            const image = card.querySelector("[data-image]");
            const name = card.querySelector("[data-name]");
            const description = card.querySelector("[data-description]");

            link.href = component.url;
            image.src = component.image;
            image.alt = component.name;
            name.textContent = component.name;
            description.textContent = component.description;

            componentContainer.append(card);
            return { name: component.name, description: component.description, element: card };
        });
    });

searchInput.addEventListener("input", e => {
    const value = e.target.value.toLowerCase();
    components.forEach(component => {
        const isVisible =
            component.name.toLowerCase().includes(value) ||
            component.description.toLowerCase().includes(value);
        component.element.classList.toggle("hide", !isVisible);
    });
});

function searchComponent() {
    const value = searchInput.value.toLowerCase();
    components.forEach(component => {
        const isVisible =
            component.name.toLowerCase().includes(value) ||
            component.description.toLowerCase().includes(value);
        component.element.classList.toggle("hide", !isVisible);
    });
}

searchInput.addEventListener("keyup", function(event) {
    if (event.key === "Enter") {
        searchComponent();
    }
});
