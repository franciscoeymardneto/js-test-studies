const { deepStrictEqual } = require('node:assert')
const sinon = require('sinon')
const Service = require('./service')
const BASE_URL_1 = 'https://swapi.dev/api/planets/1/'
const BASE_URL_2 = 'https://swapi.dev/api/planets/2/'
const BROKEN_URL = 'https://swapi.dev/api/plannets/2/'
const mocks = {
    tatooine: require('./mocks/tatooine.json'),
    alderaan: require('./mocks/alderaan.json')
}

    ; (async () => {

        // testing the service feastures
        const service = new Service()
        const stub = sinon.stub(service, service.makeRequest.name)

        stub
            .withArgs(BASE_URL_1)
            .resolves(mocks.tatooine)

        stub
            .withArgs(BASE_URL_2)
            .resolves(mocks.alderaan)


        {
            const response = await service.getPlanets(BASE_URL_2)
            const required = {
                name: "Alderaan",
                surfaceWater: "40",
                appearedIn: 2
            }

            deepStrictEqual(response, required)
        }


        {
            const response = await service.getPlanets(BASE_URL_1)
            const required = {
                name: "Tatooine",
                surfaceWater: "1",
                appearedIn: 5
            }

            deepStrictEqual(response, required)
        }
    })()