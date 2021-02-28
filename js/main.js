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



// Disable some dates ****************
document.getElementById('appdate').onchange = function(e){
    var tempDate = new Date(e.target.value);

    const currDate = new Date();
    var nextDay = new Date();
    var nextTwoWeek = new Date();

    nextDay.setDate(currDate.getDate() + 1);

    if(tempDate.getDay() == 5 || tempDate.getDay() == 6)
    {
        alert('No appointments available for weekends.');
        e.target.value = '';
    }
    else if((tempDate.getDate() < nextDay.getDate()) && (tempDate.getMonth() <= currDate.getMonth()) )
    {
        alert('Appointment booking available only from next day.');
        e.target.value = '';
    }
};
// ****************