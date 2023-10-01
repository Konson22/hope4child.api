const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();


// Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.get('send', (req, res) => {
        
    const output = `
    <p>You have a new contact request</p>
    <h3>Contact Details</h3>
    <ul>  
    <li>Name: Konson Ak</li>
    <li>Phone: 0920079070</li>
    </ul>
    <h3>Message</h3>
    <p>message...</p>
    `;

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port:  587,
    secure: false, // true for 465, false for other ports
    auth: {
    user: 'konifytech@gmail.com', // generated ethereal user
    pass: 'konsonak'  // generated ethereal password
    },
    tls:{
    rejectUnauthorized:false
    }
    });

    // setup email data with unicode symbols
    let mailOptions = {
    from: '"Nodemailer Contact" <konifytech@email.com>', // sender address
    to: 'konakech3@gmail.com', // list of receivers
    subject: 'Node Contact Request', // Subject line
    text: 'Hello world?', // plain text body
    html: output // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
    return console.log(error);
    }
    console.log('Message sent: %s', info.messageId);   
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

    });
})

app.listen(3001, () => console.log('Server started...'));