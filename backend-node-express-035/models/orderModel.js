const oracledb = require('oracledb');
const dbConfig = require('../config/dbconfig');

exports.getAllOrder = async() =>{
    let connection;
    try {
    connection = await oracledb.getConnection(dbConfig);
    const result = await connection.execute("SELECT * FROM USER_ORDER");
    return result.rows;
    } catch (error) {
        console.log(error);
    }
};


