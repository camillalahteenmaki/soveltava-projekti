const mongoose = require('mongoose');
const supertest = require('supertest');
const server = require('../app')

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

    test('POST /register works correctly', async() => {
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

describe("Tests for /imageurl route", () => {
    test("POST /imageurl works correctly with an image containing face", async() => {
        const res = await api.post("/imageurl").send({
            input: "https://i0.wp.com/post.medicalnewstoday.com/wp-content/uploads/sites/3/2020/03/GettyImages-1092658864_hero-1024x575.jpg?w=1155&h=1528"
        })
        expect(res.status).toBe(200);
        expect(res.body.outputs[0].data.regions[0].region_info.bounding_box)
    })

    test("POST /imageurl fails with an image not containing face", async() => {
        const res = await api.post("/imageurl").send({
            input: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/An_up-close_picture_of_a_curious_male_domestic_shorthair_tabby_cat.jpg/1024px-An_up-close_picture_of_a_curious_male_domestic_shorthair_tabby_cat.jpg"
        })
        expect(res.status).toBe(200);
        expect(res.body.outputs[0].data).toEqual({});
    })
})

describe("Tests for /image route", () => {
    test("PUT /image works correctly", async() => {
        const prevData = await api.post("/login").send({username: 'admin', password: 'password'});
        const id = prevData.id

        const res = await api.put("/image").send({id});
        expect(res.status).toBe(202);
        expect(res.body).toBe("Success")
    })

    test("PUT /image fails correctly", async() => {
        const id = '123';
        const res = await api.put("/image").send({id});
        expect(res.status).toBe(500)
        expect(res.body).toBe("Could not update the imagecount")
    })
})
afterAll(() => {
    mongoose.connection.close()
})