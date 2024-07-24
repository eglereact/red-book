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

const createOptionsTable = (_) => {
  const sql = `
        CREATE TABLE IF NOT EXISTS options (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(40) NOT NULL UNIQUE,
        value TEXT NOT NULL
    )`;

  connection.query(sql, function (err) {
    if (err) throw err;
    console.log("Options table created");
  });
};

const dropUsersTable = () => {
  const sql = `DROP TABLE IF EXISTS users`;
  connection.query(sql, function (err) {
    if (err) throw err;
    console.log("Users table was deleted");
  });
};

const dropOptionsTable = (_) => {
  const sql = "DROP TABLE IF EXISTS options";

  connection.query(sql, function (err) {
    if (err) throw err;
    console.log("Options table dropped");
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

const seedOptionsTable = (_) => {
  const contacts = {
    phone: "123456789",
    email: "jonny.red@book",
    address: "Book str. 1, Bookling",
    title: "Contacts",
    about:
      "Protect animals and birds from water and fire. Patronize and contact us.",
  };

  const sql = `
        INSERT INTO options
        (name, value)
        VALUES
        ('contacts', '${JSON.stringify(contacts)}')
    `;
  connection.query(sql, function (err) {
    if (err) throw err;
    console.log("Options table seeded");
  });
};

dropUsersTable();
dropOptionsTable();
createUsersTable();
createOptionsTable();
seedUsersTable();
seedOptionsTable();

connection.end(function (err) {
  if (err) throw err;
  console.log("Connection closed");
});
