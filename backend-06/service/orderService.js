exports.getAllOrder = async (connection) => {
  try {
      const query = `SELECT * FROM USER_ORDER`;
      const result = await connection.execute(query);
      return result;
  }
  catch (error) {
    throw error;
  }
};

exports.getOrderById = async (parametres) => {
  try {
    const orderId = parseInt(parametres.id, 10);
    const query = `SELECT * FROM USER_ORDER WHERE ID = :id`;
    const bind = { id: orderId };
    const result = await parametres.connection.execute(query, bind);
    return result;
  }
  catch (error) {
    throw error;
  }
}

exports.updateOrder = async (parametres) => {
  if (parametres.body != null) {
    const orderId = parseInt(parametres.id, 10);
    const body = parametres.body;
    try {
      const query =
        `UPDATE USER_ORDER SET  
          USER_ID = :USER_ID,
          ORDER_STATUS_ID = :ORDER_STATUS_ID,  
          CREATE_USER = :CREATE_USER,
          UPDATE_USER = :UPDATE_USER, 
          CREATE_TIME = TO_DATE(SYSDATE, 'DD/MM/YYYY'), 
          UPDATE_TIME = TO_DATE(SYSDATE, 'DD/MM/YYYY')
          WHERE ID = :ID`;
      const bind =
      {
        USER_ID: body.userId,
        ORDER_STATUS_ID: body.orderStatusId,
        CREATE_USER: body.createUser,
        UPDATE_USER: body.updateUser,
        ID: orderId
      };
      const option = { autoCommit: true };
      const result = await parametres.connection.execute(query, bind, option);
      return result;
    }
    catch (error) {
      throw error;
    }
  }
  else {
    console.log('Invalid input data');
  }
};

exports.createOrderByItem = async (parametres) => {
  if (parametres.body != null) {
    const body = parametres.body;
    try {
      const query =
        `BEGIN
       INSERT INTO service_product(id,product_id, service_id, create_user, update_user, create_time, update_time)
       VALUES ((SELECT COALESCE(MAX(id), 0) + 1 FROM service_product),:get_product_id,:get_service_id, 'ADMIN', 'ADMIN', TO_DATE(SYSDATE,'YYYY-MM-DD'), TO_DATE(SYSDATE,'YYYY-MM-DD'));

       INSERT INTO order_status(id, status, create_user, update_user, create_time, update_time)
       VALUES ((SELECT COALESCE(MAX(id), 0) + 1 FROM order_status),'processing','ADMIN', 'ADMIN', TO_DATE(SYSDATE,'YYYY-MM-DD'), TO_DATE(SYSDATE,'YYYY-MM-DD'));
                     
       INSERT INTO user_order(id, user_id, order_status_id, create_user, update_user, create_time, update_time)
       VALUES ((SELECT COALESCE(MAX(id), 0) + 1 FROM user_order),TRUNC(dbms_random.value(1,99)),(SELECT COALESCE(MAX(id), 0) FROM order_status),'ADMIN', 'ADMIN', TO_DATE(SYSDATE,'YYYY-MM-DD'), TO_DATE(SYSDATE,'YYYY-MM-DD'));
                     
       INSERT INTO order_item(id, order_id, service_product_id, create_user, update_user, create_time, update_time)
       VALUES ((SELECT COALESCE(MAX(id), 0) + 1 FROM order_item),(SELECT COALESCE(MAX(id), 0) FROM user_order),(SELECT COALESCE(MAX(id), 0) FROM service_product),'ADMIN', 'ADMIN', TO_DATE(SYSDATE,'YYYY-MM-DD'), TO_DATE(SYSDATE,'YYYY-MM-DD'));
       END;`
      const bind = { get_product_id: body.productId, get_service_id: body.serviceId };
      const option = { autoCommit: true }
      const result = await parametres.connection.execute(query, bind, option);
      return result;
    }
    catch (error) {
      throw error;
    }
  }
  else {
    console.log("Reques body is empty")
  }
};

exports.deleteOrder = async (parametres) => {
  const id = parseInt(parametres.id, 10);
  try {
    const bind = {
      id: id
    };
    await parametres.connection.execute('DELETE FROM ORDER_ITEM WHERE ORDER_ID = :id', bind);
    await parametres.connection.execute(`DELETE FROM SERVICE_PRODUCT WHERE ID IN (SELECT SERVICE_PRODUCT_ID FROM ORDER_ITEM WHERE ORDER_ID = :id)`, bind);
    const result = await parametres.connection.execute('DELETE FROM USER_ORDER WHERE ID = :id', bind);
    await parametres.connection.execute(`DELETE FROM ORDER_STATUS WHERE ID IN (SELECT ORDER_STATUS_ID FROM USER_ORDER WHERE ID = :id)`, bind);
    await parametres.connection.commit();
    return result;
  } catch (error) {
    throw error;
  }
};