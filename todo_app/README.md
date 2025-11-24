# Todo App

This project is a small, self-contained todo application implemented in plain JavaScript. It contains three main classes and a simple built-in test runner. No external packages are required.

Files
- todoApp.js — Implementation of the application and a simple test runner. Running `node todoApp.js` executes the tests.

Requirements
- Node.js (version used 20.19.5)
- No external packages required

Overview of the classes and responsibilities

1) Todo
- Purpose: Create and represent individual todo items. Each todo has a unique id and a limited public interface.
- Properties (read-only via getters):
  - id (unique integer)
  - title (string)
  - completed (boolean)
  - month (string)
  - year (string)
  - description (string)
- Behavior:
  - Constructor accepts an object with title, month, year, description. `id` is generated automatically and `completed` defaults to `false`.
  - Getters and setters allow reading and controlled updating of fields. The `id` is protected and cannot be changed via setters.
  - isWithinMonthYear(month, year) — returns true if the todo's month and year match the provided values (strict equality).
  - update(updates) — accepts an object with fields to update. Only allowed fields (`title`, `month`, `year`, `description`, `completed`) are applied; `id` is ignored.
  - clone() — returns a new Todo instance that represents the same data (a deep copy of the todo object as far as the app requires). Clones preserve the original todo id and completed status while being separate objects so callers cannot mutate the internal state of a TodoList.

Notes about ids and clone
- Todo instances maintain unique ids. The clone implementation creates a new Todo then copies the original id and completed status so the returned object represents the same identity while remaining a separate object.

2) TodoList
- Purpose: Maintain an internal collection of todos and provide methods to manipulate it while preserving collection integrity.
- Internal data:
  - The list stores Todo instances privately (not exposed directly).
- Public interface:
  - get all() — returns an array of clones of the internal todos (so consumers cannot mutate the internal collection).
  - getById(id) — returns a clone of the todo with the given id, or `null` if not found.
  - add(todo) — accepts a Todo instance and adds a clone of it into the internal collection. Throws if the argument is not a Todo instance.
  - delete(todo | id) — removes a todo by id or by a todo object/clone with an id property.
  - init(todoArray) — initializes the collection from an array. Elements may be plain data objects or Todo instances; the method ensures only Todo instances are stored (and stored as clones when necessary).
  - update(attrs) — finds a todo by `attrs.id`, updates allowed fields via the Todo.update method, and returns a clone of the updated todo (or `null` when no todo found).

Collection integrity
- Whenever a method returns todos or a subset, clones are returned so the internal store cannot be mutated from the outside. This maintains the integrity of the internal collection.

3) TodoManager
- Purpose: Query the TodoList and return arrays of todo objects matching criteria.
- Constructor expects a TodoList instance.
- Public methods:
  - getAllTodos() — returns all todos (via the TodoList `all` getter).
  - getCompletedTodos() — returns all todos with `completed === true`.
  - getTodosByDate(month, year) — returns todos for the exact month/year pair.
  - getCompletedTodosByDate(month, year) — returns todos that are completed and match the month/year.

Running the tests
1. Place `todoApp.js` and this `README.md` in the same directory.
2. From the directory run:
   ```
   node todoApp.js
   ```
3. The file `todoApp.js` includes a simple test runner that runs immediately when the file is loaded and prints results to the console.
   - Passing assertions print lines starting with "✅".
   - Failing assertions print "❌ Test failed:" followed by a message.
   - At the end a "=== Tests finished ===" message is printed.

What the tests check
- Todo tests:
  - Creating a Todo stores title, month, year, description, and defaults `completed` to `false`.
  - isWithinMonthYear returns true for matching month/year and false otherwise.
  - update correctly updates allowed fields and does not change id.
  - clone returns a separate object that preserves id and field values.
- TodoList tests:
  - init initializes the list from an array of plain objects.
  - get all returns clones and does not allow external mutation of internal items.
  - add stores todos (as clones) and increases list size.
  - getById returns a clone, not the internal reference.
  - update changes an internal todo and returns the updated clone.
  - delete removes a todo.
- TodoManager tests:
  - getAllTodos returns all items.
  - getCompletedTodos returns only completed items.
  - getTodosByDate filters items by month/year.
  - getCompletedTodosByDate filters by both completion status and month/year.If you want, I can also:
- Add a short example snippet in the README showing how to create todos programmatically and query them via TodoManager.
- Provide a zip-ready layout containing todoApp.js and this README.md.

Extending or packaging
- No package.json is required since there are no external dependencies.
- If you'd like a separate test file (for Jest or other test frameworks), I can extract the tests and provide a package.json and test scripts.