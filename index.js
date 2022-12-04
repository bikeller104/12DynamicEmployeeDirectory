const  sqlParams = require('./sql_config');
const mysql = require('mysql2');


const Database = require('./db_functions/sqlFunctions');

const db = new Database(sqlParams.sqlConParams);

const tables = {
    employees: "employees",
    departments: "departments",
    roles: "roles"
}

const startOptions = [
    "view all departmests",
    "view all roles",
    "view all employees",
    "add a department",
    "add a role",
    "add an employee", 
    "update an employee role"

]

console.log("Select all for departments");
db.selectAllQuery(tables.departments);
console.log("Select all for employees");
db.selectAllQuery(tables.employees);
console.log("Select all for roles");
db.selectAllQuery(tables.roles);

console.log("Select all for departments");
db.getDepartments();
console.log("Select all for roles");
db.getRoles();
console.log("Select all join all tables");
db.getEmployees();


db.close();
