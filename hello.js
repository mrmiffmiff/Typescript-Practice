// This is an industrial-grade general-purpose greeter function:
function greet(person, date) {
    console.log("Hello ".concat(person, ", today is ").concat(date.toDateString()));
}
greet('Robert', new Date());
var msg = "hello there";
function obi() {
    console.log(msg);
}
obi();
