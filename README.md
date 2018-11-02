[![Build Status](https://travis-ci.org/flypapertech/avian.svg?branch=master)](https://travis-ci.org/flypapertech/avian)
[![Known Vulnerabilities](https://snyk.io/test/github/flypapertech/avian/badge.svg)](https://snyk.io/test/github/flypapertech/avian)
[![npm (scoped)](https://img.shields.io/npm/v/@flypapertech/avian.svg)](https://www.npmjs.com/package/@flypapertech/avian)
[![NpmLicense](https://img.shields.io/npm/l/@flypapertech/avian.svg)](https://github.com/flypapertech/avian/blob/master/LICENSE)
[![dependencies Status](https://david-dm.org/flypapertech/avian/status.svg)](https://david-dm.org/flypapertech/avian)

# Avian
Create Enterprise-class component driven applications that scale.

## Key Features
- Enterprise-class application server built on [Express](https://github.com/expressjs/express) that meets infinitely scalable demands.
- A unique and easy to use component-based model that is flexible with popular
frameworks such as Angular, Vue.js, ReactJS, X-Tag, SkateJS, Ember, and much more.
- Multi-core / Multi-threaded application host operations remove the burden of such considerations from the application developer.
- Out of the box webpacking with sane defaults.  Don't worry you can override and/or add to them whenever you want :)

# Installation
The latest stable release of Avian is available via the Node Package Manager.

```
npm install @flypapertech/avian

or

yarn add @flypapertech/avian
```

## System Requirements
Avian uses Redis Server for fast loading component templates and component storage objects. Because of this, and other lower-level goodies, the following software must be available to the installation environment.

- macOS/Linux
    - Redis Server
    - GCC 4.8+ / G++5 / Python 2.x
- Windows
    - Redis Server
    - Visual Studio, Windows SDK, .NET and Python 2.x.

# Getting Started
After Avian is installed as a dependency of your project start avian via:

    node ./node_modules/.bin/avian

## CLI Arguments
- --name (name of your application, defaults to localhost)
- --home (directory of your application, defaults to .)
- --port (port to start express server, defaults to 8080)
- --mode (mode to run avian in, development or production, defaults to development)
- --redisPort (port that your Redis server is listening on, defaults to 6379)
- --redisHost (host where your Redis server is running, defaults to 127.0.0.1)
- --redisSessionDB (the Redis database number to store session data, defaults to 1)
- --redisCacheDB (the Redis database number to store general cache data, defaults to 2)
- --webpack (directory to find webpack config files to override avian default, defaults to .)

## Project Folder Structure
```
├── assets (optional, statically served at /assets)
├── static (optional, statically served at /static)
├── cache (auto-generated by avian in production mode)
├── components
│   ├── avian.service.ts (optional, used to add service routes to / path)
│   ├── component_name.component.ts
│   ├── component_name.template.pug (must be pug for now, we will support other types soon.)
│   ├── component_name.service.ts (optional, used to add service routes to /component_name)
│   ├── component_name.config.json (optional, served at /component_name/config/objects.json and passed to template files during render)
│   ├── component_name (components can be in a flat folder or scaffolded like this)
│   │   ├── component_name.component.ts
│   │   ├── component_name.template.pug
│   │   ├── component_name.service.ts (optional)
│   │   ├── component_name.config.json (optional)
├── logs (auto-generated by avian in production mode)
├── package.json
├── private (auto-generated, for compiled service files)
├── public (auto-generated, for compiled component bundles, statically served at /)
```

## Session Management
Avian uses [express-session](https://github.com/expressjs/session) to manage client sessions.

- Browser Based Clients
    - Avian uses secure [HttpOnly Cookies](https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies#Secure_and_HttpOnly_cookies) for managing browser based client sessions.

- Mobile Device and API Clients
    - Avian augments express-session to allow API and mobile device sessions management.  Since those clients may not use coookies they simply need to send their session ID in the authorization header of all requests made to Avian. See below for an example header.

```json
headers: {
    Authorization: "Bearer Session_ID"
}
```

## Express Globals Added by Avian
### Properties Added to All Request Objects
`req.argv` contains a copy of all arguments passed to avian at start

`req.cache` is a RedisClient instance hooked to avian's config object cache. Feel free to use it for your own needs as well.

### Using Typescript?
To make typescript aware of the globals Avian adds to your project simply place the below import into any .d.ts file that is within your project
```typescript
import * as Avian from "@flypapertech/avian"
```

# Examples
Examples are located in the [examples directory](https://github.com/flypapertech/avian/tree/master/examples)

# Contributors
    Dan Stephenson
    Nick Fredricks

# Copyright
2017 - 2018 FlyPaper Technologies, LLC
2014 - 2018 Thoughtpivot, LLC
