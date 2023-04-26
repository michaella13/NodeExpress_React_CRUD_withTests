
const express = require('express')
const router = express.Router()
const pool = require('../db')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()


router.post("/login", (req, res) => {

  const { username, password } = req.body

  pool.query("SELECT * from users where username = ?", [username])
    .then(result => {
      console.log("username and password " + username + " " + [password])
      const user = result[0];
      bcrypt.compare(password, user.password, (err, result) => {
        if (result === true) {
          const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET_KEY);

          res.header('Authorization', `Bearer ${token}`).json({ message: 'Login successful', token: `Bearer ${token}` });

        }
        else {
          res.status(401).json({ message: 'Invalid credentials' });
          console.log("password incorrect")
        }

      })

    })
    .catch(err => {
      res.status(404).send({ message: 'Username or password not correct', err })
    })
})

router.post("/signup", (req, res) => {
  const { username, email, password, termsAgreed } = req.body;
  bcrypt.hash(password, 10, (err, hash) => {
    if (err) throw err;
    pool
      .query(
        "INSERT INTO users (username, email, password, termsAgreed) VALUES (?, ?, ?, ?)",
        [username, email, hash, termsAgreed]
      )
      .then((result) => {
        res.status(201).send(`User added with id ${result.insertId}`);
      })
      .catch((error) => {
        console.log(error);
        res.status(500).send("Server error");
      });
  });
});

router.post("/checkUsername", (req, res) => {
  console.log("in backend check username")
  const { username } = req.body;
  console.log("console  username   " + username)
  pool.query("SELECT * from users where username = ?", [username])
    .then((result) => {
      if (result.length > 0) {
        res.status(400).send({ message: "Username already exists" });
      } else {
        res.status(200).send({ message: "Username available" });
      }
    })
    .catch((err) => {
      res.status(500).send({ message: "Internal server error" });
    });
});






module.exports = router;
