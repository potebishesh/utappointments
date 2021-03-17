// index.js is our front-end. Sends API calls using fetch() to the back-end.

document.addEventListener('DOMContentLoaded', function () {
    fetch('http://localhost:5000/getAll')
    .then(response => response.json())
    .then(data => console.log(data));
    loadHTMLTable([]);
});

function loadHTMLTable(data) {
    const table = document.querySelector('table tbody')

    if (data.length === 0) {
        table.innerHTML = "<tr><td class='no-data' colspan='8'>No Data</td></tr>";
    }
}