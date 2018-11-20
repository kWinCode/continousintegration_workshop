const assert = require('assert');
const expect = require('chai').expect;
const request = require('supertest');
const Server = require('../dist/config/server');

const server = new Server.default();
const app = server.api;

describe('Unit testing the /users route', function() {

    it('PoST - create a new user should return 201 status', function() {
        return request(app)
            .post('/users')
            .send({username: 'Testuser', email: 'testuser@fhstp.ac.at', password: 'password'})
            .then(function(response){
                assert.equal(response.status, 201)
            })
    });

    it('GET - getting all users should return 200 status', function() {
        return request(app)
            .get('/users')
            .then(function(response){
                assert.equal(response.status, 200)
            })
    });

});

describe('Unit testing the /user/login route', function() {

    it('GET - login user Testuser should return 200 status', function() {
        return request(app)
            .get('/users/login')
            .send({username: "Testuser", password: "password"})
            .then(function(response){
                assert.equal(response.status, 200)
            })
    });

});
