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
    const userToPut = {
        firstName: 'Here',
        lastName: 'Test!',
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
        it('FAIL: should return an error if the user already exists', async () => {
            const response = await request(app).post('/users').send(userToCreate);
            expect(response.status).to.equal(409);
            expect(response.body).to.be.an('object');
        });
        it('FAIL: should return an error if the payload does not have a required field', async () => {
            modifiedData = { ...userToCreate };
            delete modifiedData.firstName;
            const response = await request(app).post('/users').send(modifiedData);
            expect(response.status).to.equal(400);
            expect(response.body).to.be.an('object');
        });
        it('FAIL: should return an error if a field is not a valid type', async () => {
            modifiedData = { ...userToCreate };
            modifiedData.firstName = 123;
            const response = await request(app).post('/users').send(modifiedData);
            expect(response.status).to.equal(400);
            expect(response.body).to.be.an('object');
        });
    });
    
    describe('PUT /users', async () => {
        it('SUCCESS: should update a user', async () => {
            const response = await request(app).put(`/users/${userId}`).send(userToPut);
            expect(response.status).to.equal(200);
            expect(response.body).to.be.an('object');
            expect(response.body.status).to.equal(true);
            expect(response.body.code).to.equal(200);
        });
        it('FAIL: should return an error if a field is missing', async () => {
            const response = await request(app).put(`/users/${userId}`).send({ firstName: 'Test' });
            console.log(response.body);
            expect(response.status).to.equal(400);
            expect(response.body).to.be.an('object');
        });
        it('FAIL: should return an error if the user does not exist', async () => {
            const response = await request(app).put('/users/1000').send(userToPut);
            expect(response.status).to.equal(404);
            expect(response.body).to.be.an('object');
        });
        it('FAIL: should return an error if a field is a invalid type', async () => {
            const response = await request(app).put(`/users/${userId}`).send({ 
                firstName: 10,
                lastName: userToPut.lastName,
                email: userToPut.email,
                password: userToPut.password,
            })
            expect(response.status).to.equal(400);
            expect(response.body).to.be.an('object');
        });
    });

    describe('DELETE /users', async () => {
        it('SUCCESS: should delete the user', async () => {
            const response = await request(app).delete(`/users/${userId}`);
            expect(response.status).to.equal(200);
            expect(response.body).to.be.an('object');
            expect(response.body.status).to.equal(true);
            expect(response.body.code).to.equal(200);
        });
    });
});