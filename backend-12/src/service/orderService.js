exports.getAllOrder = async (parameters) => {
  try {
    const query = `SELECT * FROM USER_ORDER`;
    const result = await parameters.connection.execute(query);
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

exports.createOrderByItem = async (parameters) => {
  if (parameters.body && Array.isArray(parameters.body.productIds) && Array.isArray(parameters.body.serviceIds)) {
    const productIds = parameters.body.productIds;
    const serviceIds = parameters.body.serviceIds;
    const userId = parameters.body.userIds;
    const fixLen = Math.max(productIds.length, serviceIds.length);
    try {
      let lastResult = {};
      for (let index = 0; index < fixLen; index++) {
        console.log('start for');

        if (productIds.length < serviceIds.length) {
          productIds.push(null);
        } else if (productIds.length > serviceIds.length) {
          serviceIds.push(null);
        }
        const productElement = productIds[index]; // 3 4 5 
        const serviceElement = serviceIds[index]; // 1 3 4 5 5 
        if (productElement !== null || serviceElement !== null) {
          await parameters.connection.execute(` 
            INSERT INTO service_product(id, product_id, service_id, create_user, update_user, create_time, update_time) 
            VALUES ((SELECT COALESCE(MAX(id), 0) + 1 FROM service_product), :product_id, :service_id, 'ADMIN', 'ADMIN', SYSDATE, SYSDATE) 
          `, { product_id: productElement, service_id: serviceElement }); // удалили user_id, так как не используется
        }

        await parameters.connection.execute(` 
          INSERT INTO order_status(id, status, create_user, update_user, create_time, update_time) 
          VALUES ((SELECT COALESCE(MAX(id), 0) + 1 FROM order_status), 'processing', 'ADMIN', 'ADMIN', SYSDATE, SYSDATE) 
        `);

        await parameters.connection.execute(` 
          INSERT INTO user_order(id, user_id, order_status_id, create_user, update_user, create_time, update_time) 
          VALUES ((SELECT COALESCE(MAX(id), 0) + 1 FROM user_order), :user_id, (SELECT COALESCE(MAX(id), 0) FROM order_status), 'ADMIN', 'ADMIN', SYSDATE, SYSDATE) 
        `, { user_id: userId });

        const result = await parameters.connection.execute(` 
          INSERT INTO order_item(id, order_id, service_product_id, create_user, update_user, create_time, update_time) 
          VALUES ((SELECT COALESCE(MAX(id), 0) + 1 FROM order_item), (SELECT COALESCE(MAX(id), 0) FROM user_order), (SELECT COALESCE(MAX(id), 0) FROM service_product), 'ADMIN', 'ADMIN', SYSDATE, SYSDATE) 
        `);
        await parameters.connection.commit();
        if (index === (fixLen - 1)) {
          console.log(typeof result);
          console.log(result);
          lastResult = result;
        }
      }
      return lastResult;
    } catch (error) {
      console.error('Error executing order creation:', error);
      await parameters.connection.rollback();
      throw error;
    }
  } else {
    console.log("Request body is empty or not an array of product IDs");
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