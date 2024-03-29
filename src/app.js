const http = require('http');

const server = http.createServer((req, res) => {
  if (req.method === 'POST' && req.url === '/') {
    let body = '';

    req.on('data', chunk => {
      body += chunk.toString(); // convert Buffer to string
    });

    req.on('end', () => {
      try {
        const obj = JSON.parse(body);
        if (obj.hasOwnProperty('num1') && Number.isInteger(obj.num1)) {
          const value = obj.num1;
          if (value % 2 === 0) {
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end(`The number ${value} is even`);
          } else {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end(`The number ${value} is odd`);
          }
        } else {
          throw new Error('Invalid input');
        }
      } catch (e) {
        res.writeHead(400, { 'Content-Type': 'text/plain' });
        res.end('Invalid JSON payload');
      }
    });
  } else {
    res.writeHead(405, { 'Content-Type': 'text/plain' });
    res.end('Method Not Allowed');
  }
});

module.exports = server;

