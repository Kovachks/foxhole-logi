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
    getUserRoom: async () => {
        const query = "SELECT * FROM user_room"
        const results = await execute(query)

        return results
    },
    getUserRoomById: async (id) => {
        const query = "SELECT * FROM user_room WHERE id = ?"
        const params = [id]

        const results = await execute(query, params)

        return results[0]
    },
    getUserRoomByUser: async (id) => {
        const query = "SELECT * FROM user_room WHERE steam_id = ?"
        const params = [id]

        const results = await execute(query, params)

        return results
    },
    getUserRoomByUserAndRoom: async (steam_id, room_id) => {
        const query = "SELECT * FROM user_room WHERE steam_id = ? AND room_id = ?"
        const params = [steam_id, room_id]

        const results = await execute(query, params)

        return results[0]
    },
    getUserRoomByRoomId: async ( room_id ) => {
        const query = "SELECT * FROM user_room WHERE room_id = ?"
        const params = [room_id]

        const results = await execute(query, params)

        return results
    },
    postUserRoom: async (body) => {
        const { id }= await users.getUserBySteamId(body[0])
        const query = "REPLACE INTO user_room (steam_id, room_id, user_rank, role, user_id) VALUES (?, ?, ?, ?, ?);"
        const params = [...body]
        params.push(id)

        const results = await executeTransaction(query, params)

        return results
    }
}