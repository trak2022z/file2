//Using SQL in Node.js
'use strict';
const sqlite3 = require('sqlite3');
const sqlite = require('sqlite');

const express = require('express');
const app = express();

/**
* Establishes a database connection to the database and returns the database object.
* Any errors that occur should be caught in the function that calls this one.
* @returns {Object} - The database object for the connection.
*/

app.get('/name', async function(req, res) {
  try {
    let db = await getDBConnection();
    let query = 'SELECT name FROM menu ORDER BY name;';
    let names = await db.all(query);
    await db.close();
    console.log(names);
    res.json(names);
  } catch (err) {
    res.type('text');
    res.status(500).send('Something went wrong on the server.');
  }
});

async function getDBConnection() {
	const db = await sqlite.open({
	filename: 'db1.db', // replace this with your db file name
	driver: sqlite3.Database
});
return db;
}

const PORT = process.env.PORT || 8000;
app.listen(PORT);
