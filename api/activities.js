// activities
const express = require("express");
const activitesRouter = express.Router();

const { createActivity, getAllActivities } = require("../db");
// GET /activities

activitiesRouter.get("/activities", async (req, res) => {
  const activity = await createActivity(name, description);

  res.send(activity);
});

// POST /activities (*)

activitiesRouter.post("/activities", async (req, res) => {
  const activities = await getAllActivities;

  res.send(activities, "Return All Activites Here");
  // Return all activities. How Tim?!?!
});

// PATCH /activities/:activityId (*)

activitiesRouter.patch("/activities/:activityId", async (req, res) => {
  let activities = patchActivities;
  res.send(activites, "Return Users Activites by Id");
});

// GET /activities/:activityId/routines

activitiesRouter.get("/activities/:activityId/routines", async (req, res) => {
  let routines = getRoutines;
  res.send(routines, "Return the overachiever's dumb routines here ");
});

modules.exports = activitesRouter;
