// SomeType extends OtherType ? TrueType : FalseType;
// useful with generics
interface IdLabel {
    id: number;
}
interface NameLabel {
    name: string;
}
// Let's say we want a createLabel function... *could* use overloads
function createLabel(id: number): IdLabel;
function createLabel(name: string): NameLabel;
function createLabel(nameOrId: string | number): IdLabel | NameLabel;
function createLabel(nameOrId: string | number): IdLabel | NameLabel {
    throw new Error("unimplemented");
}
// single function, makes a choice based on input types
// but potentially cumbersome if using repeatedly
// number of overloads grows exponentially for each new type the function can handle
// So, can encode in a conditional type
type NameOrId<T extends number | string> = T extends number ? IdLabel : NameLabel;
// can thus simplify to single function with no overloads
function createLabelBetter<T extends number | string>(idOrName: T): NameOrId<T> {
    throw new Error("unimplemented");
}
let a = createLabelBetter("typescript");
let b = createLabelBetter(2.8);
let c = createLabelBetter(Math.random() ? "hello" : 42);

// What if we want to access non-guaranteed property but want to take any type rather than constrained types, defaulting to something like never if not available?
type MessageOf<T> = T extends { message: unknown } ? T["message"] : never;
interface Email {
    message: string;
}
interface Dog {
    bark(): void;
}
type EmailMessageContents = MessageOf<Email>; // string
type DogMessageContents = MessageOf<Dog>; // never
// We know T will have message in true branch
// Can also, say, flatten array types to their element types
type Flatten<T> = T extends any[] ? T[number] : T; // if T is an Array type, this type is the type of its elements, else it's the same type
type Str = Flatten<string[]>; // string
type Num = Flatten<number>; // number

// Are provided the infer keyword to infer from types we compare against in the true branch
type Flatten2<Type> = Type extends Array<infer Item> ? Item : Type;
// infer declared new generic type variable named Item; we are freed from thinking about how to dig through/probe apart type structure
// Can use in various places in type declaration... allows the whole ReturnType type to work, here's a version
type GetReturnType<Type> = Type extends (...args: never[]) => infer Return
    ? Return
    : never;
type wat = GetReturnType<string>; // never
type Num2 = GetReturnType<() => number>; // number
type Str2 = GetReturnType<(x: string) => string>; // string
type Bools = GetReturnType<(a: boolean, b: boolean) => boolean[]>;

type ToArray<Type> = Type extends any ? Type[] : never;
// acts on generic, so this becomes distributive when fed a union
type StrArrOrNummArr = ToArray<string | number>; // string[] | number[]
// Usually desired, but can be avoided as follows
type ToArrayNonDist<Type> = [Type] extends [any] ? Type[] : never;
type ArrOfStrOrNum = ToArrayNonDist<string | number>; // (string | number)[]