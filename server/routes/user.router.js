const express = require('express');
const pool = require('../modules/pool');

const router = express.Router();

// return all users
router.get('/all/users', (req, res) => {
  console.log("in server all users GET");
  const queryText = `SELECT * FROM "users" ORDER BY "id" ASC;`;
  pool.query(queryText)
      .then( (result) => {
          res.send(result.rows);
      })
      .catch( (error) => {
          console.log(`Error on GET all users query ${error}`);
          res.sendStatus(500);
      });
});

// return this user
router.get('/this/users/:id', (req, res) => {
  console.log("in server GET this user", req.params.id);
  const queryText = `SELECT * FROM "users" WHERE "id"=$1;`;
  pool.query(queryText, [Number(req.params.id)])
      .then( (result) => {
          res.send(result.rows);
      })
      .catch( (error) => {
          console.log(`Error on GET this user query ${error}`);
          res.sendStatus(500);
      });
});

// register new user 
router.post('/new/user', (req, res) => {
  console.log("in server new user POST with: ", req.body);
  const newUser = req.body;
  const queryText = `INSERT INTO "users" ("alias", "password", "firstname", "lastname", "email", "location")
                    VALUES ($1, $2, $3, $4, $5, $6);`;
  const queryValues = [
    newUser.alias,
    newUser.password,
    newUser.firstname,
    newUser.lastname,
    newUser.email,
    newUser.location,
  ];
  pool.query(queryText, queryValues)
    .then(() => { res.sendStatus(201); })
    .catch((err) => {
      console.log('Error completing POST new user query', err);
      res.sendStatus(500);
    });
});

// delete account
router.delete('/delete/account/:id', (req, res) => {
  console.log("in account delete with: ", req.params.id);
  const queryText = `DELETE FROM "users" WHERE "id"=$1;`;
  pool.query(queryText, [req.params.id])
  .then(() => {
    res.sendStatus(200);
  }).catch(err => {
      console.log("Error deleting user account", err);
      res.sendStatus(500);
    });
});

// add user bio
router.put('/:id', (req, res) => {
  console.log('IN BIO PUT WITH:', req.body, req.params);
  const queryText = `UPDATE "users" SET "bio" = $1 WHERE "id"=$2;`;
  pool.query(queryText, [req.body.bio, Number(req.params.id)])
    .then(() => {
      res.sendStatus(200);
    })
    .catch(err => {
      console.log("Error adding user bio PUT", err);
      res.sendStatus(500);
    });
})

module.exports = router;
