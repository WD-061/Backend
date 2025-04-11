import http from 'http';

const requestHandler = (request, response) => {
  console.log('Method: ', request.method);
  console.log('URl: ', request.url);
  response.statusCode = 200;
  response.setHeader('Content-Type', 'text/plain');
  response.end('Hello world');
};

const server = http.createServer(requestHandler);

server.listen(8080, () => {
  console.log('Server is running on port 8080');
});
