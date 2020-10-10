import { removeEmployee, addEmployee, findById, searchEmployees, setEmployeeManager, setDateOfBirth } from './service';
import DATA from './employees-json';

const PLACEHOLDER = "employeesPlaceholder";

function clearEmployeesPlaceholder() {
    document.getElementById(PLACEHOLDER).innerHTML = "";
}

function showEmployees(employees) {
    clearEmployeesPlaceholder();
    let ul = document.createElement("ul");
   
    for (let employee of employees) {
        let li = document.createElement("li");
        ul.appendChild(li);

        let emplID = employee.id

        let emplNameInput = document.createElement("input");
        emplNameInput.setAttribute("id", "name"+emplID);
        emplNameInput.setAttribute("value", employee.name);
        emplNameInput.setAttribute("onchange", `changeEmplName(${emplID})`);
        li.appendChild(emplNameInput);

        let emplSurnameInput = document.createElement("input");
        emplSurnameInput.setAttribute("id", "surname"+emplID);
        emplSurnameInput.setAttribute("value", employee.surname);
        emplSurnameInput.setAttribute("onchange", `changeEmplSurname(${emplID})`);
        li.appendChild(emplSurnameInput);

        let emplBirthInput = document.createElement("input");
        emplBirthInput.setAttribute("id", "birth"+emplID);
        emplBirthInput.setAttribute("value", employee.DateOfBirth);
        emplBirthInput.setAttribute("onchange", `changeEmplBirth(${emplID})`);
        li.appendChild(emplBirthInput);
        
        if (employee.managerRef) {
            // let manager = findById(+employee.managerRef);
            let managerSpan = document.createElement("span");
            let managerSelect = document.createElement("select");
            fillSelect(managerSelect, getEmployeesOptions(), employee.managerRef);
            managerSelect.addEventListener("change",() => employee.managerRef=managerSelect.value);
            managerSpan.innerHTML = " <b>Руководитель:</b> ";
            li.appendChild(managerSpan);
            li.appendChild(managerSelect);
        }

        let removeButton = document.createElement("button");
        removeButton.innerHTML = "Удалить";

        if (process.env.NODE_ENV === 'development') {
            removeButton.addEventListener('click', () => removeEmployeeUI(emplID));
        } else {
            removeButton.addEventListener('click', function (event) { confirmRemove(emplID); });
        }

        li.appendChild(removeButton);
    }
    document.getElementById(PLACEHOLDER).appendChild(ul);
}

function confirmRemove (emplID) {
    if (confirm("Вы уверены, что хотите удалить сотрудника?")) removeEmployeeUI(emplID);
}

export function changeEmplName(emplID) {
    let employee = findById(emplID);
    let emplNameInput = document.getElementById("name"+emplID);
    if (!!emplNameInput.value) {
        employee.name = emplNameInput.value;
        emplNameInput.style.backgroundColor = '#f1f1f1';
    }
    else {
        emplNameInput.value = employee.name;
        emplNameInput.style.backgroundColor = '#FFEEEE';
    }
}

export function changeEmplSurname(emplID) {
    let employee = findById(emplID);
    let emplSurnameInput = document.getElementById("surname"+emplID);
    if (!!emplSurnameInput.value) {
        employee.surname = emplSurnameInput.value;
        emplSurnameInput.style.backgroundColor = '#f1f1f1';
    }
    else {
        emplSurnameInput.value = employee.surname;
        emplSurnameInput.style.backgroundColor = '#FFEEEE';
    }
}

export function changeEmplBirth(emplID) {
    let employee = findById(emplID);
    let emplBirthInput = document.getElementById("birth"+emplID);
    let dateReg = /^\d{4}-\d{2}-\d{2}$/;
    if (!!emplBirthInput.value.match(dateReg)) {
        employee.DateOfBirth = emplBirthInput.value;
        emplBirthInput.style.backgroundColor = '#f1f1f1';
    }
    else {
        emplBirthInput.value = employee.DateOfBirth;
        emplBirthInput.style.backgroundColor = '#FFEEEE';
    }
}

export function runUI() {
    fillSelect(document.getElementById("managerSelect"), getEmployeesOptions());
    document.getElementById("searchButton").click();
    showEmployees(DATA.employees);
    assignSendOnEnter("searchPane","searchEmployeesButton");
    assignSendOnEnter("addPane", "addEmployeeButton");
}  

export function addEmployeeUI() {
    let errorHTML = "";

    let name = document.getElementById("name").value;
    if (name=="") {
        errorHTML += "- Имя сотрудника должно быть задано<br>";
        document.getElementById("name").style.backgroundColor = '#FFEEEE';
    } else {
        document.getElementById("name").style.backgroundColor = '#f1f1f1';
    }

    let surname = document.getElementById("surname").value;
    if (surname=="") {
        errorHTML += "- Фамилия сотрудника должна быть задана<br>";
        document.getElementById("surname").style.backgroundColor = '#FFEEEE';
    } else {
        document.getElementById("surname").style.backgroundColor = '#f1f1f1';
    }

    let birthDate = document.getElementById("birthDate").value;
    let dateReg = /^\d{4}-\d{2}-\d{2}$/;
    if (!birthDate.match(dateReg)) {
        errorHTML += "- Дата должна быть задана в формате ГГГГ-ММ-ДД<br>";
        document.getElementById("birthDate").style.backgroundColor = '#FFEEEE';
    } else {
        document.getElementById("birthDate").style.backgroundColor = '#f1f1f1';
    }

    document.getElementById("addEmployeeFormErrorMessage").innerHTML = errorHTML;
    if (errorHTML.length != 0) {
        return;
    }

    let id = addEmployee(name, surname);
    setDateOfBirth(id, birthDate);
    let managerId = document.getElementById("managerSelect").value;
    setEmployeeManager(id, managerId);
    document.getElementById("name").value = "";
    document.getElementById("surname").value = "";
    document.getElementById("birthDate").value = "";
    document.getElementById("addEmployeeFormErrorMessage").innerHTML = "- Сотрудник добавлен";
    // showEmployees(DATA.employees);
}

function removeEmployeeUI(id) {
    removeEmployee(id);
    showEmployees(DATA.employees);
}

function fillSelect(select, values, selectedValue) {
    for (let val of values) {
        let option = document.createElement("option");
        option.text = val.text;
        option.value = val.value;
        if (selectedValue==option.value) option.selected=true;
        select.appendChild(option);
    }
}

function getEmployeesOptions() {
    let options = [];
    for (let e of DATA.employees) {
        options.push({text:e.name+' '+e.surname, value:e.id});
    }
    return options;
}

export function searchEmployeeUI() {
    let name = document.getElementById("nameSearch").value;
    let surname = document.getElementById("surnameSearch").value;
    let birthDate = document.getElementById("birthSearch").value;
    let managerRef = document.getElementById("managerSearch").value;
   
    let employees  = searchEmployees(name, surname, birthDate, managerRef);
    showEmployees(employees);
}

/**
 * Активирует выбранный таб
 * @param evt событие, вызывающее активацию
 * @param id идентификатор таба
 */
export function openTab(evt, id) {
    // Определяем переменные
    var i, tabcontent, tablinks;
   
    // Получаем все элементы с class="tabcontent" и прячем их
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
   
    // Получаем все элементы с class="tablinks" и удаляем класс "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
   
    // Показываем текущий таб и добавляем класс "active"
    // на кнопку, которая открывает этот таб
    document.getElementById(id).style.display = "block";
    evt.currentTarget.className += " active";
}

function assignSendOnEnter(paneId, buttonId) {
    let allInput;
    if (paneId == "searchPane") {
        allInput = document.querySelectorAll("#"+paneId+" form input");
    } else {
        allInput = document.querySelectorAll("#"+paneId+" input");
    }
    for (let input of allInput) {
        input.addEventListener("keyup", function(event) {
            event.preventDefault();
            if (event.keyCode === 13) {
                document.querySelector("#"+paneId+" button").click();
            }
        });

        if (paneId == "searchPane") {
            input.addEventListener("change", function(event) {
                document.querySelector("#"+paneId+" button").click();
            });
        }
    }
}