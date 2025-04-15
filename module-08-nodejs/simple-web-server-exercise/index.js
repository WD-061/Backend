import http from 'http';
import { createFileWithMessage, deleteFileByName } from './fileOperations.js';

const requestHandler = async (req, res) => {
  const deleteUrlRegex = /^\/files\/[a-zA-Z0-9-]+\/[a-zA-Z0-9:-]+\.txt$/;
  const { method, url } = req;

  if (url === '/files') {
    if (method === 'POST') {
      let body = '';

      req.on('data', (chunk) => {
        body += chunk.toString();
      });

      req.on('end', async () => {
        let parsedBody;

        try {
          parsedBody = JSON.parse(body);
        } catch (error) {
          //Will run if JSON parsing fails. Most likely cos the body was not valid JSON.
          res.statusCode = 400;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ errorMessage: 'Invalid Body' }));
        }

        //Account for missing body in req
        if (!parsedBody) {
          res.statusCode = 400;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ errorMessage: 'Body is missing!' }));
        }

        await createFileWithMessage(parsedBody.message);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(
          JSON.stringify({ successMessage: 'File created successfully' })
        );
      });
    } else {
      res.statusCode = 405;
      res.setHeader('Content-Type', 'text/plain');
      res.end('Unsupported method');
    }
  } else if (deleteUrlRegex.test(url)) {
    if (method === 'DELETE') {
      const filePath = url.split('/').slice(2).join('/'); //extracts the foldername and filename from the url
      await deleteFileByName(filePath);
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ successMessage: 'File deleted successfully' }));
    }
  } else {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ errorMessage: 'Page not found!' }));
  }
};

const server = http.createServer(requestHandler);

server.listen(3000, () => console.log('Server is running on port 3000!'));
