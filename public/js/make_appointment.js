import {numToDay} from './utilities.js'
import {to12hour} from './utilities.js'
import {to24hour} from './utilities.js'
import {dateYY} from './utilities.js'

// Initialize all elements in the page
var form = document.getElementById("myform");
var button = document.getElementById("submit");
var fname = document.getElementById("fname");
var lname = document.getElementById("lname");
var email = document.getElementById("email");
var date = document.getElementById("datepicker");
var time = document.getElementById("time");
var time_label = document.getElementById("time_label");
var error = document.getElementById("displayError");
var messageBox = document.getElementById("displayMessage");
var message = document.getElementById("appointmentMessage")
var start = document.getElementById("start");
var end = document.getElementById("end");
var description = document.getElementById("description");
var time_hide = document.getElementById("time_hide");

// disabled_dates array stores dates that does not have office hours (MM-DD-YYYY)
// availability is a 2D array that stores [day, start_time, end_time] in each row. Eg. [1, '10:00 AM','12:30 PM']
// bookedSpots is a 2D array that stores [date, time] in each row ['04-05-2021', '10:00 AM]
var disabled_dates = [];
var availability = [];
var bookedSpots = [];

// Obtain disabled_dates, availability and booked spots from the database.
getDisabledDates();
getAvailability();
getBookedSpots();

// Initialize pop up for displaying office hours.
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

var valid_fname = false;
var valid_lname = false;
var valid_email = false;


fname.focus();

time.addEventListener("focus", function(){
    error.innerHTML = "";  
    time.value = "";
})
email.addEventListener("focusout", function(){
    check_email(email.value);
})
fname.addEventListener("focusout", function(){
    check_fname(fname.value);
})
lname.addEventListener("focusout", function(){
    check_lname(lname.value);
})
date.addEventListener("focusout", function(){
    if(!date.value){
        error.innerHTML = "Select Date";
    }
})
// key.addEventListener("focusout", function(){
//     error.innerHTML = "";
// })


button.addEventListener("click", checkKeys);

function bookAppointment() {
    var fname_ = fname.value;
    var lname_ = lname.value;
    var email_ = email.value;
    var date_ = date.value;
    var time_ = time.value;

    if(!valid_fname) {
        check_fname(fname.value);
        return 0;
    }
    else if(!valid_lname) {
        check_lname(lname.value);
        return 0;
    }
    else if(!valid_email){
        check_email(email.value);
        return 0;
    }
    else if(!date_){
        error.innerHTML = "Select Date";
        return 0;
    }
    else if(!time_){
        error.innerHTML = "Select Time";
        return 0;
    }
    
    var time__ = to24hour(time_);
    var date__ = dateYY(date_);
    var confirmation = confirm(`Are you sure you want to book appointment for ${fname_} ${lname_} on ${date_} at ${time_}?`);
   
    if (confirmation == true) {
         // Send appointment information to server for inserting appointment information into the database.
        fetch('http://localhost:5000/appointment/insertAppointment',{
            headers: {
                'Content-type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({st_fname: fname_, st_lname: lname_, st_email: email_, app_date: date__, app_time: time__})
        })
        .then(response => response.json())
        .then(data => booked(data['success']))
        .then(form.reset())
    } else {
        alert('No appointment booked.');
    }
}

function booked(data) {
    const fname = data['fname'];
    const lname = data['lname'];
    const email = data['email'];
    const date = data['date'];
    const time = data['time'];

    fetch('http://localhost:5000/appointment/getAppointmentInfo', {
        headers: {
            'Content-type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({st_fname: fname, st_lname: lname, st_email: email, app_date: date, app_time: time})
    })
    .then(response => response.json())
    .then(data => { 
        document.getElementById('hide').style.display = 'none';
        
        var appointmentInfo = data['data'];
        appointmentInfo = appointmentInfo[0];

        var email = appointmentInfo['st_email'];

        // Formatting date to MM/DD/YYYY
        let date = new Date(appointmentInfo['app_date']);
        var day = date.getDate().toString().padStart(2, '0');
        var month = (date.getMonth() + 1).toString().padStart(2, '0');
        var year = date.getFullYear();
        date = month + '/' + day + '/' + year;

        let time = to12hour(appointmentInfo['app_time']);

        var message_text = "Appointment booked for " + appointmentInfo['st_fname'] + " " + 
                                                appointmentInfo['st_lname'] + " on " + date +  " at " + 
                                                time + ". Reference Number is " + appointmentInfo['ref_num'];

        message.innerHTML = message_text;

        // Setting up information for Add To Calendar funcationality 
        var tempdate = new Date(date + " " + time);
        tempdate.setMinutes(tempdate.getMinutes() + 10);

        var endtime = tempdate.getHours() + ":" + tempdate.getMinutes().toString().padStart(2, '0') + ":" + tempdate.getSeconds().toString().padStart(2, '0');
        

        endtime = to12hour(endtime);

        
        start.innerHTML = date + " " + time;
        end.innerHTML = date + " " + endtime;
        description.innerHTML = "Reference Number: " + appointmentInfo['ref_num'];

        messageBox.style.display = 'block';

        sendNotification(email, message_text);
    })
}

function sendNotification(email_, message_text){
    fetch('http://localhost:5000/appointment/sendNotification', {
        headers: {
            'Content-type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({email: email_, text : message_text})
    })
}

function getBookedSpots(){
    fetch('http://localhost:5000/appointment/getBookedSpots')
    .then(response => response.json())
    .then(data => {fillBookedSpots(data['data']);
    });
}

function fillBookedSpots(data){
    data.forEach(function ({app_date, app_time}){
        app_time = to12hour(app_time);
        let date = new Date(app_date);
        var day = date.getDate().toString().padStart(2, '0');
        var month = (date.getMonth() + 1).toString().padStart(2, '0');
        var year = date.getFullYear();
        var temp = month + '-' + day + '-' + year;

        bookedSpots.push([temp, app_time]);
    });
}


// API call to get office hours, after completion, load the pop up HTML
function getAvailability(){
    fetch('http://localhost:5000/appointment/getAvailability')
    .then(response => response.json())
    .then(data => { loadHTMLTable(data['data']);
    });
}


// loads HTML, stores information in global array availability[day, start_time, end_time]
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
        time.value = "";
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



function enable_time(date){
    if(date){
        error.innerHTML = "";
        var temp = new Date(date);
        var day = temp.getDay();
        for(var i = 0; i < availability.length; i++){
            if(availability[i][0] == day){
                break;
            }
        }

        var bookedSpotCount = bookedSpots.length;
        var disableForCurrentDate = [];

        for(var j = 0; j < bookedSpotCount; j++){


            if(bookedSpots[j][0] == date){
                var tempdate = new Date(date + " " + bookedSpots[j][1]);
                tempdate.setMinutes(tempdate.getMinutes() + 10);
        
                var disableUpperRange = tempdate.getHours() + ":" + tempdate.getMinutes().toString().padStart(2, '0') + ":" + tempdate.getSeconds().toString().padStart(2, '0');
                disableUpperRange = to12hour(disableUpperRange);

                disableForCurrentDate.push([bookedSpots[j][1], disableUpperRange]);
            }
        }

        jQueryTime('#time').timepicker({
            step: 10,
            lang: {am: ' AM', pm: ' PM', AM: 'am', PM: 'pm', decimal: '.', mins: 'mins', hr: 'hr', hrs: 'hrs' },
            scrollbar: 'true',
            disableTextInput: 'true',
            disableTimeRanges : disableForCurrentDate
        });

        jQueryTime('#time').timepicker('option', 'minTime', availability[i][1]); 
        jQueryTime('#time').timepicker('option', 'maxTime', availability[i][2]); 

        time_hide.style.display = "block";
    }
    else{
        time_hide.style.display = "none";
    }
}


function getDisabledDates(){
    fetch('http://localhost:5000/instructor_main/getDisabledDates')
    .then(response => response.json())
    .then(data => { fillDisabledDates(data['data']);
    });
}

function fillDisabledDates(data){
    data.forEach(function ({d_dates}){
        var date = new Date(d_dates);
        var day = date.getDate().toString().padStart(2, '0');
        var month = (date.getMonth() + 1).toString().padStart(2, '0');
        var year = date.getFullYear();

        var disabled_date = month + "-" + day + "-" + year;

        disabled_dates.push(disabled_date);
    });
}


//*********************************** Validation functions ********************************
function checkKeys(){
    
    fetch('http://localhost:5000/appointment/getKeys')
    .then(response => response.json())
    .then(data => {
        var keyBool = new Boolean(false);
        var temp = data['data'];
        
        var key = document.getElementById("key");
        for(var i = 0; i < temp.length; i++)
        {
            if(key.value == temp[i].app_key)
            {
                keyBool = true;
            }
        }
        if(keyBool == false){
            error.innerHTML = "Key does not match. Retry or contact instructor.";
        }
        else{
            error.innerHTML = "";
            bookAppointment();
        }
    });
}



function check_email(email_){

    var domain = email_.split('@');

    if(email_.length == 0){
        error.innerHTML = "Do not leave email empty";
        valid_email = false;
    }
    else if(domain.length == 2 && domain[0].length != 0 && domain[1] == 'mavs.uta.edu'){
        error.innerHTML = "";
        valid_email = true;
    }
    else{
        error.innerHTML = "Email should be your_email@mavs.uta.edu";
        valid_email = false;
    }
}

function check_fname(text){
    if(text.length == 0){
        error.innerHTML = "Do not leave first name empty";
        valid_fname = false;
    }
    else if(hasNumber(text)){
        error.innerHTML = "Name cannot contain digits";
        valid_fname = false;
    }
    else{
        error.innerHTML = "";
        valid_fname = true;
    }
}

function check_lname(text){
    if(text.length == 0){
        error.innerHTML = "Do not leave last name empty";
        valid_lname = false;
    }
    else if(hasNumber(text)){
        error.innerHTML = "Name cannot contain digits";
        valid_lname = false;
    }
    else{
        error.innerHTML = "";
        valid_lname = true;
    }
}

function hasNumber(myString) {
    return /\d/.test(myString);
}