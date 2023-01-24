const newSaleMock = [
  {
    "productId": 1,
    "quantity": 1
  },
  {
    "productId": 2,
    "quantity": 5
  }
];

const newSaleIdMock = {
  type: null,
  message: {
    id: 7,
    itemsSold: newSaleMock
  }
};

const notFoundMock = {
  type: 'NOT_FOUND',
  message: 'Product not found',
};

const invalidSaleMock = {
  type: 'FIELD_REQUIRED',
  message: 'Field required',
};

module.exports = {
  newSaleMock,
  newSaleIdMock,
  notFoundMock,
  invalidSaleMock,
};