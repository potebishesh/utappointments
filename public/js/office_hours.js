$(document).ready(function(){
    $('input.timepicker').timepicker({
        timeFormat: 'h:mm',
        interval: 10,
        minTime: '6:00am',
        maxTime: '11:00pm',
        startTime: '10:00',
        dynamic: false,
        dropdown: true,
        scrollbar: true
    });
});