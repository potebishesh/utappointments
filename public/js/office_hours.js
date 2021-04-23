import {numToDay} from './utilities.js'
import {to12hour} from './utilities.js'
import {to24hour} from './utilities.js'

getAvailability();

var button_insert = document.getElementById("insert");
var button_delete = document.getElementById("delete");

button_insert.addEventListener("click", insert_availability);
button_delete.addEventListener("click", delete_availability);

$(document).ready(function(){
    $('#start_time').timepicker({
        minTime: '8:00 AM',
        maxTime: '11:30 PM',
        step: 10,
        lang: {am: ' AM', pm: ' PM', AM: 'am', PM: 'pm', decimal: '.', mins: 'mins', hr: 'hr', hrs: 'hrs' },
        scrollbar: 'true',
        disableTextInput: 'true'
    }); 
    $('#end_time').timepicker({
        minTime: '8:00 AM',
        maxTime: '11:30 PM',
        step: 10,
        lang: {am: ' AM', pm: ' PM', AM: 'am', PM: 'pm', decimal: '.', mins: 'mins', hr: 'hr', hrs: 'hrs' },
        scrollbar: 'true',
        disableTextInput: 'true'
    });

});

function delete_availability(){
    var day = (document.getElementById("day")).value;

    if(day == -1){
        return alert("Please select a valid day");
    }

    fetch('http://localhost:5000/instructor_main/deleteOfficeHours/' + day, {
        method: 'DELETE'
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            location.reload();
        }
    });
}

function insert_availability(){

    var day = (document.getElementById("day")).value;
    var start_time = (document.getElementById("start_time")).value;
    var end_time = (document.getElementById("end_time")).value;

    if(day == -1){
        return alert("Please select a valid day");
    }
    
    if(start_time.length == 0){
        return alert("Select valid start time");
    }

    if(end_time.length == 0){
        return alert("Select valid end time");
    }

    
    start_time = to24hour(start_time);
    end_time = to24hour(end_time);

    fetch('http://localhost:5000/instructor_main/insertAvailability', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({ day : day, start_time : start_time, end_time : end_time})
    })
    .then(response => response.json())
    .then(data => {
        if(data.success){
            location.reload();
        }
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

function getAvailability(){
    fetch('http://localhost:5000/instructor_main/getAvailability')
    .then(response => response.json())
    .then(data => { loadHTMLTable(data['data']);
    });
}
