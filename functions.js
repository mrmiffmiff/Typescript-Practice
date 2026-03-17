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
