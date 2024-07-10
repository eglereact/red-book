const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const mysql = require("mysql");
// const { v4: uuidv4 } = require('uuid');
// const fs = require('node:fs');
const md5 = require("md5");
const app = express();
const port = 3001;

app.use(cors());
app.use(cookieParser());
// app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post("/register", (req, res) => {
  const { email } = req.body;

  if (!/\S+@\S+\.\S+/.test(email)) {
    res
      .status(422)
      .json({
        message: "There are mistakes in form.",
        errors: {
          errors: "Email is not correct",
        },
      })
      .end();
  }

  res.status(422).json({
    message: "Everything is bad.",
  });
});

app.listen(port, (_) => {
  console.log(`Books app listening on port ${port}`);
});
