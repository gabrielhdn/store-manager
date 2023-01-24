const { expect } = require('chai');
const sinon = require('sinon');
const conn = require('../../../src/models/connection');
const salesModel = require('../../../src/models/salesModel');
const { newSaleMock } = require('../mocks/salesMocks');

describe('Testando a camada models de vendas', () => {
  afterEach(sinon.restore);

  it('Testando a inserção de uma venda com sucesso', async () => {
    sinon.stub(conn, 'execute').resolves([{ insertId: 7 }]);

    const result = await salesModel.create(newSaleMock);

    expect(result).to.equal(7);
  });
});
