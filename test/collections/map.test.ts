import { describe, expect, it, jest } from "@jest/globals";
import { ReactiveMap } from "../../src/collections";

describe("ReactiveMap", () => {
  describe("get", () => {
    it("should return the value if it exists", () => {
      const reactiveMap = new ReactiveMap<string, number>();
      expect(reactiveMap.get("foo")).toBeUndefined();
      reactiveMap.set("foo", 1);
      expect(reactiveMap.get("foo")).toEqual(1);
    });
  });

  describe("set", () => {
    it("should set a value", () => {
      const reactiveMap = new ReactiveMap<string, number>();
      reactiveMap.set("foo", 1);
      expect(reactiveMap.get("foo")).toEqual(1);
    });

    it("should notify on set", () => {
      const reactiveMap = new ReactiveMap<string, number>();
      const mockNotify = jest.fn();
      const dispose = reactiveMap.$.reaction(mockNotify, true);

      reactiveMap.set("foo", 1);
      expect(mockNotify).toHaveBeenCalledTimes(1);
      expect(mockNotify).toHaveBeenCalledWith(reactiveMap);

      dispose();
    });

    it("should not notify on set if setting same value", () => {
      const reactiveMap = new ReactiveMap<string, number>();
      const mockNotify = jest.fn();
      const dispose = reactiveMap.$.reaction(mockNotify, true);

      reactiveMap.set("foo", 1);
      expect(mockNotify).toHaveBeenCalledTimes(1);
      expect(mockNotify).toHaveBeenCalledWith(reactiveMap);

      mockNotify.mockClear();

      reactiveMap.set("foo", 1);
      expect(mockNotify).toHaveBeenCalledTimes(0);

      dispose();
    });
  });

  describe("batchSet", () => {
    it("should set multiple values", () => {
      const reactiveMap = new ReactiveMap<string, number>();
      reactiveMap.batchSet([
        ["foo", 1],
        ["bar", 2],
      ]);
      expect(reactiveMap.get("foo")).toEqual(1);
      expect(reactiveMap.get("bar")).toEqual(2);
    });

    it("should notify on batchSet", () => {
      const reactiveMap = new ReactiveMap<string, number>();
      const mockNotify = jest.fn();
      const dispose = reactiveMap.$.reaction(mockNotify, true);

      reactiveMap.batchSet([
        ["foo", 1],
        ["bar", 2],
      ]);
      expect(mockNotify).toHaveBeenCalledTimes(1);
      expect(mockNotify).toHaveBeenCalledWith(reactiveMap);

      dispose();
    });

    it("should not notify on batchSet if setting same values", () => {
      const reactiveMap = new ReactiveMap<string, number>();
      const mockNotify = jest.fn();
      const dispose = reactiveMap.$.reaction(mockNotify, true);

      reactiveMap.batchSet([
        ["foo", 1],
        ["bar", 2],
      ]);
      expect(mockNotify).toHaveBeenCalledTimes(1);
      expect(mockNotify).toHaveBeenCalledWith(reactiveMap);

      mockNotify.mockClear();

      reactiveMap.batchSet([
        ["foo", 1],
        ["bar", 2],
      ]);
      expect(mockNotify).toHaveBeenCalledTimes(0);

      dispose();
    });
  });

  describe("delete", () => {
    it("should delete a value", () => {
      const reactiveMap = new ReactiveMap<string, number>();
      reactiveMap.set("foo", 1);
      reactiveMap.delete("foo");
      expect(reactiveMap.get("foo")).toBeUndefined();
    });

    it("should notify on delete", () => {
      const reactiveMap = new ReactiveMap<string, number>();
      reactiveMap.set("foo", 1);
      const mockNotify = jest.fn();
      const dispose = reactiveMap.$.reaction(mockNotify, true);

      reactiveMap.delete("foo");
      expect(mockNotify).toHaveBeenCalledTimes(1);
      expect(mockNotify).toHaveBeenCalledWith(reactiveMap);

      dispose();
    });

    it("should not notify on delete if the element does not exist.", () => {
      const reactiveMap = new ReactiveMap<string, number>();
      const mockNotify = jest.fn();
      const dispose = reactiveMap.$.reaction(mockNotify, true);

      reactiveMap.delete("foo");
      expect(mockNotify).not.toHaveBeenCalled();

      dispose();
    });
  });

  describe("batchDelete", () => {
    it("should delete multiple values", () => {
      const reactiveMap = new ReactiveMap<string, number>();
      reactiveMap.set("foo", 1);
      reactiveMap.set("bar", 2);
      reactiveMap.batchDelete(["foo", "bar"]);
      expect(reactiveMap.get("foo")).toBeUndefined();
      expect(reactiveMap.get("bar")).toBeUndefined();
    });

    it("should notify on batchDelete", () => {
      const reactiveMap = new ReactiveMap<string, number>();
      reactiveMap.set("foo", 1);
      const mockNotify = jest.fn();
      const dispose = reactiveMap.$.reaction(mockNotify, true);

      reactiveMap.batchDelete(["foo"]);
      expect(mockNotify).toHaveBeenCalledTimes(1);
      expect(mockNotify).toHaveBeenCalledWith(reactiveMap);

      dispose();
    });

    it("should not notify on batchDelete if the element does not exist.", () => {
      const reactiveMap = new ReactiveMap<string, number>();
      const mockNotify = jest.fn();
      const dispose = reactiveMap.$.reaction(mockNotify, true);

      reactiveMap.batchDelete(["foo"]);
      expect(mockNotify).not.toHaveBeenCalled();

      dispose();
    });
  });

  describe("clear", () => {
    it("should clear all values", () => {
      const reactiveMap = new ReactiveMap<string, number>();
      reactiveMap.set("foo", 1);
      reactiveMap.set("bar", 2);
      reactiveMap.clear();
      expect(reactiveMap.get("foo")).toBeUndefined();
      expect(reactiveMap.get("bar")).toBeUndefined();
    });

    it("should notify on clear", () => {
      const reactiveMap = new ReactiveMap<string, number>();
      reactiveMap.set("foo", 1);
      const mockNotify = jest.fn();
      const dispose = reactiveMap.$.reaction(mockNotify, true);

      reactiveMap.clear();
      expect(mockNotify).toHaveBeenCalledTimes(1);
      expect(mockNotify).toHaveBeenCalledWith(reactiveMap);

      dispose();
    });

    it("should not notify on delete if the map is empty.", () => {
      const reactiveMap = new ReactiveMap<string, number>();
      const mockNotify = jest.fn();
      const dispose = reactiveMap.$.reaction(mockNotify, true);

      reactiveMap.clear();
      expect(mockNotify).not.toHaveBeenCalled();

      dispose();
    });
  });

  describe("replace", () => {
    it("should replace all entries", () => {
      const reactiveMap = new ReactiveMap<string, number>();
      reactiveMap.set("foo", 1);
      reactiveMap.set("bar", 2);
      reactiveMap.replace([["baz", 3]]);
      expect(reactiveMap.get("foo")).toBeUndefined();
      expect(reactiveMap.get("bar")).toBeUndefined();
      expect(reactiveMap.get("baz")).toEqual(3);
    });

    it("should notify on replace", () => {
      const reactiveMap = new ReactiveMap<string, number>();
      const mockNotify = jest.fn();
      const dispose = reactiveMap.$.reaction(mockNotify, true);

      reactiveMap.replace([["baz", 3]]);
      expect(mockNotify).toHaveBeenCalledTimes(1);
      expect(mockNotify).toHaveBeenCalledWith(reactiveMap);

      dispose();
    });

    it("should replace more entries", () => {
      const reactiveMap = new ReactiveMap<string, number>(
        Object.entries({
          foo: 1,
          bar: 2,
        })
      );

      const mockNotify = jest.fn();
      const dispose = reactiveMap.$.reaction(mockNotify, true);

      reactiveMap.replace([
        ["baz", 3],
        ["qux", 4],
        ["quux", 5],
      ]);

      expect(reactiveMap.get("foo")).toBeUndefined();
      expect(reactiveMap.get("bar")).toBeUndefined();
      expect(reactiveMap.get("baz")).toEqual(3);
      expect(reactiveMap.get("qux")).toEqual(4);
      expect(reactiveMap.get("quux")).toEqual(5);

      expect(mockNotify).toHaveBeenCalledTimes(1);

      dispose();
    });

    it("should replace less entries", () => {
      const reactiveMap = new ReactiveMap<string, number>(
        Object.entries({
          foo: 1,
          bar: 2,
        })
      );

      const mockNotify = jest.fn();
      const dispose = reactiveMap.$.reaction(mockNotify, true);

      reactiveMap.replace([["baz", 3]]);

      expect(reactiveMap.get("foo")).toBeUndefined();
      expect(reactiveMap.get("bar")).toBeUndefined();
      expect(reactiveMap.get("baz")).toEqual(3);

      expect(mockNotify).toHaveBeenCalledTimes(1);

      dispose();
    });

    it("should not replace same entries", () => {
      const reactiveMap = new ReactiveMap<string, number>(
        Object.entries({
          foo: 1,
          bar: 2,
        })
      );

      const mockNotify = jest.fn();
      const dispose = reactiveMap.$.reaction(mockNotify, true);

      reactiveMap.replace([
        ["bar", 2],
        ["foo", 1],
      ]);

      expect(reactiveMap.get("foo")).toBe(1);
      expect(reactiveMap.get("bar")).toBe(2);

      expect(mockNotify).toHaveBeenCalledTimes(0);

      dispose();
    });

    it("should not notify if not changed", () => {
      const reactiveMap = new ReactiveMap<string, number>([["baz", 3]]);
      const mockNotify = jest.fn();
      const dispose = reactiveMap.$.reaction(mockNotify, true);

      reactiveMap.replace([["baz", 3]]);
      expect(mockNotify).toHaveBeenCalledTimes(0);

      dispose();
    });

    it("should notify if some keys are removed", () => {
      const reactiveMap = new ReactiveMap<string, number>([
        ["baz", 3],
        ["foo", 4],
      ]);
      const mockNotify = jest.fn();
      const dispose = reactiveMap.$.reaction(mockNotify, true);

      expect(reactiveMap.get("foo")).toBe(4);

      reactiveMap.replace([["baz", 3]]);
      expect(mockNotify).toHaveBeenCalledTimes(1);
      expect(reactiveMap.get("foo")).toBeUndefined();

      dispose();
    });

    it("should return deleted entries", () => {
      const reactiveMap = new ReactiveMap<string, number>([
        ["baz", 3],
        ["foo", 4],
      ]);
      const mockNotify = jest.fn();
      const dispose = reactiveMap.$.reaction(mockNotify, true);

      const deleted = reactiveMap.replace([["baz", 3]]);
      expect([...deleted]).toEqual([4]);

      dispose();
    });
  });

  describe("dispose", () => {
    it("should dispose a watcher", () => {
      const reactiveMap = new ReactiveMap<string, number>();
      const mockNotify = jest.fn();

      reactiveMap.$.reaction(mockNotify, true);
      reactiveMap.$.unsubscribe(mockNotify);

      reactiveMap.set("foo", 1);
      expect(mockNotify).not.toHaveBeenCalled();
    });

    it("should dispose a watcher via disposer function", () => {
      const reactiveMap = new ReactiveMap<string, number>();
      const mockNotify = jest.fn();
      const dispose = reactiveMap.$.reaction(mockNotify, true);
      dispose();
      reactiveMap.set("foo", 1);
      expect(mockNotify).not.toHaveBeenCalled();
    });
  });

  describe("dispose", () => {
    it("should dispose all watchers", () => {
      const reactiveMap = new ReactiveMap<string, number>();
      const mockNotify1 = jest.fn();
      const mockNotify2 = jest.fn();
      reactiveMap.$.reaction(mockNotify1, true);
      reactiveMap.$.reaction(mockNotify2, true);
      reactiveMap.dispose();
      reactiveMap.set("foo", 1);
      expect(mockNotify1).not.toHaveBeenCalled();
      expect(mockNotify2).not.toHaveBeenCalled();
    });
  });
});
