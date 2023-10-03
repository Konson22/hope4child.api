
const sqlite = require('sqlite3').verbose();

const db = new sqlite.Database("./database.db", sqlite.OPEN_READWRITE, err => err && console.log(err));

// const userSql = `CREATE TABLE users (
//     id INTEGER PRIMARY KEY,
//     name TEXT NOT NULL,
//     email TEXT UNIQUE NOT NULL,
//     password TEXT NOT NULL,
//     profile_image TEXT
// )`

// const freelancerSql = `CREATE TABLE freelancers (
//     id INTEGER PRIMARY KEY,
//     user_id INTEGER,
//     name TEXT NOT NULL,
//     profession TEXT,
//     state TEXT,
//     address TEXT,
//     bio TEXT,
//     institute TEXT,
//     college TEXT,
//     profile_image TEXT,
//     resume_link TEXT,
//     FOREIGN KEY (user_id) REFERENCES users(id)
// )`

// const sql = 'CREATE TABLE users(id INTEGER PRIMARY KEY, name, email, password, profile_image)';
const sql = `CREATE TABLE resumies(
    id INTEGER PRIMARY KEY, 
    user_id INTEGER,
    name, 
    email,
    whats_app,
    linked_in,
    phone,
    profession, 
    state, 
    address, 
    bio, 
    insitute, 
    college, 
    profile_image, 
    resume_link,
    rating,
    FOREIGN KEY (user_id) REFERENCES showcase(id)
)`;

db.run(sql)
