// required modules
const request = require('supertest');
const expect = require('chai').expect;
// const { User } = require('../database/models');

// setting up the server
const app = require('../app');

// test suite
describe('TEST /users', () => {

    let userId;
    const userToCreate = {
        firstName: 'Test',
        lastName: 'Here!',
        email: 'test@gmail.com',
        password: '%S!1Q%4V5kjW',
    }

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

    describe('POST /users', async () => {
        it('SUCCESS: should create a new user', async () => {
            const response = await request(app).post('/users').send(userToCreate);
            expect(response.status).to.equal(200);
            expect(response.body).to.be.an('object');
            expect(response.body.status).to.equal(true);
            expect(response.body.code).to.equal(200);
            userId = response.body.body.id;
        });
    });

});