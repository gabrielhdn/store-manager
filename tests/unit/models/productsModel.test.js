const { expect } = require('chai');
const sinon = require('sinon');
const conn = require('../../../src/models/connection');
const productsModel = require('../../../src/models/productsModel');
const { productsMock, productMock } = require('../mocks/productMocks');

describe('Testando a camada model de produtos', () => {
  afterEach(sinon.restore);

  it('Testando o retorno de todos os produtos', async () => {
    sinon.stub(conn, 'execute').resolves([productsMock]);

    const result = await productsModel.index();

    expect(result).to.be.equal(productsMock);
  });

  it('Testando o retorno de apenas um produto', async () => {
    sinon.stub(conn, 'execute').resolves([[productMock]]);

    const result = await productsModel.show(1);

    expect(result).to.be.equal(productMock);
  });

  it('Testando a inserção de um produto com sucesso', async () => {
    const product = 'Olho de Skadi';
    sinon.stub(conn, 'execute').resolves([{ insertId: 7 }]);

    const result = await productsModel.create(product);

    expect(result).to.be.equal(7);
  });
});