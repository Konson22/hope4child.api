const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    servie:'gmail',
    auth:{
        user:'konakech3@gmail.com',
        pass:'konsonak'
    }
});

const mailOptions = {
    from:'konakech3@gmail.com',
    to:'konakech3@gmail.com',
    subject:'Testing nodemailer!',
}

transporter.sendMail(mailOptions, (err, info) => {
    if(err){
        console.log(err)
    }else{
        console.log(info)
    }
})