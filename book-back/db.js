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

const createOptionsTable = () => {
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

const createTypesTable = () => {
  const sql = `
        CREATE TABLE IF NOT EXISTS types (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(100),
        description TEXT,
        icon VARCHAR(100)
    )`;

  connection.query(sql, function (err) {
    if (err) throw err;
    console.log("Types table created");
  });
};

const createPostsTable = () => {
  const sql = `
        CREATE TABLE IF NOT EXISTS posts (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(100) NOT NULL,
        preview TEXT NOT NULL,
        content TEXT NOT NULL,
        photo VARCHAR(100) NULL,
        is_top BOOLEAN DEFAULT FALSE
    )`;

  connection.query(sql, function (err) {
    if (err) throw err;
    console.log("Posts table created");
  });
};

const dropUsersTable = () => {
  const sql = `DROP TABLE IF EXISTS users`;
  connection.query(sql, function (err) {
    if (err) throw err;
    console.log("Users table was deleted");
  });
};

const dropOptionsTable = () => {
  const sql = "DROP TABLE IF EXISTS options";

  connection.query(sql, function (err) {
    if (err) throw err;
    console.log("Options table dropped");
  });
};

const dropTypesTable = () => {
  const sql = "DROP TABLE IF EXISTS types";

  connection.query(sql, function (err) {
    if (err) throw err;
    console.log("Types table dropped");
  });
};

const dropPostsTable = () => {
  const sql = "DROP TABLE IF EXISTS posts";

  connection.query(sql, function (err) {
    if (err) throw err;
    console.log("Posts table dropped");
  });
};

const seedUsersTable = () => {
  const sql = `
    INSERT INTO users (name, email, role, password)
    VALUES
    ('admin', 'admin@gmail.com', 'admin', '${md5("123")}'),
    ('meg', 'meg@gmail.com', 'editor', '${md5("123")}'),
    ('bill', 'bill@gmail.com', 'user', '${md5("123")}')
    `;
  connection.query(sql, function (err) {
    if (err) throw err;
    console.log("Users were created.");
  });
};

const seedOptionsTable = () => {
  const contacts = {
    phone: "123456789",
    email: "info.red@book",
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

const seedTypesTable = () => {
  const sql = `
        INSERT INTO types
        (title, description, icon)
        VALUES
        ('Upinis bebras', 'Lietuvoje bebrai nuo seno gyveno Nemuno baseine. Jų liekanų randama piliakalniuose, durpynuose. Bebrai šalyje buvo intensyviai medžiojami dėl mėsos (ypač uodegos), kailio ir sruoglių. 1555 m. švedų kronikininko Olaus Magnuso „Šiaurės tautų istorijoje“ rašoma, kad Lietuva buvusi pagrindinė bebrų kailių tiekėja Europoje. 1529 m. bebrų medžioklė buvo nustatyta Pirmajame Lietuvos statute: bebravietėse uždrausta lankytis pašaliniams.', 'fa-gem'),
        ('Barsukas urvinis', 'Paplitę visoje Lietuvoje, bet negausiai. 1997 metais užregistruota apie 2500 individų. Priešų barsukai turi nedaug – tai vilkai ir lūšys. Lietuvoje medžiojamas (leidžiama medžioti tik spalio-lapkričio mėn.). Kailis nėra ypač vertinamas.', 'fa-paper-plane'),
        ('Briedis miškinis', 'Vasarą gyvena lapuočių ir mišriuose miškuose, žiemą dažniausiai pušynuose. Veiklus ištisus metus. Briedis remiasi dviem pirštais, antros poros pirštų atspaudus galima rasti tik sniege, purioje, klampioje durpinėje dirvoje arba briedžiams šuoliuojant. Nors briedis stambus, tačiau labai judrus žvėris ir labai pasitikintis aplinkiniais, dėl to lengvai nušaunamas, ypač dabartinių gerai ginkluotų brakonierių. Žiemą briedžiai gyvena mišriais pulkais.', 'fa-gem')
    `;
  connection.query(sql, function (err) {
    if (err) throw err;
    console.log("Types table seeded");
  });
};

const seedPostsTable = () => {
  const sql = `
        INSERT INTO posts
        (title, preview, content, photo, is_top)
        VALUES
        ('Upinis bebras', 'Lietuvoje bebrai nuo seno gyveno Nemuno baseine.', 'Jų liekanų randama piliakalniuose, durpynuose. Bebrai šalyje buvo intensyviai medžiojami dėl mėsos (ypač uodegos), kailio ir sruoglių. 1555 m. švedų kronikininko Olaus Magnuso „Šiaurės tautų istorijoje“ rašoma, kad Lietuva buvusi pagrindinė bebrų kailių tiekėja Europoje. 1529 m. bebrų medžioklė buvo nustatyta Pirmajame Lietuvos statute: bebravietėse uždrausta lankytis pašaliniams. Lietuvoje bebrai nuo seno gyveno Nemuno baseine. Jų liekanų randama piliakalniuose, durpynuose. Bebrai šalyje buvo intensyviai medžiojami dėl mėsos (ypač uodegos), kailio ir sruoglių. 1555 m. švedų kronikininko Olaus Magnuso „Šiaurės tautų istorijoje“ rašoma, kad Lietuva buvusi pagrindinė bebrų kailių tiekėja Europoje. 1529 m. bebrų medžioklė buvo nustatyta Pirmajame Lietuvos statute: bebravietėse uždrausta lankytis pašaliniams.', null, false),
        ('Barsukas urvinis', 'Paplitę visoje Lietuvoje, bet negausiai. 1997 metais užregistruota apie 2500 individų.', 'Priešų barsukai turi nedaug – tai vilkai ir lūšys. Lietuvoje medžiojamas (leidžiama medžioti tik spalio-lapkričio mėn.). Kailis nėra ypač vertinamas. Paplitę visoje Lietuvoje, bet negausiai. 1997 metais užregistruota apie 2500 individų. Priešų barsukai turi nedaug – tai vilkai ir lūšys. Lietuvoje medžiojamas (leidžiama medžioti tik spalio-lapkričio mėn.). Kailis nėra ypač vertinamas.', null, false),
        ('Briedis miškinis', 'Vasarą gyvena lapuočių ir mišriuose miškuose, žiemą dažniausiai pušynuose.', 'Veiklus ištisus metus. Briedis remiasi dviem pirštais, antros poros pirštų atspaudus galima rasti tik sniege, purioje, klampioje durpinėje dirvoje arba briedžiams šuoliuojant. Nors briedis stambus, tačiau labai judrus žvėris ir labai pasitikintis aplinkiniais, dėl to lengvai nušaunamas, ypač dabartinių gerai ginkluotų brakonierių. Žiemą briedžiai gyvena mišriais pulkais. Vasarą gyvena lapuočių ir mišriuose miškuose, žiemą dažniausiai pušynuose. Veiklus ištisus metus. Briedis remiasi dviem pirštais, antros poros pirštų atspaudus galima rasti tik sniege, purioje, klampioje durpinėje dirvoje arba briedžiams šuoliuojant. Nors briedis stambus, tačiau labai judrus žvėris ir labai pasitikintis aplinkiniais, dėl to lengvai nušaunamas, ypač dabartinių gerai ginkluotų brakonierių. Žiemą briedžiai gyvena mišriais pulkais.', null, true)
    `;
  connection.query(sql, function (err) {
    if (err) throw err;
    console.log("Posts table seeded");
  });
};

dropUsersTable();
dropOptionsTable();
dropTypesTable();
dropPostsTable();
createUsersTable();
createOptionsTable();
createTypesTable();
createPostsTable();
seedUsersTable();
seedOptionsTable();
seedTypesTable();
seedPostsTable();

connection.end(function (err) {
  if (err) throw err;
  console.log("Connection closed");
});
