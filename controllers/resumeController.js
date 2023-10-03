const sqlite = require('sqlite3').verbose();


const db = new sqlite.Database("./database.db", sqlite.OPEN_READWRITE, err => err && console.log(err));

// CREATE RESUME
const createResume = async (req, res) => {
    try {
        const { 
            user_id,
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
            profile_image 
        } = req.body;

        db.get(`SELECT * FROM resumies WHERE user_id = ${req.user.id}`, (err, user) => {
            if(err) throw err;
            if(user){
                return res.status(409).send('You Already Have Resume');
            }else{
                sql = 'INSERT INTO resumies(user_id, name, email, whats_app, linked_in, phone, profession, state, address, bio, insitute, college, profile_image, resume_link, rating) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)'
                db.run(sql, [user_id,
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
                    null,
                    0
                ], err => {
                    if(err) throw err
                    res.json({id:Date.now(), ...req.body});
                })
            }
        })
    } catch (error) {
        res.send('Error')
     console.log(error)   
    }
}

// GET ALL RESUMEIS
const getSingleResume = (req, res) => {
    try{
        db.get(`SELECT * FROM resumies WHERE user_id = ${req.query.resume_id}`, (err, resume) => {
            if(err) throw err;
            if(resume){
                res.json({isFound:true})
            }else{
                res.status(404).json({isFound:false})
            }
        })
    }catch(error){
        console.log(error)
    }
}

// GET ALL RESUMEIS
const getAllResumiesController = (req, res) => {
    try{
        db.all('SELECT * FROM resumies', [], (err, rows) => {
            if(err) throw err;
            res.json(rows)
        })

    }catch(error){
        console.log(error)
    }
}


module.exports = { createResume, getSingleResume, getAllResumiesController }