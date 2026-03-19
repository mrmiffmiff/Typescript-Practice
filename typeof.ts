// While JS already has typeof operator, TS adds the it to type context
let s = "hello";
let n: typeof s;
// Combined with other type operators can express many patterns conveniently
type Predicate = (x: unknown) => boolean;
type K = ReturnType<Predicate>; // ReturnType is a predefined type that produces a function type's return type, so K is a boolean here
// Can't use ReturnType on a function itself, so that's where typeof comes in
function f() {
    return { x: 10, y: 3 };
}
type P = ReturnType<typeof f>;