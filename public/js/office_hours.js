getAvailability();

var button_insert = document.getElementById("insert");
var button_delete = document.getElementById("delete");

button_insert.addEventListener("click", insert_availability);
button_delete.addEventListener("click", delete_availability);

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

function numToDay(number){
    switch(number){
        case 0:
            return 'Sunday';
        break;
        case 1:
            return 'Monday';
        break;
        case 2:
            return 'Tuesday'; 
        break;
        case 3:
            return 'Wednesday';
        break;
        case 4:
            return 'Thursday';
        break;
        case 5:
            return 'Friday';
        break;
        case 6:
            return 'Saturday';
        break;
        default:
            return 'Invalid day';
    }
}

// converts 24 hour time format to 12 hour
function to12hour(time_){
    var result = "";
    var time_array = time_.split(':', 3);

    if(parseInt(time_array[0]) >= 0){
        var hour = parseInt(time_array[0]);
        var ampm = "AM";

        if (hour == 0){
            hour = 12;
        }
        else{
            if (hour >= 12){
                ampm = "PM";   
            }
            if (hour > 12){
                hour = hour - 12;
            }
        }
        result = hour.toString() + ":" + time_array[1] + " " + ampm;
        return result;
    }
    else{
        console.log("Invalid Time Inputs");
    }
}

// converts 12 hour time format to 24 hour
function to24hour(time_){
    var result = "";
    var time_i = time_.split(' ');
    var time_array = time_i[0].split(':')

    if(parseInt(time_array[0])){
        var hour = parseInt(time_array[0]);
        if (time_i[1] == "PM"){
            if(hour < 12){
                hour = hour + 12;
            }
        }
        else if (time_i[1] = "AM"){
            if(hour == 12){
                hour = 0;
            }
        }
        result = hour.toString() + ":" + time_array[1] + ":00";
        return result;
    }
    else{
        console.log("Invalid Time Input");
    }
}