const sqlite = require('sqlite3').verbose();
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { createToken } = require('../midlewares/jwt');
require('dotenv').config();


const db = new sqlite.Database("./database.db", sqlite.OPEN_READWRITE, err => err && console.log(err));


const authUser = async (req, res) => {
    try{
        res.json(req.user)
    }catch(error){
        res.status(404).send(error)
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
            const userCredentials = {id:user.id, name:user.name, profile_image:user.profile_image}
            const ACCESS_TOKEN = await createToken(userCredentials);
            res.cookie('ACCESS_TOKEN', ACCESS_TOKEN, {
                expires: new Date(Date.now() + (3600 * 1000 * 24 * 180 * 1)),
                httpOnly: true,
                sameSite: "none",
                secure: 'false',
            });
            res.json({
                user:userCredentials,
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
                db.run(sql, [name, email, hashPass, 'https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_640.png'], err => {
                    if(err) throw err
                    res.json({id:1, name, profile_image:'https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_640.png'});
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
    authUser,
    loginUser
}
