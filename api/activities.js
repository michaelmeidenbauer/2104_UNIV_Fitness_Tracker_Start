// "use strict";
// Uncomment the above code for blow-up mode

// activities
const express = require("express");
const activitiesRouter = express.Router();

const { createActivity, getAllActivities, updateActivity } = require("../db");

// GET /activities
activitiesRouter.get("/", async (req, res) => {
  console.log("in all activities route");
  const activities = await getAllActivities();
  // Just return a list of all activities in the database
  console.log("fetched activities: ", activities);
  res.send(activities);
});

// POST /activities (*)

activitiesRouter.post("/", async (req, res) => {
  const { name, description} = req.body;
  // TODO: Make sure you're defining variables before they're used
  const activities = await createActivity({
    name,
    description,
  });
  // Create a new activity
  res.send(activities, "Return All Activites Here");
});

// PATCH /activities/:activityId (*)

activitiesRouter.patch("/:activityId", async (req, res) => {
  // Await and execute this
  const activities = await updateActivity;
  // Anyone can update an activity
  res.send(activities, "Update Activity (Anyone)");
});

// GET /activities/:activityId/routines

activitiesRouter.get("/:activityId/routines", async (req, res) => {
  // const publicRoutines = getAllPublicRoutines;
  // Get a list of all public routines which feature that activity
  res.send(publicRoutines, "Return all public routines here");
});

module.exports = activitiesRouter;
