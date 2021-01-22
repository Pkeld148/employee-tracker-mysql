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
      message: "What would you like to view?",
      choices: ["View All Employees", "View All Roles", "View All Departments"],
    })
    .then(function (answer) {
      switch (answer.viewMenu) {
        case "View All Employees":
          connection.query("select * from employee;", function (err, res) {
            console.table(res);
            init();
          });
          break;
        case "View All Roles":
          connection.query("select * from role;", function (err, res) {
            console.table(res);
            init();
          });
          break;
        case "View All Departments":
          connection.query("select * from department;", function (err, res) {
            console.table(res);
            init();
          });
          break;
      }
    });
}

function addData() {
  let querystring =
    "insert into employee (first_name, last_name, role_id, manager_id) values ('Jonathan', 'Watson', 1, 1);";
  connection.query(querystring, function (err, res) {
    viewData();
  });
}

function updateData() {
  let querystring =
    "update employee set last_name = 'Alan' where first_name = 'Paul';";
  connection.query(querystring, function (err, res) {
    viewData();
  });
}
