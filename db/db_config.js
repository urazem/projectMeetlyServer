const mysql = require('mysql');
const connection = mysql.createPool({
    connectionLimit: 100000,
    host: 'localhost',
    user: 'root',
    password: 'flyra2012gou',
    database: 'meetly_db',
});
connection.getConnection( (err, tempCon) => {
    tempCon.release();
    if(err){
        throw err;
    }
    else
    console.log("Database is connected successfully");
});
module.exports = connection;
