const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const childrenRoute = require('./roues/children')
const app = express();

app.use(bodyParser.json());
app.use(cors({origin: ['http://localhost:3000', 'https://hope4child.onrender.com'], methods: ["GET", "POST"], credentials: true }));
app.use(cookieParser())

app.use(express.static('public'));

app.use('/children', childrenRoute)

const PORT = process.env.PORT || 3001

app.listen(PORT, () => console.log(`running on ${PORT}`));

