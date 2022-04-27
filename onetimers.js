const fs = require('fs')
const path = require('path')
const conf = require('./conf/config')

const databaseDir = path.basename(path.dirname(conf.sqlLite.fileNameGiven))
if (!fs.existsSync(databaseDir)) {
  fs.mkdirSync(databaseDir)
}

const SQLite = require("better-sqlite3")(conf.sqlLite.fileNameGiven, {});
const logger = conf.logger

//const warapi = require('./warapi.js');


//warapi.updateStaticTowns();
//warapi.updateMap();
////SQL MANAGEMENT

const create_global_table = SQLite.prepare("CREATE TABLE IF NOT EXISTS global (id TEXT PRIMARY KEY, admin TEXT, settings TEXT, techtree TEXT, fobs TEXT, requests TEXT, misc TEXT, arty TEXT, squads TEXT, refinery TEXT, production TEXT, storage TEXT, stockpiles TEXT, logi TEXT, events TEXT);");
const create_users_table = SQLite.prepare("CREATE TABLE IF NOT EXISTS users (id TEXT PRIMARY KEY, salt TEXT, name TEXT, avatar TEXT);");
// //SETTINGS: name, side, channel, secure, password
const create_user_room_table = SQLite.prepare("CREATE TABLE IF NOT EXISTS user_room (id TEXT PRIMARY KEY, userid TEXT, globalid TEXT, rank INT, role INT, FOREIGN KEY (userid) REFERENCES users(id), FOREIGN KEY (globalid) REFERENCES global(id));");
const create_events = SQLite.prepare("CREATE TABLE IF NOT EXISTS events (region INT, date TEXT, prevItem TEXT, newItem TEXT);")

logger.info('Creating tables...')
create_global_table.run()
create_users_table.run()
create_user_room_table.run()
create_events.run()
logger.info('Tables created.')

try {
  const insert_anonymous = SQLite.prepare("INSERT INTO users (id, salt, name, avatar) VALUES ('anonymous','anonymous','anonymous','anonymous')")
  insert_anonymous.run()
} catch (error) {
  if (error.code === 'SQLITE_CONSTRAINT_PRIMARYKEY') {
    logger.info('Anonymous user already created')
  } else {
    logger.error(`Could not create anonymous user: ${error}`)
  }
}


//warapi.pullStatic();




//You should have gone for the HEAD
//NO
//sql.prepare("DROP TABLE user_room;").run();
//sql.prepare("DROP TABLE users;").run();
//sql.prepare("DROP TABLE global;").run();
//sql.prepare("CREATE TABLE warhistory (warnumber INT, warstats TEXT, events TEXT, reports TEXT, startpoint TEXT);").run();
exports.wipe = function (){
  SQLite.prepare("DELETE FROM user_room;").run();
  SQLite.prepare("DELETE FROM global;").run();
  //sql.prepare("DELETE FROM towns;").run();
  //sql.prepare("DELETE FROM forts;").run();
  //sql.prepare("DELETE FROM fobs;").run();
  //sql.prepare("DELETE FROM ambushes;").run();
  //sql.prepare("DELETE FROM requests;").run();
  //sql.prepare("DELETE FROM techtrees;").run();
  //sql.prepare("DELETE FROM mines;").run();
}



exports.cunt = function test(string){

}
