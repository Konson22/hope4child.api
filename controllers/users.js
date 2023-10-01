const sqlite = require('sqlite3').verbose();
const bcryptjs = require('bcryptjs');
const { createToken } = require('../functions/jwt');
const jwt = require('jsonwebtoken');
require('dotenv').config();


const db = new sqlite.Database("./database.db", sqlite.OPEN_READWRITE, err => err && console.log(err));


const verfiyToken = async (req, res) => {
    const authorization = req.headers.authorization;

    if(authorization){
        const token = authorization.split(' ')[1]
        try {
            jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
                if(err){
                    return res.status(409).send('invalid token');
                } 
                res.json({user});
            })
        } catch (error) {
            res.status(500).send('Internal Server Error');
        }
    }
}


const loginUser = (req, res) => {
    try {
        const { email, password } = req.body;
        db.get(`SELECT * FROM users WHERE email='${email}'`, async (err, user) => {
            if(err) throw err;
            if(!user) return res.status(404).send('Not registered!')
            const verified = await bcryptjs.compare(password, user.password)
            if(!verified){
                return res.status(409).send('Wrong Password!')
            }
            const ACCESS_TOKEN = await createToken({id:user.id, name:user.name, profile_image:user.profile_image});
            res.json({
                user:{id:user.id, name:user.name, profile_image:user.profile_image},
                ACCESS_TOKEN
            })
        })
    } catch (error) {
        console.log(error)
    }
}

// RESGISTER NEW USER
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        db.get(`SELECT * FROM users WHERE email='${email}'`, async (err, user) => {
            if(err) throw err;
            if(user){
                res.status(409).send('Already registered!')
            }else{
                const hashPass = await bcryptjs.hash(password, 4)
                sql = 'INSERT INTO users(name, email, password, profile_image) VALUES(?,?,?,?)'
                db.run(sql, [name, email, hashPass, `/user.png`], err => {
                    if(err) throw err
                    res.json({id:1, name, profile_image:`/user.png`});
                })
            }
        })
    } catch (error) {
        res.send('Error')
     console.log(error)   
    }
}

const getAllUsersController = (req, res) => {
    try{
        db.all('SELECT * FROM users', [], (err, rows) => {
            if(err) throw err;
            res.json(rows)
        })

    }catch(error){
        console.log(error)
    }
}

// GET ALL RESUMEIS
const getFreelancersController = (req, res) => {
    try{
        db.all('SELECT * FROM freelancers', [], (err, rows) => {
            if(err) throw err;
            res.json(rows)
        })

    }catch(error){
        console.log(error)
    }
}

// CREATE RESUME
const createResume = async (req, res) => {
    try {
        const { name, profession, state, address, bio, insitute, college, start_year, end_year, profile_image } = req.body;
        sql = 'INSERT INTO freelancers(name, profession, state, address, bio, insitute, college, start_year, end_year, profile_image, resume_link) VALUES(?,?,?,?,?,?,?,?,?,?,?)'
        db.run(sql, [name, profession, state, address, bio, insitute, college, start_year, end_year, profile_image, null], err => {
            if(err) throw err
            res.json({message:'done'});
        })
    } catch (error) {
        res.send('Error')
     console.log(error)   
    }
}


module.exports = { 
    getAllUsersController, 
    getFreelancersController, 
    registerUser, 
    createResume,
    verfiyToken,
    loginUser
}
