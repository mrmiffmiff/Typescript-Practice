// First, some very common types
// String
let testString: string = "Hello, world";

// Number
let greatAnswer: number = 42;

// Boolean
let truth: boolean = true;

// Arrays are fairly straightfoward; two syntaxes. The latter has to do with generics.
let someNumbers: number[] = [3, 5, 2, 1];
let someStrings: Array<string> = ["happy", "sad", "aeiou", "y"];

// Type any is a special one; can use whenever I don't want typechecking for a particular value.
// When value is type any, can access any properties of it (will also be type any), call it, assign it to or from a value
// or any valid syntax. Assumed I know better than TS. So need to be careful with it.
// let testObj: any = { x: 0 };
// // No compiler errors here:
// testObj.foo(); // obviously this does cause runtime errors
// testObj();
// testObj.bar = 100;
// testObj = "hello";
// const n: number = testObj;
// Worth noting: By default TSC will assign any if a type is unspecified and can't be inferred.
// Use strict mode or at least noImplicitAny to avoid this. This is very important.

// Anyway what I've done above with all those is use Type Annotations to be explicit. In those cases, it can be inferred so isn't always necessary.
// TS understands more than I may imagine so potentially I can use fewer annotations than I think.

