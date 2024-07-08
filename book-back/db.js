const md5 = require("md5");
const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "book",
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("Connected to the database");
});

// Create users table
const createUsersTable = () => {
  const sql = `
        CREATE TABLE IF NOT EXISTS users (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(40) NOT NULL,
            email VARCHAR(80) NOT NULL UNIQUE,
            role SET('admin','user', 'editor') NOT NULL DEFAULT 'user',
            password CHAR(32) NOT NULL,
            session CHAR(32) NULL
            )`;

  connection.query(sql, function (err) {
    if (err) throw err;
    console.log("Users table was created");
  });
};

const dropUsersTable = () => {
  const sql = `DROP TABLE IF EXISTS users`;
  connection.query(sql, function (err) {
    if (err) throw err;
    console.log("Users table was deleted");
  });
};

const seedUsersTable = () => {
  const sql = `
    INSERT INTO users (name, email, role, password)
    VALUES
    ('Cat', 'cat@gmail.com', 'admin', '${md5("123")}'),
    ('Dog', 'dog@gmail.com', 'editor', '${md5("123")}'),
    ('Fox', 'fox@gmail.com', 'user', '${md5("123")}')
    `;
  connection.query(sql, function (err) {
    if (err) throw err;
    console.log("Users were created.");
  });
};

dropUsersTable();
createUsersTable();
seedUsersTable();

connection.end(function (err) {
  if (err) throw err;
  console.log("Connection closed");
});
