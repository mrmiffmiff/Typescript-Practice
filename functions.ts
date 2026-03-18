// Functions local, imported, or methods, are the building blocks of an app
// They are also values, and thus there are many ways to describe them in the type system

// Function Type Expressions: Similar to arrow functions syntatically
type GreetFunction = (a: string) => void; // Can of course type alias with all the following
// i.e. the function fn has one parameter, a, of type string, and no return type
// if types unspecified, any, as always
// The name is required
function greeter(fn: GreetFunction) {
    fn("Hello, World");
}
function printToConsole(s: string) {
    console.log(s);
}
greeter(printToConsole);

// Call Signatures allow us to describe something callable with properties
type DescribableFunction = {
    description: string;
    (someArg: number): boolean; // note colon between parameter and return rather than arrow
};
function doSomething(fn: DescribableFunction) {
    console.log(fn.description + " returned " + fn(6));
}
function myFunc(someArg: number) {
    return someArg > 3;
}
myFunc.description = "default description";
doSomething(myFunc);

// Construct Signatures are made by adding new in front of a call signature
// type SomeConstructor = {
//     new (s: string): SomeObject;
// };
// function fn(ctor: SomeConstructor) {
//     return new ctor("hello");
// }
// Can combine call and construct signatures; some objects like Date can be called with or without new
interface CallOrConstruct {
    (n?: number): string;
    new(s: string): Date;
}
function fn2(ctor: CallOrConstruct) {
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
function firstElement<Type>(arr: Type[]): Type | undefined {
    return arr[0];
}
// s is of type 'string'
const s = firstElement(["a", "b", "c"]);
console.log(s)
// n is of type 'number'
const n = firstElement([1, 2, 3]);
console.log(n);
// u is of type undefined
const u = firstElement([]);
console.log(u);
// Type didn't need specification, it can be inferred. Can also use multiple type parameters:
function map<Input, Output>(arr: Input[], func: (arg: Input) => Output): Output[] {
    return arr.map(func);
}
// Parameter 'n' is of type 'string'
// 'parsed' is of type 'number[]'
const parsed = map(["1", "2", "3"], (n) => Number.parseInt(n));
// I find this really cool how well the inference works tbh, the hints even changed as I typed that
console.log(parsed);

// Sometimes we may want to relate values like above but limit to a certain subset of types of values to operate on
// Can use constraints to limit the types a type parameter accepts
function longest<Type extends { length: number }>(a: Type, b: Type) { // so Type must have a length property (e.g. arrays, strings)
    if (a.length >= b.length) { // because both a and b are of Type which *must* have a length, we can access the length; without that constraint we couldn't because there's always the possibility it won't exist
        return a;
    } else {
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
function combine<Type>(arr1: Type[], arr2: Type[]): Type[] {
    return arr1.concat(arr2);
}
// Cannot just call this on its own
// const arr = combine([1, 2, 3], ["hello"]); this is an error
// However, if we give a type argument and specify a union, it'll work
const arr = combine<string | number>([1, 2, 3], ["hello"]);
console.log(arr);

// Optional parameters can be indicated with ?
// Or can specify a default as usual, which I guess also makes it optional and types it
// Avoid the former for callbacks though, unless you intend to call the function without passing that argument

// Function overloads: Overload signatures, specifying a function that can be called in different ways
function makeDate(timestamp: number): Date;
function makeDate(m: number, d: number, y: number): Date;
function makeDate(mOrTimestamp: number, d?: number, y?: number): Date { // this last signature is the implementation signature... it can't be called directly, only by the 2 overload signatures
    if (d !== undefined && y !== undefined) {
        return new Date(y, mOrTimestamp, d);
    } else {
        return new Date(mOrTimestamp);
    }
}
const d1 = makeDate(12345678);
const d2 = makeDate(5, 5, 5);
// const d3 = makeDate(1, 3); obviouly is not possible

// 'this' will have its type inferred normally
interface User {
    id: number,
    admin: boolean,
    becomeAdmin?: () => void
}
const user: User = {
    id: 123,
    admin: false,
    becomeAdmin: function () {
        this.admin = true;
    },
};
// Sometimes we need more control over what 'this' is; JS spec states you cannot have parameter called this
// TS can thus use that syntax space to allow us to declare 'this'
interface DB {
    filterUsers(filter: (this: User) => boolean): User[];
}
// declare const getDB: () => DB;
// const db = getDB();
// const admins = db.filterUsers(function (this: User) {
//     return this.admin;
// });
// This doesn't actually do anything rn so I'm commenting it out obviously
// Common with callback-style APIs, where another object controls when function is called... must use function and not arrow functions
// Arrow functions capture the global value of 'this'
