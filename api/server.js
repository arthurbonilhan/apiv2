const jsonServer = require('json-server');
const fs = require('fs');
const path = require('path');

const server = jsonServer.create();

// Crie o diretório /tmp se ele ainda não existir
const tmpDir = './tmp';
if (!fs.existsSync(tmpDir)) {
  fs.mkdirSync(tmpDir);
}

// Defina o caminho do arquivo de banco de dados temporário
const tmpDbFile = path.join(tmpDir, 'db.json');

// Defina o roteador usando o novo caminho do banco de dados temporário
const router = jsonServer.router(tmpDbFile);

const middlewares = jsonServer.defaults();

server.use(middlewares);

server.use(
  jsonServer.rewriter({
    '/api/*': '/$1',
    '/blog/:resource/:id/show': '/:resource/:id',
  })
);

server.use(router);

// Use process.env.PORT para determinar a porta de escuta, se estiver definida, caso contrário, use a porta 3000
const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`JSON Server is running on port ${port}`);
});

// Exporte o servidor API
module.exports = server;
