const validAmount = amount => typeof amount === 'number' && !Number.isNaN(amount) && amount > 0;
const validCategoryName = category => typeof category === 'string' && !!category.trim();
const validateDate = date => {
  const parsedDate = new Date(date);
  if (Number.isNaN(parsedDate.getTime())) throw new Error("Invalid date format");
  
  const now = new Date();
  if (parsedDate > now) throw new Error('Date cannot be in the future');

  return parsedDate.getTime();
};

class Expense {
  static #nextId = 1;

  #id;
  #amount;
  #date;
  #category;

  constructor(amount, date, category) {
    if (!validAmount(amount)) throw new Error('Amount must a non negative number');
    if (!validCategoryName(category)) throw new Error('Category must be a non-empty string');


    this.#id = Expense.#nextId++;
    this.#amount = amount;

    this.#date = new Date(validateDate(date));
    this.#category = category.trim();

    Object.freeze(this);
  }

  get id() {
    return this.#id;
  }

  get amount() {
    return this.#amount;
  }

  get date() {
    return new Date(this.#date.getTime());
  }

  // for cleaner UI on date and if needed for sorting/searching
  get formattedDate() {
    return this.#date.toISOString().split('T')[0];
  }

  get category() {
    return this.#category;
  }
}
Object.freeze(Expense);
Object.freeze(Expense.prototype);

export default Expense;