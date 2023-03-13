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
        it('should request the defsult page and the the response must have "Hello world!"', async () => {
            const response = await request(app)
                .get('/hi')
            assert.deepStrictEqual(response.text, 'Hello world!')
        })
    })


})