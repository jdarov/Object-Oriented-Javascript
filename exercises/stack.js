function newStack() {
  const stack = [];

  return {
    push(value) {
      stack.push(value);
    },
    pop() {
      return stack.pop();
    },
    printStack() {
      stack.forEach(el => console.log(el));
    },
  };
}

const thisStack = newStack();

thisStack.push(5);
thisStack.push(6);
thisStack.push(7);

thisStack.printStack();

console.log(thisStack.pop());

thisStack.printStack();