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
    describe('undefined endpoint', function() {
      it('should respond with a 400 on bad request', done => {
        chai.request(server)
        .post('/blah')
        .send({})
        .end((err, res) => {
          expect(err).to.not.be.null;
          expect(res.status).to.equal(400);
        });
        done();
      });
    });
    
    describe('/ endpoint', function() {
      it('should respond with "Hello World"', done => {
        chai.request(server)
        .post('/')
        .send({})
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res.body).to.equal('Hello World');
        });
        done();
      });
      
      it('should respond with a 200 on proper request', done => {
        chai.request(server)
        .post('/')
        .send({})
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res.status).to.equal(400);
        });
        done();
      });
      
      it('should respond with a 400 on bad request', done => {
        chai.request(server)
        .post('/')
        .send({})
        .end((err, res) => {
          expect(err).to.not.be.null;
          expect(res.status).to.equal(400);
        });
        done();
      });
      
      it('should contain a header', done => {
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
          expect(err).to.be.null;
          expect(res.status).to.equal(400);
        });
        done();
      });
      
      it('should respond with a 400 on bad request', done => {
        chai.request(server)
        .post('/cowsay')
        .send({})
        .end((err, res) => {
          expect(err).to.not.be.null;
          expect(res.status).to.equal(400);
        });
        done();
      });
      
      it('should contain a header', done => {
        chai.request(server)
        .post('/cowsay')
        .send({})
        .end((err, res) => {
          expect(res).to.have.header('content-type', 'text/plain');
        });
        done();
      });
      
      it('should be an object', done => {
        chai.request(server)
        .post('/cowsay')
        .send({})
        .end((err, res) => {
          expect(res).to.be.a('object');
        });
        done();
      });
      
      it('should respond with user input', done => {
        chai.request(server)
        .post('/')
        .send({'query':'moo'})
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res.body).to.equal('moo');
        });
        done();
      });
    });
  });
  
  describe('GET method', function() {    
    describe('undefined endpoint', function() {
      it('should respond with a 400 on bad request', done => {
        chai.request(server)
        .get('/blah')
        .send({})
        .end((err, res) => {
          expect(err).to.not.be.null;
          expect(res.status).to.equal(400);
        });
        done();
      });
    });
    
    describe('/ endpoint', function() {
      it('should respond with a 400 on bad request', done => {
        chai.request(server)
        .get('/blah')
        .send({})
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res.status).to.equal(400);
        });
        done();
      });
      
      it('should respond with a 200 on proper request', done => {
        chai.request(server)
        .post('/')
        .send({})
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res.status).to.equal(400);
        });
        done();
      });
      
      it('should contain a header', done => {
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
          expect(err).to.be.null;
          expect(res.status).to.equal(200);
        });
        done();
      });
      
      it('should respond with a 400 on bad request', done => {
        chai.request(server)
        .get('/blah')
        .send({})
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res.status).to.equal(400);
        });
        done();
      });
      
      it('should contain a header', done => {
        chai.request(server)
        .post('/')
        .send({})
        .end((err, res) => {
          expect(res).to.have.header('content-type', 'text/plain');
        });
        done();
      });
      
      it('should be an object', done => {
        chai.request(server)
        .post('/cowsay')
        .send({})
        .end((err, res) => {
          expect(res).to.be.a('object');
        });
        done();
      });
      
      it('should respond with user input', done => {
        chai.request(server)
        .post('/')
        .send({'query':'moo'})
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res.body).to.equal('moo');
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