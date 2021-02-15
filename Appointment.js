class Appointment {
    constructor(date, student, timeLength) {
        this.date = date;
        this.student = student;
        this.timeLength = timeLength;
    }

    get getDate() {
        return this.date;
    }

    get getStudent() {
        return this.student;
    }

    get getTimeLength() {
        return this.timeLength
    }
    
}