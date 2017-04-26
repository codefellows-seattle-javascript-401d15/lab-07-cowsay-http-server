'use strict';

const bodyParser = require('./lib/body-parser');
const http = require('http');
const url = require('url');
const queryString = require('querystring');
const cowsay = require('cowsay');
const PORT = process.env.PORT || 3000;

const server = module.exports = http.createServer(function(req, res) {
  console.log(req.url);
  req.url = url.parse(req.url);
  req.url.query = queryString.parse(req.url.query);

  if(req.method === 'POST') {
    if(req.url.pathname === '/cowsay') {
      return bodyParser(req, function(err) {
      // bodyParser(req, function(err) {
        if(err) console.error(err);
        let message = cowsay.say({text: req.body.text});
        console.log('Post request body ', req.body);
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.write(message);
        res.end(); // this will not be here; will be in a asych callback(s)
      });
    } else {
      // a body including the value returned from cowsay.say
      let message = cowsay.say(
        {text: 'bad request\ntry localhost:3000/cowsay with a proper body'}
      );
      res.writeHead(400, {'Content-Type': 'text/plain'});
      res.write(message);
      res.end();
    }
  }

  if(req.method === 'GET') {
    if(req.url.pathname === '/cowsay') {
      // return bodyParser(req, function(err) {

      console.log('Get request body ', req.url.query.text);

      // http GET :3000/cowsay?text=helloworld
      let message = cowsay.say({text: req.url.query.text});

      res.writeHead(200, {'Content-Type': 'text/plain'});
      res.write(message);
      res.end(); // this will not be here; will be in a asych callback(s)
    } else {
      // a body including the value returned from cowsay.say
      let message = cowsay.say(
        {text: 'bad request\ntry localhost:3000/cowsay with a proper body'}
      );
      res.writeHead(400, {'Content-Type': 'text/plain'});
      res.write(message);
      res.end();
    }
  }
});

server.listen(PORT, () => console.log(`Listening on port, ${PORT}`));

// For cowsay route.
// if(req.url.pathname === '/cowsay') {
//   //return bodyParser(req, function(err) {
//
//   // Hold text from user input.
//   // let queryText = req.body.text;
//   // let queryText = req.url.query.text;
//   // let message = req.body.text;
//   // console.log('Get log: ', req.url.query.text);
//   // // If no text from user.
//   // if (!req.url.query.text) {
//   //
//   //   // Throw error message.
//   //   let message = cowsay.say(
//   //     {text: 'bad request\ntry localhost:3000/cowsay with a proper body'}
//   //   );
//   //
//   //   // Error code bad request.
//   //   res.writeHead(400, {'Content-Type': 'text/plain'});
//   //   res.write(message);
//   //   res.end();
//   // }
//
//   // Otherwise show text from user, status 200 ok.
//   // res.writeHead(200, {'Content-Type': 'text/plain'});
//   // res.write(cowsay.say({text: req.url.query.text}));
//   // res.end();
// }
