const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const usersRoute = require('./roues/users');
const loginRoute = require('./roues/auth');
const app = express();

app.use(bodyParser.json());
app.use(cors({origin: ['http://localhost:3000', 'https://hope4child.onrender.com'], methods: ["GET", "POST"], credentials: true }));
app.use(cookieParser())

app.use(express.static('public'));

app.use('/auth', loginRoute);
app.use('/users', usersRoute);

const PORT = process.env.PORT || 3001

app.listen(PORT, () => console.log(`running on ${PORT}`));

