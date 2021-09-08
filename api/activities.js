// activities
const express = require("express");
const activitiesRouter = express.Router();

const { createActivity, getAllActivities, updateActivity } = require("../db");
// GET /activities

activitiesRouter.get("/", async (req, res) => {
  console.log('in all activities route');
  const activities = await getAllActivities();
// Just return a list of all activities in the database
  console.log('fetched activities: ', activities);
  res.send(activities);
});

// POST /activities (*)

activitiesRouter.post("/activities", async (req, res) => {
  const activities = await createActivity({
    name,
    description
});
// Create a new activity
  res.send(activities, "Return All Activites Here");
});

// PATCH /activities/:activityId (*)

activitiesRouter.patch("/activities/:activityId", async (req, res) => {
  const activities = updateActivity;
  // Anyone can update an activity
  res.send(activities, "Update Activity (Anyone)");
});

// GET /activities/:activityId/routines

activitiesRouter.get("/activities/:activityId/routines", async (req, res) => {
  // const publicRoutines = getAllPublicRoutines;
  // Get a list of all public routines which feature that activity
  res.send(publicRoutines, "Return all public routines here");
});

module.exports = activitiesRouter;
