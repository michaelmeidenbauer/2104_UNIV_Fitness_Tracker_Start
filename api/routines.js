const express = require("express");
const routinesRouter = express.Router();

const { createRoutine, getRoutinesWithoutActivities, getRoutineById, updateRoutine, destroyRoutine } = require("../db");

// routines
// GET /routines
routinesRouter.get("/routines", async (req, res) => {
  // TODO: Make sure the variables for this are coming from somewhere / set in this function
  const routine = await createRoutine(creatorId, isPublic, name, goal);
  // Return a list of public routines, include the activities with them
  res.send(routine);
});
// POST /routines (*)

routinesRouter.post("/routines", async (req, res) => {
  // Make sure that this is working, remember to execute getRoutinesWithoutActivities by adding ()
  const routines = await getRoutinesWithoutActivities;
  // Create a new routine
  res.send(routines, "Return All Routines Here");
});
// PATCH /routines/:routineId (**)
routinesRouter.patch("/routines/:routineId", async (req, res) => {
  // req.body => the body of the request passed in
  // req.params => Where your url parameters live
  //     => req.params.routineId => id of the routine you're looking to update

  const routine = await updateRoutine(routineToUpdate);
  //  Update a routine, notably change public/private, the name, or the goal
  res.send(routine);
});

// DELETE /routines/:routineId (**)
routinesRouter.delete("/routines/:routineId", async (req, res) => {
  // req.params => Where your url parameters live
  //     => req.params.routineId => id of the routine you're looking to delete

  const deleteRoutine = await destroyRoutine(routineId);
  //  Hard delete a routine. Make sure to delete all the routineActivities whose routine is the one being deleted.
  res.send(deleteRoutine);
});

// POST /routines/:routineId/activities
routinesRouter.post("/routines/:routineId/activities", async (req, res) => {
  const routineId = await getRoutineById(id);
// Attach a single activity to a routine. Prevent duplication on (routineId, activityId) pair.
  res.send(routineId, "Single activity to routine");
});

module.exports = routinesRouter;
