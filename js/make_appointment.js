import Student from "./Student.js";
import Appointment from "./Appointment.js";

//initiate all data on form
var fname = document.getElementById("fname");
var lname = document.getElementById("lname");
var email = document.getElementById("email");
var key = document.getElementById("key");
var utaid = document.getElementById("utaid");
var date = document.getElementById("date");
var time = document.getElementById("time");
var button = document.getElementById("submit");

var realkey = "pineapple";

button.addEventListener("click", bookAppointment);

function bookAppointment() {
    // regex for checking if a string has a number
    var regex = /\d/g;
    
    // Testing each field values
    if(!fname.value) {
        return alert("Please enter your first name!");
    }
    else if(regex.test(fname.value)) {
        return alert("First name cannot have integer within it!")
    }
    else if(!lname.value) {
        return alert("Please enter your last name!");
    }
    else if(regex.test(lname.value)) {
        return alert("Last name cannot have integer within it!")
    }
    else if(!email.value) {
        return alert("Please enter your email address!");
    }
    else if(!key.value) {
        return alert("Please enter the key given by the instructor this semester!");
    }
    else if(key.value != realkey) {
        return alert("Entered key is invalid");
    }
    else if(!utaid.value) {
        return alert("Please enter your UTA ID!");
    }
    else if(!regex.test(utaid.value)) {
        return alert("UTA ID should be a number!");
    }
    else if(parseInt(utaid.value) < 1000000000 || parseInt(utaid.value) > 1999999999){
        return alert("UTA ID should be a number between 1000000000 and 1999999999");
    }
    else if(!date.value) {
        return alert("Please enter a date!");
    }
    else if(!time.value) {
        return alert("Please specify a time to book an appointment!");
    }

    var apt = new Appointment(date.value, new Student(`${fname.value} ${lname.value}`, utaid.value), time.value);
    //send to database here
    alert(`Appointment booked for ${apt.getStudent.getName} on ${apt.getDate} at ${apt.getTime}.`);
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
