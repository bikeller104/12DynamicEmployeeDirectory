const  sqlParams = require('./sql_config');
const mysql = require('mysql2');


const tempdb = mysql.createConnection(sqlParams);

function createDbConnection(sqlParams)
{
    const tempdb = mysql.createConnection(sqlParams);

    tempdb.end();
}

tempdb.end();


const Database = require('./db_functions/sqlFunctions');

const db = new Database(sqlParams);

const tables = {
    employees: "employees",
    departments: "departments",
    roles: "roles"
}


db.selectAllQuery(tables.departments);
db.selectAllQuery(tables.employees);
db.selectAllQuery(tables.roles);
