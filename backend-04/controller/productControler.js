const productModel = require('../models/productModel');

exports.getProduct = async (req,res) => 
{
  try 
  {
  const product = await productModel.getAllProduct(req);
  if(product.rows != 0)
    {
    res.status(200).json({ message: 'Product found successfully', result: product.rows});
    }
    else
    {
    res.status(404).json({ message: 'Product not found'});
    }
  }
  catch(error) 
  {
  console.log(error);  
  }
}

exports.createProduct = async (req,res) =>
{
  try 
  {
  const product = await productModel.createNewProduct(req);
  if(product.lastRowid != null)
    {
    res.status(404).json({ message: 'Cant create product'});
    }
    else
    {
    res.status(200).json({ message: 'Product created successfully', result: product});
    }  
  } 
  catch(error) 
  {
  console.log(error);  
  } 
}

exports.getProductById = async (req,res) => 
{
   try 
   {
   const product = await productModel.getProductById(req);
   if(product.rows != 0)
    {
    res.status(200).json({ message: 'Product found successfully', result: product.row});
    }
    else
    {
    res.status(404).json({ message: 'Product not found'});
    }
   } 
   catch(error) 
   {
   console.log(error);
   }
}

exports.deleteProductById = async (req,res) => 
{
   try
   {
   const product = await productModel.deleteProduct(req);
   if(product.lastRowid != null)
    {
    res.status(200).json({ message: 'Product deleted successfully',product:product.lastRowid});
    }
    else
    {
    res.status(404).json({ error: 'Product Not Found',product: product.lastRowid});   
    }    
   }
   catch(error) 
   {
   console.log(error);
   }
}

exports.updateProduct = async (req,res) =>
{
    try
    {
    const product = await productModel.updateProductById(req);
    if(product.lastRowid != null)
        {
        res.status(200).json({ message: 'Product updated successfully', result: product });
        }
    else
        {
        res.status(404).json({ error: 'Product Not Found', result: product });   
        }    
    }
    catch(error)
    {
    res.status(500).json({error: 'Database error'});
    }
}   