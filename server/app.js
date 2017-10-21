const Koa = require('koa')
const fs = require('fs')
const bodyParser = require('koa-bodyparser')
const app = new Koa()
const router = require('./router/index')
const config = require('./config')


// 使用ctx.body解析中间件
app.use(bodyParser())
//设置路由
app.use(router.routes()).use(router.allowedMethods())

app.listen(config.port)
console.log('[demo] route-use-middleware is starting at port 3000')





