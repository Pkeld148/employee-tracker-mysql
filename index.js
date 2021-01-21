const mysql = require("mysql");
const inquirer = require("inquirer");

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Dms21",
    database: "employees_db"
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("Connected as id " + connection.threadId);
    init();
});

function init() {
    inquirer.prompt({
        name: "menu",
        type: "list",
        message: "Welcome to the main menu!",
        choices: ["Choices", "Will", "Go", "Here"]
    })
}