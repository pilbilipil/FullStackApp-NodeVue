const oracledb = require('oracledb');
const dbConfig = require('../config/dbconfig');

exports.getAllUser = async () => {
    let connection;
    try {
        connection = await oracledb.getConnection(dbConfig);
        const result = await connection.execute("SELECT * FROM USER_INFO");
        return result.rows;
    } catch(error)
    {
      console.log(error);
    } finally {
      if (connection) {
        try {
          await connection.close();
        } catch (error) {
          console.error(error);
        }
      }
    } 
};

exports.createUser = async (req,res) => {
  if(req != null){   
  let connection;
  let body = req.body;
  try {
    connection = await oracledb.getConnection(dbConfig);
    const result = await connection.execute(
      "INSERT INTO USER_INFO(" +
        "ID, FIRST_NAME, LAST_NAME, EMAIL, PHONE, USER_PASSWORD, DATE_OF_BIRTH, GENDER, CITY, MICRODISTRICT, HOME, FLAT, CREATE_USER, UPDATE_USER, CREATE_TIME, UPDATE_TIME" +
      ") VALUES (" +
        "USER_SEQ.NEXTVAL, :FIRST_NAME, :LAST_NAME, :EMAIL, :PHONE, :USER_PASSWORD, TO_DATE(:DATE_OF_BIRTH, 'DD/MM/YYYY'), :GENDER, :CITY, :MICRODISTRICT, :HOME, :FLAT, 'USER', 'USER', TO_DATE(SYSDATE, 'DD/MM/YYYY'), TO_DATE(SYSDATE, 'DD/MM/YYYY')" +
      ")",
      {
        FIRST_NAME: body.firstName,
        LAST_NAME: body.lastName,
        EMAIL: body.email,
        PHONE: body.phone,
        USER_PASSWORD: body.userPassword,
        DATE_OF_BIRTH: body.dateOfBirth,
        GENDER: body.gender,
        CITY: body.city,
        MICRODISTRICT: body.microdistrict,
        HOME: body.home,
        FLAT: body.flat
      },
      { autoCommit: true }
    );
    console.log(result);
    // res.status(201).json({ message: 'User created successfully', user: body });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Database error' });
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (error) {
        console.error(error);
      }
    }
    }  
  }
};

exports.getById = async (req,res) => {
  let connection;
  const userId = parseInt(req.params.id, 10);
  try {
    connection = await oracledb.getConnection(dbConfig);
    const result = await connection.execute(
      "SELECT * FROM USER_INFO WHERE ID = :id",
      { id: userId }
    );
    if (result.rows.length === 0) {
      res.status(404).json({ message: 'User not found' });
    } else {
      res.status(200).json(result.rows[0]);
    }
  } catch (error) {
    console.error(error);
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (error) {
        console.error(error);
      }
    }
  }
};