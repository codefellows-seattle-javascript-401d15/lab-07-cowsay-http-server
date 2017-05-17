'use strict';

const bodyParser = require('./lib/body-parser.js');
const http = require('http');
const url = require('url');
const queryString = require('querystring');
const cowsay = require('cowsay');
const PORT = process.env.PORT || 3000;

const server = module.exports = http.createServer(function(req, res) {
  req.url = url.parse(req.url);
  req.url.query = queryString.parse(req.url.query);
  if(req.method === 'POST'){
    if(req.url.pathname === '/cowsay'){
      bodyParser(req, function(err){
        if(err) console.error(err.message);
        let message = cowsay.say({text: req.body.text});
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.write(message);
        res.end();
      });
    }
    if(req.url.pathname === '/beavis') {
      bodyParser(req, function(err){
        if(err) console.error(err.message);
        let message = cowsay.say({text: req.body.text, f: 'beavis.zen'});
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.write(message);
        res.end();
      });
    }
    else {
      let message = cowsay.say(
        {text: 'bad request\ntry localhost:3000/cowsay with a proper body'}
      );
      res.writeHead(400, {'Content-Type': 'text/plain'});
      res.write(message);
      res.end();
    }
  }
});

server.listen(PORT, () => console.log(`listening on ${PORT}`));
