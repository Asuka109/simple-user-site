import Router from '@koa/router';
import koaBody from 'koa-body';
import crypto from 'crypto';
import Koa from 'koa';
import cors from '@koa/cors';
import assert from 'assert';

const app = new Koa();

// database

export interface User {
  id: string;
  uname: string;
  password: {
    hashed: string;
    salt: string;
  };
}

const users: User[] = [
  {
    id: 'wh70sdh80',
    uname: 'zhx',
    password: {
      hashed: hash('123456', 'random_salt'),
      salt: 'random_salt'
    }
  },
]

export class UserModel {
  static findOne(query: Partial<User>): User | null {
    return users.find(user => {
      if (query.id && user.id !== query.id) {
        return false;
      }
      if (query.uname && user.uname !== query.uname) {
        return false;
      }
      if (query.password?.hashed && user.password.hashed !== query.password.hashed) {
        return false;
      }
      return true;
    }) || null;
  }
}

// utils

function hash(password: string, salt: string): string {
  return crypto
    .createHash('sha256')
    .update(`${password}:${salt}`)
    .digest('base64');
}

// middleware

app.use(cors());
app.use(koaBody());

// User Api Routes

const api = new Router()

api.post('/api/login', async ctx => {
  // validating request body
  const { uname, password } = ctx.request.body;
  try {
    assert(uname, 'uname is required');
    assert(password, 'password is required');
  } catch (err: any) {
    ctx.status = 400;
    return ctx.body = { message: err.message };
  }
  const user = UserModel.findOne({ uname });
  if (!user) {
    ctx.status = 401;
    ctx.body = { message: '用户名或密码错误' };
    return;
  }
  const hashedPassword = hash(password, user.password.salt);
  if (user.password.hashed !== hashedPassword) {
    ctx.status = 401;
    ctx.body = { message: '用户名或密码错误' };
    return;
  }
  ctx.body = {
    message: '登录成功',
    user: {
      id: user.id,
      uname: user.uname
    }
  };
});

// Register Routes

app.use(api.routes());

// listen

app.listen(8000);
console.log(`Registered users: ${JSON.stringify(users, null, 2)}`);