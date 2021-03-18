export default class Student {
    constructor(name, onlineId, year) {
        this.name = name;
        this.onlineId = onlineId;
        this.year = year;
    }

    get getName() {
        return this.name;
    }

    get getId() {
        return this.onlineId;
    }

    get getYear() {
        return this.year;
    }

}