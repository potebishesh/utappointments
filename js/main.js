import Student from "./Student.js";
import Appointment from "./Appointment.js";

//initiate all data on form
var fname = document.getElementById("fname");
var lname = document.getElementById("lname");
var email = document.getElementById("email");
var key = document.getElementById("key");
var date = document.getElementById("date");
var time = document.getElementById("time");
var button = document.getElementById("submit");

button.addEventListener("click", bookAppointment);

function bookAppointment() {
    
    if(!fname.value) {
        return alert("Please enter your first name!");
    }
    else if(!lname.value) {
        return alert("Please enter your last name!");
    }
    else if(!email.value) {
        return alert("Please enter your email address!");
    }
    else if(!key.value) {
        return alert("Please enter the key given by the instructor this semester!");
    }
    else if(!date.value) {
        return alert("Please enter a date!");
    }
    else if(!time.value) {
        return alert("Please specify a time to book an appointment!");
    }

    console.log("Appointment Booked");
}



// Disable some dates ****************
document.getElementById('date').onchange = function(e){
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
