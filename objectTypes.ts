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