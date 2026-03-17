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