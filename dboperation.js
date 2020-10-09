var config = require('./dbconfig');
const sql = require('mssql');

async function getUser() {
    try {
        let pool = await sql.connect(config);
        let users = await pool.request().query("SELECT * FROM UserList");
        console.log('success');
        return users.recordsets;
    }
    catch(error) {
        console.log('connect error', error);
    }
}

async function getUserId(userId) {
    try {
        let pool = await sql.connect(config);
        let user = await pool.request()
        .input('getId', sql.Int, userId)
        .query("SELECT * FROM UserList where Id = @getId");
        console.log('success');
        return user.recordsets;
    }
    catch(error) {
        console.log('connect error', error);
    }
}

async function addUsers(user) {
    try {
        let pool = await sql.connect(config);
        let insertUser = await pool.request()
        .input('id', sql.Int, user.id)
        .input('userid', sql.Int, user.userid)
        .input('username', sql.NVarChar, user.username)
        .input('pwd', sql.NVarChar, user.pwd)
        .input('email', sql.NVarChar, user.email)
        .query("insert into UserList (id, userid, username, pwd, email) values (@id, @userid, @username, @pwd, @email)");
        console.log('success');
        return insertUser.recordsets;
    }
    catch(error) {
        console.log('connect error', error);
    }
}

module.exports = {
    getUser: getUser,
    getUserId: getUserId,
    addUsers: addUsers
}