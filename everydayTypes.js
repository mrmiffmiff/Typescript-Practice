"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// First, some very common types
// String
let testString = "Hello, world";
// Number
let greatAnswer = 42;
// Boolean
let truth = true;
// Arrays are fairly straightfoward; two syntaxes. The latter has to do with generics.
let someNumbers = [3, 5, 2, 1];
let someStrings = ["happy", "sad", "aeiou", "y"];
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
// Functions
// Parameter Type Annotation
function greet(name) {
    console.log("Hello, " + name.toUpperCase() + "!!");
}
// If executed would be a runtime error; for our purposes is actually a compiler error
// greet(42);
greet("john");
// Return Type Annotations
function getMeaningOfLife() {
    return 42;
}
// Not really necessary, can be inferred
console.log(getMeaningOfLife());
// Can use Promise type with <> to annotate function that returns promise:
function getAsyncMeaningOfLife() {
    return __awaiter(this, void 0, void 0, function* () {
        return 42;
    });
}
getAsyncMeaningOfLife().then((value) => { console.log(value); });
// Anonymous Functions: When a function appears in a place where TypeScript can determine how it’s going to be called, the parameters of that function are automatically given types.
const names = ["Alice", "Bob", "Eve"];
// Contextual typing for function - parameter s inferred to have type string
names.forEach(function (s) {
    console.log(s.toUpperCase());
});
// Contextual typing also applies to arrow functions
names.forEach((s) => {
    console.log(s.toUpperCase());
});
// TS uses the types of the forEach to determine s
// Called contextual typing because context informs type
// Again, important to know this happens so I know when annotation isn't needed
