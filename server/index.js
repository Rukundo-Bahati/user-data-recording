const express = require("express");
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const debug = require('debug')('data');
const users = require('./controllers/users');
const auth = require('./controllers/auth');
const connection = require("./db");
connection;
const app = express();

//middlewares
app.use(cors())
app.use(cookieParser())
app.use(bodyParser.json())
app.use('/api/users', users)
app.use('/api/auth', auth)

const PORT = process.env.PORT || 4430;
app.listen(PORT, () => debug(`Server is running on port ${PORT}`));
