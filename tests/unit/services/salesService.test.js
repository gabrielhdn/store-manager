const { expect } = require('chai');
const sinon = require('sinon');
const productsModel = require('../../../src/models/productsModel');
const salesModel = require('../../../src/models/salesModel');
const salesService = require('../../../src/services/salesService');
const validations = require('../../../src/validations/validations');
const { newSaleMock, newSaleIdMock, notFoundMock, invalidSaleMock } = require('../mocks/salesMocks');

describe('Testando a camada service de vendas', () => {
  afterEach(sinon.restore);

  it('Testando o método create com sucesso', async () => {
    sinon.stub(salesModel, 'create').resolves(7);

    const result = await salesService.create(newSaleMock);

    expect(result).to.be.deep.equal(newSaleIdMock);
  });

  it('Testando o método create com produto inválido', async () => {
    sinon.stub(validations, 'validateExistingProduct').resolves({ type: 'NOT_FOUND' });

    const result = await salesService.create(newSaleMock);

    expect(result).to.be.deep.equal(notFoundMock);
  });

  it('Testando o método create com compra inválida', async () => {
    sinon.stub(validations, 'validateSale').returns(invalidSaleMock);
    
    const result = await salesService.create(newSaleMock);

    expect(result).to.be.deep.equal(invalidSaleMock);
  });
});