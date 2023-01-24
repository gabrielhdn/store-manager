const { expect } = require('chai');
const sinon = require('sinon');
const { productsMock, productMock } = require('../mocks/productMocks');
const productsService = require('../../../src/services/productsService');
const productsController = require('../../../src/controllers/productsController');

describe('Testando a camada controller de produtos', () => {
  afterEach(sinon.restore);

  it('Testando o controller index', async () => {
    const req = {};
    const res = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(productsMock);
    sinon.stub(productsService, 'index').resolves(productsMock);

    await productsController.index(req, res);

    expect(res.status.calledWith(200)).to.be.true;
    expect(res.json.calledWith(productsMock)).to.be.true;
  });

  it('Testando o controller show em caso de sucesso', async () => {
    const req = { params: { id: 1 } };
    const res = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(productMock);
    sinon.stub(productsService, 'show').resolves(productMock);

    await productsController.show(req, res);

    expect(res.status.calledWith(200)).to.be.true;
    expect(res.json.calledWith(productMock)).to.be.true;
  });

  it('Testando o controller show com parâmetro inválido', async () => {
    const req = { params: { id: 4 } };
    const res = {};
    const message = { message: 'Product not found' }

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(message);

    await productsController.show(req, res);

    expect(res.status.calledWith(404)).to.be.true;
    expect(res.json.calledWith(message)).to.be.true;
  });

  it('Testando o controller create em caso de sucesso', async () => {
    const req = { body: { name: 'Olho de Skadi' } };
    const res = {};
    const content = { id: 4, name: 'Olho de Skadi' };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(content);
    sinon.stub(productsService, 'create').resolves(content);

    await productsController.create(req, res);

    expect(res.status.calledWith(201)).to.be.true;
    expect(res.json.calledWith(content)).to.be.true;
  });
});