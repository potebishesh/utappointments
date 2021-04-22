var button = document.getElementById("submit");

var reference = document.getElementById("reference");
var email = document.getElementById("email");

button.addEventListener("click", checkStatus);

function checkStatus(){
    getAppointmentStatus(reference, email);
}

function loadHTMLTable(data) {
    const table = document.querySelector('table tbody');
    if(data.length === 0) {
        table.innerHTML = "<tr><td class='no-data' colspan='5'> No Appointment Found </td></tr>";
        return;
    }
    
    let tableHTML = "";
    data.forEach(function ({ref_num, st_fname, st_lname, app_date, app_time}){
        tableHTML += "<tr>";
        tableHTML += `<td>${ref_num}</td>`;
        tableHTML += `<td>${st_fname}</td>`;
        tableHTML += `<td>${st_lname}</td>`;
        tableHTML += `<td>${app_date}</td>`;
        tableHTML += `<td>${app_time}</td>`;
        tableHTML += "</tr>";
    });

    table.innerHTML = tableHTML;
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