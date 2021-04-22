getAppointments();

function loadHTMLTable(data) {  
    const table = document.querySelector('table tbody');
    if(data.length === 0) {
        table.innerHTML = "<tr><td class='no-data' colspan='3'> No Appointments </td></tr>";
        return;
    }
    
    let tableHTML = "";

    data.forEach(function ({ref_num, app_date, app_time, app_timestamp, st_fname, st_lname, st_email}){
        tableHTML += "<tr>";
        tableHTML += `<td>${ref_num}</td>`;
        tableHTML += `<td>${app_date}</td>`;
        tableHTML += `<td>${app_time}</td>`;
        tableHTML += `<td>${app_timestamp}</td>`;
        tableHTML += `<td>${st_fname}</td>`;
        tableHTML += `<td>${st_lname}</td>`;
        tableHTML += `<td>${st_email}</td>`;
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