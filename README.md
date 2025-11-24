# Object-Oriented JavaScript
A focused collection of JavaScript exercises, notes, and examples exploring object-oriented programming in JS, including prototypal inheritance, behavior delegation, OLOO, pseudo-classical patterns, closures, execution context, PFAs, and modern class syntax.

Languages: JavaScript (100%)

---

## Table of Contents

- [About](#about)
- [Topics Covered](#topics-covered)
- [Repository Layout](#repository-layout)
- [Quick Examples](#quick-examples)
  - [Behavior Delegation / Prototypal Hierarchy](#behavior-delegation--prototypal-hierarchy)
  - [OLOO (Objects Linked to Other Objects)](#oloo-objects-linked-to-other-objects)
  - [Pseudo-classical Pattern](#pseudo-classical-pattern)
  - [Factory Functions & Closures (PFAs)](#factory-functions--closures-pfas)
  - [ES6 Class Syntax](#es6-class-syntax)
  - [this / Execution Context](#this--execution-context)
- [How to run the examples](#how-to-run-the-examples)
- [Notes & References](#notes--references)
- [Contributing](#contributing)
- [License](#license)
- [Author / Contact](#author--contact)

---

## About

This repository collects coursework and personal exercises demonstrating multiple object-oriented styles available in JavaScript. Rather than treating classes as the only option, the focus is on how JavaScript's prototype system and first-class functions enable varied patterns — and when each is appropriate.

The examples deliberately show equivalent behaviors implemented with different patterns so you can compare trade-offs in readability, encapsulation, performance, and testability.

---

## Topics Covered

- Prototypal hierarchy and prototype chaining
- Behavior delegation between objects
- OLOO (Objects Linked to Other Objects)
- Pseudo-classical patterns (constructor functions + prototypes)
- Factory functions and closures (PFAs — Prototypal Factory/Function Approaches)
- Encapsulation via closures
- Execution context and `this`
- call / apply / bind
- ES6 `class` syntax and how it maps to prototypes

---

## Repository Layout

This repo is organized into focused folders so you can quickly find exercises and examples by topic:

- closures/
  - Exercises and small examples demonstrating closure-based encapsulation, factory functions, and private state patterns.
- exercises/
  - Topic-focused practice problems (e.g., short tasks to practice prototypes, `this`, and delegation).
- function-context-object-patterns/
  - Examples that compare function-based factories, explicit context handling, call/apply/bind usage, and object-shape patterns.
- objects/
  - Prototypal examples, OLOO patterns, prototype chain illustrations, and object composition demos.
- todo_app/
  - A sample application (to-do list) that ties together patterns from the repo — modules show different implementations (closures, pseudo-classical, classes).
- examples/
  - Minimal runnable snippets that illustrate each pattern in isolation.
- projects/
  - Larger integrations and exercises that combine multiple techniques.
- docs/
  - Course notes, diagrams, reading lists, and reference material.
- tests/
  - Unit tests for selected exercises and examples (where available).
- scripts/
  - Utility scripts to run demos, build docs, or start a local server.
- README.md
  - This file

---

## Quick Examples

These snippets are intentionally small to show the essence of each pattern.

### Behavior Delegation / Prototypal Hierarchy

```javascript
const animal = {
  speak() {
    return `${this.name} makes a noise.`;
  }
};

const dog = Object.create(animal);
dog.name = 'Rex';
console.log(dog.speak()); // "Rex makes a noise."
```

### OLOO (Objects Linked to Other Objects)

```javascript
const PersonProto = {
  init(name) {
    this.name = name;
    return this;
  },
  greet() {
    return `Hi, I'm ${this.name}`;
  }
};

const alice = Object.create(PersonProto).init('Alice');
console.log(alice.greet()); // "Hi, I'm Alice"
```

### Pseudo-classical Pattern

```javascript
function Person(name) {
  this.name = name;
}

Person.prototype.greet = function () {
  return `Hi, I'm ${this.name}`;
};

const bob = new Person('Bob');
console.log(bob.greet()); // "Hi, I'm Bob"
```

### Factory Functions & Closures (PFAs)

```javascript
function createCounter(initial = 0) {
  let count = initial; // private via closure
  return {
    increment() { count += 1; return count; },
    get() { return count; }
  };
}

const c = createCounter(5);
console.log(c.increment()); // 6
```

### ES6 Class Syntax

```javascript
class Person {
  constructor(name) { this.name = name; }
  greet() { return `Hi, I'm ${this.name}`; }
}

const dana = new Person('Dana');
console.log(dana.greet()); // "Hi, I'm Dana"
```

### this / Execution Context

- Method call (obj.fn()): this -> obj
- Simple function call (fn()): this -> undefined in strict mode (global in non-strict)
- Constructor call (new Fn()): this -> new instance
- call/apply/bind: explicitly set `this`

Example:

```javascript
function show() { return this.value; }
const obj = { value: 10 };
console.log(show.call(obj)); // 10
```

---

## How to run the examples

Prerequisites: Node.js 16+ (recommended)

- Run single-file examples with Node:
  - node examples/oloo-example.js
- Run a small static demo in the browser:
  - npx http-server . -c-1
  - open the relevant example HTML in your browser
- Tests (if present):
  - npm install
  - npm test

Each example contains a short README or header comment explaining its purpose and how to run it.

---

## Notes & References

Recommended reading and references used throughout the exercises:

- MDN Web Docs — Object prototypes, Object.create, classes, this
- Kyle Simpson — You Don't Know JS (series), especially "this & Object Prototypes"
- ES6 spec and MDN articles for class semantics vs. prototype behavior

See docs/ for lecture notes, diagrams, and links collected during the course.

---

## Contributing

Contributions are welcome. Suggested workflow:

1. Fork the repository.
2. Create a feature branch: git checkout -b feat/<topic>-example
3. Add or improve exercises/examples, keeping changes focused and documented.
4. Open a pull request describing the change and which exercise it affects.

Please include tests where reasonable and add short explanations in the exercise files for clarity.

---

## License

This repository is provided under the MIT License. See LICENSE.md for details.

---

## Author / Contact

Author: jdarov  
GitHub: https://github.com/jdarov
