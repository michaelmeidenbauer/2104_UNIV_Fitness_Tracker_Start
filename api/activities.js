const express = require('express');
require('dotenv').config();
const { requireUser } = require('./utils');

const activitiesRouter = express.Router();
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

activitiesRouter.post('/', requireUser, async (req, res, next) => {
  try {
    const activityToCreate = req.body;
    const activity = await createActivity(activityToCreate);
    res.send(activity);
  } catch (error) {
    next(error);
  }
});

activitiesRouter.patch('/:activityId', async (req, res, next) => {
  try {
    // ADD REQUIRED AUTHENTICATION TO THIS
    const { activityId: id } = req.params;
    const activityToUpdate = req.body;
    activityToUpdate.id = id;
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
