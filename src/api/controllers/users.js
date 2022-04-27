const _ = require('lodash')
const config = require('../../../conf/config')
const {
    executeFactory,
    executeTransactionFactory
} = require('./helper')
const mysql = require('mysql')

//Create mySql connection
const connection = mysql.createPool({
    ...config.mySql,
    multipleStatements: true
})

const execute = executeFactory(connection)
const executeTransaction = executeTransactionFactory(connection)

module.exports = {
    getUserById: async (id) => {
        const results = await execute("SELECT * FROM users WHERE id = ?", [id])

        return results
    },
    getUserBySteamId: async (id) => {
        const results = await execute("SELECT * FROM users WHERE steam_id = ?", [id])

        return results[0]
    },
    getUsers: async () => {
        const results = await execute("SELECT * FROM users")
        
        return results
    },
    getAnonymousUsers: async () => {
        const query = "SELECT * FROM users WHERE id LIKE 'anonymous%';"

        const results = await execute(query, [])

        return results
    },
    getNonAnonymousUsers: async () => {
        const query = "SELECT * FROM users WHERE id NOT LIKE 'anon%';"

        const results = await execute(query, [])

        return results
    },
    postUser: async (body) => {
        const query = "INSERT INTO users (steam_id, salt, name, avatar) VALUES (?, ?, ?, ?);"
        const params = [...body]

        return executeTransaction(query, params)
    },
    updateUser: async (body) => {
        const query = "UPDATE users SET name = ?, avatar = ? WHERE id = ?;"
        const params = [...body]

        return executeTransaction(query, params)
    },
    deleteUser: async (id) => {
        const query = "DELETE FROM users WHERE id = ?;"
        const params = [id]

        return executeTransaction(query, params)
    }
}