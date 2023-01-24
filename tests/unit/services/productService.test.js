const { expect } = require('chai');
const sinon = require('sinon');
const productsService = require('../../../src/services/productsService');
const productsModel = require('../../../src/models/productsModel');
const { productsMock, productMock } = require('../mocks/productMocks');

describe('Testando a camada service de produtos', () => {
  afterEach(sinon.restore);

  it('Testando o método index', async () => {
    sinon.stub(productsModel, 'index').resolves(productsMock);

    const result = await productsService.index();

    expect(result).to.be.equal(productsMock);
  });

  it('Testando o método show', async () => {
    sinon.stub(productsModel, 'show').resolves(productMock);

    const result = await productsService.show(1);

    expect(result).to.be.equal(productMock);
  });

  it('Testando o método create', async () => {
    sinon.stub(productsModel, 'create').resolves(7);

    const { id } = await productsService.create({ name: 'Olho de Skadi' });

    expect(id).to.be.equal(7);
  });
});