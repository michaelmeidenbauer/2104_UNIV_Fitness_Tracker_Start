const express = require('express');

const activitiesRouter = express.Router();
require('dotenv').config();

const { JWT_SECRET = 'default' } = process.env;
const jwt = require('jsonwebtoken');
const {
  createActivity,
  getAllActivities,
  updateActivity,
  getPublicRoutinesByActivity,
} = require('../db');

activitiesRouter.get('/', async (req, res, next) => {
  try {
    const activities = await getAllActivities();
    res.send(activities);
  } catch (error) {
    next(error);
  }
});

activitiesRouter.post('/', async (req, res, next) => {
  const prefix = 'Bearer ';
  const auth = req.header('Authorization');
  const activityToCreate = req.body;
  if (!auth) {
    // nothing to see here
    return next();
  }
  if (auth.startsWith(prefix)) {
    try {
      const token = auth.slice(prefix.length);
      const { username } = jwt.verify(token, JWT_SECRET);
      if (username) {
        const activity = await createActivity(activityToCreate);
        return res.send(activity);
      }
    } catch ({ name, message }) {
      return next({ name, message });
    }
  } else {
    throw new Error({
      name: 'AuthorizationHeaderError',
      message: `Authorization token must start with ${prefix}`,
    });
  }
});

activitiesRouter.patch('/:activityId', async (req, res, next) => {
  try {
      //ADD REQUIRED AUTHENTICATION TO THIS
    const { activityId: id } = req.params;
    const activityToUpdate = req.body;
    activityToUpdate.id = id;
    console.log('assembled activity: ', activityToUpdate);
    const updatedActivity = await updateActivity(activityToUpdate);
    res.send(updatedActivity);
  } catch (error) {
    next(error);
  }
});

activitiesRouter.get('/:activityId/routines', async (req, res, next) => {
  try {
    const { activityId: id } = req.params;
    const routines = await getPublicRoutinesByActivity({ id });
    res.send(routines);
  } catch (error) {
    next(error);
  }
});

module.exports = activitiesRouter;
