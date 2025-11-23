function makeGreeting() {
  let foo = { greeting: 'hello' };
  return function(name) {
    foo.name = name;
    return foo;
  };
}

let greeting = makeGreeting();

// is the object eligible for GC here?

// more code

greeting('john'); //?