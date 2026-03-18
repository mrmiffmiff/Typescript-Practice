// Functions local, imported, or methods, are the building blocks of an app
// They are also values, and thus there are many ways to describe them in the type system
// i.e. the function fn has one parameter, a, of type string, and no return type
// if types unspecified, any, as always
// The name is required
function greeter(fn) {
    fn("Hello, World");
}
function printToConsole(s) {
    console.log(s);
}
greeter(printToConsole);
function doSomething(fn) {
    console.log(fn.description + " returned " + fn(6));
}
function myFunc(someArg) {
    return someArg > 3;
}
myFunc.description = "default description";
doSomething(myFunc);
function fn2(ctor) {
    // Passing an argument of type 'number' to 'ctor' matches it against
    // the first definition in the 'CallOrConstruct' interface.
    console.log(ctor(10));
    // Similarly, passing an argument of type 'string' to 'ctor' matches it
    // against the second definition in the 'CallOrConstruct' interface.
    console.log(new ctor("10"));
}
fn2(Date);
// Generics allow us to describe a correspondence between two values
// For example an input type and the output type
// Or two input types
// Generics let us do this without actually predetermining the type, so we can avoid needing to use any
// For example, returning the first element of an array
function firstElement(arr) {
    return arr[0];
}
// s is of type 'string'
const s = firstElement(["a", "b", "c"]);
console.log(s);
// n is of type 'number'
const n = firstElement([1, 2, 3]);
console.log(n);
// u is of type undefined
const u = firstElement([]);
console.log(u);
// Type didn't need specification, it can be inferred. Can also use multiple type parameters:
function map(arr, func) {
    return arr.map(func);
}
// Parameter 'n' is of type 'string'
// 'parsed' is of type 'number[]'
const parsed = map(["1", "2", "3"], (n) => Number.parseInt(n));
// I find this really cool how well the inference works tbh, the hints even changed as I typed that
console.log(parsed);
// Sometimes we may want to relate values like above but limit to a certain subset of types of values to operate on
// Can use constraints to limit the types a type parameter accepts
function longest(a, b) {
    if (a.length >= b.length) { // because both a and b are of Type which *must* have a length, we can access the length; without that constraint we couldn't because there's always the possibility it won't exist
        return a;
    }
    else {
        return b;
    }
}
// longerArray is of type 'number[]'
const longerArray = longest([1, 2], [1, 2, 3]);
console.log(longerArray);
// longerString is of type 'alice' | 'bob'
const longerString = longest("alice", "bob");
console.log(longerString);
// This won't work and will error because Numbers don't have a 'length' property
// const notOK = longest(10, 100);
// Still inferred return types in each case
// Common error:
// function minimumLength<Type extends { length: number }>(
//     obj: Type,
//     minimum: number
// ): Type {
//     if (obj.length >= minimum) {
//         return obj;
//     } else {
//         return { length: minimum }; // This doesn't work, it doesn't matter that it fits the constraint because it's not actually Type itself as defined by the parameter
//     }
// }
// // If this worked you could do the following which is obviously wrong
// // 'arr' gets value { length: 6 }
// const arr = minimumLength([1, 2, 3], 6);
// // and crashes here because arrays have
// // a 'slice' method, but not the returned object!
// console.log(arr.slice(0));
// Type parameters can be specified in actual calls as type arguments, this can get around some issues with inference
function combine(arr1, arr2) {
    return arr1.concat(arr2);
}
// Cannot just call this on its own
// const arr = combine([1, 2, 3], ["hello"]); this is an error
// However, if we give a type argument and specify a union, it'll work
const arr = combine([1, 2, 3], ["hello"]);
console.log(arr);
function makeDate(mOrTimestamp, d, y) {
    if (d !== undefined && y !== undefined) {
        return new Date(y, mOrTimestamp, d);
    }
    else {
        return new Date(mOrTimestamp);
    }
}
const d1 = makeDate(12345678);
const d2 = makeDate(5, 5, 5);
const user = {
    id: 123,
    admin: false,
    becomeAdmin: function () {
        this.admin = true;
    },
};
// declare const getDB: () => DB;
// const db = getDB();
// const admins = db.filterUsers(function (this: User) {
//     return this.admin;
// });
// This doesn't actually do anything rn so I'm commenting it out obviously
// Common with callback-style APIs, where another object controls when function is called... must use function and not arrow functions
// Arrow functions capture the global value of 'this'
// Rest parameters are always an array, must be at the end
function multiply(n, ...m) {
    return m.map((x) => n * x);
}
// 'a' gets value [10, 20, 30, 40];
const a = multiply(10, 1, 2, 3, 4);
console.log(a);
// Can also provide a variable number of arguments from an iterable using spread syntax
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
arr1.push(...arr2);
console.log(arr1);
function sum({ a, b, c }) {
    console.log(a + b + c);
}
