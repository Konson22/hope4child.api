const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const usersRoute = require('./roues/users');
const app = express();

app.use(bodyParser.json());
app.use(cors({origin: ['https://skillfinder-a9cp.onrender.com/', 'http://localhost:3000'], methods: ["GET", "POST"], credentials: true }));
app.use(cookieParser())

app.use(express.static('public'));


app.use('/users', usersRoute);

const PORT = process.env.PORT || 3001

app.listen(PORT, () => console.log(`running on ${PORT}`));

