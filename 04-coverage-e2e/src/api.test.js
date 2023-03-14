const { describe, it } = require('mocha')
const request = require("supertest")
const assert = require("node:assert")
const app = require('./api')

describe('API test suite', () => {
    describe('/contact', () => {
        it('should request the contact page and return HTTP status 200', async () => {
            await request(app)
                .get('/contact')
                .expect(200)
        })
        it('should request the contact page and the the response must have "Contact Us page!"', async () => {
            const response = await request(app)
                .get('/contact')
            assert.deepStrictEqual(response.text, 'Contact Us page!')
        })
    })

    describe('/hello', () => {
        it('should request in an inexistent route /hi redirect to /hello and return HTTP status 200', async () => {
            await request(app)
                .get('/hi')
                .expect(200)
        })
        it('should request the default page and the the response must have "Hello world!"', async () => {
            const response = await request(app)
                .get('/hi')
            assert.deepStrictEqual(response.text, 'Hello world!')
        })
    })

    describe('/login', () => {
        it('should request login and return 401', async () => {
            await request(app)
            .post('/login')
            .send({'user': 'John', 'pass': '12345'})
            .expect(401)
        })
        it('should request login and response text must be "Access Denied!"', async () => {
            const response = await request(app)
            .post('/login')
            .send({'user': 'John', 'pass': '12345'})

            assert.deepStrictEqual(response.text, 'Access Denied!')
        })

        it('should request login and return 200"', async () => {
            await request(app)
            .post('/login')
            .send({'user': 'Eymard', 'pass': '12345'})
            .expect(200)
        })

        it('should request login and get logged successfully and the resonse text must countains the username', async () => {
            const response = await request(app)
            .post('/login')
            .send({'user': 'Eymard', 'pass': '12345'})

            assert.match(response.text, /Eymard/)
        })
    })


})