const _ = require('lodash')
const config = require('../../../conf/config')
const {
    executeFactory,
    executeTransactionFactory
} = require('./helper')
const mysql = require('mysql')
const users = require('./users')

//Create mySql connection
const connection = mysql.createPool({
    ...config.mySql,
    multipleStatements: true
})

const execute = executeFactory(connection)
const executeTransaction = executeTransactionFactory(connection)

module.exports = {
    getRooms: async () => {
        const query = "SELECT * FROM rooms"

        const results = await execute(query)

        return results
    },
    getRoomById: async (id) => {
        const query = "SELECT * FROM rooms WHERE id = ?"
        const params = [id]

        const results = await execute(query, params)

        return results[0]
    },
    getRoomByUser: async (id) => {
        const query = "SELECT * FROM rooms WHERE user_id = ?"
        const params = [id]

        const results = await execute(query, params)

        return results[0]
    },
    postRoom: async (body) => {
        const query = "INSERT INTO rooms (room_link, admin, settings, refinery, production, storage, stockpiles, fobs, requests, misc, arty, squads, logi, events) VALUES (?, ?, ?, '{}', '{}', '{}', '{}', '{}', '{}', '{}', '{}', ?, '{}', '[]');"

        const results = await executeTransaction(query, [...body])

        return results
    }
}