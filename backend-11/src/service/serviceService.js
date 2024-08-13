exports.getAllService = async (parameters) => {
    try {
        const query = `SELECT * FROM SERVICE_INFO`;
        const result = await parameters.connection.execute(query);
        return result;
    }
    catch (error) {
        throw error;;
    }
};

exports.createNewService = async (parameters) => {
    if (parameters.body != null) {
        const body = parameters.body;
        try {
            const query = `INSERT INTO SERVICE_INFO(id,price,service_type,create_user,update_user,create_time,update_time)
                           VALUES((SELECT COALESCE(MAX(id), 0) + 1 FROM SERVICE_INFO),:GET_PRICE,:GET_SERVICE_TYPE,'ADMIN','ADMIN',SYSDATE,SYSDATE)`;
            const bind = { GET_PRICE: body.price, GET_SERVICE_TYPE: body.serviceType };
            const option = { autoCommit: true };
            const result = await parameters.connection.execute(query, bind, option);
            return result;
        }
        catch (error) {
            throw error;
        }
    }
    else {
        throw error;
    }
};

exports.getServiceById = async (parameters) => {
    const id = parseInt(parameters.id, 10);
    try {
        const query = `SELECT * FROM SERVICE_INFO WHERE ID = :ID`;
        const bind = { ID: id };
        const result = await parameters.connection.execute(query, bind);
        return result;
    } catch (error) {
        throw error;
    }
}

exports.updateServiceById = async (parameters) => {
    if (parameters.body != null) {
        const id = parseInt(parameters.id, 10);
        const body = parameters.body;
        try {
            const query = `
        UPDATE SERVICE_INFO SET
        PRICE = :PRICE,
        SERVICE_TYPE = :SERVICE_TYPE,
        UPDATE_USER = :UPDATE_USER,
        UPDATE_TIME = SYSDATE
        WHERE ID = :ID`;
            const bind = { PRICE: body.price, SERVICE_TYPE: body.serviceType, UPDATE_USER: body.updateUser, ID: id };
            const option = { autoCommit: true };
            const result = await parameters.connection.execute(query, bind, option);
            return result;
        } catch (error) {
            throw error;
        }
    } else {
        throw error;
    }
}

exports.deleteServiceById = async (parameters) => {
    try {
        const id = parseInt(parameters.id, 10);
        const query = `DELETE SERVICE_INFO WHERE ID = :ID`;
        const bind = { ID: id };
        const option = { autoCommit: true };
        const result = await parameters.connection.execute(query, bind, option);
        return result;
    } catch (error) {
        throw error;
    }
}