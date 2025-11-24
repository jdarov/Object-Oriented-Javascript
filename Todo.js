export default class Todo {
  static #nextId = 1;

  #id;
  #title;
  #completed;
  #month;
  #year;
  #description;

  constructor({title, month, year, description}) {
    this.#id = Todo.#nextId++;

    this.#title = title;
    this.#month = month;
    this.#year = year;
    this.#description = description;

    this.#completed = false;
  }

  get id() { return this.#id; }
  get title() { return this.#title; }
  get month() { return this.#month; }
  get year() { return this.#year; }
  get description() { return this.#description; }
  get completed() { return this.#completed; }

  set title(value) {
    this.#title = String(value);
  }

  set month(value) {
    this.#month = value;
  }

  set year(value) {
    this.#year = value;
  }

  set description(value) {
    this.#description = value ?? '';
  }

  set completed(value) {
    this.#completed = Boolean(value);
  }

  isWithinMonthYear(month, year) {
    return this.month === month && this.year === year;
  }

  update(updates = {}) {
    for (const prop in updates) {
      if (prop !== 'id' && Object.hasOwn(this, prop)) {
        this[prop] = updates[prop]
      }
    }
  }

  clone() {
    const copy = new Todo({
      title: this.#title,
      month: this.#month,
      year: this.#year,
      description: this.#description,
    });

    copy.#id = this.#id;
    copy.#completed = this.#completed;

    return copy;
  }
}