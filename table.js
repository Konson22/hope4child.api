
const sqlite = require('sqlite3').verbose();

const db = new sqlite.Database("./database.db", sqlite.OPEN_READWRITE, err => err && console.log(err));

const sql = 'CREATE TABLE users(id INTEGER PRIMARY KEY, name, email, password, profile_image)';
// const sql = 'CREATE TABLE freelancers(id INTEGER PRIMARY KEY, name, profession, state, address, bio, insitute, college, start_year, end_year, profile_image, resume_link)';

db.run(sql)
