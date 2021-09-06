// require and re-export all files in this db directory (users, activities...)
const {
    createUser,
    getUser,
    getUserByUsername,
    getUserById
} = require('./users');

const {
    createRoutine,
    getRoutineById,
    getRoutinesWithoutActivities,
    getAllRoutines,
    getActivityById,
    getAllPublicRoutines,
    getAllRoutinesByUser,
    getPublicRoutinesByUser,
    getPublicRoutinesByActivity,
    updateRoutine,
    destroyRoutine
} = require('./routines');

const {
    createActivity,
    getAllActivities,
    updateActivity
} = require('./activities');

const {
    addActivityToRoutine,
    getRoutineactivityByRoutine,
    getRoutineActivitiesByRoutine,
    updateRoutineActivity,
    destroyRoutineActivity
} = require('./routine_activities');


module.exports = {
    createUser,
    getUser,
    getUserByUsername,
    getUserById,
    createRoutine,
    getRoutineById,
    getRoutinesWithoutActivities,
    createActivity,
    getAllActivities,
    addActivityToRoutine,
    getAllRoutines,
    getActivityById,
    getAllPublicRoutines,
    getAllRoutinesByUser,
    getPublicRoutinesByUser,
    getPublicRoutinesByActivity,
    updateActivity,
    updateRoutine,
    destroyRoutine,
    getRoutineactivityByRoutine,
    getRoutineActivitiesByRoutine,
    updateRoutineActivity,
    destroyRoutineActivity
}