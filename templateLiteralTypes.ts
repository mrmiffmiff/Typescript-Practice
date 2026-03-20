// template literal types have same syntax as template literal strings and build on string literal types
type World = "world";
// when used with concretes, template literal produces new string literal by concatenating
type Greeting = `hello ${World}`;

type EmailLocaleIDs = "welcome_email" | "email_heading";
type FooterLocaleIDs = "footer_title" | "footer_sendoff";
// when a union is used in the interpolated position, the type is the set of eveyr possible string literal
// that could be represented by each union member:
type AllLocaleIDs = `${EmailLocaleIDs | FooterLocaleIDs}_id`;
type Lang = "en" | "ja" | "pt";
// For each interpolated position, the unions are cross multiplied:
type LocaleMessageIDs = `${Lang}_${AllLocaleIDs}`;
// useful in smaller cases, for larger string unions should use ahead-of-time generation

// The true power comes when defining a new string based on info inside a type
type PropEventSource<Type> = {
    on<Key extends string & keyof Type>
        (eventName: `${Key}Changed`, callback: (newValue: Type[Key]) => void): void;
};
declare function makeWatchedObject<Type>(obj: Type): Type & PropEventSource<Type>;
const person = makeWatchedObject({
    firstName: "Saoirse",
    lastName: "Ronan",
    age: 26
});
person.on("firstNameChanged", newName => {
    console.log(`new name is ${newName.toUpperCase()}`);
});
person.on("ageChanged", newAge => {
    if (newAge < 0) {
        console.warn("warning! negative age");
    }
});
//prevents human error of wrong name
//type resistant
// properly genericized to make inference more accurate rather than using any