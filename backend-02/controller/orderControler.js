const orderModel = require('../models/orderModel');

exports.getOrder = async(req,res) =>
{
  try {
    const getOrderDate = await orderModel.getAllOrder();
    res.json(getOrderDate);
  } catch (error) {
    res.status(500).json({error: 'Database error'});
  };
}; 

exports.getOrderById = async(req, res) => 
    {
        try {
        const getOrderById = await orderModel.getOrderById(req);
        res.json(getOrderById);
        } catch (error) {
        res.status(500).json({error: 'Database error'});
        }
    }

exports.updateOrderById = async(req,res) => 
    {
        try {
        const updatedOrder = await orderModel.updateOrder(req);
        res.json(updatedOrder);    
        } catch (error) {
        res.status(500).json({error: 'Database error'});    
        }
    }

exports.createOrder = async(req,res) => 
{
        try {
            const createdOrder = await orderModel.createOrderByItem(req);
            res.json(createdOrder);  
        } catch (error) {
            res.status(500).json({error: 'Database error'});
        }
}    