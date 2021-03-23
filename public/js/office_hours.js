getAvailability();


var button_insert = document.getElementById("insert");
var button_update = document.getElementById("update");
var button_delete = document.getElementById("delete");

button_insert.addEventListener("click", insert_availability);

function insert_availability(){
    var day = (document.getElementById("day")).value;
    var start_time = (document.getElementById("start_time")).value;
    var end_time = (document.getElementById("end_time")).value;
    

    fetch('http://localhost:5000/insertAvailability', {
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
        tableHTML += "<tr>";
        tableHTML += `<td>${day}</td>`;
        tableHTML += `<td>${start_time}</td>`;
        tableHTML += `<td>${end_time}</td>`;
        tableHTML += "</tr>";
    });

    table.innerHTML = tableHTML;
}




function getAvailability(){
    fetch('http://localhost:5000/getAvailability')
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