const mongoose = require('mongoose');
const supertest = require('supertest');
const server = require('../app')
const User = require('../user');

const api = supertest(server);

describe("Tests for /login route", () => {
    const user = {
        username: "timoTestaaja",
        password: "testaus"
    }
    const expectedVal = {
        imageCount: 0,
        username: "timoTestaaja",
        id: "6076e40a8a944c77b4ccdb31"
    }

    test('POST /login works correctly', async() => {
        const res = await api.post('/login').send(user);
        expect(res.status).toBe(200)
        expect(res.body).toEqual(expectedVal);
    });

    test('POST /login fails correctly', async() => {
        const res = await api.post('/login').send({
            username: "Rikkinäinen",
            password: "Käyttäjätunnus"
        })
        expect(res.status).toBe(400)
        expect(res.body).toEqual("Login failed");
    })
})

afterAll(() => {
    mongoose.connection.close()
})