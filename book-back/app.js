const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const mysql = require("mysql");
const { v4: uuidv4 } = require("uuid");
// const fs = require('node:fs');
const md5 = require("md5");
const app = express();
const port = 3001;

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(cookieParser());
// app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "book",
});

connection.connect();

app.get("/admin/users", (req, res) => {
  const sql = `
        SELECT *
        FROM users`;

  connection.query(sql, (err, rows) => {
    if (err) throw err;
    res
      .json({
        users: rows,
      })
      .end();
  });
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  const session = uuidv4();

  const sql = `
            UPDATE users
            SET session = ?
            WHERE email = ? AND password = ?
        `;

  connection.query(sql, [session, email, md5(password)], (err, result) => {
    if (err) throw err;
    const logged = result.affectedRows;
    if (!logged) {
      res
        .status(401)
        .json({
          message: {
            type: "error",
            title: "Prisijungimas nepavyko",
            text: `Neteisingi prisijungimo duomenys`,
          },
        })
        .end();
      return;
    }
    const sql = `
            SELECT id, name, email, role
            FROM users
            WHERE email = ? AND password = ?
        `;
    connection.query(sql, [email, md5(password)], (err, rows) => {
      if (err) throw err;
      res.cookie("book-session", session, {
        maxAge: 1000 * 60 * 60 * 24,
        httpOnly: true,
      });
      res
        .json({
          message: {
            type: "success",
            title: `Sveiki, ${rows?.[0]?.name}!`,
            text: `Jūs sėkmingai prisijungėte`,
          },
          session,
          user: rows?.[0],
        })
        .end();
    });
  });
});

app.post("/register", (req, res) => {
  const { name, email, password } = req.body;

  if (!/\S+@\S+\.\S+/.test(email)) {
    res
      .status(422)
      .json({
        message: "Form has errors",
        errorsBag: {
          email: "Email is not correct",
        },
      })
      .end();
    return;
  }

  const sql = `
    SELECT email
    FROM users
    WHERE email = ?
    `;

  connection.query(sql, [email], (err, rows) => {
    if (err) throw err;
    if (rows.length) {
      res
        .status(422)
        .json({
          message: "Form has errors",
          errorsBag: {
            email: "Email already exist",
          },
        })
        .end();
    } else {
      const sql = `
            INSERT INTO users (name, email, password)
            VALUES ( ?, ?, ? )
            `;
      connection.query(sql, [name, email, md5(password)], (err) => {
        if (err) throw err;
        res.status(201).json({
          message: {
            type: "success",
            title: `Hello, ${name}`,
            text: `Successfully register. ${name}`,
          },
        }).end;
      });
    }
  });
});

app.delete("/admin/delete/user/:id", (req, res) => {
  const { id } = req.params;

  setTimeout((_) => {
    const sql = `
        DELETE
        FROM users
        WHERE id = ? AND role != 'admin'
        `;

    connection.query(sql, [id], (err, result) => {
      if (err) throw err;
      const deleted = result.affectedRows;
      if (!deleted) {
        res
          .status(422)
          .json({
            message: {
              type: "info",
              title: "Users",
              text: `User is admin or user do not exist.`,
            },
          })
          .end();
        return;
      }
      res
        .json({
          message: {
            type: "success",
            title: "Users",
            text: `User was deleted.`,
          },
        })
        .end();
    });
  }, 1500);
});

app.get("/admin/edit/user/:id", (req, res) => {
  setTimeout((_) => {
    const { id } = req.params;
    const sql = `
       SELECT id, name, email, role
       FROM users 
       WHERE id = ?
        `;

    connection.query(sql, [id], (err, rows) => {
      if (err) throw err;
      if (!rows.length) {
        res
          .status(404)
          .json({
            message: {
              type: "info",
              title: "Users",
              text: `User does not exit`,
            },
          })
          .end();
        return;
      }
      res
        .json({
          user: rows[0],
        })
        .end();
    });
  }, 1500);
});

app.put("/admin/update/user/:id", (req, res) => {
  setTimeout((_) => {
    const { id } = req.params;
    const { name, email, role, password } = req.body;

    if (!password) {
      const sql = `
            UPDATE users
            SET name = ?, email = ?, role = ?
            WHERE id = ?
            `;

      connection.query(sql, [name, email, role, id], (err, result) => {
        if (err) throw err;
        const updated = result.affectedRows;
        if (!updated) {
          res
            .status(404)
            .json({
              message: {
                type: "info",
                title: "Users",
                text: `User does not exist`,
              },
            })
            .end();
          return;
        }
        res
          .json({
            message: {
              type: "success",
              title: "Users",
              text: `User was updated.`,
            },
          })
          .end();
      });
    } else {
      const sql = `
                UPDATE users
                SET name = ?, email = ?, role = ?, password = ?
                WHERE id = ?
                `;

      connection.query(
        sql,
        [name, email, role, md5(password), id],
        (err, result) => {
          if (err) throw err;
          const updated = result.affectedRows;
          if (!updated) {
            res
              .status(404)
              .json({
                message: {
                  type: "info",
                  title: "Users",
                  text: `User does not exist`,
                },
              })
              .end();
            return;
          }
          res
            .json({
              message: {
                type: "success",
                title: "Users",
                text: `User was updated.`,
              },
            })
            .end();
        }
      );
    }
  }, 1500);
});

app.listen(port, () => {
  console.log(`Books app listening on port ${port}`);
});
