'use strict';

const bodyParser = require('./lib/body-parser');
const http = require('http');
const url = require('url');
const queryString = require('querystring');
const cowsay = require('cowsay');
const PORT = process.env.PORT || 3000;

const server = module.exports = http.createServer(function(req, res) {
  req.url = url.parse(req.url);
  req.url.query = queryString.parse(req.url.query);

  if (req.method === 'POST') {
    if(req.url.pathname === '/cowsay') {
      bodyParser(req, function(err) {
        if(err) console.error(err);
        let message = cowsay.say({text: req.body.text});
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.write(message);
        res.end();
      });
    } else if(req.url.pathname === '/') {
      let message = cowsay.say({text: 'Hello, world!'});
      res.writeHead(200, {'Content-Type': 'text/plain'});
      res.write(message);
      res.end();
    } else {
      let message = cowsay.say({text: 'bad request\nplease use a proper pathname!'});
      res.writeHead(400, {'Content-Type': 'text/plain'});
      res.write(message);
      res.end();
    }
  }

  if(req.method === 'GET') {
    if(req.url.pathname === '/cowsay') {
      let message = cowsay.say({text: req.url.query});
      res.writeHead(200, {'Content-Type': 'text/plain'});
      res.write(message);
      res.end();
    } else if(req.url.pathname === '/') {
      let message = cowsay.say({text: 'Hello, world!'});
      res.writeHead(200, {'Content-Type': 'text/plain'});
      res.write(message);
      res.end();
    } else {
      let message = cowsay.say({text: 'bad request\nplease use a proper pathname!'});
      res.writeHead(400, {'Content-Type': 'text/plain'});
      res.write(message);
      res.end();
    }
  }
});

server.listen(PORT, () => console.log(`Listening on port ${PORT}!`));
