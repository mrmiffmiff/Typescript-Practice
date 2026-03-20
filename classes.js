// TS has full support for classes
class Point {
    x;
    y;
    z = 0; // initializer, bypasses strictPropertyInitalization error
    kind; // ! signals will definitely initialize but outside constructor
    otherKind; // can only be set in the constructor
    constructor(x, y, otherKind) {
        this.x = x;
        this.y = y;
        this.otherKind = otherKind;
        this.setKind();
    } // cannot have type parameters and have no return type annotations
    // will let you know when to call super() if needed
    setKind() {
        this.kind = this.otherKind;
    }
    scale(n) {
        this.x *= n;
        this.y *= n;
    }
    get distance() {
        return Math.hypot(this.x, this.y);
    }
    set distance(dist) {
        let hypot = Math.hypot(this.x, this.y);
        let proportion = dist / hypot;
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
// Can use implements to check that a class satisfies a particular interface
class Sonar {
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
    woof(times) {
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
class Box {
    contents;
    constructor(value) {
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
    contents = "";
    set(value) {
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
    path;
    networked;
    isFile() {
        return this instanceof FileRep;
    }
    isDirectory() {
        return this instanceof this.isDirectory;
    }
    isNetworked() {
        return this.networked;
    }
    constructor(path, networked) {
        this.path = path;
        this.networked = networked;
    }
}
class FileRep extends FileSystemObject {
    content;
    constructor(path, content) {
        super(path, false);
        this.content = content;
    }
}
class Directory extends FileSystemObject {
    children = [];
}
const fso = new FileRep("foo/bar.txt", "foo");
if (fso.isFile()) {
    fso.content;
}
else if (fso.isDirectory()) {
    fso.children;
}
else if (fso.isNetworked()) {
    fso.host;
}
// common use-case: allow lazy validation of a particular field
