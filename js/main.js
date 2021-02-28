import Student from "./Student.js";

var button = document.getElementById("submit");
if(!button) {
    console.log("Couldn't find button!");
}

button.addEventListener("click", sayHello);

function sayHello() {
    var fname = document.getElementById("fname").value;
    var lname = document.getElementById("lname").value;

    console.log(`Hello ${fname} ${lname}`);
}