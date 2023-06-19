const sqlite = require('sqlite3').verbose();

const db = new sqlite.Database("./database.db", sqlite.OPEN_READWRITE, err => err && console.log(err));
let sql;


const getAllChildrenController = (req, res) => {
    try{
        db.all('SELECT * FROM children', [], (err, rows) => {
            if(err) throw err;
            res.json(rows)
        })

    }catch(error){
        console.log(error)
    }
}



const registerChild = (req, res) => {
    try {
        const { name, gender, age, state, address, bio, parent_contact } = req.body;
        sql = 'INSERT INTO children(name, gender, age, state, address, bio, parent_contact, image) VALUES(?,?,?,?,?,?,?,?)'
        db.run(sql, [name, gender, age, state, address, bio, parent_contact, `/uploads/${req.image}`], err => {
            if(err) throw err
            res.json({_id:'', name, gender, age, state, address, bio, parent_contact, image:`/uploads/${req.image}`})
        })
    } catch (error) {
     console.log(error)   
    }
}


module.exports = { getAllChildrenController, registerChild }

// const childrenData = [
//     {
//         name:'Jada Marko',
//         gender:'male',
//         age:14,
//         state:'Juba',
//         address:'New site, near bilpam',
//         bio:'progress, street children are at risk of being left behind. The numerous societal, practical and health barriers street children face means they are among the millions of the world’s hardest-to-reach',
//         parent_contact:'0925658564',
//         image:'/images/child-1.jpg'
//     },
//     {
//         name:'James Dut',
//         gender:'male',
//         age:4,
//         state:'Juba',
//         address:'Gudele block 2',
//         bio:'progress, street children are at risk of being left behind. The numerous societal, practical and health barriers street children face means they are among the millions of the world’s hardest-to-reach',
//         parent_contact:'0925658564',
//         image:'/images/child-7.jpg'
//     },
//     {
//         name:'Sarah Ali',
//         gender:'fe-male',
//         age:8,
//         state:'Juba',
//         address:'Gumbo, next to Bus station',
//         bio:'progress, street children are at risk of being left behind. The numerous societal, practical and health barriers street children face means they are among the millions of the world’s hardest-to-reach children who are unable to attend',
//         parent_contact:'0925658564',
//         image:'/images/child-2.jpg'
//     },
//     {
//         name:'Aliza Musa',
//         gender:'female',
//         state:'Malakal',
//         address:'Suk Zero',
//         bio:'progress, street children are at risk of being left behind. The numerous societal, practical and health barriers street children face means they are among the millions of the world’s hardest-to-reach',
//         parent_contact:'0925658564',
//         image:'/images/child-4.jpg'
//     },
//     {
//         name:'Samuel Ladu',
//         gender:'male',
//         age:12,
//         state:'Wau',
//         address:'Gumbo, next to Bus station',
//         bio:'progress, street children are at risk of being left behind. The numerous societal, practical and health barriers street children face means they are among the millions of the world’s hardest-to-reach children who are unable to attend',
//         parent_contact:'0925658564',
//         image:'/images/child-5.jpg'
//     },
//     {
//         name:'Santion Bulis',
//         gender:'male',
//         age:12,
//         state:'Wau',
//         address:'Gumbo, next to Bus station',
//         bio:'progress, street children are at risk of being left behind. The numerous societal, practical and health barriers street children face means they are among the millions of the world’s hardest-to-reach children who are unable to attend',
//         parent_contact:'0925658564',
//         image:'/images/child-6.jpg'
//     },
// ]


// childrenData.forEach(child => {
//     const { name, gender, age, state, address, bio, parent_contact, image } = child;
//     sql = 'INSERT INTO children(name, gender, age, state, address, bio, parent_contact, image) VALUES(?,?,?,?,?,?,?,?)'
//     db.run(sql, [name, gender, age, state, address, bio, parent_contact, image], err => {
//         if(err) throw err
//     })
// })
