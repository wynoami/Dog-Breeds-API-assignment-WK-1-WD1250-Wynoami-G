import DogBreeds from "./DogBreeds.js";

const BASE_URL = "https://dog.ceo/api";

const breedsList = document.querySelector("#breeds");
const imagesContainer = document.querySelector("#images");

let dogBreeds;
let selectedBreed = "";

// ---------- Data ----------

async function fetchBreedNames() {
    const response = await axios.get(`${BASE_URL}/breeds/list/all`);

    // The API returns an object like { affenpinscher: [], african: [], ... },
    // so the keys are the breed names.
    return Object.keys(response.data.message);
}

// ---------- DOM helpers ----------

// Loops are allowed here: removing elements from the DOM.
function clearElement(element) {
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
}

function showMessage(text) {
    clearElement(imagesContainer);

    const message = document.createElement("p");
    message.textContent = text;
    imagesContainer.appendChild(message);
}

// ---------- Rendering ----------

function renderBreeds() {
    dogBreeds.list.forEach((breed) => {
        const listItem = document.createElement("li");
        const anchor = document.createElement("a");

        anchor.href = "#";
        anchor.textContent = breed.name;
        anchor.addEventListener("click", (event) => {
            event.preventDefault();
            showImages(breed.name);
        });

        listItem.appendChild(anchor);
        breedsList.appendChild(listItem);
    });
}

function renderImages(name, images) {
    clearElement(imagesContainer);

    images.forEach((src) => {
        const image = document.createElement("img");
        image.src = src;
        image.alt = `A ${name} dog`;
        imagesContainer.appendChild(image);
    });
}

// ---------- Event handling ----------

async function showImages(name) {
    selectedBreed = name;
    showMessage(`Loading ${name} images...`);

    try {
        const images = await dogBreeds.getImagesByDogBreedName(name);

        // If the user clicked a different breed while we were waiting,
        // don't overwrite their newer choice with these older results.
        if (name !== selectedBreed) {
            return;
        }

        renderImages(name, images);
    } catch (error) {
        showMessage(`Sorry, we couldn't load images for ${name}.`);
        console.error(error);
    }
}

// ---------- Start the app ----------

async function init() {
    try {
        const breedNames = await fetchBreedNames();
        dogBreeds = new DogBreeds(breedNames);
        renderBreeds();
    } catch (error) {
        showMessage("Sorry, we couldn't load the list of dog breeds.");
        console.error(error);
    }
}

init();
