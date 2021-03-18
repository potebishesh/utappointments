// index.js is our front-end. Sends API calls using fetch() to the back-end.

const { response } = require("express");

// Once page has loaded, do the stuff inside here.
document.addEventListener('DOMContentLoaded', function () {
    fetch('http://localhost:5000/getAll')
    .then(response => response.json())
    .then(data => loadHTMLTable(data['data']));
    
});

// Obtain data from make appointment
const bookApptBtn = document.querySelector('#submit');
bookApptBtn.onclick = function () {
    const fname = document.querySelector('#fname');

    fetch('http://localhost:5000/insert',{
        headers: {
            'Content-type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({fname : fname})
    })
    .then(response => response.json())
    .then(data => insertRowIntoTable(data['data']));
}

function insertRowIntoTable(data) {

}

// Loads table with appropriate data.
function loadHTMLTable(data) {
    const table = document.querySelector('table tbody')

    if (data.length === 0) {
        table.innerHTML = "<tr><td class='no-data' colspan='6'>No Data</td></tr>";
    }
}