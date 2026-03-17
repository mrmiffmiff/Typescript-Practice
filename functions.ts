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