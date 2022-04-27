// Here we keep all functions related to database requests
const SQLite = require('better-sqlite3');
const {
  userRoom,
  users,
  rooms
} = require('./src/api/controllers')
const conf = require('./conf/config')
const logger = conf.logger
const sql = SQLite(conf.sqlLite.fileNameGiven)
const XMLHttpRequest = require('xhr2')
const discordbot = require('./discordbot.js')
const socket = require('./socket.js')

let regionNames = ['DeadLandsHex',//3
  'CallahansPassageHex',//4
  'MarbanHollow',//5
  'UmbralWildwoodHex',//6
  'MooringCountyHex',//7
  'HeartlandsHex', //8
  'LochMorHex',//9
  'LinnMercyHex',//10
  'ReachingTrailHex',//11
  'StonecradleHex',//12
  'FarranacCoastHex',//13
  'WestgateHex',//14
  'FishermansRowHex',//15
  'OarbreakerHex',//16
  'GreatMarchHex', //17
  'TempestIslandHex', //18
  'GodcroftsHex',//19
  'EndlessShoreHex',//20
  'AllodsBightHex',//21
  'WeatheredExpanseHex',//22
  'DrownedValeHex',//23
  'ShackledChasmHex',//24
  'ViperPitHex',//25
  'NevishLineHex',//29
  'AcrithiaHex',//30
  'RedRiverHex',//31
  'CallumsCapeHex',//32
  'SpeakingWoodsHex',//33
  'BasinSionnachHex',//34
  'HowlCountyHex',//35
  'ClansheadValleyHex',//36
  'MorgensCrossingHex',//37
  'TheFingersHex',//38
  'TerminusHex',//39
  'KalokaiHex',//40
  'AshFieldsHex',//41
  'OriginHex'];//42
  
function UpdateMapList() {
  const request = new XMLHttpRequest();
  request.responseType = 'json';
  request.open('GET', `${conf.warApi.liveUrl}/api/worldconquest/maps/`, true);
  request.onload = function () {
    if (request.status >= 200 && request.status < 400) {
      try {
        const obj = [];
        for (let i = 0; i < this.response.length; i++) {
          obj.push(this.response[i]);
        }
        regionNames = obj;
      }
      catch (err) {
        logger.error(err)
      }
    }
  };
  request.send();
}
UpdateMapList(); // Getting the map list on launch.
setInterval(UpdateMapList, 60000/* 100000 */); // Updating map list every minute.

// Checks if user is logged on
exports.logincheck = async (request) => {
  if (request.headers.cookie == undefined) { return false; }
  if (!request.headers.cookie.includes('salt')) { return false; }
  const cookiestring = request.headers.cookie;
  const id = cookiestring.substring(cookiestring.indexOf(' steamid=') + 9, cookiestring.indexOf(' steamid=') + 26).replace(';', '');
  let salt = cookiestring.substring(cookiestring.indexOf(' salt=') + 6, cookiestring.indexOf(' salt=') + 15).replace(';', '');

  const query = await users.getUserBySteamId(id)

  if (query === undefined) {
    return false;
  }

  query.salt = query.salt.slice(0, 9);
  salt = salt.slice(0, 9);
  
  if (query === undefined) {

    return false
  }

  if (id === query.steam_id && salt === query.salt) {
    return true;
  } 

  return false;
}

exports.offlinecheck = function (online, io) {
  const anonUsers = users.getAnonymousUsers()

  const now = new Date();
  for (let i = 0; i < users.length; i++) {
    if (anonUsers[i].id != 'anonymous') {
      if (online.includes(anonUsers[i].id)) {
        sql.prepare('UPDATE users SET avatar = ? WHERE id = ?;').run(new Date().toString(), anonUsers[i].id);
      } else {
        const timediff = now - new Date(users[i].avatar);
        if (timediff > 1800000) {
          const rooms = sql.prepare('SELECT * FROM user_room where userid = ?').all(anonUsers[i].id);
          sql.prepare('DELETE FROM user_room WHERE userid = ?').run(anonUsers[i].id);

          for (let j = 0; j < rooms.length; j++) {
            io.to(rooms[j].globalid).emit('leaveroomroom', anonUsers[i].id);
          }
          users.deleteUser(anonUsers[i].id)
        }
      }
    }
  }
}

// Check if this user already exists in the database
exports.existscheck = function (id) {
  const result = users.getUserBySteamId(id)
  if (!result) {
    return false;
  } return true;
}

// Gets account from the database
exports.getaccount = function (id) {
  const result = users.getUserBySteamId(id)
  return result;
};

// Gets membership of a user
exports.getmembership = async (id, roomId) => {
  const { user_rank } = await userRoom.getUserRoomByUserAndRoom(id, roomId)

  if (user_rank === undefined) {
    return 7
  }

  return user_rank
}

// Get info on rooms connected to a user
exports.getrooms = async (id) => {
  try {
    const rooms = await userRoom.getUserRoomByUser(id)

    if (rooms && rooms.length > 0) {
      const globalInfo = await Promise.all(
        rooms.map(async room => {
          const {
            user_rank: rank,
            room_id
          } = room

          const {
            settings,
            adminname,
            room_link,
            id,
            adminid
          } = await exports.getroominfo(room_id)

          const { name } = JSON.parse(settings)

          return {
            roomname: name,
            admin: adminname,
            adminid,
            room_link,
            rank,
            room_id
          }  
        })
      )

      return globalInfo
    } else {
      return {}
    }
  } catch (e) {
    logger.error(e)
    throw new Error(e)  
  }
}

// Just gets the names of the rooms the user is in
exports.getroomsshort = function (id) {
  const rooms = sql.prepare('SELECT * FROM user_room WHERE userid = ?;').all(id);
  return rooms;
}

// Get meta info on room
exports.getroominfo = async (id) => {
  const result = await rooms.getRoomById(id)

  if (result != undefined) {
    const { admin, settings, room_link } = result
    const { name: adminname } = await users.getUserBySteamId(admin)
    const packet = { adminname, adminid: admin, settings, room_link }

    return packet;
  } 
  
  return false;
}

// Get private info on room
exports.getprivateroominfo = function (id) {
  const result = sql.prepare('SELECT * FROM global WHERE id = ?;').get(id);
  const refinery = parse(result.refinery);
  const production = parse(result.production);
  const storage = parse(result.storage);
  const stockpiles = parse(result.stockpiles);

  const techtree = parse(result.techtree);
  const fobs = parse(result.fobs);
  const requests = parse(result.requests);
  const misc = parse(result.misc);

  const arty = parse(result.arty);
  const squads = parse(result.squads);
  const logi = parse(result.logi);
  const events = parse(result.events);
  return {
    refinery, production, storage, stockpiles, techtree, requests, fobs, misc, arty, squads, logi, events,
  }
}

exports.getallevents = function () {

  const events = sql.prepare('select * from events order by date desc limit 400').all();
  return { events };
}

// Create a room
exports.createroom = async (id, admin, settings) => {
  const squads = { vehicles: {}, squads: [{ icon: 0, name: 'New Squad', users: [admin] }] };
  const body = [
    id, admin, JSON.stringify(settings), JSON.stringify(squads)
  ]

  if (admin.includes('anonymous')) {
    e.admin = 'anonymous'
  }

  // insertroom.run(e)
  const result = await rooms.postRoom(body)

  userRoom.postUserRoom([admin, result.insertId, 1, "[0,0]"])
  // exports.insertrelation.run(e.admin + id, e.admin, id, 1, "[0,0]");
  if (admin.includes('anonymous')) {
    userRoom.postUserRoom([admin, result.id, id, 3, "[0,0]"])
    // exports.insertrelation.run(admin + id, admin, id, 3, "[0,0]");
  }
}

// Checks password
exports.checkpassword = function (id, password) {
  let result = sql.prepare('SELECT settings FROM global WHERE id = ?;').get(id);
  result = JSON.parse(result.settings)

  if (password == result.password) {
    return true;
  }

  return false;
}

// Leave a room
exports.leaveroom = function (id, globalid) {
  const rank = exports.getmembership(id, globalid);

  if (rank != 6) {
    deleterelation.run(id, globalid);
    // discordbot.leaveroom(id,globalid);
    if (rank == 1) {
      // discordbot.deleteroom(id,globalid);
      socket.deleteroom(globalid);
      exports.deleteroom(globalid);
    }
  }
}

// Delete a room
exports.deleteroom = function (id) {
  sql.prepare('DELETE FROM user_room WHERE globalid = ?').run(id);
  sql.prepare('DELETE FROM global WHERE id = ?').run(id);
}

// Get members of a room
exports.getroomusers = async (id) => {
  const results = await userRoom.getUserRoomByRoomId(id)
  return results
}

// Gets data of a user that requests access
exports.getrequester = function (id) {
  const user = users.getUserBySteamId(id)
  const packet = {
    id: user.id, name: user.name, avatar: user.avatar, rank: 5,
  }

  return packet;
}
/*    PortBase(4)

    StaticBase1(5)
    StaticBase2(6)
    StaticBase3(7)

    ForwardBase1(8)
    ForwardBase2(9)
    ForwardBase3(10)

    Hospital          (11)
    VehicleFactory    (12)
    Armory            (13)
    SupplyStation     (14)
    Workshop          (15)
    ManufacturingPlant(16)
    Refinery          (17)
    Shipyard          (18)
    TechCenter        (19)

    SalvageField    (20)
    ComponentField  (21)
    FuelField       (22)
    SulfurField     (23)
    WorldMapTent    (24)
    TravelTent      (25)
    TrainingArea    (26)
    SpecialBase     (27) v0.14
    ObservationTower(28) v0.14
    Fort            (29) v0.14
    TroopShip       (30) v0.14
    ScrapMine       (31) v0.16
    SulfurMine      (32) v0.16
    StorageFacility (33) v0.17
    Factory         (34) v0.17
    Garrison Station(35) v0.20
    Ammo Factory	(36) v0.20
    Rocket Site 	(37) v0.20     */
// Get static icons
exports.getstatic = function () {
  const staticdata = sql.prepare('SELECT * FROM apidata_static').all();
  for (let i = 0; i < staticdata.length; i++) {
    staticdata[i].data = JSON.parse(staticdata[i].data);
  }
  return staticdata;
}

// Get dynamic data
exports.getdynamic = function () {
  const dynamic = sql.prepare('SELECT * FROM apidata_dynamic').all();
  for (let i = 0; i < dynamic.length; i++) {
    dynamic[i].data = JSON.parse(dynamic[i].data);
    if (regionNames.includes(dynamic[i].regionName)) {
      dynamic[i].active = true;
    } else {
      dynamic[i].active = false;
    }
  }
  return dynamic;
}

exports.getevents = function () {
  const events = sql.prepare('select * from events order by date desc limit 500').all();
  return events;
}

// Changes rank of users
exports.changeusers = function (subjid, objects, globalid) {
  const subjrank = exports.getmembership(subjid, globalid);
  const admin = (subjid == exports.getroominfo(globalid).adminid);
  if (subjrank < 3) {
    for (let i = 0; i < objects.length; i++) {
      const objrank = exports.getmembership(objects[i].id, globalid);
      if (objrank != 7 && objrank != 8) {
        const newrank = objects[i].rank;
        if (newrank != undefined && (newrank < 6)) {
          if (subjrank == 1 && newrank != 1) {
            updaterank.run(newrank, objects[i].id, globalid);
          }
          if (subjrank == 2 && newrank != 1 && (objrank != 2) && (newrank != 2)) {
            updaterank.run(newrank, objects[i].id, globalid);
          }
        }
      }
    }
    socket.updateusers(objects, globalid);
  }
}

// Changes role
exports.setRole = function (user, globalid) {
  const role = JSON.stringify(user.role);
  updaterole.run(role, user.id, globalid);
}

// Transfer room ownership
exports.hailnewking = function (id, newadmin, globalid) {
  const admin = (id == exports.getroominfo(globalid).adminid);
  const membership = exports.getmembership(newadmin, globalid);
  if (admin && (membership < 7)) {
    sql.prepare('UPDATE user_room SET rank = 1 WHERE userid = ? AND globalid =?;').run(newadmin, globalid)
    sql.prepare('UPDATE user_room SET rank = 2 WHERE userid = ? AND globalid =?;').run(id, globalid)
    sql.prepare('UPDATE global SET admin = ? WHERE id = ?;').run(newadmin, globalid)
    socket.hailnewking(newadmin, globalid);
    return true;
  } return false;
}


// Change levels of tech
exports.changetech = function (packet) {
  sql.prepare('UPDATE global SET techtree = ? WHERE id = ?;').run(packet.techtree, packet.globalid);
}


// Creates/updates an object
exports.updateObject = function (packet) {
  const global = sql.prepare('SELECT * FROM global WHERE id = ?').get(packet.globalid);
  if (packet.type.includes('misc')) {
    let misc = {};
    if (global.misc != '') {
      misc = JSON.parse(global.misc);
    }
    const kind = packet.type.slice(5);
    if (misc[kind] == undefined) {
      misc[kind] = {};
    }
    misc[kind][packet.key] = packet.object;
    misc = JSON.stringify(misc);
    sql.prepare('UPDATE global SET misc = ? WHERE id = ?;').run(misc, packet.globalid);
  } else {
    let type = {};
    if (global[packet.type] != '') {
      type = JSON.parse(global[packet.type]);
    }
    type[packet.key] = packet.object;
    type = JSON.stringify(type);
    sql.prepare(`UPDATE global SET ${packet.type} = ? WHERE id = ?;`).run(type, packet.globalid);
  }
}

// Deletes logi request
exports.deleteObject = function (packet) {
  const global = sql.prepare('SELECT * FROM global WHERE id = ?').get(packet.globalid);
  if (packet.type.includes('misc')) {
    let misc = {};
    if (global.misc != '') {
      misc = JSON.parse(global.misc);
    }
    const kind = packet.type.slice(5);
    if (misc[kind] == undefined) {
      misc[kind] = {};
    }
    delete misc[kind][packet.key];
    misc = JSON.stringify(misc);
    sql.prepare('UPDATE global SET misc = ? WHERE id = ?;').run(misc, packet.globalid);
  } else {
    let type = {};
    if (global[packet.type] != '') {
      type = JSON.parse(global[packet.type]);
    }
    delete type[packet.key];
    type = JSON.stringify(type);
    sql.prepare(`UPDATE global SET ${packet.type} = ? WHERE id = ?;`).run(type, packet.globalid);
  }
}

// Adds arty calculations
exports.addArtyResult = function (packet) {
  const global = sql.prepare('SELECT arty FROM global WHERE id = ?').get(packet.globalid);
  if (global.arty == '') { global.arty = []; } else {
    global.arty = JSON.parse(global.arty);
  }
  if (global.arty.constructor != Array) { global.arty = []; }
  global.arty.push(packet.totalstring);
  if (global.arty.length > 5) {
    global.arty.splice(0, 1);
  }
  global.arty = JSON.stringify(global.arty);
  sql.prepare('UPDATE global SET arty = ? WHERE id = ?;').run(global.arty, packet.globalid);
}

// Updates squads
exports.updateSquads = function (packet) {
  const global = sql.prepare('SELECT * FROM global WHERE id = ?').get(packet.globalid);
  if (global.squads == '' || global.squads == '[]') {
    global.squads = {};
  } else {
    global.squads = JSON.parse(global.squads);
  }
  global.squads[packet.type] = packet.data;
  global.squads = JSON.stringify(global.squads);
  // let squads = JSON.stringify(packet.squads);
  sql.prepare('UPDATE global SET squads = ? WHERE id = ?;').run(global.squads, packet.globalid);
}

// Adds a private event
exports.submitEvent = function (packet) {
  const global = sql.prepare('SELECT * FROM global WHERE id = ?').get(packet.globalid);
  switch (packet.type) {
    case 0:// TECH EVENT
      discordbot.techEvent(global, packet.packet);
      break;
  }
  let events = [];
  if (global.events != '') {
    events = JSON.parse(global.events);
  }
  events.push({ type: packet.type, date: packet.date, packet: packet.packet });
  if (events.length > 400) {
    events = events.splice(1);
  }
  events = JSON.stringify(events);
  sql.prepare('UPDATE global SET events = ? WHERE id = ?').run(events, packet.globalid);
}

exports.submitOpTimer = function (packet) {
  const global = sql.prepare('SELECT * FROM global WHERE id = ?').get(packet.globalid);
  let settings = JSON.parse(global.settings);
  settings.optimer = packet.date;
  global.settings = settings;
  discordbot.startOpTimer(global);
  settings = JSON.stringify(settings);
  sql.prepare('UPDATE global SET settings = ? WHERE id = ?').run(settings, packet.globalid);
}

exports.toggleSecure = function (globalid, data) {
  const global = sql.prepare('SELECT * FROM global WHERE id = ?').get(globalid);
  let settings = JSON.parse(global.settings);
  settings.secure = data;
  settings = JSON.stringify(settings);
  sql.prepare('UPDATE global SET settings = ? WHERE id = ?').run(settings, globalid);
  if (data == 1) {
    sql.prepare('DELETE FROM user_room WHERE userid LIKE "anonymous%" AND globalid = ?;').run(globalid);
    const users = exports.getroomusers(globalid);
    return users;
  }
}

exports.clearRoom = function (globalid) {
  const global = sql.prepare('SELECT * FROM global WHERE id = ?').get(globalid);
  const e = {
    id: global.id,
    admin: global.admin,
    settings: global.settings,
  };
  sql.prepare('INSERT OR REPLACE INTO global (id, admin, settings, techtree,refinery, production, storage, stockpiles,fobs, requests, misc, arty,squads,logi,events) VALUES (@id, @admin, @settings, "", "","", "", "","", "", "", "", "",  "","[]");').run(e);
}

exports.clearMap = function (globalid) {
  const global = sql.prepare('SELECT * FROM global WHERE id = ?').get(globalid);
  let misc = {};
  if (global.misc != '') {
    misc = JSON.parse(global.misc);
    if (misc.rld != undefined) {
      misc.rld = {};
    }
    if (misc.icon != undefined) {
      misc.icon = {};
    }
  }
  misc = JSON.stringify(misc);
  sql.prepare('UPDATE global SET fobs="",requests="",misc=?  WHERE id = ?').run(misc, globalid);
}

exports.changeSettings = function (globalid, type, data) {
  const global = sql.prepare('SELECT * FROM global WHERE id = ?').get(globalid);
  let settings = JSON.parse(global.settings);
  settings[type] = data;
  settings = JSON.stringify(settings);
  sql.prepare('UPDATE global SET settings = ? WHERE id = ?').run(settings, globalid);
}

exports.deleteSettings = function (globalid, type) {
  const global = sql.prepare('SELECT * FROM global WHERE id = ?').get(globalid);
  let settings = JSON.parse(global.settings);
  if (type == 'link') {
    discordbot.disconnectDiscord(globalid, settings);
  }
  delete settings[type];
  settings = JSON.stringify(settings);

  sql.prepare('UPDATE global SET settings = ? WHERE id = ?').run(settings, globalid);
}

exports.getRoomByToken = function (token, link) {
  const text = `%"token":"${token}"%`;
  const global = sql.prepare('SELECT * FROM global WHERE settings LIKE ?;').get(text);

  if (global != undefined) {
    global.settings = JSON.parse(global.settings);
    global.settings.link = link;
    delete global.settings.token;
    const settings = JSON.stringify(global.settings);
    sql.prepare('UPDATE global SET settings = ? WHERE id = ?').run(settings, global.id);
  }
  return global;
};

exports.getRoomFromDiscordChannel = function (channelid) {
  const text = `%"channelid":"${channelid}"%`;
  const global = sql.prepare('SELECT * FROM global WHERE settings LIKE ?;').get(text);
  return global;
}

// Adds chat messsage
exports.addMessage = function (packet, category, globalid) {
  const global = sql.prepare('SELECT * FROM global WHERE id = ?').get(globalid)
  let misc = {}

  if (global.misc != '') {
    misc = JSON.parse(global.misc)
  }
  if (misc.chat == undefined) {
    misc.chat = {};
  }
  if (misc.chat[category] == undefined) {
    misc.chat[category] = [];
  }
  misc.chat[category].push(packet)
  misc = JSON.stringify(misc)
  sql.prepare('UPDATE global SET misc = ? WHERE id = ?;').run(misc, globalid)
}

exports.insertrelation = sql.prepare("INSERT OR REPLACE INTO user_room (id, userid, globalid, rank, role) VALUES (?, ?, ?, ?, ?);");

const deleterelation = sql.prepare('DELETE FROM user_room WHERE userid = ? AND globalid = ?;');

const updaterank = sql.prepare('UPDATE user_room SET rank = ? WHERE userid = ? AND globalid =?;');
const updaterole = sql.prepare('UPDATE user_room SET role = ? WHERE userid = ? AND globalid =?;');

function parse(string) {
  if (string == '') {
    return {};
  }
  return JSON.parse(string);

}

setInterval(CheckOpTimers, 60000/* 100000 */);
function CheckOpTimers() {
  let date = new Date();
  date.setHours(date.getHours() + 1);
  date = JSON.stringify(date);
  date = date.substring(0, 17);

  try {
    const globallist = sql.prepare('SELECT settings FROM global WHERE settings LIKE ? AND settings LIKE "%channelid%" ').all(`%"optimer":${date}%`);
    if (globallist.length > 0) {
      for (let i = 0; i < globallist.length; i++) {
        const settings = JSON.parse(globallist[i].settings);
        discordbot.emitNotifyOp(settings);
      }
    }
  } catch(error) {
    logger.warn(error)
  }
}

exports.GetWar = function (warnumber) {
  const war = sql.prepare('SELECT * FROM warhistory WHERE warnumber = ?').get(warnumber)
  return war
}

exports.GetTownName = function (obj, regionId) {
  const region = sql.prepare('SELECT * FROM apidata_static WHERE regionId = ?').get(regionId)
  const data = JSON.parse(region.data)
  const name = GetTownName(data.mapTextItems, obj)

  return name
}

exports.GetCounts = async () => {
  const [steamcount, nosteamcount] = await Promise.all([
    users.getNonAnonymousUsers(),
    users.getAnonymousUsers()
  ])

  return { steamcount: steamcount.length, nosteamcount: nosteamcount.length };
}

function GetTownName(labellist, town) {
  function compare(a, b) {
    if (a.distance < b.distance)
    { return -1; }
    if (a.distance > b.distance)
    { return 1; }
    return 0;
  }

  for (let i = 0; i < labellist.length; i++) {
    const xdif = Math.abs(town.x - labellist[i].x);
    const ydif = Math.abs(town.y - labellist[i].y);
    const distance = Math.sqrt(Math.pow(xdif, 2) + Math.pow(ydif, 2));
    labellist[i].distance = distance;
  }

  labellist.sort(compare);
  try {
    return labellist[0].text;
  } catch (err) {
    return 'undefined';
  }
}