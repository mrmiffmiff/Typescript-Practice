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