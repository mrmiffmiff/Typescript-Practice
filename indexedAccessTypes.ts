type Person = { age: number; name: string; alive: boolean };
// Can use indexed access types to look up specific properties on other types
type Age = Person["age"];
// Indexing type itself a type, so can do all the normal stuff
type I1 = Person["age" | "name"]; // string | number
type I2 = Person[keyof Person]; // string | number | boolean
type AliveOrName = "alive" | "name";
type I3 = Person[AliveOrName]; // string | boolean
// will error if trying to index non-existent property
// Indexing with arbitrary type, use number to get the type of an array's elements
const MyArray = [
    { name: "Alice", age: 15 },
    { name: "Bob", age: 23 },
    { name: "Eve", age: 38 },
];
// Combine with typeof to conveniently capture element type of an array literal
type Person2 = typeof MyArray[number]; // { name: string, age: number }
type Age2 = typeof MyArray[number]["age"]; // number
type Age3 = Person2["age"]; // also number
