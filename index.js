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
          let querystring =
            "insert into employee (first_name, last_name, role_id, manager_id) values ('Jonathan', 'Watson', 1, 1);";
          connection.query(querystring, function (err, res) {
            viewData();
          });
          break;
        case "[UPDATE] Data":
          break;
        case "EXIT":
          console.log("Thanks for using the app!");
          connection.end();
          break;
      }
    });
}

function viewData() {
    connection.query("select * from employee;", function (err, res) {
        console.table(res);
      });
}