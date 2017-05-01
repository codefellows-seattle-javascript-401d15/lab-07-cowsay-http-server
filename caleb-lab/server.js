'use strict';

const bodyParser = require('./lib/body-parser');
const http = require('http');
const url = require('url');
const queryString = require('querystring');
const cowsay = require('cowsay');
const PORT = process.env.PORT || 3000;

const server = module.exports = http.createServer(function(req, res){
  console.log(req.url);
  req.url = url.parse(req.url);
  req.url.query = queryString.parse(req.url.query);

  if(req.method === 'POST'){
    if(req.url.pathname === '/cowsay'){
      bodyParser(req, function(err){
        if(err) console.error(err);
        let message = cowsay.think({text: req.body.text});
        console.log(res.body);
        res.writeHead(200, {'Content-Type': 'text/plain' });
        res.write(message);
        res.end(); // this will not be here, will be in asynchronous callback(s);
      });
    }else if(req.url.pathname === '/'){
      bodyParser(req, function(err){
        if(err) console.error(err);
        let message = cowsay.think({text: '200 Successful retrieval'});
        console.log(res.body);
        res.writeHead(200, {'Content-Type': 'text/plain' });
        res.write(message);
        res.end(); // this will not be here, will be in asynchronous callback(s);
      });
    }else{
      let message = cowsay.say({text: '400: bad request\n try localhost:3000/cowsay with a proper body'});
      res.writeHead(400, {'Content-Type': 'text/plain' });
      res.write(message);
      res.end();
      // badrequest
    }
  }
  if(req.method === 'GET'){
    if(req.url.pathname === '/cowsay'){
      bodyParser(req, function(err){
        if(err) console.error(err);
        let message = cowsay.think({text: 'You done goofed(still 200).'});
        console.log(res.body);
        res.writeHead(200, {'Content-Type': 'text/plain' });
        res.write(message);
        res.end(); // this will not be here, will be in asynchronous callback(s);
      });
    }else if(req.url.pathname === '/'){
      bodyParser(req, function(err){
        if(err) console.error(err);
        let message = cowsay.think({text: '200 Successful retrieval'});
        console.log(res.body);
        res.writeHead(200, {'Content-Type': 'text/plain' });
        res.write(message);
        res.end(); // this will not be here, will be in asynchronous callback(s);
      });
    }else{
      let message = cowsay.say({text: '400: bad request\n try localhost:3000/cowsay'});
      res.writeHead(400, {'Content-Type': 'text/plain' });
      res.write(message);
      res.end();
      // badrequest
    } // this will not be here, will be in asynchronous callback(s);
  }
});

server.listen(PORT, () => console.log(`Listening on port, http://localhost:${PORT}`));
