 Foxhole Global V2.2
====================

> This is a fork of https://github.com/muloneweb/FHGHQ

## Sites

**Production**

- War 1 server: https://live-1.foxehole-hq.com/auth
- War 2 server: https://live-2.foxehole-hq.com/auth

**Development / Beta**

> This is NOT PERSISTENT
- War 2 server: https://dev.foxehole-hq.com/auth

## Deployment

- `FHGHQ_URL`: must be `http://{your_domain.com}`
- An instance of FHGHQ can only target **1 Forehole war map at a time**.

> Please note by default this targets the WAR 2 foxehole server. See [configuration](#configuration)


### Using docker

**Without persistence**
```bash
docker run -p 3000:3000 registry.gitlab.com/a.couty/fhghq:master
```

Go to http://localhost:3000

### Using helm

```bash
$ kubectl create namespace fhghq
$ kubectl config set-context --namespace fhghq 
$ helm repo add
$ helm upgrade --install --namespace fhghq fhghg .
```

## Development

- node v12.x
- python 3.x

**Single build & run**
```bash
$ npm install
$ npm run-script build
$ npm start
```

**Build on change**
```bash
$ npm install
$ npm run-script dev
```

Go to http://localhost:3000

## Configuration

Can be done via two ways:
1. Editing [config.js](conf/config.js)
2. Setting environment variables
   
    Inferred from [config.js](conf/config.js) config object structure.
    For example config.steamApi.key can be overriden by setting and Environment variable named `STEAMAPI_KEY` 

- Note that `STEAMAPI_KEY` and `DISCORD_TOKEN` are not mandatory for FHGHQ to run.

**Important config**

PLEASE NOTE:  An instance of FHGHQ can only target **1 Forehole war map at a time**.

````
{
  fhghq: {
    url: 'http://localhost:3000'                                # Important for SteamApi
  },
  steamApi: {
    key: ''                                                     # (optional) Mandatory for SteamApi
  },
  warApi: {
    liveUrl: 'https://war-service-live-2.foxholeservices.com'   # Set live server api url
  },
  discord: {
    token: ''                                                   # (optional) Mandatory for SteamApi
  }
}
````

See [config.js](conf/config.js) for the complete list.





The project is currently in a complete disarray, unmaintained and deprecated. Some people still use it.
_________
Shortcuts:

[MAP LIST](https://war-service-live.foxholeservices.com/api/worldconquest/maps/) https://war-service-live.foxholeservices.com/api/worldconquest/maps/

[WAR INFO](https://war-service-live.foxholeservices.com/api/worldconquest/war) https://war-service-live.foxholeservices.com/api/worldconquest/war

[DYNAMIC](https://war-service-live.foxholeservices.com/api/worldconquest/maps/DeadLandsHex/dynamic/public) https://war-service-live.foxholeservices.com/api/worldconquest/maps/DeadLandsHex/dynamic/public

[STATIC](https://war-service-live.foxholeservices.com/api/worldconquest/maps/DeadLandsHex/static) https://war-service-live.foxholeservices.com/api/worldconquest/maps/DeadLandsHex/static

[WAR REPORT](https://war-service-live.foxholeservices.com/api/worldconquest/warReport/DeadLandsHex) https://war-service-live.foxholeservices.com/api/worldconquest/warReport/DeadLandsHex
