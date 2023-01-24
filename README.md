# Store Manager

Desenvolvido no módulo de back-end da [Trybe](https://www.betrybe.com/), o Store Manager é uma API Rest que funciona como sistema de gerenciamento de vendas. A integração com o banco de dados MySQL permite visualizar, criar, atualizar e deletar produtos. Feito em Node.js com arquitetura MSC (Model, Service e Controller). As três camadas possuem testes unitários com cobertura de 100%.

## Tecnologias

- JavaScript
- Node.js
- Express.js
- MySQL
- mysql2
- Docker
- Mocha, Chai e Sinon

## Executando o projeto

É recomendável utilizar o Docker para a execução do Store Manager. O arquivo docker-compose.yml, localizado na raiz do projeto, cria dois contêineres: "store_manager" (back-end em Node.js) e "store_manager_db" (database em MySQL).

**:warning: Seu docker-compose precisa estar na versão 1.29 ou superior. [Veja aqui](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-compose-on-ubuntu-20-04-pt) ou [na documentação](https://docs.docker.com/compose/install/) como instalá-lo. No primeiro artigo, você pode substituir onde está `1.26.0` por `1.29.2`.**

**:warning: Lembre-se de parar o MySQL se estiver usando localmente na porta padrão (3306), ou adapte.**

Na raiz, execute o seguinte comando para iniciar os contêineres em segundo plano:

```
docker-compose up -d
```
 
Você agora pode acessar o contêiner "store_manager" pelo VSCode ou conectar-se a ele pelo terminal em modo interativo:

```
docker exec -it store_manager bash
```
 
Dentro do contêiner, execute as dependências e inicie o servidor:

```
npm install
npm run debug
```

**:warning: **TODOS** os comandos disponíveis no `package.json` (npm start, npm test, npm run debug, ...) devem ser executados **DENTRO** do contêiner, ou seja, no terminal que aparece após a execução do comando `docker exec` citado acima.**

✨ **Dica:** A extensão `Remote - Containers` (que estará na seção de extensões recomendadas do VS Code) é indicada para que você possa desenvolver sua aplicação no contêiner Docker direto no VSCode, como você faz com seus arquivos locais.
