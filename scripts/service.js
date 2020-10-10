import DATA from './employees-json';

function findByName(name, surname) {
    let result = [];
    for (let empl of DATA.employees) {
        if ((!name || name === empl.name) &&
            (!surname || surname === empl.surname)) {
            result.push(empl);
        }
    }
    return result;
}

export function addEmployee (name, surname) {
    if (!surname || !name) {
        throw new Error("Name and surname should be not empty");
    } else {
        let id = DATA.employees.length + 1;
        DATA.employees.push({ id, name, surname });
        return id;
    }
}

export function removeEmployee(id) {
    let index = 0;
    for (let empl of DATA.employees) {
        if (empl.id === id) break;
        index++;
    }
    DATA.employees.splice(index, 1);
}

function showEmployee (employee) {
    let keys = Object.keys(employee);
    console.log(`Информация о сотруднике ${employee.surname}:`);
    for (let k of keys) {
        console.log(`${k} = ${employee[k]}`);
    }
}

function showEmployees() {
    DATA.employees.forEach(showEmployee);
}

const employeeMap = {};

export function findById(id){
    if (employeeMap[id] === id) {
        return employeeMap[id];
    }
    for (let empl of DATA.employees) {
        if (empl.id === id) {
            employeeMap[id] = empl;
            return empl;
        }
    }
}

function addPhone(id, phone) {
    let employee = findById(id);
    let phones = employee.phones;
    if (!phones) {
        employee.phones = [];
    }
    employee.phones.push(phone);
}

export function setDateOfBirth(id, date) {
    let employee = findById(id);
    employee.DateOfBirth = date;
}

function getAge(id) {
    let employee = findById(id);
    let ageDiff = Date.now() - Date.parse(employee.DateOfBirth);
    let ageDate = new Date(ageDiff); 
    let age = Math.abs(ageDate.getUTCFullYear() - 1970);
    return age;
}

function formatDate(date) {
    let day = date.getDate();
    if (day<10) day = "0"+day;
    let month = date.getMonth()+1;
    if (month<10) month = '0'+month;
    let year = date.getFullYear();
    return day + '.' + month + '.' + year;
}

function getEmployeeInfo(id) {
    let empl = findById(id);

    console.log(`
    Имя: ${empl.name}
    Фамилия: ${empl.surname}
    Дата рождения: ${empl.DateOfBirth}
    Возраст: ${empl.DateOfBirth ? getAge(empl.id) : undefined}
    Список телефонов: ${empl.phones}
    `);
}

export function setEmployeeManager(id, managerId) {
    let employee = findById(id);
    employee.managerRef = managerId;
}

export function searchEmployees(name, surname, birthDate, managerRef) {
    let results = [];
    for (let e of DATA.employees) {
        if ((!name || e.name==name) &&
           (!surname || e.surname==surname) &&
           (!birthDate || e.DateOfBirth==birthDate) &&
           (!managerRef || e.managerRef==managerRef)) {
            results.push(e);
        }
    }
    return results;
}
   
