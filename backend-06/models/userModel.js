exports.getAllUser = async (parameters) => {
  try {
    const query = `SELECT * FROM USER_INFO`;
    const result = await parameters.connection.execute(query);
    return result.rows;
  }
  catch (error) {
    throw error;;
  }
  finally {
    if (parameters.connection) {
      try {
        await parameters.connection.close();
      }
      catch (error) {
        throw error;
      }
    }
  }
};

exports.createUser = async (parameters) => {
  if (parameters.req != 0) {
    let body = parameters.req.body;
    try {
      const query =
        `INSERT INTO USER_INFO(ID, FIRST_NAME, LAST_NAME, EMAIL, PHONE, USER_PASSWORD, DATE_OF_BIRTH, GENDER, CITY, MICRODISTRICT, HOME, FLAT, CREATE_USER, UPDATE_USER, CREATE_TIME, UPDATE_TIME) 
         VALUES (USER_SEQ.NEXTVAL, :FIRST_NAME, :LAST_NAME, :EMAIL, :PHONE, :USER_PASSWORD, TO_DATE(:DATE_OF_BIRTH, 'DD/MM/YYYY'), :GENDER, :CITY, :MICRODISTRICT, :HOME, :FLAT, 'USER', 'USER', SYSDATE, SYSDATE)`;
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
      const result = await parameters.connection.execute(query, bind, option);
      return result;
    }
    catch (error) {
      throw error;
    }
    finally {
      if (parameters.connection) {
        try {
          await parameters.connection.close();
        }
        catch (error) {
          throw error;
        }
      }
    }
  }
};

exports.getById = async (parameters) => {
  const userId = parseInt(parameters.req.params.id, 10);
  try {
    const query = `SELECT * FROM USER_INFO WHERE ID = :id`;
    const bind = { id: userId };
    const result = await parameters.connection.execute(query, bind);
    return result;
  }
  catch (error) {
    throw error;
  }
  finally {
    if (parameters.connection) {
      try {
        await parameters.connection.close();
      }
      catch (error) {
        throw error;
      }
    }
  }
};

exports.updateUser = async (parameters) => {
  if (parameters.req.body != 0) {
    const userId = parseInt(parameters.req.params.id, 10);
    let body = parameters.req.body;
    try {
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
          CREATE_TIME = SYSDATE, 
          UPDATE_TIME = SYSDATE 
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
        ID: userId
      };
      const option = { autoCommit: true };
      const result = await parameters.connection.execute(query, bind, option);
      return result;
    }
    catch (error) {
      console.log('Database error');
      throw error;
    }
    finally {
      if (parameters.connection) {
        try {
          await parameters.connection.close();
        }
        catch (error) {
          throw error;
        }
      }
    }
  }
  else {
    return console.log('Invalid input data');
  }
};

exports.deleteUser = async (parameters) => {
  const userId = parseInt(parameters.req.params.id, 10);
  try {
    const query = `DELETE FROM USER_INFO WHERE ID = :id`;
    const bind = { id: userId };
    const option = { autoCommit: true };
    const result = await parameters.connection.execute(query, bind, option);
    return result;
  }
  catch (error) {
    console.log('Database error');
    throw error;
  }
  finally {
    if (parameters.connection) {
      try {
        await parameters.connection.close();
      }
      catch (error) {
        throw error;
      }
    }
  }
}


exports.userLogin = async (parameters) => {
  if (parameters.req.body != 0) {
    try {
      const query = `SELECT * FROM USER_INFO WHERE EMAIL = :email AND USER_PASSWORD = :password`;
      const bind = { email: parameters.req.body.email, password: parameters.req.body.password };
      const result = await parameters.connection.execute(query, bind);
      return result;
    }
    catch (error) {
      throw error;
    }
    finally {
      if (parameters.connection) {
        try {
          await parameters.connection.close();
        }
        catch (error) {
          throw error;
        }
      }
    }
  }
}

exports.getOrderByUserId = async (parameters) => {
  const userId = parseInt(parameters.req.params.id, 10);
  try {
    const query = `SELECT * FROM USER_ORDER WHERE USER_ID = :id`;
    const bind = { id: userId };
    const result = await parameters.connection.execute(query, bind);
    return result;
  }
  catch (error) {
    console.log('Database error');
    throw error;
  }
}

exports.deleteUserOrderById = async (parameters) => {
  const userId = parseInt(parameters.req.params.userId, 10);
  const orderId = parseInt(parameters.req.params.orderId, 10);
  try {
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
    const result = await parameters.connection.execute(query, bind, option);
    return result;
  }
  catch (error) {
    console.log('Database error');
    throw error;
  }
}
