export function numToDay(number){
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
export function to12hour(time_){
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