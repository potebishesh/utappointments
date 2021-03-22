
document.addEventListener('DOMContentLoaded', function(){
 
});


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


getAvailability();

function getAvailability(){
    fetch('http://localhost:5000/getAvailability')
    .then(response => response.json())
    .then(data => { loadHTMLTable(data['data']); 
        /*
        var temp = data['data'];
        for(var i = 0; i < temp.length; i++)
        {
            console.log(numToDay(temp[i].day));
        }    
        */   
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