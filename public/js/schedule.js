import {to12hour} from './utilities.js'

getAppointments();

document.querySelector('table tbody').addEventListener('click', function(event) {
    if (event.target.className === "delete-row-btn") {
        deleteRowByRefNum(event.target.dataset.id);
    }
});

function loadHTMLTable(data) {  
    const table = document.querySelector('table tbody');
    if(data.length === 0) {
        table.innerHTML = "<tr><td class='no-data' colspan='8'> No Appointments </td></tr>";
        return;
    }
    
    let tableHTML = "";

    data.forEach(function ({ref_num, app_date, app_time, app_timestamp, st_fname, st_lname, st_email}){

        let date = new Date(app_date);
        var day = date.getDate().toString().padStart(2, '0');
        var month = (date.getMonth() + 1).toString().padStart(2, '0');
        var year = date.getFullYear();
        var app_date = month + '-' + day + '-' + year;

        app_time = to12hour(app_time);
        
        date = new Date(app_timestamp);
        day = date.getDate().toString().padStart(2, '0');
        month = (date.getMonth() + 1).toString().padStart(2, '0');
        year = date.getFullYear();

        var hours = date.getHours();
        var minutes = date.getMinutes().toString().padStart(2, '0') ;
        var seconds = date.getSeconds().toString().padStart(2, '0');
        var temp_time = hours + ":" + minutes + ":" + seconds;
        app_timestamp = month + '-' + day + '-' + year + " " + to12hour(temp_time);


        tableHTML += "<tr>";
        tableHTML += `<td>${ref_num}</td>`;
        tableHTML += `<td>${app_date}</td>`;
        tableHTML += `<td>${app_time}</td>`;
        tableHTML += `<td>${app_timestamp}</td>`;
        tableHTML += `<td>${st_fname}</td>`;
        tableHTML += `<td>${st_lname}</td>`;
        tableHTML += `<td>${st_email}</td>`;
        tableHTML += `<td><button class="btn btn-danger" data-id=${ref_num}>Delete</td>`
        tableHTML += "</tr>";
    });

    table.innerHTML = tableHTML;
}

function getAppointments(){
    fetch('http://localhost:5000/instructor_main/getAppointments')
    .then(response => response.json())
    .then(data => { loadHTMLTable(data['data']);
    });
}

function deleteRowByRefNum(ref_num) {
    fetch('http://localhost:5000/instructor_main/deleteAppointment/' + ref_num, {
        method: 'DELETE'
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            location.reload();
        }
    });
}