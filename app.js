const express    = require('express');
const app        = express();
const bodyParser = require('body-parser');
const router 	   = express.Router();
const port 	   = process.env.PORT || 8080;
app.use(bodyParser.json());
//app.use(logger('dev'));
var AuthController = require('./auth/authController');
var MeetController = require('./meets/meetController');

app.use('/api/auth', AuthController);
app.use('/api/meets', MeetController);

app.listen(port);

console.log(`App Runs on ${port}`);
