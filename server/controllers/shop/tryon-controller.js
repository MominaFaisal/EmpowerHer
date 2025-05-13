const axios = require('axios');
const mongoose = require('mongoose');
const path = require('path');
const FormData = require('form-data');
const Product = require('../../models/Product'); // Adjust the path as necessary

const virtualTryOn = async (req, res) => {
  const { imageUrl, productId } = req.body;

  // Validate inputs
  if (!imageUrl || !productId) {
    return res.status(400).json({
      success: false,
      message: 'Image URL and Product ID are required!',
    });
  }

  // Validate imageUrl format
  const urlRegex = /^https?:\/\/.*\.(?:jpg|jpeg|png)$/i;
  if (!urlRegex.test(imageUrl)) {
    return res.status(400).json({
      success: false,
      message: 'Image URL must be a valid URL ending in .jpg, .jpeg, or .png',
    });
  }

  // Validate productId format
  if (!mongoose.Types.ObjectId.isValid(productId)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid Product ID format',
    });
  }

  // Check if Product model is loaded
  if (!Product) {
    return res.status(500).json({
      success: false,
      message: 'Product model not available. Contact administrator.',
    });
  }

  // Validate product exists in database
  let product;
  try {
    console.log('Fetching product wiooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooth ID:', productId);
    
    product = await Product.findById({ _id:productId});
    console.log('Fetching product wiooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooth ID:', productId);

    if (!product) {
      return res.status(400).json({
        success: false,
        message: 'Product not found in database',
      });
    }
  } catch (error) {
    console.error('Error fetching product:', error.message, error.stack);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch product from database',
    });
  }

  // Validate product image
  const clothImage = product.image;
  if (!clothImage || !urlRegex.test(clothImage)) {
    return res.status(400).json({
      success: false,
      message: 'Product does not have a valid image URL (must end in .jpg, .jpeg, or .png)',
    });
  }

  // Prepare RapidAPI request with FormData
  const data = new FormData();
  data.append('personImage', imageUrl); // User-provided person photo
  data.append('clothImage', clothImage); // Product image from database

  console.log('Sending to RapidAPI:', {
    personImage: imageUrl,
    clothImage: clothImage,
  });

  const options = {
    method: 'POST',
    url: 'https://virtual-try-on2.p.rapidapi.com/clothes-virtual-tryon',
    headers: {
      'x-rapidapi-key': 'cf58fa88e5msh8ee773f184b33c5p14e1cajsn227f2a85e748',
      'x-rapidapi-host': 'virtual-try-on2.p.rapidapi.com',
      ...data.getHeaders(),
    },
    data: data,
  };

  try {
    console.log('RapidAPI Request Details:', {
      url: options.url,
      headers: {
        'x-rapidapi-key': 'cf58fa88e5msh8ee773f184b33c5p14e1cajsn227f2a85e748' + options.headers['x-rapidapi-key'].slice(-4),
        'x-rapidapi-host': options.headers['x-rapidapi-host'],
      },
      data: {
        personImage: imageUrl,
        clothImage: clothImage,
      },
    });
console.log("iiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii");

    const response = await axios.request(options);

console.log("iiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii");

    console.log('Virtual Try-On API Response:', response.image_url);

    res.status(200).json({
      success: true,
      data: response.data,
      image_url: response.image_url,
     
    });
  } catch (error) {
    console.error('Error during virtual try-on:', error.response?.data || error.message, error.stack);
    res.status(error.response?.status || 500).json({
      success: false,
      message: error.response?.data?.message || 'Failed to process the virtual try-on request.',
      errorDetails: error.response?.data || error.message,
    });
  }
};

module.exports = {
  virtualTryOn,
};
