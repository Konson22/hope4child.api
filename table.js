
const sqlite = require('sqlite3').verbose();

const db = new sqlite.Database("./database.db", sqlite.OPEN_READWRITE, err => err && console.log(err));

const sql = 'CREATE TABLE users(id INTEGER PRIMARY KEY, name, email, password, image)';

db.run(sql)
