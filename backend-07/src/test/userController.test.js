const oracledb = require('oracledb');
const userController = require('../controller/userControler');
const userService = require('../service/userService');
const jwt = require('jsonwebtoken');

jest.mock('oracledb', () => ({
    getConnection: jest.fn(),
}));
jest.mock('../service/userService');

describe('userController.getAllUsers', () => {
    let req, res, next, connection;

    beforeEach(() => {
        req = {};
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        next = jest.fn();
        connection = {
            execute: jest.fn()
        };
        oracledb.getConnection.mockResolvedValue(connection);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('should return 200 - Users found', async () => {
        const mockUsers = { rows: [{ id: 1, name: 'John Doe' }] };
        userService.getAllUser.mockResolvedValue(mockUsers);

        await userController.getAllUsers(req, res, next);

        expect(oracledb.getConnection).toHaveBeenCalledWith(expect.anything());
        expect(userService.getAllUser).toHaveBeenCalledWith({ connection });
        expect(res.status).toHaveBeenCalledWith(200);
    });

    test('should return 404 - Users not found', async () => {
        const mockUsers = { rows: [] };
        userService.getAllUser.mockResolvedValue(mockUsers);

        await userController.getAllUsers(req, res, next);

        expect(oracledb.getConnection).toHaveBeenCalledWith(expect.anything());
        expect(userService.getAllUser).toHaveBeenCalledWith({ connection });
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ error: "User not found" });
    });

    test('should return 500 - Database error', async () => {
        const error = new Error('Database error');
        oracledb.getConnection.mockRejectedValue(error);

        await userController.getAllUsers(req, res, next);

        expect(oracledb.getConnection).toHaveBeenCalledWith(expect.anything());
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ error: 'Database error' });
        expect(next).toHaveBeenCalledWith(error);
    });
});

describe('userController.createNewUser', () => {
    let req, res, next, connection;

    beforeEach(() => {
        req = {
            body: {
                firstName: 'Shinius',
                lastName: 'Toleukan',
                email: 'shungus231@example.com',
                phone: '87773489767',
                userPassword: '2p3ijrf39s',
                dateOfBirth: '07/11/2024',
                gender: 'male',
                city: 'Almaty',
                microdistrict: 'Aksay-1',
                home: '23',
                flat: '14'
            }
        };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        next = jest.fn();
        connection = {
            execute: jest.fn()
        };
        oracledb.getConnection.mockResolvedValue(connection);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('should return 200 - User successfully created', async () => {
        const mockResult = { lastRowid: 'AAASHsAABAAAbUSAAj', rowsAffected: 1 };
        userService.createUser.mockResolvedValue(mockResult);

        await userController.createNewUser(req, res, next);

        expect(oracledb.getConnection).toHaveBeenCalledWith(expect.anything());
        expect(userService.createUser).toHaveBeenCalledWith({ body: req.body, connection });
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ message: 'User add successfully' });
    });

    test('should return 400 - User creation fails', async () => {
        const mockResult = { rowsAffected: 0 };
        userService.createUser.mockResolvedValue(mockResult);

        await userController.createNewUser(req, res, next);

        expect(oracledb.getConnection).toHaveBeenCalledWith(expect.anything());
        expect(userService.createUser).toHaveBeenCalledWith({ body: req.body, connection });
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ error: "User creation failed" });
    });

    test('should return 500 - Database error', async () => {
        const error = new Error('Database error');
        oracledb.getConnection.mockRejectedValue(error);

        await userController.createNewUser(req, res, next);

        expect(oracledb.getConnection).toHaveBeenCalledWith(expect.anything());
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ error: 'Database error' });
        expect(next).toHaveBeenCalledWith(error);
    });
});

describe('userController.getUserById', () => {
    let req, res, next, connection;

    beforeEach(() => {
        req = {
            params: {
                id: 1
            }
        };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        next = jest.fn();
        connection = {
            execute: jest.fn()
        };
        oracledb.getConnection.mockResolvedValue(connection);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('should return 200 - User find successfully', async () => {
        const mockUsers = { rows: [{ id: 1, name: 'John Doe' }] };
        userService.getById.mockResolvedValue(mockUsers);

        await userController.getUserById(req, res, next);

        expect(oracledb.getConnection).toHaveBeenCalledWith(expect.anything());
        expect(userService.getById).toHaveBeenCalledWith({ id: req.params.id, connection });
        expect(res.status).toHaveBeenCalledWith(200);
    });

    test('should return 404 - User not found', async () => {
        const mockUsers = { rows: [] };
        userService.getById.mockResolvedValue(mockUsers);

        await userController.getUserById(req, res, next);

        expect(oracledb.getConnection).toHaveBeenCalledWith(expect.anything());
        expect(userService.getById).toHaveBeenCalledWith({ id: req.params.id, connection });
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ error: "User not found" });
    });

    test('should return 500 - Database error', async () => {
        const error = new Error('Database error');
        oracledb.getConnection.mockRejectedValue(error);

        await userController.getUserById(req, res, next);

        expect(oracledb.getConnection).toHaveBeenCalledWith(expect.anything());
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ error: 'Database error' });
        expect(next).toHaveBeenCalledWith(error);
    });
});

describe('userController.updateUserById', () => {
    let req, res, next, connection;

    beforeEach(() => {
        req = {
            params: {
                id: 1
            },
            body: {
                firstName: 'Shinius',
                lastName: 'Toleukan',
                email: 'shungus231@example.com',
                phone: '87773489767',
                userPassword: '2p3ijrf39s',
                dateOfBirth: '07/11/2024',
                gender: 'male',
                city: 'Almaty',
                microdistrict: 'Aksay-1',
                home: '23',
                flat: '14'
            }
        };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        next = jest.fn();
        connection = {
            execute: jest.fn()
        };
        oracledb.getConnection.mockResolvedValue(connection);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('should return 200 - User successfully updated', async () => {
        const mockResult = { lastRowid: 'AAASHsAABAAAbUSAAj', rowsAffected: 1 };
        userService.updateUser.mockResolvedValue(mockResult);

        await userController.updateUserById(req, res, next);

        expect(oracledb.getConnection).toHaveBeenCalledWith(expect.anything());
        expect(userService.updateUser).toHaveBeenCalledWith({ id: req.params.id, body: req.body, connection });
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ message: 'User updated successfully' });
    });

    test('should return 404 - User not found', async () => {
        const mockResult = { rowsAffected: 0 };
        userService.updateUser.mockResolvedValue(mockResult);

        await userController.updateUserById(req, res, next);

        expect(oracledb.getConnection).toHaveBeenCalledWith(expect.anything());
        expect(userService.updateUser).toHaveBeenCalledWith({ id: req.params.id, body: req.body, connection });
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ error: "User not found" });
    });

    test('should return 500 - Database error', async () => {
        const error = new Error('Database error');
        oracledb.getConnection.mockRejectedValue(error);

        await userController.updateUserById(req, res, next);

        expect(oracledb.getConnection).toHaveBeenCalledWith(expect.anything());
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ error: 'Database error' });
        expect(next).toHaveBeenCalledWith(error);
    });
});

describe('userController.deleteUserById', () => {
    let req, res, next, connection;

    beforeEach(() => {
        req = {
            params: {
                id: 1
            }
        };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        next = jest.fn();
        connection = {
            execute: jest.fn()
        };
        oracledb.getConnection.mockResolvedValue(connection);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('should return 200 - Successfully deleted', async () => {
        const mockResult = { rowsAffected: 1 };
        userService.deleteUser.mockResolvedValue(mockResult);

        await userController.deleteUserById(req, res, next);

        expect(oracledb.getConnection).toHaveBeenCalledWith(expect.anything());
        expect(userService.deleteUser).toHaveBeenCalledWith({ id: req.params.id, connection });
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ message: 'User deleted successfully' });
    });

    test('should return 400 - User deleting fails', async () => {
        const mockResult = { rowsAffected: 0 };
        userService.deleteUser.mockResolvedValue(mockResult);

        await userController.deleteUserById(req, res, next);

        expect(oracledb.getConnection).toHaveBeenCalledWith(expect.anything());
        expect(userService.deleteUser).toHaveBeenCalledWith({ id: req.params.id, connection });
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ error: "User not found" });
    });

    test('should return 500 - Database error', async () => {
        const error = new Error('Database error');
        oracledb.getConnection.mockRejectedValue(error);

        await userController.deleteUserById(req, res, next);

        expect(oracledb.getConnection).toHaveBeenCalledWith(expect.anything());
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ error: 'Database error' });
        expect(next).toHaveBeenCalledWith(error);
    });
});

describe('userController.userGetToken', () => {
    let req, res, next, connection;

    beforeEach(() => {
        req = {
            body: {
                email: 'shungus231@example.com',
                userPassword: '2p3ijrf39s'
            }
        };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        next = jest.fn();
        connection = {
            execute: jest.fn()
        };
        oracledb.getConnection.mockResolvedValue(connection);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('should return 200 - User successfully login', async () => {
        const mockResult = { rows: [{ id: 1, name: 'Shinius' }] };
        const secret = 'verystrongsecret123';
        const token = jwt.sign({ email: req.body.email, password: req.body.password }, secret);
        const userInfo = { token: token, user: { id: 1, name: "Shinius" } };
        userService.userLogin.mockResolvedValue(mockResult);

        await userController.userGetToken(req, res, next);

        expect(oracledb.getConnection).toHaveBeenCalledWith(expect.anything());
        expect(userService.userLogin).toHaveBeenCalledWith({ body: req.body, connection });
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ message: 'User token has been successfully created', userInfo });
    });

    test('should return 400 - Invalid email/password', async () => {
        const mockResult = { rowsAffected: 0 };
        userService.userLogin.mockResolvedValue(mockResult);

        await userController.userGetToken(req, res, next);

        expect(oracledb.getConnection).toHaveBeenCalledWith(expect.anything());
        expect(userService.userLogin).toHaveBeenCalledWith({ body: req.body, connection });
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ error: 'Invalid email/password' });
    });

    test('should return 500 - Database error', async () => {
        const error = new Error('Database error');
        oracledb.getConnection.mockRejectedValue(error);

        await userController.userGetToken(req, res, next);

        expect(oracledb.getConnection).toHaveBeenCalledWith(expect.anything());
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ error: 'Database error' });
        expect(next).toHaveBeenCalledWith(error);
    });
});

describe('userController.getUserOrder', () => {
    let req, res, next, connection;

    beforeEach(() => {
        req = {
            params: {
                id: 1
            }
        };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        next = jest.fn();
        connection = {
            execute: jest.fn()
        };
        oracledb.getConnection.mockResolvedValue(connection);
    });

    test('should return 200 - User order find successfully', async () => {
        const mockResult = {
            rows: [{
                id: 1, order:
                    [
                        {
                            orderId: 3,
                            orderStatusId: 3
                        }
                    ]
            }]
        };

        const result = {
            rows: [{
                id: 1, order:
                    [
                        {
                            orderId: 3,
                            orderStatusId: 3
                        }
                    ]
            }]
        };

        userService.getOrderByUserId.mockResolvedValue(mockResult);

        await userController.getUserOrder(req, res, next);

        expect(oracledb.getConnection).toHaveBeenCalledWith(expect.anything());
        expect(userService.getOrderByUserId).toHaveBeenCalledWith({ id: req.params.id, connection });
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ massage: 'Order find successfully', result: result.rows[0] });
    });

    test('should return 404 - Order/User not found', async () => {
        const mockResult = { rows: [] };
        userService.getOrderByUserId.mockResolvedValue(mockResult);

        await userController.getUserOrder(req, res, next);

        expect(oracledb.getConnection).toHaveBeenCalledWith(expect.anything());
        expect(userService.getOrderByUserId).toHaveBeenCalledWith({ id: req.params.id, connection });
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ error: 'Order/User not found' });
    });

    test('should return 500 - Database error', async () => {
        const error = new Error('Database error');
        oracledb.getConnection.mockRejectedValue(error);

        await userController.userGetToken(req, res, next);

        expect(oracledb.getConnection).toHaveBeenCalledWith(expect.anything());
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ error: 'Database error' });
        expect(next).toHaveBeenCalledWith(error);
    });
});

describe('userController.deleteUserOrder', () => {
    let req, res, next, connection;

    beforeEach(() => {
        req = {
            params: {
                userId: 1,
                orderId: 1
            }
        };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        next = jest.fn();
        connection = {
            execute: jest.fn()
        };
        oracledb.getConnection.mockResolvedValue(connection);
    });

    test('should return 200 - User order successfully delted', async () =>{
        const mockResult = { rowsAffected: 1}
        userService.deleteUserOrderById.mockResolvedValue(mockResult);

        await userController.deleteUserOrder(req, res, next);

        expect(oracledb.getConnection).toHaveBeenCalledWith(expect.anything());
        expect(userService.deleteUserOrderById).toHaveBeenCalledWith({ userId: req.params.userId, orderId: req.params.orderId ,connection });
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ massage: 'User order deleted successfully'});
    });

    test('should return 400 - Invalid User/Order', async () => {
        const mockResult = { rowsAffected: 0}
        userService.deleteUserOrderById.mockResolvedValue(mockResult);

        await userController.deleteUserOrder(req, res, next);

        expect(oracledb.getConnection).toHaveBeenCalledWith(expect.anything());
        expect(userService.deleteUserOrderById).toHaveBeenCalledWith({ userId: req.params.userId, orderId: req.params.orderId ,connection });
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ error: 'Invalid User/Order'});
    });

    test('should return 500 - Database error', async () => {
        const error = new Error('Database error');
        oracledb.getConnection.mockRejectedValue(error);

        await userController.deleteUserOrder(req, res, next);

        expect(oracledb.getConnection).toHaveBeenCalledWith(expect.anything());
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ error: 'Database error' });
        expect(next).toHaveBeenCalledWith(error);
    });
});




