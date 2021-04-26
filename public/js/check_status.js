
import {to12hour} from './utilities.js'

var button = document.getElementById("submit");

var reference = document.getElementById("reference");
var email = document.getElementById("email");
var displayBox = document.getElementById("displayBox");
var message = document.getElementById("message");
var start = document.getElementById("start");
var end = document.getElementById("end");
var description = document.getElementById("description");

button.addEventListener("click", checkStatus);

function checkStatus(){
    getAppointmentStatus(reference, email);
}

function loadHTMLTable(data) {
    const table = document.querySelector('table tbody');
    if(data.length === 0) {
        message.innerHTML = "No such appointment exists.";
        displayBox.style.display = "none";
        return;
    }

    message.innerHTML = "";
    let tableHTML = "";
    data.forEach(function ({ref_num, st_fname, st_lname, app_date, app_time}){

        let date = new Date(app_date);
        var day = date.getDate().toString().padStart(2, '0');
        var month = (date.getMonth() + 1).toString().padStart(2, '0');
        var year = date.getFullYear();
        date = month + '/' + day + '/' + year;
        
        let time = to12hour(app_time);

        var tempdate = new Date(date + " " + time);
        tempdate.setMinutes(tempdate.getMinutes() + 10);

        var endtime = tempdate.getHours() + ":" + tempdate.getMinutes().toString().padStart(2, '0') + ":" + tempdate.getSeconds().toString().padStart(2, '0');
       

        start.innerHTML = date + " " + time;
        end.innerHTML = date + " " + endtime;
        description.innerHTML = "Reference Number: " + ref_num;

        tableHTML += "<tr>";
        tableHTML += `<td>${ref_num}</td>`;
        tableHTML += `<td>${st_fname}</td>`;
        tableHTML += `<td>${st_lname}</td>`;
        tableHTML += `<td>${date}</td>`;
        tableHTML += `<td>${time}</td>`;
        tableHTML += "</tr>";
    });

    table.innerHTML = tableHTML;
    displayBox.style.display = "block";
    
}

function getAppointmentStatus(reference, email){
    var reference_ = reference.value;
    var email_ = email.value;

    fetch('http://localhost:5000/check_status/getAppointmentStatus', {
        headers: {
            'Content-type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({ref_num: reference_, st_email: email_})
    })
    .then(response => response.json())
    .then(data => { loadHTMLTable(data['data']);
    });
}