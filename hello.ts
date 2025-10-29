// This is an industrial-grade general-purpose greeter function:
function greet(person: string, date: Date) {
    console.log(`Hello ${person}, today is ${date.toDateString()}!`);
}

greet('Robert', new Date());

let msg = "hello there!";

function obi() {
    console.log(msg);
}

obi();