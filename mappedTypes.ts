// A mapped type is a generic type which uses a union of PropertyKeys (frequently created via a keyof) to iterate through keys to create a type:
type OptionsFlags<Type> = {
    [Property in keyof Type]: boolean;
};
// takes all properties from Type and changes their values to be a boolean
type Features = {
    darkMode: () => void;
    newUserProfile: () => void;
};
type FeatureOptions = OptionsFlags<Features>; // so FeatureOptions has darkMode and newUserProfile as boolean properties

// can add or remove readonly or ? during mapping
// prefix - or +, + assumed without
type CreateMutable<Type> = {
    -readonly [Property in keyof Type]: Type[Property];
};
type LockedAccount = {
    readonly id: string;
    readonly name: string;
};
// can make an unlocked version of this
type UnlockedAccount = CreateMutable<LockedAccount>;
// etc., same idea to remove ? just put after so [Property in keyof Type]-? <-- use it to make something more concrete, perhaps

// Can re-map keys in mapped types with as clause
// type MappedTypeWithNewProperties<Type> = {
//     [Properties in keyof Type as NewKeyType]: Type[Properties];
// };
// This next example involves template literal types to create new property names from prior ones:
type Getters<Type> = {
    [Property in keyof Type as `get${Capitalize<string & Property>}`]: () => Type[Property]
};
//Capitalize<S extends string> converts first character of string literal to upper case... very clever
interface Person {
    name: string;
    age: number;
    location: string;
}
type LazyPerson = Getters<Person>;
// can filter out keys by producing never via a conditional type
type RemoveKindField<Type> = {
    [Property in keyof Type as Exclude<Property, "kind">]: Type[Property]
};
interface Circle {
    kind: "circle";
    radius: number;
}
type KindlessCircle = RemoveKindField<Circle>;
// can map over arbitrary unions of any type
type EventConfig<Events extends { kind: string }> = {
    [E in Events as E["kind"]]: (event: E) => void;
};
type SquareEvent = { kind: "square", x: number, y: number };
type CircleEvent = { kind: "circle", radius: number };
type Config = EventConfig<SquareEvent | CircleEvent>;
// this one took me a moment to figure out, but rather than looking at the keys of the type, it gets the types themselves as a list, gets each one
// sets a key of the new type as that type's "kind" property's value
// and sets its type to a function that returns type void and takes in a single parameter called event
// whose type is that type

// works well with other type manipulation
// Here's a mapped type using a conditional type which returns either a true or false
// depending on whether an object has the property pii set to literal true
type ExtractPII<Type> = {
    [Property in keyof Type]: Type[Property] extends { pii: true } ? true : false;
};
type DBFields = {
    id: { format: "incrementing" };
    name: { type: string; pii: true };
};
type ObjectsNeedingGDPRDeletion = ExtractPII<DBFields>;