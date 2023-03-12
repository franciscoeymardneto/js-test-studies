const https = require("node:https")
const { resolve } = require("node:path")

class Service {
    async makeRequest(url) {
        return new Promise((resolve, reject) => {
            https.get(url, response => {
                response.on('data', data => resolve(JSON.parse(data)))
                response.on('error', data => reject(data))
            })
        })
        
    }
}
;(async () => {
    const response = await new Service().makeRequest('https://swapi.dev/api/planets/1/')
    console.log(response)
})()