const { user } = require('../config/dbconfig');
const userModel = require('../models/userModel');

exports.getAllUsers = async(req,res) => {
    try {
       const users = await userModel.getAllUser();
       res.json(users);  
    } catch (error) {
       res.status(500).json({error: 'Database error'})  
    }
};

exports.createNewUser = async(req,res) => {
   try {
      const createUser = await userModel.createUser(req);
      res.json(createUser);
   } catch (error) {
      res.status(500).json({error: 'Database error'});
   }
};

exports.getUserById = async(req, res) => {
   try {
      const getByIds = await userModel.getById(req);
      res.json(getByIds);
   } catch (error) {
      console.log(error);
   } 
};

exports.updateUserById = async(req,res) =>{
   try {
      const updatedUser = await userModel.updateUser(req);
      res.json(updatedUser);
   } catch (error) {
      console.log(error);
   }
} 