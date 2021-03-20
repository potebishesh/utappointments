class Instructor {
    constructor(name, id, password) {
        this.name = name;
        this.id = id;
        this.password = password;
        this.appointments = {Null};
    }

    get getName() {
        return this.name;
    }

    get getId() {
        return this.id;
    }

    get getPassword() {
        return this.password
    }

    get getAppointments() {
        return this.appointments;
    }
}