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
    getAllPublicRoutines
} = require('./routines');

const {
    createActivity,
    getAllActivities,
} = require('./activities');

const {
    addActivityToRoutine,
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
    getAllPublicRoutines
}