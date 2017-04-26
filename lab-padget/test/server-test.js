'use strict';

const server = require('../server');
// const cowsay = require('cowsay');
const chai = require('chai');
const http = require('chai-http');
const expect = chai.expect;

chai.use(http);

describe('Server module', function() {
  before(done => {
    server.listen(3000);
    done();
  });

  describe('POST method', function() {
    describe('/ endpoint', function() {
      it('should respond with a 400 on bad request', done => {
        chai.request(server)
        .post('/mokeysay')
        .send({})
        .end(function(err, res) {
          if(err) console.error(err.message);
          expect(res.status).to.equal(400);
          done();
        });
      });
    });

    describe('/cowsay endpoint', function() {
      it('should respond with a 200 on proper request', done => {
        chai.request(server)
        .post('/cowsay')
        .send({text: 'hello world'})
        .end(function(err, res) {
          if(err) console.error(err.message);
          console.log('Log of POST 200 ', res.status);
          expect(res.status).to.equal(200);
          done();
        });
      });
    });
  });

  describe('GET method', function() {
    // describe('/ endpoint', function() {
    //   it('should respond with a 400 on bad request', done => {
    //
    //     done();
    //   });
    // });
    describe('/cowsay endpoint', function() {
      it('should respond with a 200 on proper request', done => {
        chai.request(server)
        .get('/cowsay')
        .query({text: 'text'})
        .end(function(err, res) {
          if(err) console.error(err);
          console.log('Log of POST 200 ', res.status);
          // expect(res.status).to.equal(200);
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          done();
        });
      });
      // it('should respond with a 400 on bad request', done => {
      //
      //   done();
      // });
    });
  });

  after(done => {
    server.close();
    done();
  });
});
