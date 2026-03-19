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

// Compiler will enforce that Type Variables are treated properly
// Above, you can't call .length on arg because Type isn't known to be a type that has said property
// However, make it an array and it'll work
function loggingIdentity<Type>(arg: Array<Type>): Array<Type> {
    console.log(arg.length);
    return arg;
}
let output3 = loggingIdentity(["hello", "world", "goodbye"]);
console.log(output3);

// The type of generic functions is just like those of non-generic functions, type parameters listed first:
let myIdentity1: <Type>(arg: Type) => Type = identity;
// Can use different name for generic type parameter in the type; number of variables and usage thereof must line up
let myIdentity2: <Input>(arg: Input) => Input = identity;
// Can write the generic type as a call signature of an object literal type
let myIdentity3: { <Type>(arg: Type): Type } = identity; // this exact usage is excessive but it's for demonstration
// Can make a generic interface
interface GenericIdentityFn1 {
    <Type>(arg: Type): Type;
}
let myIdentity4: GenericIdentityFn1 = identity;
// Can also move the generic parameter to the interface itself, allowing us to see what type(s) we're generic over
// Makes the type parameter visible to other members of the interface
interface GenericIdentityFn2<Type> {
    (arg: Type): Type;
}
let myIdentity5: GenericIdentityFn2<number> = identity;
// This does become different as we have to specify the type on the usage of the interface which locks us in for that usage to that type
// non-generic function signature that is part of a generic type
console.log(myIdentity4<string>("test"));
console.log(myIdentity5(3));
// Knowing where to put the type parameter is helpful in describing in what way a type is generic or not

// Can create generic classes
class GenericNumber<NumType> {
    zeroValue: NumType;
    add: (x: NumType, y: NumType) => NumType;
}
let myGenericNumber = new GenericNumber<number>();
myGenericNumber.zeroValue = 0;
myGenericNumber.add = function (x, y) {
    return x + y;
};
console.log(myGenericNumber.add(myGenericNumber.zeroValue, 23));
// nothing restricts to number type actually
let stringNumeric = new GenericNumber<string>();
stringNumeric.zeroValue = "";
stringNumeric.add = function (x, y) {
    return x + y;
};
console.log(stringNumeric.add(stringNumeric.zeroValue, "test"));
// Again, putting the type on the class itself helps make sure all members work with same type
// This only works on instance side; static members cannot use the type parameter
