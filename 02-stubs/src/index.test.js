const { deepStrictEqual, strictEqual } = require('node:assert')
const https = require("node:https")
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
                // let httpsGetStup, service
                const httpsGetStup = sinon.stub(https, 'get')
                const service = new Service()
    
                // should make a HTTP request
                const response = {
                    on: (eventName, eventCallback) => {
                      if (eventName === 'data') {
                        eventCallback(JSON.stringify(mocks.tatooine));
                      }
                    }
                  };
    
                httpsGetStup.callsArgWith(1, response);
                const actual = await service.makeRequest(BASE_URL_1);
                deepStrictEqual(actual, mocks.tatooine);


                // should reject eith error dats

                const error = {
                    on: (eventName, eventCallback) => {
                      if (eventName === 'error') {
                        eventCallback('error');
                      }
                    }
                  };
    
                httpsGetStup.callsArgWith(1, error);

                service.makeRequest(BASE_URL_1)
                    .then(() => {
                        new Error('Expected makeRequest to reject')
                    })
                    .catch((error) => {
                        deepStrictEqual(error, 'error');
                    })
                
            }


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