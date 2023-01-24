const salesModel = require('../models/salesModel');
const validations = require('../validations/validations');

const doProductsExist = async (newSale) => {
  const validationArr = await Promise.all(newSale
    .map(({ productId }) => validations.validateExistingProduct(productId)));
    
  return validationArr.every(({ type }) => type === null);
};

const create = async (newSale) => {
  const validationResult = validations.validateSale(newSale);

  if (validationResult.type) return validationResult;

  if (!await doProductsExist(newSale)) {
    return {
      type: 'NOT_FOUND',
      message: 'Product not found',
    };
  }

  const id = await salesModel.create(newSale);
  return { type: null, message: { id, itemsSold: newSale } };
};

const index = async () => {
  const result = await salesModel.index();
  return result;
};

const show = async (id) => {
  const result = await salesModel.show(id);

  if (!result.length) {
    return {
      type: 'NOT_FOUND',
      message: 'Sale not found',
    };
  }

  return { type: null, message: result };
};

const remove = async (id) => {
  const affectedRows = await salesModel.remove(id);

  if (!affectedRows) {
    return { type: 'NOT_FOUND', message: 'Sale not found' };
  }

  return { type: null, message: '' };
};

const update = async (id, sale) => {
  const validationResult = validations.validateSale(sale);

  if (validationResult.type) return validationResult;

  if (!await doProductsExist(sale)) {
    return { type: 'NOT_FOUND', message: 'Product not found' };
  }

  const salesArr = await Promise.all(sale
    .map(({ productId, quantity }) => salesModel.update({ id, productId, quantity })));

  if (salesArr.some(({ affectedRows }) => !affectedRows)) {
    return { type: 'NOT_FOUND', message: 'Sale not found' };
  }

  return { type: null, message: { saleId: id, itemsUpdated: sale } };
};

module.exports = {
  create,
  doProductsExist,
  index,
  show,
  remove,
  update,
};