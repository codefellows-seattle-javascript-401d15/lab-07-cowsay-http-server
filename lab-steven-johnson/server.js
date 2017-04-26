'use strict';

const bp = require('./lib/body-parser');
const http = require('http');
const url = require('url');
const queryString = require('querystring');
const cowsay = require('cowsay');
const PORT = process.env.PORT || 3000;

const server = module.exports = http.createServer(function(req, res){
  req.url = url.parse(req.url);
  req.url.query = queryString.parse(req.url.query);
  console.log(req.url);

  if (req.method === 'POST') {

    if (req.url.pathname === '/cowsay') {
      bp(req, function(err){
        if (err) console.error(err);
        let message = cowsay.say({text: req.body.text});
        console.log(req.body);
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.write(message);
        res.end();
      });
    } else if (req.url.pathname === '/') {
      res.writeHead(200, {'Content-Type': 'text/plain'});
      res.write('hello world!');
      res.end();
    } else {
      let message = cowsay.say({text: 'bad request\ntry: localhost:3000/cowsay text=howdy'});
      res.writeHead(400, {'Content-Type': 'text/plain'});
      res.write(message);
      res.end();
    }
  }

  if (req.method === 'GET') {

    if (req.url.pathname === '/cowsay'){
      let reqQuery = cowsay.say(req.url.query);
      console.log(req.body);
      res.writeHead(200, {'Content-Type': 'text/plain'});
      res.write(reqQuery);
      res.end();
    } else if (req.url.pathname === '/') {
      res.writeHead(200, {'Content-Type': 'text/plain'});
      res.write('hello world!');
      res.end();
    } else {
      let message = cowsay.say({text: 'bad request\ntry: localhost:3000/cowsay?text=howdy'});
      res.writeHead(400, {'Content-Type': 'text/plain'});
      res.write(message);
      res.end();
    }
  }

});

server.listen(PORT, () => console.log('Listening on PORT: ', PORT));
