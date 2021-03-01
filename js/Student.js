export default class Student {
    constructor(name, onlineId, year) {
        this.name = name;
        this.onlineId = onlineId;
    }

    get getName() {
        return this.name;
    }

    get getId() {
        return this.onlineId;
    }

}