const express = require('express');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const { requireUser } = require('./utils');

const userRouter = express.Router();
const { JWT_SECRET = 'default' } = process.env;
const {
  createUser,
  getUser,
  getUserByUsername,
  getUserById,
  getPublicRoutinesByUser,
} = require('../db');

userRouter.post('/register', async (req, res, next) => {
  const { username, password } = req.body;

  try {
    if (!username || !password) {
      throw new Error({
        name: 'InvalidRegisterAttemptError',
        message: 'A username and password are both required.',
      });
    }
    if (password.length < 8) {
      throw new Error({
        name: 'PasswordTooShortError',
        message:
          'Please try again with a longer password. Eight characters are required.',
      });
    }
    const existingUser = await getUserByUsername(username);
    if (existingUser) {
      throw new Error({
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
      throw new Error({
        name: 'LoginRequestError',
        message: 'Please provide a username and password.',
      });
    }
    // console.log('request deets: ', requestUser, password);
    const { id, username } = await getUser({ username: requestUser, password });
    // console.log('fetched username: ', username, 'fetched id: ', id);
    if (!username) {
      throw new Error({
        name: 'LoginFailError',
        message: 'Login attempt failed. Please try again.',
      });
    }
    const token = jwt.sign({ username, id }, JWT_SECRET);
    // console.log('created token: ', token);
    // console.log('============= 70 SEND ===========');
    res.send({
      message: 'You are logged in.',
      token,
    });
  } catch (error) {
    next(error);
  }
});

userRouter.get('/:username/routines', async (req, res, next) => {
  try {
    const { username } = req.params;
    const { id } = await getUserByUsername(username);
    const routines = await getPublicRoutinesByUser({ id });
    res.send(routines);
  } catch (error) {
    next(error);
  }
});
userRouter.get('/me', requireUser, async (req, res, next) => {
  try {
    const { id } = req.user;
    const user = await getUserById(id);
    res.send(user);
  } catch (error) {
    next(error);
  }
});

module.exports = userRouter;
