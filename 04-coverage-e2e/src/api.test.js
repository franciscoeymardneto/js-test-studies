const { describe, it } = require('mocha')
const request = require("supertest")
const assert = require("node:assert")
const app = require('./api')

describe('API test suite', () => {
    describe('/contact', () => {
        it('should request the contact page and return HTTP status 200', async () => {
            const response = await request(app)
                                            .get('/contact')
                                            .expect(200)
        })
        it('should request the contact page and the the response must have "Contact Us page!"', async () => {
            const response = await request(app)
                                            .get('/contact')
            assert.deepStrictEqual(response.text,'Contact Us page!')
        })
    })
})