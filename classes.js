// TS has full support for classes
class Point {
    constructor(x, y, otherKind) {
        this.z = 0; // initializer, bypasses strictPropertyInitalization error
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
