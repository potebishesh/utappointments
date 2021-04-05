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

export function to24hour(time_){
    var result = "";
    var time_i = time_.split(' ');
    var time_array = time_i[0].split(':')

    if(parseInt(time_array[0])){
        var hour = parseInt(time_array[0]);
        if (time_i[1] == "PM"){
            if(hour < 12){
                hour = hour + 12;
            }
        }
        else if (time_i[1] = "AM"){
            if(hour == 12){
                hour = 0;
            }
        }
        result = hour.toString() + ":" + time_array[1] + ":00";
        return result;
    }
    else{
        console.log("Invalid Time Input");
    }
}

// changes date format from MM-DD-YYYY to YYYY-MM-DD
export function dateYY(date){
    var date_ = date.split('-');

    var month = date_[0];
    var day = date_[1];
    var year = date_[2];

    var result = year + '-' + month + '-' + day;

    return result;
}