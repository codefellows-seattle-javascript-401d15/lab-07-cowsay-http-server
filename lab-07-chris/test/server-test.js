'use strict';

const server = require('../server');
const chai = require('chai');
const http = require('chai-http');
const expect = chai.expect;

chai.use(http);

describe('Server module', () => {
  before(done => {
    server.listen(3000);
    done();
  });

  describe('POST method', () => {
    describe('/wrong endpoint', () => {
      it('should respond with a 400 on bad request', done => {
        chai.request(server)
        .post('/mokeysay')
        .send({})
        .end((err, res) => {
          expect(res.status).to.deep.equal(400);
          done();
        });
      });
    });

    describe('/cowsay endpoint', () => {
      it('should respond with a 200 on proper request', done => {
        chai.request(server)
        .post('/cowsay')
        .send({text: 'MOO!'})
        .end((err, res) => {
          if(err) console.error(err.message);
          expect(res.status).to.equal(200);
          done();
        });
      });
    });

    describe('/ endpoint', () => {
      it('should respond with a 200 request', done => {
        chai.request(server)
        .post('/')
        .send({})
        .end((err, res) => {

          expect(res.status).to.equal(200);
          done();
        });
      });
    });
  });

  describe('GET method', () => {
    describe('/wrong endpoint', () => {
      it('should respond with a 400 on bad request', done => {
        chai.request(server)
        .get('/billsay')
        .query({})
        .end((err, res) => {
          expect(res.status).to.equal(400);
          done();
        });
      });
    });

    describe('/cowsay endpoint', () => {
      it('should respond with a 200 on proper request', done => {
        chai.request(server)
        .get('/cowsay')
        .query({text: 'MOOOO!'})
        .end((err, res) => {
          expect(res.status).to.equal(200);
          done();
        });
      });
    });

    describe('/ endpoint', () => {
      it('should respond with a 200 on proper request', done => {
        chai.request(server)
        .post('/')
        .send({})
        .end((err, res) => {
          expect(res.status).to.equal(200);
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
