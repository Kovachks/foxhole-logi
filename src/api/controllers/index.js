/**
 * Export all controllers
 */

const users = require('./users')
const rooms = require('./rooms')
const userRoom = require('./userRoom')

module.exports = {
    users,
    rooms,
    userRoom
}