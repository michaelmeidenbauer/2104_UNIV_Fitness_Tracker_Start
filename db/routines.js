const { client } = require('./client');
const { getUserById } = require('./users');
const { getRoutineactivityByRoutineId, getRoutineActivitiesByRoutine } = require('./routine_activities');
// const { getActivityById } = require('./activities');

async function getActivityById(activityId) {
    try {
        const { rows: [ activity ] } = await client.query(`
          SELECT * FROM activities
          WHERE id=${activityId};
        `);
        return activity;
    } catch (error) {
        throw error;
    }
};

async function createRoutine({
    creatorId,
    isPublic,
    name,
    goal
}) {
    try {
        const { rows: [routine] } = await client.query(`
          INSERT INTO routines("creatorId", "isPublic", name, goal) 
          VALUES($1, $2, $3, $4)
          RETURNING *;
        `, [creatorId, isPublic, name, goal]);
        return routine;
    } catch (error) {
        throw error;
    }
};

async function getRoutinesWithoutActivities() {
    try {
        const { rows } = await client.query(`
          SELECT * FROM routines;
        `);
        return rows;
    } catch (error) {
        throw error;
    }
};

async function addActivityDataToRoutines(routines) {
    //REFACTOR THIS LATER WITH BETTER SQL QUERIES
    try {
        for (const routine of routines) {
            const { username } = await getUserById(routine.creatorId);
            const routineId = routine.id;
            routine.creatorName = username;
            routine.activities = [];

            const activityIds = await getRoutineActivitiesByRoutine(routineId);

            for (const activity of activityIds) {
                const activityId = activity.activityId;
                const fetchedActivity = await getActivityById(activityId);
                const { rows: [ { duration, count }] } = await client.query(`
                    SELECT duration, count from routineactivities
                    WHERE "routineId"=${routineId} and "activityId"=${activityId};
                `);
                fetchedActivity.duration = duration;
                fetchedActivity.count = count;
                routine.activities.push(fetchedActivity);
            }
            return routines;
        };
    } catch (error) {
        throw error;
    }
}

async function getAllRoutines() {
    try {
        const { rows: routines } = await client.query(`
        SELECT * FROM routines;
        `);
        const routinesWithDataAdded = await addActivityDataToRoutines(routines);
        return routinesWithDataAdded;
    } catch (error) {
        throw error;
    }
};

async function getAllPublicRoutines() {
    try {
        const { rows: routines } = await client.query(`
        SELECT * FROM routines
        WHERE "isPublic"=true;
        `);
        const routinesWithDataAdded = await addActivityDataToRoutines(routines);
        return routinesWithDataAdded;
    } catch (error) {
        throw error;
    }
};

async function getRoutineById(id) {
    try {
        const { rows: [routine] } = await client.query(`
          SELECT * FROM routines
          WHERE id=${id};
        `);
        return routine;
    } catch (error) {
        throw error;
    }
};

async function getAllRoutinesByUser({id}) {
    try {
        const { rows: routines } = await client.query(`
        SELECT * FROM routines
        WHERE "creatorId"=${id};
        `);
        const routinesWithDataAdded = await addActivityDataToRoutines(routines);
        return routinesWithDataAdded;
    } catch (error) {
        throw error;
    }
};
async function getPublicRoutinesByUser({id}) {
    try {
        const { rows: routines } = await client.query(`
        SELECT * FROM routines
        WHERE "creatorId"=${id}
        AND "isPublic"=true;
        `);
        // console.log("fetched routines", routines);
        const routinesWithDataAdded = await addActivityDataToRoutines(routines);
        return routinesWithDataAdded;
    } catch (error) {
        throw error;
    }
};
async function getPublicRoutinesByActivity({id}) {
    try {
        const { rows: routineIds } = await client.query(`
        SELECT "routineId" FROM routineactivities
        WHERE "activityId"=${id};
        `);

        const routineIdArray = routineIds.map(routine => routine.routineId);

        const { rows: routines } = await client.query(`
        SELECT * FROM routines
        WHERE id IN (${routineIdArray})
        AND "isPublic"=true;
        `);

        const routinesWithDataAdded = await addActivityDataToRoutines(routines);
        return routinesWithDataAdded;
    } catch (error) {
        throw error;
    }
};

module.exports = {
    createRoutine,
    getRoutinesWithoutActivities,
    getRoutineById,
    getAllRoutines,
    getActivityById,
    getAllPublicRoutines,
    getAllRoutinesByUser,
    getPublicRoutinesByUser,
    getPublicRoutinesByActivity
}