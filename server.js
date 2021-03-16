const Koa = require('koa')
const next = require('next')
const Router = require('@koa/router')
const proxy = require("koa-proxy")

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const api_port = '3080'
const handle = app.getRequestHandler()

app.prepare().then(() => {
    const server = new Koa()
    const router = new Router()

    // Redirect API stuff to the backend API
    server.use(proxy({
        host:  'http://localhost:'+api_port, // proxy api...
        match: /^\/api\//,        // ...just the /api folder
        map: function(path) { return path.replace("api/", ""); }
    }))

    // Everything else goes to Next.js
    router.all('(.*)', async (ctx) => {
        await handle(ctx.req, ctx.res)
        ctx.respond = false
    })

    server.use(async (ctx, next) => {
        ctx.res.statusCode = 200
        await next()
    })

    server.use(router.routes())
    server.listen(port, () => {
        console.log(`> Ready on http://localhost:${port}`)
    })
})