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
            // console.table(result);
            // console.log(typeof(result));
            // console.log(result);
            // const departmentList = [];
            // result.forEach(item => departmentList.push(item.name));
            // console.log(departmentList);

            //dont need to map this stuff, just a good ol' console.table(results) will work
            //console.log(results.map(x=> x.name));
            console.table(results);
        })
    }
    //view all roles - this shows a list of roles
    getRoles()
    {
        this.db.query(`select title, salary from roles`, (err, results) => {
            if(err) 
            {
                console.error(err);
                return;
            }
            // console.table(result);
            // console.log(typeof(result));
            // console.log(result);
            // const departmentList = [];
            // result.forEach(item => departmentList.push(item.name));
            // console.log(departmentList);
            //console.log(results.map(x=> x = {  title: x.title, salary: x.salary} ));
            console.table(results);
        })
    }

    getEmployees()
    {
        const query = `Select e.first_name, e.last_Name, r.title, r.salary, d.name as 'department' 
        from  employees e 
        Join roles r 
        ON e.role_id = r.id 
        join departments d 
        on r.department_id = d.id;`;

        this.db.query(query, (err, results) => {
            if(err) 
            {
                console.error(err);
                return;
            }
            console.table(results);
        });
       
    }

    //view all employees - this shows a table of employees with their roles and managers

    //add a department- this adds an entry to the department table

    //add a role -this adds an entry to the role table takes a title, a salary, and a role/role id
    


    close = () => this.db.end();
}

module.exports = Database;