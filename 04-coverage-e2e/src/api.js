const http = require('http')

const DEFAULT_USER = {'user': 'Eymard', 'pass': '12345'}
const routes = {
    '/contact:get': (request, response) => {
        response.write('Contact Us page!')
        return response.end()
    },

    '/login:post': async (request, response) => {
        // request é um iterator
        for await (const data of request) {
            const user = JSON.parse(data)

            if (
                user.user !== DEFAULT_USER.user ||
                user.pass !== DEFAULT_USER.pass
            ) {
                response.writeHead(401)
                response.write('Access Denied!')
                return response.end()
            } {
                response.write(`Login successfully, Welcome ${user.user}!`)
                return response.end()
            }
        }

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