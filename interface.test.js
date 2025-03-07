// node --test

import assert from "node:assert/strict";
import { describe, it } from "node:test";
import createObject from "./interface.js";

describe("Interface", () => {
  describe("Interface with errors", () => {
    it("Field [age] must to be Number type", () => {
      const IProfile = [
        ["name", String],
        ["age", Number],
        ["married", Boolean],
      ];

      assert.throws(() => {
        let obj = createObject(
          {
            name: "john",
            age: true,
            married: true,
          },
          IProfile
        );
      }, /Field: age must to be Number type;/);
    });

    it("Field [name] must to be String type", () => {
      const IProfile = [
        ["name", String],
        ["age", Number],
        ["married", Boolean],
      ];

      assert.throws(() => {
        let obj = createObject(
          {
            name: 777,
            age: true,
            married: true,
          },
          IProfile
        );
      }, /Field: name must to be String type;/);
    });

    it("Field [married] must to be Boolean type", () => {
      const IProfile = [
        ["name", String],
        ["age", Number],
        ["married", Boolean],
      ];

      assert.throws(() => {
        let obj = createObject(
          {
            name: "john",
            age: true,
            married: "yes",
          },
          IProfile
        );
      }, /Field: married must to be Boolean type;/);
    });

    it("Field [name] and [age] must to be String type", () => {
      const IProfile = [
        ["name", String],
        ["age", String],
        ["married", Boolean],
      ];

      assert.throws(() => {
        let obj = createObject(
          {
            name: 40,
            age: 40,
            married: Boolean,
          },
          IProfile
        );
      }, /Field: name must to be String type;Field: age must to be String type;/);
    });

    it("Field [currency] must to be Pay type", () => {
      class Pay {}
      class Test {}

      const IProfile = [
        ["name", String],
        ["age", Number],
        ["married", Boolean],
        ["currency", Pay],
      ];

      assert.throws(() => {
        let obj = createObject(
          {
            name: "john",
            age: true,
            married: "yes",
            currency: new Test(),
          },
          IProfile
        );
      }, /Field: currency must to be Pay type;/);
    });

    it("Count of fields doesn't match", () => {
      const IProfile = [
        ["name", String],
        ["age", Number],
        ["married", Boolean],
      ];

      assert.throws(() => {
        let obj = createObject(
          {
            name: "john",
            age: 40,
          },
          IProfile
        );
      }, /Count of fields doesn't match!/);
    });

    it("Field: [currency] is missing in the object;", () => {
      const IProfile = [
        ["name", String],
        ["age", Number],
        ["married", Boolean],
        ["currency", Number],
      ];

      assert.throws(() => {
        let obj = createObject(
          {
            name: "john",
            age: 40,
            married: true,
            wrongField: 3.14,
          },
          IProfile
        );
      }, /Field: currency is missing in the object;/);
    });
  });

  describe("Interface without errors", () => {
    it("[name] is String, [age] is Number, [married] is Boolean, [currency] is Pay", () => {
      class Pay {}

      const IProfile = [
        ["name", String],
        ["age", Number],
        ["married", Boolean],
        ["currency", Pay],
      ];

      let obj = createObject(
        {
          name: "john",
          age: 40,
          married: true,
          currency: new Pay(),
        },
        IProfile
      );

      assert.deepEqual(obj, {
        name: "john",
        age: 40,
        married: true,
        currency: new Pay(),
      });
    });
  });
});
