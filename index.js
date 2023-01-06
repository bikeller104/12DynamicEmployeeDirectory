const  sqlParams = require('./sql_config');
const mysql = require('mysql2');
const inquirer = require('inquirer');

const Database = require('./db_functions/sqlFunctions');

const db = new Database(sqlParams.sqlConParams);

// const tables = {
//     employees: "employees",
//     departments: "departments",
//     roles: "roles"
// }

const startOptions = [
    "view all departments",
    "view all roles",
    "view all employees",
    "add a department",
    "add a role",
    "add an employee", 
    "update an employee role",
    "quit"
]

const startQuestions = [
    {
        name:'baseResponse',
        type: 'list',
        message:'What do you want to do',
        choices: startOptions,
    }
]

const getDepartmentInput = [
{
    name: 'department',
    type: 'input',
    message: 'Enter the new department name',
}
]

const getRoleInput = [
    {
        name: 'role',
        type: 'input',
        message: 'Enter the new role name',
    },
    {
        name: 'salary',
        type: 'input',
        message: 'Enter the new salary',
    }
]

function addRolewithDepartmentInput(departmentsList)
{
    const roleInput = [ 
        ...getRoleInput,
        {
            name: 'department',
            type: 'list',
            message: 'Choose the new department the role is in',
            choices: departmentsList,
        }
     ]


     inquirer.prompt(roleInput).then(responses =>
    {
        db.addRole(responses.role, responses.salary, responses.department, askQuestions);
    });
}

function askQuestions()
{
    inquirer.prompt(startQuestions)
    .then((responses) => 
    {
        switch(responses.baseResponse)
        {
            case "view all departments":
                db.getDepartments(askQuestions);
                
                break;
            case "view all roles":
                db.getRoles(askQuestions);
                //askQuestions();
                break;
            case "view all employees":
                db.getEmployees(askQuestions);
                //askQuestions();
                break;
            case "add a department": 
                inquirer.prompt(getDepartmentInput)
                .then((response) =>
                {
                    db.addDepartment(response.department, askQuestions);
                });
                break;
            case "add a role":
                db.getDepartmentList(addRolewithDepartmentInput)
                break;
            case "add an employee": 
                
                break;
            case "update an employee role":

                break;
            default:
                console.log("ending program");
                break;
            }
    });
}

askQuestions();
