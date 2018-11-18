var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
var jwt = require('jsonwebtoken');
const config = require('../config');
const connection = require('./../db/db_config');
var VerifyToken = require('./verifyToken');

var code;


router.post('/authenticate', function(req, res) {
  let telephone = req.body.telephone;
  if(telephone) {
    let sql = "SELECT * FROM users WHERE telephone = '"+telephone+"' ";
    connection.query(sql, (error, result) => {
        if(error) {
          //console.log(error);
          res.status(500).json({message: "Invalid Request"});
        }
        else if(result.length > 0) {
          res.status(200).json ({auth: true, message: "343631"});
        }
        else {
          res.status(200).json({auth: false, message: "343631"});
        }
    });
  } else {
    res.status(200).json ({message: "Telephone is not valid"});
  }
});

router.post('/registerConfirmSms', function(req, res) {
  let code = req.body.code;
  let telephone = req.body.telephone;
  if(code == "343631") {
    let sql = "INSERT INTO users (telephone) VALUES  ('"+telephone+"') ";
    connection.query(sql, (error, result) => {
        if(error) {
          //console.log(error);
           res.status(500).json({message:"There was a problem registering the user." });
        }
        connection.query ("SELECT * from users WHERE telephone = '" +telephone+ "'", (err, user) => {
            if (err) return res.status(500).json({message: "Error on the server."});
            else {
              var token = jwt.sign({ id: result.insertId }, config.secret, {
                expiresIn: 86400 // expires in 24 hours
              });
              res.status(200).json({ auth: true, token: token, id: result.insertId, message: "User successfully registered. " });
            }
        });

    });
  } else {
    res.status(500).json({message: "Wrong code"});
  }
});

router.post('/loginConfirmSms', function(req, res) {
  let code = req.body.code;
  let telephone = req.body.telephone;
  var userId;
  if(code != "343631") return res.status(401).send({ auth: false, token: null, message: "Wrong code" });
  connection.query ("SELECT user_id from users WHERE telephone = '" +telephone+ "'", (err, user) => {
      if (err) return res.status(500).json({message: "Error on the server."});
      else {
        userId = user[0].user_id;
        console.log(userId);
  var token = jwt.sign({ id: userId }, config.secret, {
    expiresIn: 86400 // expires in 24 hours
  });
  res.status(200).send({ auth: true, token: token, id: userId, message: "Login successfully. " });
}


});
});

router.post('/add_register', function(req, res) {
  let name = req.body.name;
  let surname = req.body.surname;
  let photo = req.body.photo;
  let id = req.body.user_id;
  let sql = "UPDATE `users` SET name = '"+name+"', surname =  '"+surname+"', photo = '"+photo+"' WHERE user_id = '"+id+"' ";
  connection.query(sql, (error, result) => {
      if(error) {
        console.log(error);
         res.status(500).json({message: "There was a problem with making request."});
      }
      res.status(200).json({ message: "Information successfully added."});
  });
});



// router.put('/updateProfile', (req, res) => {
//     let name = req.body.name;
//     let surname = req.body.surname;
//     let telephone = req.body.telephone;
//     let photo = req.body.photo;
//     let id = req.body.user_id;
//
//     let sql = ""
// });

router.get('/logout', function(req, res) {
  res.status(200).json({ auth: false, token: null });
});

router.get('/getProfile', VerifyToken, function(req, res) {
  let id = req.userId;
  console.log("sdsd " + id);
  let sql = "SELECT user_id, name, surname, telephone from users WHERE user_id = '"+id+"' ";
  connection.query(sql, (error, result) => {
    if (error) return res.status(500).json({message: "There was a problem finding the user."});
    if (!result) return res.status(404).json({message: "No user found."});
    res.status(200).send(result[0]);

  });
});

module.exports = router;
