// Objects are important for passing data in JS, obviously
// Can represent as object types, which can be anonymous or made in the normal ways through interfaces and type aliases
interface Person {
    name: string;
    age: number;
}
// Could use this in a function called greet... could also have done it anonymously or with a type alias.
// The main point is that, if Person is the type for the parameter of the function...
// then the function takes and indeed must take an object containing a string called name and a number called age