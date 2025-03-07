// node --test

import assert from "node:assert/strict";
import { describe, it } from "node:test";
import typedArray from "./typed-array.js";

describe("Typed Array", () => {
  describe("Typed Array with errors", () => {
    it("Only strings allowed, should throw an error", () => {
      const arr = typedArray(["a", "b", "c"], String);
      assert.throws(() => arr.push(1), /Type of value must be String/);
    });

    it("Only number allowed, should throw an error", () => {
      const arr = typedArray([1, 2, 3], Number);
      assert.throws(() => (arr[3] = "a"), /Type of value must be Number/);
    });

    it("Only boolean allowed, should throw an error", () => {
      const arr = typedArray([true, false], Boolean);
      assert.throws(() => (arr[2] = "a"), /Type of value must be Boolean/);
    });

    it("Only type Test allowed, should throw an error", () => {
      class Test {}
      const arr = typedArray([], Test);
      assert.throws(() => arr.push("a"), /Type of value must be Test/);
    });
  });

  describe("Typed Array without errors", () => {
    it("Only string allowed", () => {
      const arr = typedArray(["a", "b", "c"], String);
      arr.push("d");
      assert.deepEqual(arr, ["a", "b", "c", "d"]);
    });
    it("Only number allowed", () => {
      const arr = typedArray([1, 2, 3], Number);
      arr[3] = 4;
      assert.deepEqual(arr, [1, 2, 3, 4]);
    });
    it("Only boolean allowed", () => {
      const arr = typedArray([], Boolean);
      arr[0] = true;
      arr.push(false);
      assert.deepEqual(arr, [true, false]);
    });
    it("Only type Test allowed", () => {
      class Test {}
      let t = new Test();
      const arr = typedArray([t], Test);
      arr[1] = t;
      arr.push(t);
      assert.deepEqual(arr, [t, t, t]);
    });
  });
});
