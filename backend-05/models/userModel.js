const oracledb = require('oracledb');
const dbConfig = require('../config/dbconfig');
const jwt = require('jsonwebtoken');

exports.getAllUser = async () => {
  let connection;
  try {
    connection = await oracledb.getConnection(dbConfig);
    const query = `SELECT * FROM USER_INFO`;
    const result = await connection.execute(query);
    console.log('Get all user');
    return result.rows;
  }
  catch (error) {
    console.log(error);
  }
  finally {
    if (connection) {
      try {
        await connection.close();
      }
      catch (error) {
        console.error(error);
      }
    }
  }
};

exports.createUser = async (req) => {
  if (req != null) {
    let connection;
    let body = req.body;
    try {
      connection = await oracledb.getConnection(dbConfig);
      const query =
        `INSERT INTO USER_INFO(ID, FIRST_NAME, LAST_NAME, EMAIL, PHONE, USER_PASSWORD, DATE_OF_BIRTH, GENDER, CITY, MICRODISTRICT, HOME, FLAT, CREATE_USER, UPDATE_USER, CREATE_TIME, UPDATE_TIME) 
         VALUES (USER_SEQ.NEXTVAL, :FIRST_NAME, :LAST_NAME, :EMAIL, :PHONE, :USER_PASSWORD, TO_DATE(:DATE_OF_BIRTH, 'DD/MM/YYYY'), :GENDER, :CITY, :MICRODISTRICT, :HOME, :FLAT, 'USER', 'USER', TO_DATE(SYSDATE, 'DD/MM/YYYY'), TO_DATE(SYSDATE, 'DD/MM/YYYY'))`;
      const bind =
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
      };
      const option = { autoCommit: true };
      const result = await connection.execute(query, bind, option);
      console.log(result);
      return console.log('User created successfully');
    }
    catch (error) {
      console.error(error);
      return console.log('Database error');
    }
    finally {
      if (connection) {
        try {
          await connection.close();
        }
        catch (error) {
          console.error(error);
        }
      }
    }
  }
};

exports.getById = async (req) => {
  let connection;
  const userId = parseInt(req.params.id, 10);
  try {
    connection = await oracledb.getConnection(dbConfig);
    const query = `SELECT * FROM USER_INFO WHERE ID = :id`;
    const bind = { id: userId };
    const result = await connection.execute(query, bind);
    if (result.rows.length === 0) {
      console.log('User not found')
    }
    else {
      console.log('Get user - ' + userId)
      return result.rows[0];
    }
  }
  catch (error) {
    console.error(error);
  }
  finally {
    if (connection) {
      try {
        await connection.close();
      }
      catch (error) {
        console.error(error);
      }
    }
  }
};

exports.updateUser = async (req) => {
  if (req.body != null) {
    let connection;
    const userId = parseInt(req.params.id, 10);
    let body = req.body;
    try {
      connection = await oracledb.getConnection(dbConfig);
      const query =
        `UPDATE USER_INFO SET 
          FIRST_NAME = :FIRST_NAME, 
          LAST_NAME = :LAST_NAME, 
          EMAIL = :EMAIL, 
          PHONE = :PHONE, 
          USER_PASSWORD = :USER_PASSWORD, 
          DATE_OF_BIRTH = TO_DATE(:DATE_OF_BIRTH, 'DD/MM/YYYY'), 
          GENDER = :GENDER, 
          CITY = :CITY, 
          MICRODISTRICT = :MICRODISTRICT, 
          HOME = :HOME, 
          FLAT = :FLAT, 
          CREATE_USER = :CREATE_USER, 
          UPDATE_USER = :UPDATE_USER, 
          CREATE_TIME = TO_DATE(:CREATE_TIME, 'DD/MM/YYYY'), 
          UPDATE_TIME = TO_DATE(:UPDATE_TIME, 'DD/MM/YYYY') 
          WHERE ID = :ID`;
      const bind =
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
      };
      const option = { autoCommit: true };
      const result = await connection.execute(query, bind, option);
      console.log(result);
      if (result.rowsAffected === 0) {
        console.log('User not found');
      }
      else {
        console.log('User updated successfully');
      }
    }
    catch (error) {
      console.error(error);
      console.log('Database error');
    }
    finally {
      if (connection) {
        try {
          await connection.close();
        }
        catch (error) {
          console.error(error);
        }
      }
    }
  }
  else {
    return console.log('Invalid input data');
  }
};

exports.deleteUser = async (req) => {
  let connection;
  const userId = parseInt(req.params.id, 10);
  try {
    connection = await oracledb.getConnection(dbConfig);
    const query = `DELETE FROM USER_INFO WHERE ID = :id`;
    const bind = { id: userId };
    const option = { autoCommit: true };
    const result = await connection.execute(query, bind, option);
    if (result.rowsAffected === 0) {
      console.log('User not found');
    }
    else {
      console.log('User deleted');
    }
  }
  catch (error) {
    return console.log(error);
  }
  finally {
    if (connection) {
      try {
        await connection.close();
      }
      catch (error) {
        console.error(error);
      }
    }
  }
}


exports.userLogin = async (req) => {
  if (req.body != null) {
    let connection = await oracledb.getConnection(dbConfig);
    try {
      connection = await oracledb.getConnection(dbConfig);
      const query = `SELECT * FROM USER_INFO WHERE EMAIL = :email AND USER_PASSWORD = :password`;
      const bind = { email: req.body.email, password: req.body.password };
      const result = await connection.execute(query, bind);
      if (result.rows.length > 0) {
        const secret = 'verystrongsecret123';
        const user = result.rows[0];
        const token = jwt.sign({ email: req.body.email, password: req.body.password }, secret);
        const userInfo = { user, token };
        return userInfo;
      }
      else {
        return console.log('Incorrect email or password try again');
      }
    }
    catch (error) {
      console.log(error);
    }
    finally {
      if (connection) {
        try {
          await connection.close();
        }
        catch (error) {
          console.error(error);
        }
      }
    }
  }
}

exports.getOrderByUserId = async (req) => {
  let connection = await oracledb.getConnection(dbConfig);
  const userId = parseInt(req.params.id, 10);
  try {
    connection = await oracledb.getConnection(dbConfig);
    const query = `SELECT * FROM USER_ORDER WHERE USER_ID = :id`;
    const bind = { id: userId };
    const result = await connection.execute(query, bind);
    if (result.rows.length != 0) {
      return result.rows;
    }
    else {
      console.log("Not found order")
    }
  }
  catch (error) {
    console.log(error);
  }
}

exports.deleteUserOrderById = async (req) => {
  let connection = await oracledb.getConnection(dbConfig);
  const userId = parseInt(req.params.userId, 10);
  const orderId = parseInt(req.params.orderId, 10);
  try {
    connection = await oracledb.getConnection(dbConfig);
    const query =
      `DECLARE
        delete_service_product_id NUMBER;
        delete_order_status NUMBER;
        BEGIN
        -- SERVICE_PRODUCT_ID
        SELECT SERVICE_PRODUCT_ID INTO delete_service_product_id FROM ORDER_ITEM WHERE ID = :get_order_id;
        SELECT ORDER_STATUS_ID INTO delete_order_status FROM USER_ORDER WHERE ID = :get_order_id;
        -- ORDER_ITEM
        DELETE FROM ORDER_ITEM WHERE ORDER_ID = :get_order_id;
        -- SERVICE_PRODUCT
        DELETE FROM SERVICE_PRODUCT WHERE ID = delete_service_product_id;
        -- USER_ORDER
        DELETE FROM USER_ORDER WHERE USER_ID = :get_user_id AND ID = :get_order_id;
        -- ORDER_STATUS
        DELETE FROM ORDER_STATUS WHERE ID = delete_order_status;
        COMMIT;
      END;`;
    const bind = { get_user_id: userId, get_order_id: orderId };
    const option = { autoCommit: true };
    const result = await connection.execute(query, bind, option);
    if (result.rowsAffected === 0) {
      console.log('User/Order not found');
    }
    else {
      console.log('Order was deleted');
    }
  }
  catch (error) {
    console.log(error)
  }
}
