const  sqlParams = require('./sql_config');
const mysql = require('mysql2');

const db = mysql.createConnection(sqlParams.sqlConParams);


db.query('Select * from employees', (err,results) =>
{
    console.table(results);
});