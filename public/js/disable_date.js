import {dateYY} from './utilities.js'

var button = document.getElementById("submit");
var date = document.getElementById("datepicker");
var error = document.getElementById("displayError");

var disabled_dates = [];
getDisabledDates();

button.addEventListener("click", disableDate);

document.querySelector('table tbody').addEventListener('click', function(event) {
    if (event.target.className === "delete-row-btn") {
        deleteRowByDate(event.target.dataset.id);
    }
});


function disableDate(){
    if(!date.value){
        error.innerHTML = "Select Date";
    }
    else{
        var date_ = dateYY(date.value);
        error.innerHTML = "";
        fetch('http://localhost:5000/instructor_main/disableSelectedDate',{
            headers: {
                'Content-type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({date: date_})
        })
        .then(response => response.json())
        .then(data => console.log(data['success']))
        .then(date.value = "")
        .then(getDisabledDates())

        error.innerHTML = "Selected date is disabled";
    }
}


function getDisabledDates(){
    fetch('http://localhost:5000/instructor_main/getDisabledDates')
    .then(response => response.json())
    .then(data => { loadHTMLTable(data['data']);
    });
}

function loadHTMLTable(data) {
    
    
    let tableHTML = "";
    const table = document.querySelector('table tbody');
    if(data.length === 0) {
        tableHTML = "<tr><td class='no-data' colspan='2'> No disabled Dates </td></tr>";
    }
    else{
        data.forEach(function ({d_dates}){
            var date = new Date(d_dates);
            var day = date.getDate().toString().padStart(2, '0');
            var month = (date.getMonth() + 1).toString().padStart(2, '0');
            var year = date.getFullYear();

            var disabled_date = month + "-" + day + "-" + year;

            disabled_dates.push(disabled_date);
            tableHTML += "<tr>";
            tableHTML += `<td>${disabled_date}</td>`;
            tableHTML += `<td><button class="delete-row-btn" data-id=${dateYY(disabled_date)}>Delete</td>`
            tableHTML += "</tr>";
        });
    }

    
    table.innerHTML = tableHTML;

    let today = new Date();
    let minDate = new Date();
    minDate.setDate(today.getDate() + 2);
    let maxDate = new Date();
    maxDate.setDate(today.getDate() + 60);


    jQuery('#datepicker').datepicker({
        minDate: minDate,
        maxDate: maxDate,
        beforeShowDay: DisableDates,
        dateFormat: 'mm-dd-yy',
        constrainInput: true,    
    })

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
}

function deleteRowByDate(date) {
    fetch('http://localhost:5000/instructor_main/deleteDisabledDate/' + date, {
        method: 'DELETE'
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            location.reload();
        }
    });
}