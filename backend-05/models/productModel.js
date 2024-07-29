const oracledb = require('oracledb');
const dbConfig = require('../config/dbconfig');

exports.getAllProduct = async (req, res) => {
    let connection;
    try {
        connection = await oracledb.getConnection(dbConfig);
        const query = `SELECT * FROM PRODUCT`;
        const result = await connection.execute(query);
        return result;
    }
    catch (error) {
        res.status(404);
    }
};

exports.createNewProduct = async (req, res) => {
    if (req.body != null) {
        let connection;
        const body = req.body;
        try {
            connection = await oracledb.getConnection(dbConfig);
            const query = `
            BEGIN
            INSERT INTO PRODUCT_STATUS(id,status,create_user,update_user,create_time,update_time)
            VALUES((SELECT COALESCE(MAX(id), 0) + 1 FROM product_status),'ready','ADMIN','ADMIN',SYSDATE,SYSDATE);

            INSERT INTO PRODUCT(id,product_status_id,price,product_count,weight,product_country,product_name,product_type,create_user,update_user,create_time,update_time)
            VALUES((SELECT COALESCE(MAX(id), 0) + 1 FROM product),(SELECT COALESCE(MAX(id), 0) FROM product_status),:get_price,:get_count,:get_weight,:get_country,:get_name,:get_type,'ADMIN','ADMIN',SYSDATE,SYSDATE);
            END;
            `;
            const bind = { get_price: body.price, get_count: body.count, get_weight: body.weight, get_country: body.country, get_name: body.name, get_type: body.type };
            const option = { autoCommit: true }
            const result = await connection.execute(query, bind, option);
            return result;
        }
        catch (error) {
            console.log(error);
        }
    } else {
        console.log('Request empty')
    }
}


exports.getProductById = async (req, res) => {
    let connection;
    const id = parseInt(req.params.id, 10);
    try {
        connection = await oracledb.getConnection(dbConfig);
        const query = `SELECT * FROM PRODUCT WHERE ID = :id`;
        const bind = { id: id };
        const result = await connection.execute(query, bind);
        return result;
    }
    catch (error) {
        console.log(error);
    }
}

exports.deleteProduct = async (req, res) => {
    let connection;
    const id = parseInt(req.params.id, 10);
    try {
        connection = await oracledb.getConnection(dbConfig);
        const query = `DELETE FROM PRODUCT WHERE ID = :id`;
        const bind = { id: id };
        const option = { autoCommit: true };
        const result = await connection.execute(query, bind, option);
        return result;
    }
    catch (error) {
        return error;
    }
}

exports.updateProductById = async (req, res) => {
    if (req.body != null) {
        let connection;
        const id = parseInt(req.params.id, 10);
        let body = req.body;
        try {
            connection = await oracledb.getConnection(dbConfig);
            const option = { autoCommit: true }
            const bind = {
                PRICE: body.price,
                PRODUCT_COUNT: body.productCount,
                WEIGHT: body.weight,
                PROUDUCT_COUNTRY: body.productContry,
                PRODUCT_NAME: body.productName,
                PRODUCT_TYPE: body.productType,
                ID: id
            };
            const query = `
            UPDATE PRODUCT SET
            PRICE = :PRICE,
            PRODUCT_COUNT = :PRODUCT_COUNT,
            WEIGHT = :WEIGHT,
            PRODUCT_COUNTRY = :PROUDUCT_COUNTRY,
            PRODUCT_NAME = :PRODUCT_NAME,
            PRODUCT_TYPE = :PRODUCT_TYPE,
            UPDATE_USER = 'ADMIN1',
            UPDATE_TIME = SYSDATE
            WHERE ID = :ID`;
            const result = await connection.execute(query, bind, option);
            return result;
        }
        catch (error) {
            console.log(error);
        }
    }
    else {
        console.log('Request empty');
    }
}
