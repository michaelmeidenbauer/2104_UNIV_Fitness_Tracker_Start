const express = require('express');
const { requireUser } = require('./utils');
require('dotenv').config();

const routinesRouter = express.Router();
const {
  createRoutine,
  getRoutinesWithoutActivities,
  getRoutineById,
  getAllRoutines,
  getActivityById,
  getAllPublicRoutines,
  getAllRoutinesByUser,
  getPublicRoutinesByUser,
  getPublicRoutinesByActivity,
  updateRoutine,
  destroyRoutine,
} = require('../db');

routinesRouter.get('/', async (req, res, next) => {
  try {
    const routines = await getAllPublicRoutines();
    res.send(routines);
  } catch (error) {
    next(error);
  }
});

routinesRouter.post('/', requireUser, async (req, res, next) => {
  try {
    const { id } = req.user;
    const routineToCreate = req.body;
    routineToCreate.creatorId = id;
    const createdRoutine = await createRoutine(routineToCreate);
    res.send(createdRoutine);
  } catch (error) {
    next(error);
  }
});

routinesRouter.post('/:routineId/activities', requireUser, async (req, res, next) => {
  try {
    const { routineId } = req.params;
    const activityToAdd = req.body;
    console.log('routine to modify: ', routineId, 'activity data: ', activityToAdd);
  } catch (error) {
    next(error);
  }
});

routinesRouter.patch('/:activityId', requireUser, async (req, res, next) => {
  try {
    const { activityId: id } = req.params;
    const requestRoutine = req.body;
    requestRoutine.id = id;
    const updatedRoutine = await updateRoutine(requestRoutine);
    res.send(updatedRoutine);
  } catch (error) {
    next(error);
  }
});

routinesRouter.delete('/:routineId', requireUser, async (req, res, next) => {
  try {
    const { routineId } = req.params;
    const deleteResult = await destroyRoutine(routineId);
    res.send(deleteResult);
  } catch (error) {
    next(error);
  }
});

module.exports = routinesRouter;
