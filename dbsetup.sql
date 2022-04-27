CREATE TABLE IF NOT EXISTS rooms (
	id INT NOT NULL AUTO_INCREMENT,
    room_link VARCHAR(255) NOT NULL,
	admin JSON,
	settings JSON,
	fobs JSON,
	requests JSON,
	misc JSON,
	arty JSON,
	squads JSON,
	refinery JSON,
	production JSON,
	storage	JSON,
	stockpiles JSON,
	logi JSON,
	events TEXT,
	PRIMARY KEY(id)
);
CREATE TABLE IF NOT EXISTS users (
	id INT NOT NULL AUTO_INCREMENT,
    steam_id VARCHAR(255),
	salt VARCHAR(255),
	name VARCHAR(255),
	avatar VARCHAR(255),
	PRIMARY KEY(id)
);
CREATE TABLE IF NOT EXISTS user_room (
	id INT NOT NULL AUTO_INCREMENT,
	user_id INT,
    steam_id VARCHAR(255),
	room_id INT,
	user_rank INT,
	role VARCHAR(255),
	FOREIGN KEY(user_id) REFERENCES users(id),
	FOREIGN KEY(room_id) REFERENCES rooms(id),
	PRIMARY KEY(id)
);
CREATE TABLE IF NOT EXISTS events (
	id INT NOT NULL AUTO_INCREMENT,
    region INT,
	date VARCHAR(255),
	prevItem VARCHAR(255),
	newItem	VARCHAR(255),
    war_id INT NOT NULL,
    PRIMARY KEY(id)
);
CREATE TABLE IF NOT EXISTS apidata_dynamic (
    id INT NOT NULL AUTO_INCREMENT,
	regionName VARCHAR(255),
	regionId INT,
	date VARCHAR(255),
	etag VARCHAR(255),
	PRIMARY KEY(id)
);
CREATE TABLE IF NOT EXISTS apidata_static (
    region_id INT,
    region_name	VARCHAR(255),
	data VARCHAR(255),
	etag VARCHAR(255),
	PRIMARY KEY(region_id)
);
COMMIT;