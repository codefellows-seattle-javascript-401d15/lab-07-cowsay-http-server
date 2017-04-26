'use strict';

const bodyParser = require('./lib/body-parser.js');
const http = require('http'); //instead of net module
const url = require('url');
const querystring = require('querystring');
const cowsay = require('cowsay');
const PORT = process.env.PORT || 3000;

const server = module.exports = http.createServer(function(req, res) { 
  req.url = url.parse(req.url); 
  req.url.query = querystring.parse(req.url.query);
  
  if(req.method === 'POST') {
    if(req.url.pathname === '/cowsay') {
      return bodyParser(req, function(err) {
        if(err) console.error(err);
        console.log(req.body.text);
        let message = cowsay.say({text: req.body.text, f: 'goat'});
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.write(message);
        res.end();
      });
    } 
    
    if(req.url.pathname === '/') {
      res.write('Hello World!');
      res.end();
    }
    
    else {
      let message = cowsay.think({text: 'Bad request!\nTry localhost:3000/cowsay'});
      res.writeHead(400, {'Content-Type': 'text/plain'});
      res.write(message);
      res.end();
    }
  }
  
  if(req.method === 'GET') {
    if(req.url.pathname === '/cowsay') {
      let message = cowsay.say({text: req.url.query.text});
      res.writeHead(200, {'Content-Type': 'text/plain'});
      res.write(message);
      res.end();
    } 
    
    if(req.url.pathname === '/') {
      res.write('Hello World!');
      res.end();
    }
    
    else {
      let message = cowsay.think({text: 'Bad request!\nTry localhost:3000/cowsay'});
      res.writeHead(400, {'Content-Type': 'text/plain'});
      res.write(message);
      res.end();
    }
  }
  
  res.end();
});

server.listen(PORT, () => console.log(`Listening on PORT:, ${PORT}`));