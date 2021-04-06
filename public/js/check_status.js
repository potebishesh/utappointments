var button = document.getElementById("submit");

var reference = document.getElementById("reference");
var email = document.getElementById("email");

button.addEventListener("click", checkStatus);

function checkStatus(){
    console.log(reference.value);
    console.log(email.value);
}
