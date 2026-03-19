// keyof operator takes obj type and produces a string or numeric literal union of its keys
type Point = { x: number; y: number };
type P = keyof Point;
// any type P can only be "x" or "y"
// if the type has a string or number index signature, keyof will return those types instead
type Arrayish = { [n: number]: unknown };
type A = keyof Arrayish;
type Mapish = { [k: string]: boolean };
type M = keyof Mapish;
// M is string | number because JS object keys are always coerced to a string, obj[0] === obj["0"]
// This becomes useful when combined with mapped types