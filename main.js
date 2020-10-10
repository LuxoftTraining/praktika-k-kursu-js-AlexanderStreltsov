import { runUI, addEmployeeUI, openTab, searchEmployeeUI, changeEmplName, changeEmplSurname, changeEmplBirth, showEmployeesNew } from './scripts/ui-all';
import './style/style.css';
/* new class code */
import { Employee } from "./scripts/model/Employee";

window.addEmployeeUI = addEmployeeUI;
window.openTab = openTab;
window.searchEmployeeUI = searchEmployeeUI;
window.changeEmplName = changeEmplName;
window.changeEmplSurname = changeEmplSurname;
window.changeEmplBirth = changeEmplBirth;
window.showEmployeesNew = showEmployeesNew;
window.addEventListener("load", runUI);

/* new class code */
window.Employee = Employee;
