import Router from '@koa/router';
import koaBody from 'koa-body';

import Koa from 'koa';

const app = module.exports = new Koa();

// database

// middleware

app.use(koaBody());

// User Api Routes

const api = new Router()

api.get('/user', async ctx => {

});

api.post('/login', async ctx => {

});

api.post('/register', async ctx => {

});

// Authed Routes

const authed = new Router();

authed.use(async (ctx, next) => {
  ctx.
  await next();
});

authed.get('/user/secret', async ctx => {
  ctx.body = {
    message: 'You have access to this secret message.'
  }
})

// Register Routes

app.use(api.routes());
app.use(authed.routes());

// listen

app.listen(3000);