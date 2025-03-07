var typedArray = (arr, type) => {
  var t = type || Number;
  var nameOftype = t?.prototype?.constructor.name || t.constructor.name;

  var error = (msg) => {
    throw new TypeError(msg);
  };
  var checkType = (v, t) => v.constructor.name !== nameOftype && error(`Type of value must be ${nameOftype}`);

  !Array.isArray(arr) && error("This is not an array!");

  arr.forEach((v) => checkType(v, t));

  Object.defineProperty(arr, "push", {
    value: (v) => {
      return !checkType(v, t) && Array.prototype.push.call(arr, v);
    },
    configurable: false,
  });

  return new Proxy(arr, {
    set(obj, prop, value) {
      return !checkType(value, t) && Reflect.set(...arguments);
    },
  });
};

export default typedArray;