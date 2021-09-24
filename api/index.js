// create an api router
// attach other routers from files in this api directory (users, activities...)
// export the api router
const express = require('express');
const jwt = require('jsonwebtoken');
const activitiesRouter = require('./activities');
const userRouter = require('./user');
const routinesRouter = require('./routines');
const { getUserById } = require('../db');
require('dotenv').config();

const { JWT_SECRET = 'default' } = process.env;
const apiRouter = express.Router();

apiRouter.use(async (req, res, next) => {
  const prefix = 'Bearer ';
  const auth = req.header('Authorization');

  if (!auth) { // nothing to see here
    next();
  } else if (auth.startsWith(prefix)) {
    const token = auth.slice(prefix.length);

    try {
      const { id } = jwt.verify(token, JWT_SECRET);

      if (id) {
        req.user = await getUserById(id);
        next();
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
});

apiRouter.get('/health', (req, res) => {
  res.send({
    message: 'Up and running!',
  });
});

apiRouter.use('/users', userRouter);
apiRouter.use('/activities', activitiesRouter);
apiRouter.use('/routines', routinesRouter);

// apiRouter.use((error, req, res) => {
//   res.send(error);
// });

// error handling middleware
apiRouter.use((error, req, res, next) => {
  console.error('SERVER ERROR: ', error);
  if (res.statusCode < 400) res.status(500);
  res.send({
    error: error.message,
    name: error.name,
    message: error.message,
    table: error.table,
  });
});

module.exports = apiRouter;
