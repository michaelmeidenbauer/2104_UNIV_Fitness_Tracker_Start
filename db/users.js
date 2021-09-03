const bcrypt = require('bcrypt');
const saltRounds = 10;
const { client } = require('./client');

async function createUser({
    username,
    password
}) {
    try {
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const { rows: [user] } = await client.query(`
          INSERT INTO users(username, password) 
          VALUES($1, $2) 
          ON CONFLICT (username) DO NOTHING 
          RETURNING *;
        `, [username, hashedPassword]);
        return user;
    } catch (error) {
        throw error;
    }
};

async function getUser({ username, password }) {
    const user = await getUserByUserName(username);
    const hashedPassword = user.password;
    bcrypt.compare(password, hashedPassword, function (err, passwordsMatch) {
        if (passwordsMatch) {
            delete user.password;
            return user;
        } else {
            throw new Error('Authentication failed. Passwords do not match.');
        }
    });
}

async function getUserByUsername(username) {
    try {
        const result = await client.query(`
          SELECT * FROM users
          WHERE username = ${username};
        `);
        console.log('in get user by username: ', result);
        return result;
    } catch (error) {
        throw error;
    }
}

async function getUserById(id) {
    try {
        const { rows: [user] } = await client.query(`
          SELECT * FROM users
          WHERE id = ${id};
        `);
        return user;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    createUser,
    getUser,
    getUserByUsername,
    getUserById
}

