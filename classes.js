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
