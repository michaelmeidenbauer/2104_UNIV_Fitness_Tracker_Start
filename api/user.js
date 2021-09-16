const express = require('express');
require('dotenv').config();

const userRouter = express.Router();
require('dotenv').config();

const { JWT_SECRET } = process.env;
const jwt = require('jsonwebtoken');
const {
  createUser,
  getUser,
  getUserByUsername,
  getUserById,
} = require('../db');

userRouter.post('/register', async (req, res, next) => {
  const { username, password } = req.body;
  try {
    if (!username || !password) {
      next({
        name: 'InvalidRegisterAttemptError',
        message: 'A username and password are both required.',
      });
    }
    if (password.length < 8) {
      next({
        name: 'PasswordTooShortError',
        message: 'Please try again with a longer password. Eight characters are required.',
      });
    }
    const existingUser = await getUserByUsername(username);
    if (existingUser) {
      next({
        name: 'UserAlreadyExistsError',
        message: 'A user already exists by that name.',
      });
    }

    const user = await createUser({ username, password });
    // console.log('created user: ', user);
    res.send({ user });
  } catch ({ name, message }) {
    next({ name, message });
  }
});
userRouter.post('/login', async (req, res, next) => {
  try {
    const { username: requestUser, password } = req.body;
    if (!requestUser || !password) {
      next({
        name: 'LoginRequestError',
        message: 'Please provide a username and password.',
      });
    }
    console.log('request deets: ', requestUser, password);
    const { id, username } = await getUser({ username: requestUser, password });
    console.log('fetched username: ', username, 'fetched id: ', id);
    if (!username) {
      next({
        name: 'LoginFailError',
        message: 'Login attempt failed. Please try again.',
      });
    } else {
      const token = jwt.sign({ username, id }, JWT_SECRET);
      console.log('created token: ', token);
      res.send({
        message: 'You are logged in.',
        token,
      });
    }
  } catch (error) {
    next(error);
  }
});
userRouter.post('/me', async (req, res, next) => {
  try {
    const prefix = 'Bearer ';
    const auth = req.header('Authorization');

    if (!auth) { // nothing to see here
      next();
    } else if (auth.startsWith(prefix)) {
      const token = auth.slice(prefix.length);

      try {
        const { id } = jwt.verify(token, JWT_SECRET);

        if (id) {
          const user = await getUserById(id);
          console.log('user fetched in me route: ', user);
          res.send({ user });
        }
      } catch ({ name, message }) {
        next({ name, message });
      }
    } else {
      next({
        name: 'AuthorizationHeaderError',
        message: `Authorization token must start with ${prefix}`,
      });
    }
  } catch (error) {
    next(error);
  }
});

module.exports = userRouter;
