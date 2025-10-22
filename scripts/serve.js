// scripts/serve.js
const http = require('http');
const fs = require('fs');
const path = require('path');

const port = 5000;

function serveFile(filePath, contentType, res) {
  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(404);
      res.end('Not found');
      return;
    }
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(content);
  });
}

const server = http.createServer((req, res) => {
  let filePath = '.' + (req.url === '/' ? '/public/index.html' : req.url);
  filePath = path.join(process.cwd(), filePath);

  const ext = path.extname(filePath);
  const map = {
    '.html': 'text/html',
    '.js': 'application/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
  };

  const contentType = map[ext] || 'text/plain';
  serveFile(filePath, contentType, res);
});

server.listen(port, () => console.log(`Server running at http://localhost:${port}`));
