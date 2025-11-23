class Animal {
  #name;
  #species;
  constructor(name, species) {
    this.#name = name;
    this.species = species;
  }
  get name() {
    return this.#name;
  }
  get species() {
    return this.#species;
  }
  set species(newSpecies) {
    if (typeof newSpecies !== 'string') {
      throw new Error();
    }
    this.#species = newSpecies;
  }
  info() {
    return `${this.constructor.name} is of the type ${this.species}`;
  }
}
class Cat extends Animal {
}
const dog = new Animal('Abby', 'Dog');
dog.info(); //?
const cat = new Cat('Kitty', 'kitten');
cat.info(); //?