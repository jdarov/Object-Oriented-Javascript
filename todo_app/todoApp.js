class Todo {
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
    const allowed = [
      'title',
      'month',
      'year',
      'description',
      'completed',
    ];

    for (const prop of Object.keys(updates)) {
      if (prop === 'id' || !allowed.includes(prop)) continue;
      this[prop] = updates[prop];
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

class TodoList {
  #todos = [];

  get all() {
    return this.#todos.map(todo => todo.clone());
  }

  getById(id) {
    const foundTodo = this.#todos.find(todo => todo.id === id);
    return foundTodo ? foundTodo.clone() : null;
  }

  add(todo) {
    if (!(todo instanceof Todo)) throw new Error('Can only add Todo instances');
    this.#todos.push(todo.clone());
  }

  delete(todo) {
    const id = typeof todo === 'number' ? todo : todo && todo.id;
    if (id == null) return;

    this.#todos = this.#todos.filter(t => t.id !== id);
  }

  init(todoArray) {
    this.#todos = todoArray.map(todo => 
      todo instanceof Todo ? todo.clone() : new Todo(todo)
    );
  }

  update(attrs) {
    const { id } = attrs;
    const todo = this.#todos.find(todo => todo.id === id);

    if (!todo) {
      console.log(`No valid todo object with id that matchs ${id}`);
      return null;
    }

    todo.update(attrs);

    return todo.clone();
  }
}

class TodoManager {
  #todoList;

  constructor(todoList) {
    this.#todoList = todoList;
  }

  getAllTodos() {
    return this.#todoList.all;
  }

  getCompletedTodos() {
    return this.#todoList.all.filter(todo => todo.completed);
  }

  getTodosByDate(month, year) {
    return this.#todoList.all.filter(todo => todo.isWithinMonthYear(month, year));
  }

  getCompletedTodosByDate(month, year) {
    return this.#todoList.all.filter(todo => todo.completed && todo.isWithinMonthYear(month, year));
  }
}


// ===== Test Data =====
let todoData = {
  title: 'Buy Milk',
  month: '1',
  year: '2017',
  description: 'Milk for baby',
};

let todoData1 = {
  title: 'Buy Milk',
  month: '1',
  year: '2017',
  description: 'Milk for baby',
};

let todoData2 = {
  title: 'Buy Apples',
  month: '',
  year: '2017',
  description: 'An apple a day keeps the doctor away',
};

let todoData3 = {
  title: 'Buy chocolate',
  month: '1',
  year: '',
  description: 'For the cheat day',
};

let todoData4 = {
  title: 'Buy Veggies',
  month: '',
  year: '',
  description: 'For the daily fiber needs',
};

let todoSet = [todoData1, todoData2, todoData3, todoData4];

// ===== Simple Test Runner =====
function assert(condition, message) {
  if (!condition) {
    console.error('❌ Test failed:', message);
  } else {
    console.log('✅', message);
  }
}

function runTests() {
  console.log('=== Running Todo tests ===');

  // Todo creation
  const t1 = new Todo(todoData);
  assert(t1.title === 'Buy Milk', 'Todo stores title correctly');
  assert(t1.month === '1' && t1.year === '2017', 'Todo stores month and year correctly');
  assert(t1.description === 'Milk for baby', 'Todo stores description correctly');
  assert(t1.completed === false, 'Todo starts as not completed');

  // isWithinMonthYear
  assert(t1.isWithinMonthYear('1', '2017') === true, 'isWithinMonthYear matches correct month/year');
  assert(t1.isWithinMonthYear('2', '2017') === false, 'isWithinMonthYear fails on wrong month');

  // update (should not change id)
  const originalId = t1.id;
  t1.update({ title: 'Buy Almond Milk', completed: true });
  assert(t1.title === 'Buy Almond Milk', 'Todo.update changed title');
  assert(t1.completed === true, 'Todo.update changed completed');
  assert(t1.id === originalId, 'Todo.update did not change id');

  // clone
  const t1Clone = t1.clone();
  assert(t1Clone !== t1, 'clone returns a different object');
  assert(t1Clone.id === t1.id, 'clone keeps same id');
  assert(t1Clone.title === t1.title, 'clone keeps same title');

  console.log('=== Running TodoList tests ===');

  const list = new TodoList();
  list.init(todoSet);

  const allAfterInit = list.all;
  assert(allAfterInit.length === 4, 'TodoList.init created 4 todos');

  // add
  list.add(t1);
  const allAfterAdd = list.all;
  assert(allAfterAdd.length === 5, 'TodoList.add adds a todo');

  // getById returns clone
  const someId = allAfterAdd[0].id;
  const storedCopy = list.getById(someId);
  storedCopy.title = 'Mutated from outside';
  const storedAgain = list.getById(someId);
  assert(storedAgain.title !== 'Mutated from outside', 'getById returns a clone, not internal object');

  // update on list
  const toUpdate = list.all[0];
  const updated = list.update({ id: toUpdate.id, title: 'Updated Title' });
  assert(updated.title === 'Updated Title', 'TodoList.update returns updated todo clone');
  const updatedFromList = list.getById(toUpdate.id);
  assert(updatedFromList.title === 'Updated Title', 'TodoList.update changed internal todo');

  // delete
  const beforeDeleteLength = list.all.length;
  list.delete(updatedFromList);
  const afterDeleteLength = list.all.length;
  assert(afterDeleteLength === beforeDeleteLength - 1, 'TodoList.delete removes a todo');

  console.log('=== Running TodoManager tests ===');

  // Re-init a fresh list for manager tests
  const list2 = new TodoList();
  list2.init(todoSet);

  // Mark some todos as completed
  const list2All = list2.all;
  const firstTodo = list2All[0];
  const secondTodo = list2All[1];

  list2.update({ id: firstTodo.id, completed: true });
  list2.update({ id: secondTodo.id, completed: true });

  const manager = new TodoManager(list2);

  const managerAll = manager.getAllTodos();
  assert(managerAll.length === 4, 'TodoManager.getAllTodos returns all todos');

  const completed = manager.getCompletedTodos();
  assert(completed.length === 2, 'TodoManager.getCompletedTodos returns only completed todos');

  const jan2017 = manager.getTodosByDate('1', '2017');
  assert(jan2017.length >= 1, 'getTodosByDate returns todos with matching month/year');

  const completedJan2017 = manager.getCompletedTodosByDate('1', '2017');
  assert(
    completedJan2017.every(todo => todo.completed && todo.isWithinMonthYear('1', '2017')),
    'getCompletedTodosByDate returns only completed todos in that month/year'
  );

  console.log('=== Tests finished ===');
}

// Run tests when this file is loaded
runTests();