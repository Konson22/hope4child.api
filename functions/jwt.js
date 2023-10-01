const jwt = require('jsonwebtoken');


const createToken = (user) => {
    const ACCESS_TOKEN = jwt.sign(user, process.env.SECRET_KEY, {
        expiresIn:5000
    });

    return ACCESS_TOKEN
}


const verfiyToken = (token) => {
    return jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
        if(err){
            return res.status(409).send('invalid token');
        } 
        return user
    })
}

module.exports = { createToken, verfiyToken }