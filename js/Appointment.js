export default class Appointment {
    constructor(date, student, time) {
        this.date = date;
        this.student = student;
        this.time = time;
    }

    get getDate() {
        return this.date;
    }

    get getStudent() {
        return this.student;
    }

    get getTime() {
        return this.time
    }
    
}