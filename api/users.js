const express = require('express');

const usersRouter = express.Router();

const {
  createUser,
  getUserByUsername,
  getPublicRoutinesByUser,
} = require('../db');

// users
// POST /users/register

usersRouter.post('/register', async (req, res, next) => {
  const { username, password } = req.body;
  if (password.length < 8) {
    const passwordError = new Error({
      name: 'PasswordTooShortError',
      message: 'Password must be at least 8 characters',
    });
    next(passwordError);
  }
  try {
    // eslint-disable-next-line no-underscore-dangle
    const _user = await getUserByUsername(username);

    if (_user) {
      next({
        name: 'UserExistsError',
        message: 'A user by that username already exists',
      });
    }
    const user = await createUser({
      username,
      password,
    });
    res.send({
      message: 'thank you for signing up',
      user,
      // token,
    });
  } catch ({ name, message }) {
    next({ name, message });
  }
});

// POST /users/login

usersRouter.post('/login', (req, res, next) => {
  try {
    const { username, password } = req.body;
    res.send('login');
    if (!username || !password) {
      next({
        name: 'MissingCredentialsError',
        message: 'Please supply both a username and password',
      });
    }
  } catch (error) {
    next(error);
  }

  //   try {
  //     const user = await getUserByUsername(username);

  //     if (user && user.password === password) {
  //       res.send({
  //         message: "You're logged in!",
  //         // token,
  //       });
  //     } else {
  //       next({
  //         name: 'IncorrectCredentialsError',
  //         message: 'Authentication failed. Wrong credentials',
  //       });
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     next(error);
  //   }
});

// GET /users/me (*)

usersRouter.get('/me', (req, res, next) => {
  try {
    res.send(
      "Send back the logged-in user's data if a valid token is supplied in the header.",
    );
  } catch (error) {
    next(error);
  }
  // getUser or getUserByUsername???
});

// GET /users/:username/routines

usersRouter.get('/:username/routines', async (req, res, next) => {
  try {
    const { username } = req.params;
    // Remember to await your DB requests
    const routines = await getPublicRoutinesByUser(username);
    // "Get a list of public routines for a particular user."
    res.send(routines);
  } catch (error) {
    next(error);
  }
});
module.exports = usersRouter;
