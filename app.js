const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const router = express.Router();
const port = process.env.PORT || 8080;
global.__root = __dirname + '/';
app.use(bodyParser.json());
// app.use(logger('dev'));
app.get('/', function (req, res) {
  res.status(200).send('API works.');
});
 var AuthController = require('./auth/authController.js');
  app.use('/api/auth', AuthController);
var MeetController = require('./meets/meetController');


app.use ('/api/meets', MeetController);

app.listen(port);

console.log(`App Runs on ${port}`);
