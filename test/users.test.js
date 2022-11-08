// required modules
const request = require('supertest');
const expect = require('chai').expect;
// const { User } = require('../database/models');

// setting up the server
const app = require('../app');

// test suite
describe('TEST /users', () => {

    describe('GET /users', async () => {
        it('SUCCESS: should return all users (list)', async () => {
            const response = await request(app).get('/users');
            expect(response.status).to.equal(200);
            expect(response.body).to.be.an('object');
            expect(response.body.status).to.equal(true);
            expect(response.body.code).to.equal(200);
        });
        it('FAIL: should return an error if the user does not exist', async () => {
            const response = await request(app).get('/users/100');
            expect(response.status).to.equal(404);
            expect(response.body).to.be.an('object');
        });
    });

});