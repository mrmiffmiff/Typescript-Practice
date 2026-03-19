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
// Can create generic classes
class GenericNumber {
}
let myGenericNumber = new GenericNumber();
myGenericNumber.zeroValue = 0;
myGenericNumber.add = function (x, y) {
    return x + y;
};
console.log(myGenericNumber.add(myGenericNumber.zeroValue, 23));
// nothing restricts to number type actually
let stringNumeric = new GenericNumber();
stringNumeric.zeroValue = "";
stringNumeric.add = function (x, y) {
    return x + y;
};
console.log(stringNumeric.add(stringNumeric.zeroValue, "test"));
function loggingIdentity2(arg) {
    console.log(arg.length); // No error here, because we know for sure we have a .length, but still otherwise generic
    return arg;
}
// loggingIdentity2(3); not possible
loggingIdentity2({ length: 10, value: 3 }); // that works fine
// Can declare a type parameter constrained by another type parameter
function getProperty(obj, key) {
    return obj[key];
}
let x = { a: 1, b: 2, c: 3, d: 4 };
getProperty(x, "a");
// getProperty(x, "m"); not possible, as the key does not exist in the given object
// To use class types in generics, must refer to them by their constructor functions
function create(c) {
    return new c();
}
// Can infer and constrain relationships between constructor function and the instance side of class types using prototype property
class BeeKeeper {
    constructor() {
        this.hasMask = true;
    }
}
class ZooKeeper {
    constructor() {
        this.nametag = "Mikle";
    }
}
class Animal {
    constructor() {
        this.numLegs = 4;
    }
}
class Bee extends Animal {
    constructor() {
        super(...arguments);
        this.numLegs = 6;
        this.keeper = new BeeKeeper();
    }
}
class Lion extends Animal {
    constructor() {
        super(...arguments);
        this.keeper = new ZooKeeper();
    }
}
function createInstance(c) {
    return new c();
}
console.log(createInstance(Lion).keeper.nametag);
console.log(createInstance(Bee).keeper.hasMask);
// Can declare defaults for type parameters, making specifying them optional. This helps avoid annoying overloads
// declare function create<T extends HTMLElement = HTMLDivElement, U extends HTMLElement[] = T[]>(
//     element?: T,
//     children?: U
// ): Container<T, U>;
// const div = create(); <-- here div is of type Container<HTMLDivElement, HTMLDivElement[]>
// const p = create(new HTMLParagraphElement()); <-- here p is of type Container<HTMLParagraphElement, HTMLParagraphElement[]>
