// Objects are important for passing data in JS, obviously
// Can represent as object types, which can be anonymous or made in the normal ways through interfaces and type aliases
interface Person {
    name: string;
    age: number;
}
// Could use this in a function called greet... could also have done it anonymously or with a type alias.
// The main point is that, if Person is the type for the parameter of the function...
// then the function takes and indeed must take an object containing a string called name and a number called age

// Can mark optional properties with ?, thus becomes a union of defined type and undefined, kind of just a shorthand
interface Circle {
    kind: "circle";
    radius: number;
}

interface Square {
    kind: "square";
    sideLength: number;
}

type Shape = Circle | Square;

interface PaintOptions {
    shape: Shape;
    xPos?: number;
    yPos?: number;
}

function paintShape1(opts: PaintOptions) {
    // Can of course read from the optional properties but under strictNullChecks TS will let us know they're potentially undefined
    // Can thus handle the undefined case
    let xPos = opts.xPos ?? 0;
    console.log("paintShape1 x coordinate at", xPos);
    let yPos = opts.yPos ?? 0;
    console.log("paintShape1 y coordinate at", yPos);
}
// Of course, JS has the syntax already to support setting defaults for unspecified values
function paintShape2({ shape, xPos = 0, yPos = 0 }: PaintOptions) { // destructuring pattern, no way to place type annotations within
    console.log("paintShape2 x coordinate at", xPos);
    console.log("paintShape2 y coordinate at", yPos);
}

const shape: Shape = {
    kind: "square",
    sideLength: 5,
};
// All of these are valid usages
paintShape1({ shape });
paintShape1({ shape, xPos: 100 });
paintShape1({ shape, yPos: 100 });
paintShape1({ shape, xPos: 100, yPos: 100 });
paintShape2({ shape });
paintShape2({ shape, xPos: 100 });
paintShape2({ shape, yPos: 100 });
paintShape2({ shape, xPos: 100, yPos: 100 });

// Properties can be marked readonly; this doesn't change runtime behavior, and internal contents can still be changed
// but property itself can't be written to during type-checking
interface Home {
    readonly resident: { name: string; age: number };
}
function visitForBirthday(home: Home) {
    // Can still update resident's properties
    console.log(`Happy birthday ${home.resident.name}`);
    home.resident.age++;
}
// function evict(home: Home) {
//     // But can't write to the 'resident' property itself on a 'Home'
//     home.resident = {

//     }
// }
interface Person {
    name: string;
    age: number;
}
interface ReadonlyPerson {
    readonly name: string;
    readonly age: number;
}
let writablePerson: Person = {
    name: "Person McPersonface",
    age: 42,
};
// the following all works because TS doesn't factor in whether properties on two types are readonly when checking type compatibility
let readonlyPerson: ReadonlyPerson = writablePerson;
console.log(readonlyPerson.age);
writablePerson.age++;
console.log(readonlyPerson.age);
// So main use of this is to signal intent during dev time rather than actually enforcing anything

// Can use index signatures when don't know the names of a type's properties but do know the shapes of the values
interface StringArray {
    [index: number]: string;
}
const myArray: StringArray = ["hello", "salud", "goodbye"];
const secondItem = myArray[1];
console.log(secondItem);
// With numbers as the indexing value, need to be careful when combining with string, as it gets converted to a string, subset needed
interface Animal {
    name: string;
}
interface Dog extends Animal {
    breed: string;
}
// interface NotOkay {
//     [x: number]: Animal;
//     [x: string]: Dog;
// } can't work as animal is not a subset of dog
interface ProbablyOkay {
    [x: string]: Animal;
    [x: number]: Dog;
} // this works though
// Dictionary patterns possible with stirng index signatures, but does enforce that properties match return type
// String index declares that obj.property is also obj["property"]
interface NumberDictionary {
    [index: string]: number;
    length: number; //ok
    // name: string; doesn't work
}
// With union though
interface NumberOrStringDictionary {
    [index: string]: number | string;
    length: number; //ok
    name: string; //also ok
}
// Can make index signatures readonly to prevent assignment of course
interface ReadOnlyStringArray {
    readonly [index: number]: string;
}
let myArray2: ReadOnlyStringArray = ["hello", "salud", "goodbye"];
// myArray2[2] = "welcome";

// Object literals undergo excess property checking when assigning to typed variables or passing as arguments
interface SquareConfig {
    color?: string;
    width?: number;
    [propName: string]: unknown;
}
function createSquare(config: SquareConfig): { color: string; area: number } {
    return {
        color: config.color || "red",
        area: config.width ? config.width * config.width : 20,
    };
}
// let mySquare = createSquare({ colour: "red", width: 100 }); doesn't work as colour doesn't exist and color isn't filled
// can get around some of this strictness in certain ways
// Type assertion:
let mySquare2 = createSquare({ width: 100, opacity: 0.5 } as SquareConfig);
// string index signature, see above
let mySquare3 = createSquare({ width: 100, opacity: 0.5 }); // with the index sig, as long as it doesn't match existing props, type doesn't matter
// Assign to another variable
let squareOptions = { colour: "red", width: 100 };
let mySquare = createSquare(squareOptions); // if the index sig wasn't there and the passed in object had nothing in common with the interface, this would break
// This should be saved for more complex structures rather than simple stuff like this

// Quite common to need to have more specific versions of types
interface BasicAddress {
    name?: string;
    street: string;
    city: string;
    country: string;
    postalCode: string;
}
// Rather than defining the more specific version with all the same properties plus more, can just extend
interface AddressWithUnit extends BasicAddress {
    unit: string;
}
// An interface can extend from multiple types
interface Colorful {
    color: string;
}
interface Circle2 {
    radius: number;
}
interface ColorfulCircle extends Colorful, Circle2 { }
const cc: ColorfulCircle = {
    color: "red",
    radius: 42,
};

// Can also combine, make Intersection Types, with &
type ColorfulCircle2 = Colorful & Circle2;
function draw(circle: Colorful & Circle2) {
    console.log(`Color was ${circle.color}`);
    console.log(`Radius was ${circle.radius}`);
}
// okay
draw({ color: "blue", radius: 42 });
// oops
// draw({ color: "red", raidus: 42 });

// There are differences between these, subtly, mainly in conflict handling
// Interfaces try to merge compatible properties or error otherwise...
// interface NotWorkingPerson {
//     name: string;
// }
// interface NotWorkingPerson {
//     name: number; we don't allow this
// }
// Intersections will compile such cases but give us a never type
interface Person1 {
    name: string;
}
interface Person2 {
    name: number;
}
type Staff = Person1 & Person2;
declare const staffer: Staff;
// staffer.name;
