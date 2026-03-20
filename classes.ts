// TS has full support for classes
class Point {
    x: number;
    y: number;
    z = 0; // initializer, bypasses strictPropertyInitalization error
    kind!: string; // ! signals will definitely initialize but outside constructor
    readonly otherKind: string; // can only be set in the constructor

    constructor(x: number, y: number, otherKind: string) { // can many of the regular function things, type annotations, defaults, overloads...
        this.x = x;
        this.y = y;
        this.otherKind = otherKind;
        this.setKind();
    } // cannot have type parameters and have no return type annotations
    // will let you know when to call super() if needed

    setKind(): void {
        this.kind = this.otherKind;
    }

    scale(n: number): void {
        this.x *= n;
        this.y *= n;
    }

    get distance(): number { // this is readonly without a setter
        return Math.hypot(this.x, this.y);
    }

    set distance(dist: number) { // probably won't be exact? maybe?
        let hypot: number = Math.hypot(this.x, this.y);
        let proportion: number = dist / hypot;
        this.scale(proportion);
    }
}

const p = new Point(5, 3, "cool");
// p.otherKind = "bad"; not possible
p.kind = "aye"; // can be done
console.log(p.distance);
p.scale(3);
console.log(p.distance);
p.distance = 20;
console.log(p.x, p.y, p.distance);

interface Pingable {
    ping(): void;
}
// Can use implements to check that a class satisfies a particular interface
class Sonar implements Pingable {
    ping() {
        console.log("ping!");
    }
}
// errors if not
// class Ball implements Pingable {
//     pong() {
//         console.log("pong!");
//     }
// }
// Can of course implement multiple interfaces on one class
// Does not actually change the type of the class or its methods or anything like that, just about treatment
// Can have subclasses as always with extends
class Animal {
    move() {
        console.log("Moving along!");
    }
}
class Dog extends Animal {
    woof(times: number) {
        for (let i = 0; i < times; i++) {
            console.log("woof!");
        }
    }
}
const d = new Dog();
d.move();
d.woof(3);
// can of course still override methods and use super. syntax to access base
// TS does enforce that a derived class is always a subtype of its base class

// Not really gonna demo this but TS adds more visibility control
// JS's # is still hard private
// but we get a soft private with the private keyword, only accessible from class unless using bracket notation or using JS stuff like in and prop lookup
// also have protected keyword which can be accessed from subclasses, again somewhat soft
// does not carry to subclasses so must be sure to redeclare if needed, unless exposure is intentional
// public is default but can also be explicit

// static members still possible, not instance-associated, accessible through constructor object itself
// can have vis control and are inherited
// can't overwrite properties from the Function prototype, so certain property names can't be used to define static members, like name, length, and call
// class S {
//     static name = "S!";
// }
// Although this seems to not be an issue in later ES versions, at least from ES2022 on, but should still avoid to be honest
// no static classes needed, just use regular objects
// can make static blocks in classes with own scope
class Foo {
    static #count = 0;
    get count() {
        return Foo.#count;
    }
    static {
        try {
            const lastInstances = ["a", "b", "c"]; //loadLastInstances();
            Foo.#count += lastInstances.length;
        }
        catch { }
    }
}

// Classes can be generic
class Box<Type> {
    contents: Type;
    constructor(value: Type) {
        this.contents = value;
    }
}
// when instantiated with new, type parameters are inferred just like in a function call
const b = new Box("hello");
// can use generic constraints and defaults the same as interfaces
// static members can never refer to Type parameters

// this handling has some options, think about Arrow functions and this parameters, tradeoffs
// also there's a special type called this that refers dynamically to the type of the current class

class OtherBox {
    contents: string = "";
    set(value: string) {
        this.contents = value;
        return this;
    }
}
class ClearableBox extends OtherBox {
    clear() {
        this.contents = "";
    }
}
const cb = new ClearableBox();
const cbs = cb.set("hello");
// Can also use this in type annotations, different from writing the actual class, as might be relevant with derived classes
// Can use this is Type in return position for methods in classes and interfaces.
// Mix with type narrowing and the type of the target object will narrow to the specified Type
class FileSystemObject {
    isFile(): this is FileRep {
        return this instanceof FileRep;
    }
    isDirectory(): this is Directory {
        return this instanceof this.isDirectory;
    }
    isNetworked(): this is Networked & this {
        return this.networked;
    }
    constructor(public path: string, private networked: boolean) { }
}
class FileRep extends FileSystemObject {
    constructor(path: string, public content: string) {
        super(path, false);
    }
}
class Directory extends FileSystemObject {
    children: FileSystemObject[] = [];
}
interface Networked {
    host: string;
}
const fso: FileSystemObject = new FileRep("foo/bar.txt", "foo");
if (fso.isFile()) {
    fso.content;
} else if (fso.isDirectory()) {
    fso.children;
} else if (fso.isNetworked()) {
    fso.host;
}
// common use-case: allow lazy validation of a particular field

// special syntax to turn constructor parameters into class properties with the same name and value
// must prefix with visibility or readonly
class Params {
    constructor(
        public readonly x: number,
        protected y: number,
        private z: number
    ) { } // don't actually need body
}
const p_a = new Params(1, 2, 3);
console.log(p_a.x);
// console.log(p_a.z); private, can't be done