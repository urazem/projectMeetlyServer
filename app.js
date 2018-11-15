const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const router = express.Router();
const port = process.env.PORT || 8080;
global.__root = __dirname + '/';
app.use(bodyParser.json());
//app.use(logger('dev'));
app.get('/', function (req, res) {
  res.status(200).send('API works.');
});
 var AuthController = require(__root + 'auth/AuthController.js');
  app.use('/api/auth', AuthController);
// var MeetController = require(__root + 'meets/MeetController');


// app.use ('/api/meets', MeetController);

app.listen(port);

console.log(`App Runs on ${port}`);
