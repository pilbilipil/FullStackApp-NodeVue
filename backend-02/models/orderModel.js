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

exports.getOrderById = async (req,res) =>
    {
        let connection;
        try {
        connection = await oracledb.getConnection(dbConfig);
        const orderId = parseInt(req.params.id, 10);
        const result = await connection.execute("SELECT * FROM USER_ORDER WHERE ID = :id",
            { id: orderId }
        );
        if (result.rows.length === 0) { 
            console.log('Order not found')
          } else {
            console.log('Get order - ' + orderId)
            return result.rows[0];
          }    
        } catch (error) {    
        }
    }

 exports.updateOrder = async (req,res) =>{
        if (req.body != null) {
          let connection;
          const orderId = parseInt(req.params.id, 10);
          let body = req.body;
          try {
            connection = await oracledb.getConnection(dbConfig);
            const result = await connection.execute(
                "UPDATE USER_ORDER SET " +
                "USER_ID = :USER_ID, " +
                "ORDER_STATUS_ID = :ORDER_STATUS_ID, " +
                "CREATE_USER = :CREATE_USER, " +
                "UPDATE_USER = :UPDATE_USER, " +
                "CREATE_TIME = TO_DATE(SYSDATE, 'DD/MM/YYYY'), " +
                "UPDATE_TIME = TO_DATE(SYSDATE, 'DD/MM/YYYY')" +
                "WHERE ID = :ID",
              {
                USER_ID: body.userId,
                ORDER_STATUS_ID: body.orderStatusId,
                CREATE_USER: body.createUser,
                UPDATE_USER: body.updateUser,
                ID: orderId
              },
              { autoCommit: true }
            );
            console.log(result);
            if (result.rowsAffected === 0) {
              console.log('Order not found');
            } else {
              console.log('Oder updated successfully');
            }
          } catch (error) {
            console.error(error);
            // res.status(500).json({ error: 'Database error' });
            console.log('Database error');
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
          // res.status(400).json({ error: 'Invalid input data' });
          return console.log('Invalid input data');
        }
};    

exports.createOrderByItem = async (req,res) => {
    if(req.body != null){
    let connection;
    let body = req.body;
    try {
      connection = await oracledb.getConnection(dbConfig);
      const result = await connection.execute("BEGIN CREATE_ORDER_BY_SERVICE_PRODUCT(:productId,:serviceId); END;",
        {
         productId: body.productId,
         serviceId: body.serviceId
        },{ autoCommit: true });
        if(result.rowsAffected != 0)
        {
            console.log("Order created")
            return result;
        }else
        {
            console.log("Error: cant create order");
        }
    } catch (error) {
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
    }else{
        console.log("Reques body is null")
    }
};

 

