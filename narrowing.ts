// Different ideas re: narrowing, type guarding, etc. Hover to see in action

function printAll(strs: string | string[] | null) {
    //   if (typeof strs === "object") {
    //     for (const s of strs) { // problematic without checking for null
    if (strs && typeof strs === "object") { // however with turthiness... full wrapping, however, may lose the empty string case
        for (const s of strs) {
            console.log(s);
        }
    } else if (typeof strs === "string") {
        console.log(strs);
    } else {
        // do nothing
    }
}

// Truthiness narrowing -  boolean coercion

function getUsersOnlineMessage(numUsersOnline: number) {
    if (numUsersOnline) {
        return `There are ${numUsersOnline} online now!`;
    }
    return "Nobody's here. :(";
}

// Equality narrowing - looking at parameters, using switch and equality statements, literals, stric & loose, etc.

function example(x: string | number, y: string | boolean) {
    if (x === y) {
        // We can now call any 'string' method on 'x' or 'y'.
        x.toUpperCase();
        y.toLowerCase();
    } else {
        console.log(x);
        console.log(y);
    }
}

function printAll2(strs: string | string[] | null) {
    if (strs !== null) {
        if (typeof strs === "object") {
            for (const s of strs) {
                console.log(s);
            }
        } else if (typeof strs === "string") {
            console.log(strs);
        }
    }
}

// Loose equality check

interface Container {
    value: number | null | undefined;
}

function multiplyValue(container: Container, factor: number) {
    // Remove both 'null' and 'undefined' from the type.
    if (container.value != null) {
        console.log(container.value);
        // Now we can safely multiply 'container.value'.
        container.value *= factor;
    }
}

// the in operator

type Fish = { swim: () => void };
type Bird = { fly: () => void };

function move(animal: Fish | Bird) {
    if ("swim" in animal) {
        return animal.swim();
    }

    return animal.fly();
}

// That narrows, but if there were a human that could optionally swim or fly each, would include humans too

// instanceof - is of course an actual type guard

function logValue(x: Date | string) {
    if (x instanceof Date) {
        console.log(x.toUTCString());
    } else {
        console.log(x.toUpperCase());
    }
}

// Assignments - narrowing is automatic with implicit typing but if the final type of something can have multiple possibilities...
// can continue to assign any of those types but not others to that variable

let x = Math.random() < 0.5 ? 10 : "hello world!";
// Can assign strings or numbers but not booleans, for example

x = 1;
x = "goodbye!";
// x = true; not allowed

// TS uses control flow analysis, reachability is the important thing

// Can use type predicates to make our own type guards

function isFish(pet: Fish | Bird): pet is Fish {
    return (pet as Fish).swim !== undefined;
}

function movePet(pet: Fish | Bird) {
    if (isFish(pet)) {
        pet.swim();
    }
    else {
        pet.fly();
    }
}

// Hover above to see... can use for filtering arrays too of course
// Can also use this is, see classes later on

// Assertion functions... later

// Discriminated unions: Have to make multiple interfaces if you want to use a discriminant property properly

// interface Shape {
//   kind: "circle" | "square";
//   radius?: number;
//   sideLength?: number;
// }

// The above does not work well

interface Circle {
    kind: "circle";
    radius: number;
}

interface Square {
    kind: "square";
    sideLength: number;
}

type Shape = Circle | Square;

function getArea(shape: Shape) {
    switch (shape.kind) {
        case "circle":
            return Math.PI * shape.radius ** 2;
        case "square":
            return shape.sideLength ** 2;
        default:
            const _exhaustiveCheck: never = shape; // the never type is good for exhaustiveness checking... this would error if we added a new member to the Shape union
            return _exhaustiveCheck;
    }
}

// Useful for messaging and comms
// Kind was the discriminant property of course
// Needs to be a union of other types to really work