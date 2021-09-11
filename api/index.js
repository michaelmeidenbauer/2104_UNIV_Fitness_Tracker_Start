// create an api router

// npm run start:dev

// npm run test:watch api
const express = require('express');

const apiRouter = express.Router();

// health check
// GET /health

apiRouter.get('/health', (req, res) => {
  res.send({message: 'All is well'});
});

// attach other routers from files in this api directory (users, activities...)
const usersRouter = require('./users');

apiRouter.use('/users', usersRouter);

const activitiesRouter = require('./activities');

apiRouter.use('/activities', activitiesRouter);

const routinesRouter = require('./routines');

apiRouter.use('/routines', routinesRouter);

const routineActivitiesRouter = require('./routine_activities');

apiRouter.use('/routine_activities', routineActivitiesRouter);

apiRouter.use((error, req, res, next) => {
  res.send(error);
  next();
});
// export the api router
module.exports = apiRouter;
