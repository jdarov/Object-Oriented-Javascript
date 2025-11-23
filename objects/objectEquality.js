function objectsEqual(obj1, obj2) {
  if (!(typeof obj1 === 'object' && typeof obj2 === 'object')) return false;

  if (Object.keys(obj1).length !== Object.keys(obj2).length) return false;

  let objectsAreEqual = true;
  Object.entries(obj1).forEach(([key, val]) => {
    if (val !== obj2[key]) objectsAreEqual = false;
  })
  return objectsAreEqual;
}



console.log(objectsEqual({a: 'foo'}, {a: 'foo'}));                      // true
console.log(objectsEqual({a: 'foo', b: 'bar'}, {a: 'foo'}));            // false
console.log(objectsEqual({a: 'foo', b: 'bar'}, {b: "bar", a: 'foo'}));  // true
console.log(objectsEqual({}, {}));                                      // true
console.log(objectsEqual({a: 'foo', b: undefined}, {a: 'foo',}));  // false