const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const nodemailer = require('nodemailer');

const usersRoute = require('./roues/users');
const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(cookieParser())

app.use(express.static('public'));


function sendMail(){
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        host: 'smtp.gmail.com',
        port: 2525,
        secure: true,
        auth:{
            user:'konifytech@gmail.com',
            pass:'konsonak'
        },
        tls:{
            rejectUnauthorized:false
        }
    });

    const mailOptions = {
        from:'konakech3@gmail.com',
        to:'Kon <konakech3@gmail.com>',
        subject:'Testing nodemailer!',
        text:'Hiii there'
    }

    transporter.sendMail(mailOptions, (err, info) => {
        if(err){
            console.log(err)
        }else{
            console.log(info)
        }
    })
}

// sendMail()

app.use('/users', usersRoute);

const PORT = process.env.PORT || 3001

app.listen(PORT, () => console.log(`running on ${PORT}`));

