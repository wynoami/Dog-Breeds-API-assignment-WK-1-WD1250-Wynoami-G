import DogBreed from "./DogBreed.js";

const BASE_URL = "https://dog.ceo/api";

// A collection of DogBreed objects.
export default class Dogbreeds {
    #list = [];

    constructor(breedNames = []) {
        this.#list = breedNames.map((name) => new DogBreed(name));
    }

    get list() {
        return this.#list;
    }

    // Private helper: find the DogBreed whose name matches.
    #findBreed(name) {
        return this.#list.find((breed) => breed.name === name);
    }

    addImagesToDogBreed(name, images) {
        const breed = this.#findBreed(name);

        if (breed) {
            breed.images = images;
        }
    }

    async getImagesByDogBreedName(name) {
        const breed = this.#findBreed(name);

        if (!breed) {
            return [];
        }

        // Already fetched this breed before? Reuse the saved images.
        if (breed.images.length > 0) {
            return breed.images;
        }

        // Otherwise, fetch them from the API and save them on the breed.
        const response = await axios.get(`${BASE_URL}/breed/${name}/images`);
        this.addImagesToDogBreed(name, response.data.message);

        return breed.images;
    }
}