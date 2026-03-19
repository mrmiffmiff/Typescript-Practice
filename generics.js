// Generics are a valuable tool for creating reusable components
// The identity function returns what's passed in; we can use a type variable to capture the type of the arg so we can use it to denote the return
// This is also more precise than just using 'any'
function identity(arg) {
    return arg;
}
// In many cases type inference can be done in calling
let output1 = identity("test");
// But passing the Type argument explicitly is always possible
let output2 = identity("test");
// Compiler will enforce that Type Variables are treated properly
// Above, you can't call .length on arg because Type isn't known to be a type that has said property
// However, make it an array and it'll work
function loggingIdentity(arg) {
    console.log(arg.length);
    return arg;
}
let output3 = loggingIdentity(["hello", "world", "goodbye"]);
console.log(output3);
