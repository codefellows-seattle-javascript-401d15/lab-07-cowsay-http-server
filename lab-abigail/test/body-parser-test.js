'use strict';

const server = require('../server');
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
      it('should respond with a 400 on bad request', done => {
        chai.request(server)
        .post('/monkeysay')
        .send({})
        .end((err, res) => {
          expect(res.status).to.equal(400);
        });
        done();
      });

      it('should respond with a 400 on en empty request', done => {
        chai.request(server)
        .post('/')
        .send({})
        .end((err, res) => {
          expect(res.status).to.equal(400);
        });
        done();
      });

      it('should respond with text of Hello World', done => {
        chai.request(server)
        .post('/')
        .send({})
        .end((err, res) => {
          expect(res.body).to.equal('Hello World');
        });
        done();
      });

      it('should contain text for content-type in the header', done => {
        chai.request(server)
        .post('/')
        .send({})
        .end((err, res) => {
          expect(res).to.have.header('content-type', 'text/plain');
        });
        done();
      });
    });

    describe('/cowsay endpoint', function() {
      it('should respond with a 200 on proper request', done => {
        chai.request(server)
        .post('/cowsay')
        .send({})
        .end((err, res) => {
          expect(res.status).to.equal(200);
        });
        done();
      });

      it('should contain text for content-type in the header', done => {
        chai.request(server)
        .post('/cowsay')
        .send({})
        .end((err, res) => {
          expect(res).to.have.header('content-type', 'text/plain');
        });
        done();
      });
    });
  });

  describe('GET method', function() {

    describe('/ endpoint', function() {

      it('should respond with a 400 on bad request', done => {
        chai.request(server)
        .get('/')
        .send({})
        .end((err, res) => {
          expect(res.status).to.equal(400);
        });
        done();
      });

      it('should respond with text of Hello World', done => {
        chai.request(server)
        .get('/')
        .send({})
        .end((err, res) => {
          expect(res.body).to.equal('Hello World');
        });
        done();
      });

      it('should contain text for content-type in the header', done => {
        chai.request(server)
        .post('/')
        .send({})
        .end((err, res) => {
          expect(res).to.have.header('content-type', 'text/plain');
        });
        done();
      });
    });

    describe('/cowsay endpoint', function() {
      it('should respond with a 200 on proper request', done => {
        chai.request(server)
        .get('/cowsay')
        .send({})
        .end((err, res) => {
          expect(res.status).to.equal(200);
        });
        done();
      });

      it('should contain text for content-type in the header', done => {
        chai.request(server)
        .get('/cowsay')
        .send({})
        .end((err, res) => {
          expect(res).to.have.header('content-type', 'text/plain');
        });
        done();
      });

      it('should respond with a 400 on bad request', done => {
        chai.request(server)
        .get('/monkeysay')
        .send({})
        .end((err, res) => {
          expect(res.status).to.equal(400);
        });
        done();
      });

      it('should contain text for content-type in the header', done => {
        chai.request(server)
        .get('/monkeysay')
        .send({})
        .end((err, res) => {
          expect(res).to.have.header('content-type', 'text/plain');
        });
        done();
      });
    });
  });

  after(done => {
    server.close();
    done();
  });
});
