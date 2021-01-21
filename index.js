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
          break;
        case "[ADD] Data":
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
