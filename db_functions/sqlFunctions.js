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
    getDepartments(callback)
    {
        this.db.query(`select name from departments`, (err, results) => {
            if(err) 
            {
                console.error(err);
                return;
            }
            console.table(results);
            callback();
        })
    }
    //pass the list of departments to a callback function 
    //ill use this to pass an inquirer function to the call back so 
    //it can ask the user to choose a department from a list
    getDepartmentList(callbackWithResults) {
        this.db.query('select name from departments', (err, results) => {
            callbackWithResults(results.map(result => result.name));
        })
    }

    //view all roles - this shows a list of roles
    getRoles(callback)
    {
        const query = `select r.id, r.title, r.salary, d.name as 'department' from roles r Right Join departments d on r.department_id = d.id;`;
        this.db.query(query, (err, results) => {
            if(err) 
            {
                console.error(err);
                return;
            }
            console.table(results);
            callback();
        })
    }

    getDepartmentRow(departmentName)
    {
        const query = `Select * From departments WHERE name = ?`;
        this.db.query(query, departmentName, (err, results) => {
            console.table(results);
            console.log(results);
            console.log(results[0].id);
        })
    }
    
    //view all employees - this shows a table of employees with their roles and managers
    getEmployees(callback)
    {
        const query = `Select e.first_name, e.last_Name, r.title, r.salary, d.name as 'department' , CONCAT( e2.first_name, ' ', e2.last_name) as 'manager' from  employees e  Join roles r  ON e.role_id = r.id   join departments d  on r.department_id = d.id Left Join employees e2  On e.manager_id = e2.id`;

        this.db.query(query, (err, results) => {
            if(err) 
            {
                console.error(err);
                return;
            }
            console.table(results);
            callback();
        });
       
    }

    //add a department- this adds an entry to the department table
    addDepartment(departmentName, callback)
    {
        const query = `INSERT INTO  departments (name) Values (?)`;
        this.db.query(query, departmentName, (err, results) => 
        {
            if(err) {
                console.log(err);
                return;
            }
            callback();
        });
    }

    

    //add a role -this adds an entry to the role table takes a title, a salary, and a role/role id
    addRole(roleName, salary, departmentName, callback)
    {

        const query = `Select * From departments WHERE name = ?`;
        this.db.query(query, departmentName, (err, results) => {

            const query = `INSERT INTO roles(title, salary, department_id) Values (?, ?, ?)`;
            this.db.query(query, [roleName, salary, results[0].id], (err, res) =>
            {
                if(err) {
                    console.log(err);
                    return;
                }
                callback();
        });
    });
    }

    addEmployee(firstName, lastName, roleName, managerName)
    {

    }

    updateEmployee() {}


    


    close = () => {
        this.db.end();
        console.log(`database closed`);
    }
}

module.exports = Database;