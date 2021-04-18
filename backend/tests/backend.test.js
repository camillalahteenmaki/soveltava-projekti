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

describe("Tests for /register route", () => {
    const username= `test${Math.floor(Math.random()*100000)}`
    const user = {
        username,
        password: "123"
    }

    test('POST /register works correctyl', async() => {
        const res = await api.post('/register').send(user)
        expect(res.status).toBe(201)
        expect(res.body.username).toBe(username)
    })

    test('POST /register fails correctly', async() => {
        const res = await api.post('/register').send({
            username: "admin",
            password: "password"
        })
        expect(res.status).toBe(500)
        expect(res.body).toEqual("User already exists")
    })

})


afterAll(() => {
    mongoose.connection.close()
})