'use strict';

const server = require('../server');
const cowsay = require('cowsay');
const chai = require('chai');
const http = require('chai-http');
const expect = chai.expect;

chai.use(http);

describe('HTTP Server module', function(){
  before(function(done){
    server.listen(3000);
    done();
  });

  describe('GET method', function(){
    describe('/ endpoint', function() {
      it ('returns status code 200', function(done){
        chai.request(server)
        .get('/')
        .send({})
        .end((err, res) => {
          expect(res).to.have.status(200);
          done();
        });
      });
    });

    describe('/cowsay endpoint', function(){
      it ('returns status code 200 with good req', function(done){
        chai.request(server)
        .get('/cowsay?text=plzwork')
        .send({})
        .end((err, res) => {
          expect(res).to.have.status(200);
          done();
        });
      });

      it ('returns status code 400 with bad req', function(done){
        chai.request(server)
        .get('/cowsay burnItDown')
        .send({})
        .end((err, res) => {
          expect(res).to.have.status(400);
          done();
        });
      });
    });
  });

  describe('POST method', function(){
    describe('/ endpoint', function() {
      it ('returns status code 200', function(done){
        chai.request(server)
        .post('/')
        .send({})
        .end((err, res) => {
          expect(res).to.have.status(200);
          done();
        });
      });
    });

    describe('/cowsay endpoint', function(){
      it ('returns status code 200 with good req', function(done){
        chai.request(server)
        .post('/cowsay')
        .send({text: 'plzwork'})
        .end((err, res) => {
          expect(res).to.have.status(200);
          done();
        });
      });

      it ('returns status code 400 with bad req', function(done){
        chai.request(server)
        .post('/cowsay breakIt')
        .send({})
        .end((err, res) => {
          expect(res).to.have.status(400);
          done();
        });
      });
    });
  });
});
