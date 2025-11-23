// name property added to make objects easier to identify
const foo = {name: 'foo'};
const bar = Object.create(foo);
bar.name = 'bar';
const baz = Object.create(bar);
baz.name = 'baz';
const qux = Object.create(baz);
qux.name = 'qux';

Object.prototype.ancestors = function() {
  const ancestors = [];
  let proto = Object.getPrototypeOf(this);

  while (proto) {
    if (proto.hasOwnProperty('name')) {
      ancestors.push(proto.name)
    } else {
      ancestors.push('Object.prototype');
    }

    proto = Object.getPrototypeOf(proto);
  }

  return ancestors;
};
console.log(Object.getPrototypeOf(foo))
qux.ancestors();  // ?
// returns ['baz', 'bar', 'foo', 'Object.prototype']
baz.ancestors();  // returns ['bar', 'foo', 'Object.prototype']
bar.ancestors();  // returns ['foo', 'Object.prototype']
foo.ancestors();  // returns ['Object.prototype']