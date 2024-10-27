const jsonServer = require('json-server');
const cors = require('cors');
const server = jsonServer.create();
const router = jsonServer.router('src/data/db.json'); // Path to your db.json
const middlewares = jsonServer.defaults();

// Use CORS middleware to enable cross-origin requests
server.use(cors());

// Use default middlewares (logger, static, cors, no-cache)
server.use(middlewares);

// Use the JSON server router
server.use(router);

// Set the server to listen on port 5001
const PORT = 5001;
server.listen(PORT, () => {
  console.log(`JSON Server is running on port ${PORT}`);
});


//npx json-server --watch src/data/db.json --port 5001
