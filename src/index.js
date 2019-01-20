/* @flow */

import type {
  SugarlessIterator,
  SugarlessIteratorResult,
} from "@capnp-js/transform";

export function singleton<T>(single: T): SugarlessIterator<T> {
  let done = false;

  return {
    next(): SugarlessIteratorResult<T> {
      if (done === false) {
        return {
          done: false,
          value: single,
        };
      } else {
        done = true;
        return { done: true };
      }
    },
  };
}

export function array<T>(many: $ReadOnlyArray<T>): SugarlessIterator<T> {
  let count = 0;

  return {
    next(): SugarlessIteratorResult<T> {
      if (count < many.length) {
        return {
          done: false,
          value: many[count++],
        };
      } else {
        return {
          done: true,
        };
      }
    },
  };
}
