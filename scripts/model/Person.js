export class Person {
    constructor(name, surname) {
        this.name = name;
        this.surname = surname;
    }

    get fullName() {
        return this.name + " " + this.surname;
    }

    get age() {
        if (!this._dateOfBirth) return "";
        let ageDiff = Date.now() - Date.parse(this._dateOfBirth);
        let ageDate = new Date(ageDiff);
        return " <b>Возраст:</b>" + Math.abs(ageDate.getUTCFullYear() - 1970);
    }

    formatDate(date) {
        let day = date.getDate();
        if (day<10) day = "0" + day;
        let month = date.getMonth() + 1;
        if (month<10) month = "0" + month;
        let year = date.getFullYear();
        return day + "." + month + "." + year;
    }

    set DateOfBirth(date) {
        this._dateOfBirth = new Date(date);
    }

    get DateOfBirth() {
        return this._dateOfBirth ? " <b>Дата рождения:</b> " + this.formatDate(this._dateOfBirth) : "";
    }

    toString() {
        let phones = this.phones ? `<b>Список телефонов:</b> ${this.phones}` : "";
        return `${this.fullName} <br> ${this.DateOfBirth} <br> ${this.age} <br> ${phones} <br><br>`;
    }
}