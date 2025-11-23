function delegate(object, methodName, ...args) {
  return function(...moreArgs) {
    return object[methodName].apply(object, args.concat(moreArgs));
  };
};


const foo = {
  name: 'test',
  bar(greeting) {
    console.log(`${greeting} ${this.name}`);
  },
};

const baz = {
  qux: delegate(foo, 'bar', 'hello'),
};

baz.qux();   // logs 'hello test';

foo.bar = () => { console.log('changed'); };

baz.qux();          // logs 'changed'