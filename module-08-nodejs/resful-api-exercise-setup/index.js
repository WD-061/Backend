import http from 'http';
import { getAllPosts } from './crudOperations.js';

console.log('Connection string: ', process.env.PG_URI);

const requestHandler = async (req, res) => {
  const { url, method } = req;

  if (url === '/products') {
    if (method === 'GET') return await getAllPosts(req, res);
  } else {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ errorMessage: 'Page not found!' }));
  }
};

const server = http.createServer(requestHandler);

server.listen(3000, () => console.log('Server is running on port 3000'));
