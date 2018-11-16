const mysql = require('mysql');
const connection = mysql.createPool({
    connectionLimit: 10,
    host: 'sql12.freemysqlhosting.net',
    user: 'sql12265805',
    password: 'WWbnSjuJsk',
    database: 'sql12265805',
    port: '3306',
});
connection.getConnection( (err, tempCon) => {
    if(err){
        throw err;
    }
    if(tempCon) {
    console.log("Database is connected successfully");
    tempCon.release();
  }
  return;
});

// connectionLimit: 10,
// host: 'us-cdbr-iron-east-01.cleardb.net',
// user: 'b8aba776cda548',
// password: '13e72bdc',
// database: 'heroku_5bcdde692c5189d',
// port: '3306',
//
// var databaseOptions = {
//     host     : 'us-cdbr-iron-east-01.cleardb.net',
//     database : 'heroku_5bcdde692c5189d',
//     user     : 'b8aba776cda548',
//     password : '13e72bdc',
//     port     : '3306'
// };
// module.exports = {databaseOptions: databaseOptions} ;

// function handleDisconnect(conn) {
//   conn.on('error', function(err) {
//     if (!err.fatal) {
//       return;
//     }
//
//     if (err.code !== 'PROTOCOL_CONNECTION_LOST') {
//       throw err;
//     }
//
//     console.log('Re-connecting lost connection: ' + err.stack);
//
//     connection = mysql.createConnection(conn.config);
//     handleDisconnect(connection);
//     connection.connect();
//   });
// }

//handleDisconnect(connection);
module.exports = connection;
