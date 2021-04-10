import Student from "./Student.js";
import Appointment from "./Appointment.js";
import {numToDay} from './utilities.js'
import {to12hour} from './utilities.js'
import {to24hour} from './utilities.js'
import {dateYY} from './utilities.js'
//const { response } = require("express");

//initiate all data on form
var form = document.getElementById("myform");
var button = document.getElementById("submit");

var fname = document.getElementById("fname");
var lname = document.getElementById("lname");
var email = document.getElementById("email");
var date = document.getElementById("datepicker");
var time = document.getElementById("time");
var time_label = document.getElementById("time_label");
var error = document.getElementById("displayError");

var disabled_dates = [];
var availability = [];
getAvailability();

email.addEventListener("focusout", check_email(email.value));
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


/*  enable_date() function sets up the date input field in the webpage.
    The date field has minimum date of today + 2 days and maximum date of
    today + 15 days. testDate variable increases from minDate to maxDate
    in the for loop. If it doesn't match with any of the available days,
    it stores the date in global array disabled_dates. Disabled dates are
    grayed in the calendar UI using "beforeShowDay: DisableDates".
*/
function enable_date() {
    let today = new Date();
    let minDate = new Date();
    minDate.setDate(today.getDate() + 2)
    let maxDate = new Date();
    maxDate.setDate(today.getDate() + 15);
    
    var testdate = new Date();
    // initialized at -1 because the loop has +1
    testdate.setDate(minDate.getDate() - 1);

    for(var i = 0; i < 15; i++){
        testdate.setDate(testdate.getDate() + 1);
        var found = false;
        for(var j = 0; j < availability.length; j++){
            if(testdate.getDay() == availability[j][0]){
                found = true;
            }
        }
        if(!found){
            var day = testdate.getDate().toString().padStart(2, '0');
            var month = (testdate.getMonth() + 1).toString().padStart(2, '0');
            var year = testdate.getFullYear();
            var temp = month + '-' + day + '-' + year;
            disabled_dates.push(temp);
        }
    }

	jQuery('#datepicker').datepicker({
		minDate: minDate,
		maxDate: maxDate,
        beforeShowDay: DisableDates,
		dateFormat: 'mm-dd-yy',
		constrainInput: true,    
	}).on("change", function(){
        enable_time(date.value);
    });

    function DisableDates(date) {
        for(var i = 0; i < disabled_dates.length; i++){
            var tempDate = disabled_dates[i].split("-");
            if (date.getFullYear() == tempDate[2]
            && date.getMonth() == tempDate[0] - 1
            && date.getDate() == tempDate[1]) {
                return [false];
          }
        }
       return [true];
    }
};


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


// API call to get office hours, after completion, load the pop up HTML
function getAvailability(){
    fetch('http://localhost:5000/getAvailability')
    .then(response => response.json())
    .then(data => { loadHTMLTable(data['data']);
    });
}


// loads HTML, stores information in global array availability[day, start_time, end_time]
// enable_date()
function loadHTMLTable(data) {
    
    const table = document.querySelector('table tbody');
    if(data.length === 0) {
        table.innerHTML = "<tr><td class='no-data' colspan='3'> No office hours </td></tr>";
        return;
    }
    
    let tableHTML = "";

    data.forEach(function ({day, start_time, end_time}){
        
        start_time = to12hour(start_time);
        end_time = to12hour(end_time);
        availability.push([day, start_time, end_time]);
        day = numToDay(day);
        tableHTML += "<tr>";
        tableHTML += `<td>${day}</td>`;
        tableHTML += `<td>${start_time}</td>`;
        tableHTML += `<td>${end_time}</td>`;
        tableHTML += "</tr>";
    });
    table.innerHTML = tableHTML;

    enable_date();
}


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



function enable_time(date){
    if(date){
        jQueryTime('#time').timepicker({
            minTime: availability[0][1],
            maxTime: availability[0][2],
            interval:'10'
        }); 
        time.style.display = "block";
        time_label.style.display = "block";
    }
    else{
        time.style.display = "none";
        time_label.style.display = "none";
    }
}


function check_email(email_){
    var domain = email_.split('@');
    if(domain.length == 2){
        if(domain[1] != 'mavs.uta.edu'){
            error.style.display = "block";
            error.innerHTML = "Email should be mavs.uta.edu";
            email.focus();
        }
    }
    else if(domain.length >=3){
        error.style.display = "block";
        error.innerHTML = "Enter valid email";
    }
}