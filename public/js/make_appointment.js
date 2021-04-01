import Student from "./Student.js";
import Appointment from "./Appointment.js";
import {numToDay} from './utilities.js'
import {to12hour} from './utilities.js'
//const { response } = require("express");


getAvailability();

//initiate all data on form

var button = document.getElementById("submit");

button.addEventListener("click", checkKeys);

function bookAppointment() {

    var fname = document.getElementById("fname");
    var lname = document.getElementById("lname");
    var email = document.getElementById("email");
    var date = document.getElementById("date");
    var time = document.getElementById("time");


    if(!fname.value) {
        return alert("Please enter your first name!");
    }
    //else if(regex.test(fname.value)) {
      //  return alert("First name cannot have integer within it!")
    //}
    else if(!lname.value) {
        return alert("Please enter your last name!");
    }
    //else if(regex.test(lname.value)) {
      //  return alert("Last name cannot have integer within it!")
    //}
    else if(!email.value) {
        return alert("Please enter your email address!");
    }
    else if(!date.value) {
        return alert("Please enter a date!");
    }
    else if(!time.value) {
        return alert("Please specify a time to book an appointment!");
    }

    var apt = new Appointment(date.value, new Student(`${fname.value} ${lname.value}`, email.value, 2021), 15);

    // Send data to server for inserting to database
    fetch('http://localhost:5000/insertAppointment',{
        headers: {
            'Content-type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({email: email, date: date, time: time})
    })
    .then(response => response.json())

    alert(`Appointment booked for ${apt.getStudent.getName} on ${apt.getDate} for ${apt.timeLength} minutes.`);
}


// Disable some dates ****************
/*
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

*/

// Using jquery datepicker to enable only 2 weeks of date
$(document).ready(function() {
    let today = new Date();
    let minDate = new Date();
    minDate.setDate(today.getDate() + 2)
    let maxDate = new Date();
    maxDate.setDate(today.getDate() + 15);
    
	$('#datepicker').datepicker({
		minDate: minDate,
		maxDate: maxDate,
		dateFormat: 'mm-dd-yy',
		constrainInput: true
	});
});


//**************************************************

// Pop up for office hours
$(window).load(function () {
    $(".trigger_popup_fricc").click(function(){
       $('.hover_bkgr_fricc').show();
    });
    $('.hover_bkgr_fricc').click(function(){
        $('.hover_bkgr_fricc').hide();
    });
    $('.popupCloseButton').click(function(){
        $('.hover_bkgr_fricc').hide();
    });
});

function getAvailability(){
    fetch('http://localhost:5000/getAvailability')
    .then(response => response.json())
    .then(data => { loadHTMLTable(data['data']);
    });
}


function loadHTMLTable(data) {
    
    const table = document.querySelector('table tbody');
    if(data.length === 0) {
        table.innerHTML = "<tr><td class='no-data' colspan='3'> No office hours </td></tr>";
        return;
    }
    
    let tableHTML = "";

    data.forEach(function ({day, start_time, end_time}){
        day = numToDay(day);
        start_time = to12hour(start_time);
        end_time = to12hour(end_time);
        tableHTML += "<tr>";
        tableHTML += `<td>${day}</td>`;
        tableHTML += `<td>${start_time}</td>`;
        tableHTML += `<td>${end_time}</td>`;
        tableHTML += "</tr>";
    });

    table.innerHTML = tableHTML;
}

// **************************************************

// Checks if key matches
function checkKeys(){
    fetch('http://localhost:5000/getKeys')
    .then(response => response.json())
    .then(data => {
        var keyBool = new Boolean(false);
        var key = document.getElementById("key");

        var temp = data['data'];
        for(var i = 0; i < temp.length; i++)
        {
            if(key.value == temp[i].app_key)
            {
                keyBool = true;
                console.log('Key matched in the database.');
            }
        }
        if(keyBool == true){
            bookAppointment();
        }
        else{
            console.log('Key does not match in the database.');
            return alert('Key does not match. Retry or contact instructor.');
        }       
    });
}