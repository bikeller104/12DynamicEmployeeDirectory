const mysql = require('mysql2');

class Database {
    constructor(parameters)
    {
        this.db = mysql.createConnection(parameters);
    }

    selectAllQuery(tableName)
    {
        this.db.query(`Select * from ${tableName}`, (err,results) => {
            console.log(`table: ${tableName}`);
            console.table(results);
        });
    }  
    //view all departments- this shows a list of departments
    getDepartments()
    {
        this.db.query(`select name from departments`, (err, results) => {
            if(err) 
            {
                console.error(err);
                return;
            }
            console.table(results);
        })
    }
    //view all roles - this shows a list of roles
    getRoles()
    {
        const query = `select r.id, r.title, r.salary, d.name as 'department' from roles r Right Join departments d on r.department_id = d.id;`;
        this.db.query(query, (err, results) => {
            if(err) 
            {
                console.error(err);
                return;
            }
            console.table(results);
        })
    }
    
    //view all employees - this shows a table of employees with their roles and managers
    getEmployees()
    {
        const query = `Select e.first_name, e.last_Name, r.title, r.salary, d.name as 'department' , CONCAT( e2.first_name, ' ', e2.last_name) as 'manager' from  employees e  Join roles r  ON e.role_id = r.id   join departments d  on r.department_id = d.id Left Join employees e2  On e.manager_id = e2.id`;

        this.db.query(query, (err, results) => {
            if(err) 
            {
                console.error(err);
                return;
            }
            console.table(results);
        });
       
    }


    //add a department- this adds an entry to the department table

    //add a role -this adds an entry to the role table takes a title, a salary, and a role/role id
    


    close = () => this.db.end();
}

module.exports = Database;