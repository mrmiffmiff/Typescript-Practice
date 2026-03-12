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

// Functions

// Parameter Type Annotation
function greet2(name: string) {
    console.log("Hello, " + name.toUpperCase() + "!!");
}

// If executed would be a runtime error; for our purposes is actually a compiler error
// greet(42);
greet2("john");

// Return Type Annotations
function getMeaningOfLife(): number {
    return 42;
}
// Not really necessary, can be inferred

console.log(getMeaningOfLife());
// Can use Promise type with <> to annotate function that returns promise:
async function getAsyncMeaningOfLife(): Promise<number> {
    return 42;
}

getAsyncMeaningOfLife().then((value) => { console.log(value) });

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

// This next parameter is an object... its type annotation is just an object listing the properties of the object and their types (optional)
function printCoord(pt: { x: number; y: number }) {
    console.log("The coordinate's x value is " + pt.x);
    console.log("The coordinate's y value is " + pt.y);
}

printCoord({ x: 3, y: 7 });

// Can have optional properties/parameters
function printLastNameUpperCase(obj: { first: string; last?: string }) {
    if (obj.last !== undefined) {
        console.log(obj.first + " " + obj.last.toUpperCase());
    }
    else console.log(obj.first);
}

printLastNameUpperCase({ first: "Bob" });
printLastNameUpperCase({ first: "Alice", last: "Alisson" });

// Basic Union Type, combining existing types
function printId(id: number | string) {
    console.log("Your ID is: " + id);
    // console.log(id.toUpperCase()); <-- This doesn't work because it's not valid for every member of the union... however
    if (typeof id === "string") console.log(id.toUpperCase()); // This works because we've narrowed
    else console.log(id);
}
// OK
printId(101);
// OK
printId("202");
// Error
// printId({ myId: 22342 });

// The separator of union members is actually allowed before the first element, so:
function printTextOrNumberOrBool(
    textOrNumberOrBool:
        | string
        | number
        | boolean
) {
    console.log(textOrNumberOrBool);
}

printTextOrNumberOrBool("hello");

// Another example of narrowing
function welcomePeople(x: string[] | string) {
    if (Array.isArray(x)) console.log("Hello, " + x.join(" and ")); // 'x' is 'string[]'
    else console.log("Welcome lone traveler " + x); // 'x' is 'string'
}

welcomePeople("Robert");
welcomePeople(["Robert", "John", "Jacob", "Ned"]);

// Both strings and arrays have a slice method, so we don't need to narrow
// Return type is appropriately inferred as the same union
function getFirstThree(x: number[] | string) {
    return x.slice(0, 3);
}

console.log(getFirstThree([4, 8, 15, 16, 23, 42]));
console.log(getFirstThree("The Tragedy of Darth Plagueis the Wise"));

// Type Aliases are not actually defining distinct types, but does define names for them. Any types are possible, allows later referral.
// See object type, same as used earlier
type Point = {
    x: number;
    y: number;
};

function printCoord2(pt: Point) {
    console.log("The coordinate's x value is " + pt.x);
    console.log("The coordinate's y value is " + pt.y);
}

printCoord2({ x: 100, y: 100 });

// Type alias for earlier ID union type
type ID = number | string;

// Again, are only aliases, they're like writing the aliased type. The following is legal in TS even though it looks odd.

// type UserInputSanitizedString = string;

// function sanitizeInput(str: string): UserInputSanitizedString {
//     return sanitize(str);
// }

// let userInput = sanitizeInput(getInput());
// userInput = "new input";

