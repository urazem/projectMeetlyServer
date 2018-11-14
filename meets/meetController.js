var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
//var jwt = require('jsonwebtoken');
//const config = require('../config');
const connection = require('./../db/db_config');
//var VerifyToken = require('./verifyToken');

router.get('/getPlaces', (req, res) => {
    let sql = "SELECT * FROM places LIMIT 5";
    connection.query(sql, (err, result) => {
        if(err) res.status(500).json({message: "Invalid Request"});
        res.status(200).json(result);
    });
});

// router.delete('/deleteAllMeets', (req, res) => {
//   let id = req.body.user_id;
//     let sql = "DELETE from participants WHERE user_id = '"+id+"'";
//     connection.query(sql, (err, result) => {
//       if(err) res.status(500).json({message: "Invalid Request"});
//       res.status(200).json({message: "Meets successfully deleted."});
//     });
// });

router.post('/anotherPlace', (req, res) => {
    let name = req.body.name || null;
    let photo = req.body.photo || null;
    let adress = req.body.adress || null;
    let description = req.body.description || null;
    let sql = "INSERT INTO places (name, photo, adress, description) VALUES ('"+name+"', '"+photo+"', '"+adress+"', '"+description+"')";
    connection.query(sql, (err, result) => {
        if(err) res.status(500).json({message: "Invalid Request"});
        res.status(200).json({message: "Place successfully added."});
    });
});
router.get('/getMeets', (req, res) => {
  let id = req.body.user_id;
  let sql = "SELECT meet_id FROM participants WHERE user_id = '"+15+"'";
  var meet_ids;
  let meets = [];
  connection.query(sql, (err, result) => {
      if(err) res.status(500).json({message: "Invalid Request"});
      meet_ids = JSON.parse(JSON.stringify(result));
      let sql = "SELECT * FROM meets WHERE meet_id = ?";
      for(var i=0; i < meet_ids.length; i++) {
        connection.query(sql, meet_ids[i].meet_id, (err, result) => {
            if(err) console.log(err);
            console.log(result);
            meets.push(JSON.parse(JSON.stringify(result)));
        });
      }
  });
  function func () {
  res.status(200).json(meets);
  }
    setTimeout(func, 1000);
});
router.post('/createMeet', (req, res) => {
  let name = req.body.name;
  let date = req.body.date;
  let time = req.body.time;
  let description = req.body.description;
  let photo = req.body.photo;
  let place = req.body.place_id;
  let participant = req.body.user_array;
  let user = req.body.user_id;
  let inserted_id;
  let sql = "INSERT into meets (name, date, time, description, photo, place_id) VALUES ('"+name+"', '"+date+"', '"+time+"', '"+description+"', '"+photo+"', '"+place+"')";
  connection.query(sql, (err, result) => {
      if(err) {
        //console.log(error);
          res.status(500).json({message: "Invalid Request"});
      } else {
        inserted_id = result.insertId;
        participant.push(user);
        let sql2 = "INSERT into `participants` (user_id, meet_id, isAdmin) VALUES (?,?,?)";
        let post;
        for(var i=0; i < participant.length; i++) {
          if(i == (participant.length -1)) {
            post = [participant[i], inserted_id, 1];
          } else post = [participant[i], inserted_id, 0];
          connection.query(sql2, post, (error, result) => {
              if(error)  console.log(error);
          });
      }
      res.status(200).json({message: "Meet successfully created."});
    }
  });

});
module.exports = router;
