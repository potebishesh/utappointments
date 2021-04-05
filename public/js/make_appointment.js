import Student from "./Student.js";
import Appointment from "./Appointment.js";
import {numToDay} from './utilities.js'
import {to12hour} from './utilities.js'
import {to24hour} from './utilities.js'
import {dateYY} from './utilities.js'
//const { response } = require("express");


getAvailability();

//initiate all data on form

var form = document.getElementById("myform");
var button = document.getElementById("submit");

var fname = document.getElementById("fname");
var lname = document.getElementById("lname");
var email = document.getElementById("email");
var date = document.getElementById("datepicker");
var time = document.getElementById("time");

// Ensure date is selected before time
time.addEventListener("focus", function()
{
    if(!date.value){
        alert('Please select date before time.');
        date.focus();
        time.value = ' ';
    }
    
    jQueryTime('#time').timepicker({
        minTime: '8:00am',
        maxTime: '11:30pm',
        interval:'10'
    }); 

}
);

date.addEventListener("focus", function(){
    time.value = ' ';
});
// ***************************************


button.addEventListener("click", checkKeys);


function bookAppointment() {
    var fname_ = fname.value;
    var lname_ = lname.value;
    var email_ = email.value;
    var date_ = date.value;
    var time_ = time.value;

    if(!fname_) {
        return alert("Please enter your first name!");
    }
    //else if(regex.test(fname.value)) {
      //  return alert("First name cannot have integer within it!")
    //}
    else if(!lname_) {
        return alert("Please enter your last name!");
    }
    //else if(regex.test(lname.value)) {
      //  return alert("Last name cannot have integer within it!")
    //}
    else if(!email_) {
        return alert("Please enter your email address!");
    }
    else if(!date_) {
        return alert("Please enter a date!");
    }
    else if(!time_) {
        return alert("Please specify a time to book an appointment!");
    }
    //var apt = new Appointment(date.value, new Student(`${fname.value} ${lname.value}`, email.value, 2021), 15);

    var time__ = to24hour(time_);
    var date__ = dateYY(date_);
    var confirmation = confirm(`Are you sure you want to book appointment for ${fname_} ${lname_} on ${date_} at ${time_}?`);
    // Send data to server for inserting appointment into the database
    //

    if (confirmation == true) {
        fetch('http://localhost:5000/insertAppointment',{
            headers: {
                'Content-type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({st_fname: fname_, st_lname: lname_, st_email: email_, app_date: date__, app_time: time__})
        })
        .then(response => response.json())
        .then(alert ('Appointment booked.'))
        .then(form.reset())
    } else {
        alert('No appointment booked.');
    }

    //alert(`Appointment booked for ${apt.getStudent.getName} on ${apt.getDate} for ${apt.timeLength} minutes.`);
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

jQuery(document).ready(function() {
    let today = new Date();
    let minDate = new Date();
    minDate.setDate(today.getDate() + 2)
    let maxDate = new Date();
    maxDate.setDate(today.getDate() + 15);
    
	jQuery('#datepicker').datepicker({
		minDate: minDate,
		maxDate: maxDate,
		dateFormat: 'mm-dd-yy',
		constrainInput: true
	});
});

//**************************************************

// Pop up for office hours

jQuery(window).load(function () {
    jQuery(".trigger_popup_fricc").click(function(){
       jQuery('.hover_bkgr_fricc').show();
    });
    jQuery('.hover_bkgr_fricc').click(function(){
        jQuery('.hover_bkgr_fricc').hide();
    });
    jQuery('.popupCloseButton').click(function(){
        jQuery('.hover_bkgr_fricc').hide();
    });
});

//**************************************************

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