function paintShape1(opts) {
    var _a, _b;
    // Can of course read from the optional properties but under strictNullChecks TS will let us know they're potentially undefined
    // Can thus handle the undefined case
    let xPos = (_a = opts.xPos) !== null && _a !== void 0 ? _a : 0;
    console.log("paintShape1 x coordinate at", xPos);
    let yPos = (_b = opts.yPos) !== null && _b !== void 0 ? _b : 0;
    console.log("paintShape1 y coordinate at", yPos);
}
// Of course, JS has the syntax already to support setting defaults for unspecified values
function paintShape2({ shape, xPos = 0, yPos = 0 }) {
    console.log("paintShape2 x coordinate at", xPos);
    console.log("paintShape2 y coordinate at", yPos);
}
const shape = {
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
function visitForBirthday(home) {
    // Can still update resident's properties
    console.log(`Happy birthday ${home.resident.name}`);
    home.resident.age++;
}
let writablePerson = {
    name: "Person McPersonface",
    age: 42,
};
// the following all works because TS doesn't factor in whether properties on two types are readonly when checking type compatibility
let readonlyPerson = writablePerson;
console.log(readonlyPerson.age);
writablePerson.age++;
console.log(readonlyPerson.age);
const myArray = ["hello", "salud", "goodbye"];
const secondItem = myArray[1];
console.log(secondItem);
let myArray2 = ["hello", "salud", "goodbye"];
function createSquare(config) {
    return {
        color: config.color || "red",
        area: config.width ? config.width * config.width : 20,
    };
}
// let mySquare = createSquare({ colour: "red", width: 100 }); doesn't work as colour doesn't exist and color isn't filled
// can get around some of this strictness in certain ways
// Type assertion:
let mySquare2 = createSquare({ width: 100, opacity: 0.5 });
// string index signature, see above
let mySquare3 = createSquare({ width: 100, opacity: 0.5 }); // with the index sig, as long as it doesn't match existing props, type doesn't matter
// Assign to another variable
let squareOptions = { colour: "red", width: 100 };
let mySquare = createSquare(squareOptions); // if the index sig wasn't there and the passed in object had nothing in common with the interface, this would break
const cc = {
    color: "red",
    radius: 42,
};
function draw(circle) {
    console.log(`Color was ${circle.color}`);
    console.log(`Radius was ${circle.radius}`);
}
// okay
draw({ color: "blue", radius: 42 });
// staffer.name;
