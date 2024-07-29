const orderModel = require('../models/orderModel');

exports.getOrder = async(req,res) =>
{
  try 
  {
  const result = await orderModel.getAllOrder();
  if(result.rows.length != 0)
    {
    res.status(200).json({massage: "Orders find successfully" , result: result.rows});
    }
    else
    {
    res.status(404).json({error: "Order not found"});
    }
  } 
  catch(error) 
  {
  res.status(500).json({error: 'Database error'});
  };
}; 

exports.getOrderById = async(req, res) => 
{
  try 
  {
  const result = await orderModel.getOrderById(req);
  if (result.rows.length === 0) 
    { 
    res.status(404).json({error: 'Order not found'});
    } 
    else 
    {
    res.status(200).json({massage: 'Order find successfully',result: result.rows[0]});
    } 
  }
  catch(error) 
  {
  res.status(500).json({error: 'Database error'});
  }
}

exports.updateOrderById = async(req,res) => 
{
  try
  {
  const updatedOrder = await orderModel.updateOrder(req);
  if (updatedOrder.rowsAffected === 0) 
    {
      res.status(404).json({ message: 'Order not found'});
    } 
    else 
    {
      res.status(200).json({ message: 'Order updated successfully'});
    }   
  }
  catch(error) 
  {
  res.status(500).json({error: 'Database error'});    
  }
}

exports.createOrder = async(req,res) => 
{
  try 
  {
  const result = await orderModel.createOrderByItem(req);
  if(result.rowsAffected != 0)
    {
    res.status(200).json({ message: 'Order add successfully'});
    }
    else
    {
    res.status(404).json({ error: 'Cant add order'});
    }
  } 
  catch(error) 
  {
  res.status(500).json({error: 'Database error'});
  }
}

exports.deleteOrderById = async (req,res) => 
{
  try 
  {
  const order = await orderModel.deleteOrder(req);
  if(order.lastRowid != null)
    {
    res.status(200).json({ message: 'Product deleted successfully',product:product.lastRowid});
    }
    else
    {
    res.status(404).json({ error: 'Product Not Found',product: product.lastRowid});   
    }    
   }
  } 
  catch(error) 
  {
  console.log(error);
  }
}

