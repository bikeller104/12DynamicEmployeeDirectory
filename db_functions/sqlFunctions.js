const mysql = require('mysql2');

class Database {
    constructor(parameters)
    {
        this.db = mysql.createConnection(parameters);
    }

    selectAllQuery(tableName)
    {
        this.db.query(`Select * from ${tableName}`, (err,results) => {
        console.table(results);
        });
    }   
}

module.exports = Database;