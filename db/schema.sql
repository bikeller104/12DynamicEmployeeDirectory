DROP DATABASE IF EXISTS employee_directory_db;
CREATE DATABASE employee_directory_db;

USE employee_directory_db;

CREATE TABLE departments (
    id INT NOT NULL AUTO_INCRAMENT PRIMARY KEY,
    name VARCHAR(30) NOT NULL
);

CREATE TABLE roles (
    id INT NOT NULL AUTO_INCRAMENT PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL,
    department_id INT
    FOREIGN KEY(departments)
    REFERENCES departments(id)
    ON DELETE SET NULL
)

--this table must be created last because it has foreign keys from the other two
CREATE TABLE employees (
    id INT NOT NULL AUTO_INCRAMENT PRIMARY KEY,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
    manager INT,
    FOREIGN KEY (roles)
    REFERENCES roles(id)
    ON DELETE SET NULL,
    FOREIGN KEY (employees)
    REFERENCES employees(id)
    ON DELETE SET NULL
)