const  sqlParams = require('./sql_config');
const mysql = require('mysql2');


const Database = require('./db_functions/sqlFunctions');

const db = new Database(sqlParams.sqlConParams);

const tables = {
    employees: "employees",
    departments: "departments",
    roles: "roles"
}


db.selectAllQuery(tables.departments);
db.selectAllQuery(tables.employees);
db.selectAllQuery(tables.roles);

db.getDepartments();
db.getRoles();
db.getEmployees();


db.close();
