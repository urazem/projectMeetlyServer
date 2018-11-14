const mysql = require('mysql');
const connection = mysql.createPool({
    connectionLimit: 100000,
    host: 'us-cdbr-iron-east-01.cleardb.net',
    user: 'b8aba776cda548',
    password: '13e72bdc',
    database: 'heroku_5bcdde692c5189d',
});
connection.getConnection( (err, tempCon) => {
    if(err){
        throw err;
    }
    else
    console.log("Database is connected successfully");
    tempCon.release();
});
module.exports = connection;
