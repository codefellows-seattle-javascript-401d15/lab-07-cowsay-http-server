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
  describe('POST method', function() {
    describe('/ endpoint', function() {
      it('should respond with a 200 on proper request', done => {
        chai.request(server)
        .post('/')
        .send({})
        .end((err, res) => {
          expect(res.status).to.equal(200)
          done();
        });
      });
    });
  });
  describe('/cowsay endpoint', function() {
    it('should respond with a 200 on proper request', done => {
      chai.request(server)
      .post('/cowsay')
      .send({text: 'Hello'})
      .end((err, res) => {
        expect(res.status).to.equal(200)
        done();
      });
    });
    it('should respond with a 400 on bad request', done => {
      chai.request(server)
      .post('/monkey')
      .send({})
      .end((err, res) => {
        expect(res.status).to.equal(400)
        done();
      })
    });
  });
  describe('GET method', function() {
    describe('/ endpoint', function() {
      it('should respond with a 200 on proper request', done => {
        chai.request(server)
        .get('/')
        .end((err, res) => {
          expect(res.status).to.equal(200)
          done();
        });
      });
    });
    describe('/cowsay endpoint', function() {
      it('should respond with a 200 on proper request', done => {
        chai.request(server)
        .get('/cowsay?text=hello')
        .end((err, res) => {
          let message = cowsay.say({text: 'hello'});
          expect(res.text).to.equal(message);
          expect(res.status).to.equal(200)
          done();
        });
      });
      it('should respond with a 400 on bad request', done => {
        chai.request(server)
        .get('/monkey')
        .end((err,res) => {
          expect(res.status).to.equal(400)
          done();
        });
      });
    });
  });
  after(done => {
    server.close();
    done();
  });
});
