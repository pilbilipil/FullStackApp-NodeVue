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
    // res.status(201).json({ message: 'User created successfully', user: body });  response fix
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
      // res.status(404).json({ error: 'User not found' }); response 200 fix
    } else {
      return result.rows[0];
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

exports.updateUser = async (req,res) =>{
  if (req.body != null) {
    let connection;
    const userId = parseInt(req.params.id, 10);
    let body = req.body;
    try {
      connection = await oracledb.getConnection(dbconfig);
      const result = await connection.execute(
        "UPDATE USER_INFO SET " +
          "FIRST_NAME = :FIRST_NAME, " +
          "LAST_NAME = :LAST_NAME, " +
          "EMAIL = :EMAIL, " +
          "PHONE = :PHONE, " +
          "USER_PASSWORD = :USER_PASSWORD, " +
          "DATE_OF_BIRTH = TO_DATE(:DATE_OF_BIRTH, 'DD/MM/YYYY'), " +
          "GENDER = :GENDER, " +
          "CITY = :CITY, " +
          "MICRODISTRICT = :MICRODISTRICT, " +
          "HOME = :HOME, " +
          "FLAT = :FLAT, " +
          "CREATE_USER = :CREATE_USER, " +
          "UPDATE_USER = :UPDATE_USER, " +
          "CREATE_TIME = TO_DATE(:CREATE_TIME, 'DD/MM/YYYY'), " +
          "UPDATE_TIME = TO_DATE(:UPDATE_TIME, 'DD/MM/YYYY') " +
          "WHERE ID = :ID",
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
          FLAT: body.flat,
          CREATE_USER: body.createUser,
          UPDATE_USER: body.updateUser,
          CREATE_TIME: body.createTime,
          UPDATE_TIME: body.updateTime,
          ID: userId
        },
        { autoCommit: true }
      );
      console.log(result);
      if (result.rowsAffected === 0) {
        res.status(404).json({ message: 'User not found' });
      } else {
        res.status(200).json({ message: 'User updated successfully', user: body });
      }
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
  } else {
    res.status(400).json({ error: 'Invalid input data' });
  }
};