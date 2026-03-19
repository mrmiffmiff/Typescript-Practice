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
// The type of generic functions is just like those of non-generic functions, type parameters listed first:
let myIdentity1 = identity;
// Can use different name for generic type parameter in the type; number of variables and usage thereof must line up
let myIdentity2 = identity;
// Can write the generic type as a call signature of an object literal type
let myIdentity3 = identity; // this exact usage is excessive but it's for demonstration
let myIdentity4 = identity;
let myIdentity5 = identity;
// This does become different as we have to specify the type on the usage of the interface which locks us in for that usage to that type
// non-generic function signature that is part of a generic type
console.log(myIdentity4("test"));
console.log(myIdentity5(3));
// Knowing where to put the type parameter is helpful in describing in what way a type is generic or not
