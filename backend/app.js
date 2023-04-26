//to load env varibales from .env to process.env
require('dotenv').config()
var bodyParser = require('body-parser')
const express = require('express')
var app = express();
const cors = require('cors')
const apiRoutes = require('./routes')
const auth = require('./auth/auth');
const authenticateToken = require('./auth/authToken');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors())
// app.use(cors({ origin: 'http://localhost:3000' }));
//restrict who access it

app.use('/', auth)
app.use('/students', authenticateToken, apiRoutes)



const port = process.env.PORT
app.listen(port, () => console.log(`listening on port ${port}....`));