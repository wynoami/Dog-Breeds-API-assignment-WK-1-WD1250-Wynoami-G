// A single dog breed: its name and the images that belong to it.
export default class DogBreed {
    #name;
    #images;

    constructor(name, images = []) {
        this.#name = name;
        this.#images = images;
    }

    get name() {
        return this.#name;
    }

    get images() {
        return this.#images;
    }

    set images(images) {
        this.#images = images;
    }
}
