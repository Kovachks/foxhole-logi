//ANCIENT TECHNOLOGIES BORROWED FROM INTERACTIVE MAP PROJECT
const SQLite = require('better-sqlite3');

const conf = require('./conf/config');
const logger = conf.logger
const sql = SQLite(conf.sqlLite.fileNameGiven);
const db = require('./dbfunctions.js');
const socket = require('./socket.js');
const discordbot = require('./discordbot.js');
var XMLHttpRequest = require('xhr2');
const regionNames = ['DeadLandsHex',//3
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
  'ViperPitHex']; //25

//Pulling dynamic data from the WarAPI
exports.updateMap = function () {
  function getEtag(array, regionname) {
    for (var i = 0; i < array.length; i++) {
      if (regionname === array[i].regionName) {
        return array[i].etag;
      }
    }
  }

  function finishUpdate(startDate) {
    logger.info('Dynamic API update successful, all regions updated');
    let finishLoadDate = new Date();
    let timedif = Math.abs(finishLoadDate - startDate) / 1000;
    logger.info(timedif + ' seconds to load data');
    exports.pullStatic();
    //sql.prepare("ALTER TABLE apidata_dynamic_temp RENAME TO apidata_dynamic;").run();
    socket.UpdateDynMap();
  }

  try {
    sql.prepare('DROP TABLE apidata_dynamic_temp;')
      .run();
    logger.info("Dropped table apidata_dynamic_temp")
  } //K - if there is no table to drop, just ignore the error and create a new one, meh.
  catch (err) {
    logger.debug(err)
  }
  try {
    sql.prepare('CREATE TABLE apidata_dynamic (regionName TEXT PRIMARY KEY, regionId INT, data TEXT, etag TEXT);')
      .run();
    logger.info("Created table apidata_dynamic")
  } catch (err) {
    logger.debug(err)
  }
  var etags = sql.prepare('SELECT regionName, etag FROM apidata_dynamic;')
    .all();
  //sql.setAPIData = sql.prepare("INSERT OR REPLACE INTO apidata_dynamic_temp (regionId, teamId, iconType, x, y, flags) VALUES (@regionId, @teamId, @iconType, @x, @y, @flags);");
  const insertMap = sql.prepare('INSERT OR REPLACE INTO apidata_dynamic (regionName, regionId, data, etag) VALUES (@regionName, @regionId, @data, @etag);');
  const getMap = sql.prepare('SELECT * FROM apidata_dynamic WHERE regionId = ?;');
  //Dynamic Data
  var dynamicCounter = 0;
  let oldCounter = 0;
  let startLoadDate = new Date();
  regionNames.forEach(function (value) {
    var str = `${conf.warApi.liveUrl}/api/worldconquest/maps/${value}/dynamic/public`;
    var request = new XMLHttpRequest();
    request.responseType = 'json';
    request.open('GET', str, true);
    request.onreadystatechange = function () { //Checks etags, if same, abort
      //logger.info("State "+request.readyState+" for "+value)
      if (request.readyState === 2) {
        let etag = this.getResponseHeader('etag');
        let oldEtag = getEtag(etags, value);
        //logger.info("Checking etags for "+value+", old Etag = "+oldEtag+", new Etag = "+etag);
        if (etag === oldEtag) {
          oldCounter++;
          //logger.info("Same etag, aborting");
          request.abort();
          dynamicCounter++;
          if (dynamicCounter === regionNames.length) {
            if (oldCounter !== dynamicCounter) {
              logger.info('Old data', oldCounter);
            }
            if (oldCounter === dynamicCounter) {
              return null;
            }
            finishUpdate(startLoadDate);
          }
        }
      }
    };
    request.onload = function () {
      if (request.status >= 200 && request.status < 400) {
        logger.info('Got dynamic data ')
        try {
          //logger.info(this.response);
          var data = this.response;
          let mapData = {
            regionName: value,
            regionId: data.regionId,
            data: JSON.stringify(data),
            etag: this.getResponseHeader('etag')
          };
          let prevData = getMap.get(data.regionId);
          //logger.info("previous data")
          //logger.info(prevData)
          let prevItems = [];
          try {
            prevItems = JSON.parse(prevData.data).mapItems;
          } catch (err) {
            logger.info(data.regionId);
            logger.info(prevData);
          }

          function findItem(x, y) {
            for (var i = 0; i < prevItems.length; i++) {
              let obj = prevItems[i];
              if (obj.x === x && obj.y === y) {
                return obj;
              }
            }
          }

          for (var i = 0; i < data.mapItems.length; i++) {
            let obj = data.mapItems[i];
            if ((obj.iconType > 3 && obj.iconType < 8) || obj.iconType === 29) {
              let prevObj = findItem(obj.x, obj.y);
              if (prevObj === null || prevObj === undefined || prevObj === '') {
                continue;
              }
              if (JSON.stringify(obj) !== JSON.stringify(prevObj)) {
                const insertEvent = sql.prepare('INSERT INTO events (region, date, prevItem, newItem)  VALUES (@region, @date, @prevItem, @newItem);');
                let entry = {
                  region: data.regionId,
                  date: JSON.stringify(new Date()),
                  prevItem: JSON.stringify(prevObj),
                  newItem: JSON.stringify(obj)
                };
                logger.info('New data');
                logger.info(entry);
                if (obj.iconType == 5 || obj.iconType == 6 || obj.iconType == 7 || obj.iconType == 29) {
                  let signature = getSignature(obj);
                  let globallist = sql.prepare('SELECT * FROM global WHERE settings LIKE ?;')
                    .all('%' + signature + '%');
                  if (globallist.length > 0) {
                    for (let j = 0; j < globallist.length; j++) {
                      discordbot.emitNotify({
                        global: globallist[j],
                        region: data.regionId,
                        date: new Date(),
                        prevItem: prevObj,
                        newItem: obj
                      });
                    }
                  }
                  //logger.info("Global list",globallist)
                }

                //let global = sql.prepare('SELECT * FROM global WHERE settings LIKE ?;').get(text);
                if (obj.iconType > 3 && obj.iconType < 8) {
                  insertEvent.run(entry);
                }
              }
            }
          }
          insertMap.run(mapData);
          //logger.info(data.mapItems);
          //logger.info("Dynamic API data for",value,"updated");
          dynamicCounter++;
          if (dynamicCounter == regionNames.length) {
            finishUpdate(startLoadDate);
          }
        } catch (err) {
          logger.warn(`ERROR - Could not load dynamic data for ${value}: ${err}`);
          //logger.info(err)
          dynamicCounter++;
          if (dynamicCounter == regionNames.length) {
            finishUpdate(startLoadDate);
          }
        }
      } else {
        dynamicCounter++;
        if (dynamicCounter == regionNames.length) {
          finishUpdate(startLoadDate);
        }
        logger.warn(`ERROR - Could not load dynamic data for ${value}: error code is ${request.status}`);
      }
    };
    //logger.info("Sending to WarAPI Dynamic Data request for",value)
    request.send();
  });
};

//Pull static data from WarAPI (modified dynamic data function (NOT TESTED))
exports.pullStatic = function () {
  function getEtag(array, regionname) {
    for (var i = 0; i < array.length; i++) {
      if (regionname === array[i].regionName) {
        return array[i].etag;
      }
    }
  }

  function finishUpdate(startDate) {
    logger.info('Static API update successful, all regions updated');
    let finishLoadDate = new Date();
    let timedif = Math.abs(finishLoadDate - startDate) / 1000;
    logger.info(timedif + ' seconds to load data');
  }

  try {
    sql.prepare('DROP TABLE apidata_static_temp;')
      .run();
  } //K - if there is no table to drop, just ignore the error and create a new one, meh.
  catch (err) {
    logger.error(err)
  }
  try {
    logger.info("CREATE apidata_static")
    sql.prepare('CREATE TABLE apidata_static (regionName TEXT PRIMARY KEY, regionId INT, data TEXT, etag TEXT);')
      .run();
  } catch (err) {
    logger.error(err)
  }
  var etags = sql.prepare('SELECT regionName, etag FROM apidata_static;')
    .all();
  const insertMap = sql.prepare('INSERT OR REPLACE INTO apidata_static (regionName, regionId, data, etag) VALUES (@regionName, @regionId, @data, @etag);');
  //Static Data
  var staticCounter = 0;
  let startLoadDate = new Date();
  regionNames.forEach(function (value) {
    var str = `${conf.warApi.liveUrl}/api/worldconquest/maps/${value}/static`;
    var request = new XMLHttpRequest();
    request.responseType = 'json';
    request.open('GET', str, true);
    request.onreadystatechange = function () { //Checks etags, if same, abort
      //logger.info("State "+request.readyState+" for "+value)
      if (request.readyState === 2) {
        let etag = this.getResponseHeader('etag');
        let oldEtag = getEtag(etags, value);
        //logger.info("Checking etags for "+value+", old Etag = "+oldEtag+", new Etag = "+etag);
        if (etag == oldEtag) {
          //logger.info("Same etag, aborting");
          request.abort();
          staticCounter++;
          if (staticCounter == regionNames.length) {
            finishUpdate(startLoadDate);
          }
        }
      }
    };
    request.onload = function () {
      if (request.status >= 200 && request.status < 400) {
        try {
          logger.info(this.response);
          var data = this.response;
          let mapData = {
            regionName: value,
            regionId: data.regionId,
            data: JSON.stringify(data),
            etag: this.getResponseHeader('etag')
          };
          insertMap.run(mapData);
          //logger.info(data.mapItems);
          //logger.info("Dynamic API data for",value,"updated");
          staticCounter++;
          if (staticCounter == regionNames.length) {
            finishUpdate(startLoadDate);
          }
        } catch (err) {
          //logger.info("ERROR - Could not load static data for",value);
          //logger.info(err)
        }
      } else {
        //logger.info("ERROR - Could not load static data for",value);
      }
    };
    //logger.info("Sending to WarAPI static Data request for",value)
    request.send();
  });
};


exports.cunt = function test(string) {
  logger.info('Foxhole War API module ' + string);
};

// ////////////////////////////////////////////////////////////////////////
// function findclosest(town, labellist) {
// //if(labellist!=undefined){
//   //logger.info(town);
//   for (var i = 0; i < labellist.length; i++) {
//     var xdif = Math.abs(town.x - labellist[i].x);
//     var ydif = Math.abs(town.y - labellist[i].y);
//     var distance = Math.sqrt(Math.pow(xdif, 2) + Math.pow(ydif, 2));
//     labellist[i].distance = distance;
//   }
//   labellist.sort(compare);
//   //logger.info(labellist[0]);
//   return labellist[0];
// }

//}

function compare(a, b) {
  if (a.distance < b.distance) {
    return -1;
  }
  if (a.distance > b.distance) {
    return 1;
  }
  return 0;
}

//Check if icon is a town
function checkicon(type) {
  if (type == 4 || type == 5 || type == 6 || type == 7) {
    return true;
  } else {
    return false;
  }
}

function getSignature(obj) {
  if (obj.regionId == undefined) {
    return obj.x + obj.y;
  } else {
    return obj.x + obj.y + obj.regionId;
  }
}

//////////WAR REPORT SECTION///////////////////////////////////////////
let WR = {};
exports.WR = WR;
exports.updateWarReport = function () {
  function finishUpdate(startDate) {
    logger.info('War report API update successful, all regions updated');
    let finishLoadDate = new Date();
    let timedif = Math.abs(finishLoadDate - startDate) / 1000;
    logger.info(timedif + ' seconds to load data');
    socket.FinishUpdateStats();
  }

  //Dynamic Data
  var dynamicCounter = 0;
  let startLoadDate = new Date();
  regionNames.forEach(function (value) {
    var str = conf.warApi.liveUrl + `/api/worldconquest/warReport/${value}`
    var request = new XMLHttpRequest();
    request.responseType = 'json';
    request.open('GET', str, true);
	logger.info(str);
    request.onerror = (error) => {
      logger.error('An error occured, check this, or check your url')
    }
    request.onload = function () {
      if (request.status >= 200 && request.status < 400) {
        try {
          //logger.info(this.response);
          WR[value] = this.response;
          dynamicCounter++;
          if (dynamicCounter == regionNames.length) {
            finishUpdate(startLoadDate);
          }
        } catch (err) {
          logger.info('ERROR -Could not load dynamic data for', value);
          logger.info(err);
        }
      } else {
        logger.error('ERROR - Could not load dynamic data for', value);
      }
    };
    request.send();
  });
};
///////////////////////////////
