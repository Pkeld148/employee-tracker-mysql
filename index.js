const mysql = require("mysql");
const inquirer = require("inquirer");

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "Dms21",
  database: "employees_db",
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("Connected as id " + connection.threadId);
  init();
});

function init() {
  inquirer
    .prompt({
      name: "menu",
      type: "list",
      message: "Welcome to the main menu!\nWhat would you like to do?",
      choices: ["[VIEW] Data", "[ADD] Data", "[UPDATE] Data", "EXIT"],
    })
    .then(function (answer) {
      switch (answer.menu) {
        case "[VIEW] Data":
          viewData();
          break;
        case "[ADD] Data":
          addData();
          break;
        case "[UPDATE] Data":
          updateData();
          break;
        case "EXIT":
          console.log("Thanks for using the app!");
          connection.end();
          break;
      }
    });
}

function viewData() {
  inquirer
    .prompt({
      name: "viewMenu",
      type: "list",
      message: "What would you like to VIEW?",
      choices: ["View All Employees", "View All Roles", "View All Departments"],
    })
    .then(function (answer) {
      switch (answer.viewMenu) {
        case "View All Employees":
          viewAllEmployees();
          break;
        case "View All Roles":
          viewAllRoles();
          break;
        case "View All Departments":
          viewAllDepartments();
          break;
      }
    });
}

function viewAllEmployees() {
  connection.query("select * from employee;", function (err, res) {
    console.table(res);
    init();
  });
}

function viewAllRoles() {
  connection.query("select * from role;", function (err, res) {
    console.table(res);
    init();
  });
}

function viewAllDepartments() {
  connection.query("select * from department;", function (err, res) {
    console.table(res);
    init();
  });
}

function addData() {
  inquirer
    .prompt({
      name: "addMenu",
      type: "list",
      message: "What would you like to ADD?",
      choices: ["Add Employee", "Add Role", "Add Department"],
    })
    .then(function (answer) {
      switch (answer.addMenu) {
        case "Add Employee":
            inquirer
            .prompt([
              {
                name: "addEmployeeFirstName",
                type: "input",
                message: "Enter the employee's FIRST NAME: ",
              },
              {
                name: "addEmployeeLastName",
                type: "input",
                message: "Enter the employee's LAST NAME: ",
              },
              {
                name: "assignRole",
                type: "input",
                message: "Please select the employee's ROLE:",
              },
              {
                name: "assignManager",
                type: "input",
                message: "Please select the employee's MANAGER:",
              },
            ])
            .then(function (answer) {
              connection.query(
                "insert into employee (first_name, last_name, role_id, manager_id) values (?, ?, ?, ?)",
                [answer.addEmployeeFirstName, answer.addEmployeeLastName, answer.assignRole, answer.assignManager],
                function (err, res) {
                  viewAllEmployees();
                }
              );
            });
          break;
        case "Add Role":
          inquirer
            .prompt([
              {
                name: "addRole",
                type: "input",
                message: "Enter the name of the Role you want to ADD: ",
              },
              {
                name: "addSalary",
                type: "input",
                message: "What is the salary for that Role?",
              },
            ])
            .then(function (answer) {
              connection.query(
                "insert into role (title, salary) values (?, ?)",
                [answer.addRole, answer.addSalary],
                function (err, res) {
                  viewAllRoles();
                }
              );
            });
          break;
        case "Add Department":
          inquirer
            .prompt({
              name: "addDepartment",
              type: "input",
              message: "Enter the name of the Department you want to ADD: ",
            })
            .then(function (answer) {
              connection.query(
                "insert into department (name) values (?)",
                answer.addDepartment,
                function (err, res) {
                  viewAllDepartments();
                }
              );
            });
          break;
      }
    });
}

function updateData() {
    inquirer.prompt({
        name: "updateEmployeeRole",
        type: "input",
        message: "Please select the role you wish to update the employee to: "
    })

//   let querystring =
//     "update employee set last_name = 'Alan' where first_name = 'Paul';";
//   connection.query(querystring, function (err, res) {
//     viewData();
//   });
}
