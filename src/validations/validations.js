const { saleSchema } = require('./schemas');
const productsModel = require('../models/productsModel');

const validateSale = (newSale) => {
  const { error } = saleSchema.validate(newSale);

  if (error) {
    const { details: [{ type, message }] } = error;
    return {
      type: type === 'number.min' ? 'INVALID_NUMBER' : 'FIELD_REQUIRED',
      message,
    };
  } 

  return { type: null, message: '' };
};

const validateExistingProduct = async (id) => {
  const product = await productsModel.show(id);

  if (!product) {
    return {
      type: 'NOT_FOUND',
    };
  }

  return { type: null };
};

module.exports = {
  validateSale,
  validateExistingProduct,
};