const http = require('http')


const routes = {
    '/contact:get': (request, response) => {
        response.write('Contact Us page!')
        return response.end()
    },

    default: (request, response) => {
        response.write('Hello world!')
        return response.end()
    }
}
const handler = function (request, response) {
    const routeKey = `${request.url}:${request.method.toLowerCase()}`

    const chosen = routes[routeKey] || routes.default

    response.writeHead(200, {
        'Content-Type': 'text/html'
    })
    
    return chosen(request,response)
}



const app = http
    .createServer(handler)
    .listen(3000, () => console.log('app running on port: ', 3000))

module.exports = app