'use strict';

const server = require('../server');
//const cowsay = require('cowsay');
const chai = require('chai');
const expect = chai.expect;
const http = require('chai-http');
chai.use(http);

describe('Server', function() {
  before(done => {
    server.listen(3000);
    done();
  });

  describe('POST', function() {
    describe('/route endpoint', function() {
      it('should return 200 status', done => {
        chai.request(server)
        .post('/cowsay')
        .send({text: 'moo'})
        .end((err, res) =>{
          if(err) console.error(err.message);
          expect(res.status).to.equal(200);
        });
        done();
      });
    });


    describe('bad route', () => {
      it('should return 400 status on a bad request', done => {
        chai.request(server)
        .post('/')
        .end((err, res) =>{
          if(err) console.error(err.message);
          expect(res.status).to.equal(400);
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
