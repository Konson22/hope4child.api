const sqlite = require('sqlite3').verbose();
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();


const db = new sqlite.Database("./database.db", sqlite.OPEN_READWRITE, err => err && console.log(err));
let sql;


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
        const { email, password} = req.body;
        db.get(`SELECT * FROM users WHERE email='${email}'`, async (err, user) => {
            if(err) throw err;
            if(!user) return res.status(404).send('Not registered!')
            const verified = await bcryptjs.compare(password, user.password)
            if(!verified){
                return res.status(409).send('Wrong Password!')
            }
            const ACCESS_TOKEN = await jwt.sign({id:user.id, name:user.name, image:user.image}, process.env.SECRET_KEY);
            res.json({
                user:{id:user.id, name:user.name, image:user.image},
                ACCESS_TOKEN
            })
        })
    } catch (error) {
        console.log(error)
    }
}


const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        db.get(`SELECT * FROM users WHERE email='${email}'`, async (err, user) => {
            if(err) throw err;
            if(user){
                res.status(409).send('Already registered!')
            }else{
                const hashPass = await bcryptjs.hash(password, 4)
                sql = 'INSERT INTO users(name, email, password, image) VALUES(?,?,?,?)'
                db.run(sql, [name, email, hashPass, `/uploads/Image.png`], err => {
                    if(err) throw err
                    res.json({id:1, name, image:`/uploads/Image.png`});
                })
            }
        })
    } catch (error) {
     console.log(error)   
    }
}

module.exports = { verfiyToken, loginUser, registerUser }