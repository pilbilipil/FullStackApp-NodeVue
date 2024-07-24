const orderModel = require('../models/orderModel');

exports.getOrder = async(req,res) =>
{
  try {
    const getOrderDate = await orderModel.getAllOrder();
    res.json(getOrderDate);
  } catch (error) {
    res.status(500).json({error: 'Database error'})
  };
}; 