'use strict';

const server = require('../server.js');
const cowsay = require('cowsay');
const chai = require('chai');
const http = require('chai-http');
const expect = chai.expect;

chai.use(http);

describe('Server module', function() {
  before(done => {
    server.listen(3000);
    done();
  });
  after(done => {
    server.close();
    done();
  });

  describe('POST and GET methods', function() {
    describe('Show / POST endpoint:', function() {
      it('should respond with a 200 on bad request, and a cow \n_____________________________________________________________________', done => {
        chai.request(server)
        .post('/')
        .send({})
        .end((err, res) => {
          if(err) console.error(err.message);
          expect(res.status).to.equal(200);
          console.log('working', res.status);
          console.log(res.text);
          done();
        });
      });
      describe('Show /cowsay POST endpoint:', function() {
        it('should respond with a 200, and a cow \n_____________________________________________________________________', done => {
          // let message = cowsay.think({text: 'Cow said mooo'});
          let message = {text: 'My milk-pail is the one that has \'Bad Mother Fucker\' written on it'};
          chai.request(server)
          .post('/cowsay')
          .send(message)
          .end((err, res) => {
            if(err) console.error(err.message);
            expect(res.status).to.equal(200);
            expect(res.text).to.equal(cowsay.think({text: 'My milk-pail is the one that has \'Bad Mother Fucker\' written on it'}));
            console.log('working', res.status);
            console.log(res.text);
            done();
          });
        });
        describe('Show /wookie POST endpoint:', function() {
          it('should respond with a 400 on bad request, and a cow \n_____________________________________________________________________', done => {
            chai.request(server)
            .post('/wookie')
            .send({})
            .end((err, res) => {
              if(err) console.error(err.message);
              expect(res.status).to.equal(400);
              console.log(res.status);
              console.log(res.text);
              done();
            });
          });
        });
      });
    });
  });
  describe('GET methods', function() {
    describe('Show / GET endpoint:', function() {
      it('should respond with a 200 on bad request, and a cow \n_____________________________________________________________________', done => {
        chai.request(server)
        .get('/')
        .send({})
        .end((err, res) => {
          if(err) console.error(err.message);
          expect(res.status).to.equal(200);
          console.log('working', res.status);
          console.log(res.text);
          done();
        });
      });
      describe('Show /cowsay GET endpoint:', function() {
        it('should respond with a 200, and a cow \n_____________________________________________________________________', done => {
          // let message = cowsay.think({text: 'Cow said mooo'});
          chai.request(server)
          .get('/cowsay')
          .send({})
          .end((err, res) => {
            if(err) console.error(err.message);
            expect(res.status).to.equal(200);
            console.log('working', res.status);
            console.log(res.text);
            done();
          });
        });
        describe('Show /wookie GET endpoint:', function() {
          it('should respond with a 400 on bad request, and a cow \n_____________________________________________________________________', done => {
            chai.request(server)
            .get('/wookie')
            .send({})
            .end((err, res) => {
              if(err) console.error(err.message);
              expect(res.status).to.equal(400);
              console.log(res.status);
              console.log(res.text);
              done();
            });
          });
        });
      });
    });
  });
});
