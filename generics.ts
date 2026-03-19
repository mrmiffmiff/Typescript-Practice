// Generics are a valuable tool for creating reusable components
// The identity function returns what's passed in; we can use a type variable to capture the type of the arg so we can use it to denote the return
// This is also more precise than just using 'any'
function identity<Type>(arg: Type): Type {
    return arg;
}
// In many cases type inference can be done in calling
let output1 = identity("test");
// But passing the Type argument explicitly is always possible
let output2 = identity<string>("test");
