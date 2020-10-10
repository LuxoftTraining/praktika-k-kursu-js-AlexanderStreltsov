import { Person } from "./Person"
import DATA from  "../employees-json"

export class Employee extends Person {
    constructor(name, surname, department) {
        super(name,surname);
        this.department = department;
        this.phones = new Array()
    }

    set emplPhones(phone) {
        this.phones.push(phone);
    }

    get emplPhones () {
        return this.phones
    }

    static fromJSON(obj) {
        return Object.assign(new Employee(), obj)
    }
}

function jsonToEmployees(employeesJSON) {
    let employees = [];
    for (let e of employeesJSON) {
        employees.push(Employee.fromJSON(e));
    }
    return employees;
}

window.allEmployees = function() {
    return jsonToEmployees(DATA.employees);
}
