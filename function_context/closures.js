function makeMultipleLister(startNum) {
  return function() {
    for (let i = startNum; i < 100; i += startNum) {
      console.log(i);
    }
  }
}

let lister = makeMultipleLister(13);
let secondLister = makeMultipleLister(15);
lister();
secondLister();

function makeAdderSubtractor() {
  let runningTotal = 0;

  function add(num) {
    runningTotal += num;
    console.log(runningTotal);
  }

  function subtract(num) {
    runningTotal -= num;
    console.log(runningTotal);
  }

  return {
    add,
    subtract,
  }
}

const { add, subtract } = makeAdderSubtractor();

add(1);
add(42);
subtract(39);
add(6);

function startup() {
  let status = 'ready';
  return function() {
    console.log('The system is ready.');
  };
}

let ready = startup();
let systemStatus = ready.status;
console.log(systemStatus);