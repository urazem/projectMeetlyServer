const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const router = express.Router();
const port = process.env.PORT || 8080;
app.use(bodyParser.json());
const connection = require('./db/db_config');
var databaseOptions = require('./db/db_config');
function handleDisconnect(conn) {
  conn.on('error', function(err) {
    if (!err.fatal) {
      return;
    }
    if (err.code !== 'PROTOCOL_CONNECTION_LOST') {
      throw err;
    }
    console.log('Re-connecting lost connection: ' + err.stack);
    connection2 = mysql.createConnection(databaseOptions);
    handleDisconnect(connection2);
    connection2.connect();
  });
}
setInterval(function() {handleDisconnect(connection);}, 60000);

app.get('/', function (req, res) {
  res.status(200).send('API works.');
});
 var AuthController = require('./auth/authController.js');
  app.use('/api/auth', AuthController);
var MeetController = require('./meets/meetController');
app.use ('/api/meets', MeetController);

app.listen(port);
console.log(`App Runs on ${port}`);
