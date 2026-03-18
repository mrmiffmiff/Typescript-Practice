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