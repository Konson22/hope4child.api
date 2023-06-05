
const sqlite = require('sqlite3').verbose();

const db = new sqlite.Database("./database.db", sqlite.OPEN_READWRITE, err => err && console.log(err));

const sql = 'CREATE TABLE children(id INTEGER PRIMARY KEY, name, gender, age, state, address, bio, parent_contact, image)';

db.run(sql)
