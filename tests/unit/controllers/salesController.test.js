const { expect } = require('chai');
const sinon = require('sinon');
const salesService = require('../../../src/services/salesService');
const salesController = require('../../../src/controllers/salesController');
const { newSaleMock, newSaleIdMock, invalidSaleMock } = require('../mocks/salesMocks');

const { message } = newSaleIdMock;
const { message: invalidMessage } = invalidSaleMock;

describe('Testando a camada controller de vendas', () => {
  afterEach(sinon.restore);

  it('Testando o método create com sucesso', async () => {
    const req = { body: newSaleMock };
    const res = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(message);
    sinon.stub(salesService, 'create').resolves({ type: null, message });

    await salesController.create(req, res);

    expect(res.status.calledWith(201)).to.be.true;
    expect(res.json.calledWith(message)).to.be.true;
  });

  it('Testando o método create com erro', async () => {
    const req = { body: newSaleMock };
    const res = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(invalidMessage);
    sinon.stub(salesService, 'create').resolves(invalidSaleMock);

    await salesController.create(req, res);

    expect(res.status.calledWith(400)).to.be.true;
    expect(res.json.calledWith(invalidMessage));
  });
})