const oracledb = require('oracledb');
const dbConfig = require('../config/dbconfig');

exports.getAllOrder = async (req, res) => {
  let connection;
  try {
    connection = await oracledb.getConnection(dbConfig);
    const query = `SELECT * FROM USER_ORDER`;
    const result = await connection.execute(query);
    return result;
  }
  catch (error) {
    return error;
  }
};

exports.getOrderById = async (req) => {
  let connection;
  try {
    connection = await oracledb.getConnection(dbConfig);
    const orderId = parseInt(req.params.id, 10);
    const query = `SELECT * FROM USER_ORDER WHERE ID = :id`;
    const bind = { id: orderId };
    const result = await connection.execute(query, bind);
    return result;
  }
  catch (error) {
    return error;
  }
}

exports.updateOrder = async (req) => {
  if (req.body != null) {
    let connection;
    const orderId = parseInt(req.params.id, 10);
    let body = req.body;
    try {
      connection = await oracledb.getConnection(dbConfig);
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
      const result = await connection.execute(query, bind, option);
      return result;
    }
    catch (error) {
      return error;
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
    console.log('Invalid input data');
  }
};

exports.createOrderByItem = async (req) => {
  if (req.body != null) {
    let connection;
    let body = req.body;
    try {
      connection = await oracledb.getConnection(dbConfig);
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
      const result = await connection.execute(query, bind, option);
      return result;
    }
    catch (error) {
      return error;
    }
    finally {
      if (connection) {
        try {
          await connection.close();
        }
        catch (error) {
          onsole.error(error);
        }
      }
    }
  }
  else {
    console.log("Reques body is empty")
  }
};

// exports.createUserOrder = async(req, res) => {
//   if (req.body != null) {
//     let connection;
//     const body = req.body;
//     try {
//       connection = await oracledb.getConnection(dbConfig);
//       const serviceList = await connection.getDbObjectClass('NUMBER_ARRAY');
//       const productList = await connection.getDbObjectClass('NUMBER_ARRAY');
//       const serviceArray = new serviceList(body.serviceList);
//       const productArray = new productList(body.productList);
//       const binds = {
//         get_user_id: body.userId,
//         get_service_list: { type: serviceList, dir: oracledb.BIND_IN, val: serviceArray },
//         get_product_list: { type: productList, dir: oracledb.BIND_IN, val: productArray }
//       };
//       const result = await connection.execute("BEGIN CREATE_USER_ORDER(:get_user_id, :get_service_list, :get_product_list); END;" ,binds);
//       console.log('User order created', result);
//     } catch (error) {
//       console.error(error);
//       if (connection) {
//         try {
//           await connection.close();
//         } catch (error) {
//           console.error(error);
//         }
//       }
//     }
//   } else {
//     console.log({error: "Request is empty"});
//   }
// };

exports.deleteOrder = async (req, res) => {
  let connection;
  const id = parseInt(req.params.id, 10);
  try {
    connection = await oracledb.getConnection(dbConfig);
    const query = `
    DECLARE
     get_service_id INT;
     get_status_id INT;
    BEGIN
     SELECT SERVICE_PRODUCT_ID INTO get_service_id 
     FROM ORDER_ITEM 
     WHERE ORDER_ID = :id;
     SELECT ORDER_STATUS_ID INTO get_status_id 
     FROM USER_ORDER 
     WHERE ID = :id;
     DELETE FROM ORDER_ITEM 
     WHERE ID = :id;
     DELETE FROM SERVICE_PRODUCT 
     WHERE ID = get_service_id;
     DELETE FROM USER_ORDER 
     WHERE ID = :id;
     DELETE FROM ORDER_STATUS 
     WHERE ID = get_status_id;
    END;`;
    const bind = { id: id };
    const option = { autoCommit: true };
    const result = await connection.execute(query, bind, option);
    return result;
  }
  catch (error) {
    return error;
  }
}
