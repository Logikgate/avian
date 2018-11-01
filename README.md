[![Build Status](https://travis-ci.org/flypapertech/avian.svg?branch=master)](https://travis-ci.org/flypapertech/avian)
[![Known Vulnerabilities](https://snyk.io/test/github/flypapertech/avian/badge.svg)](https://snyk.io/test/github/flypapertech/avian)
[![npm (scoped)](https://img.shields.io/npm/v/@flypapertech/avian.svg)](https://www.npmjs.com/package/@flypapertech/avian)
[![NpmLicense](https://img.shields.io/npm/l/@flypapertech/avian.svg)](https://github.com/flypapertech/avian/blob/master/LICENSE)
[![dependencies Status](https://david-dm.org/flypapertech/avian/status.svg)](https://david-dm.org/flypapertech/avian)

# Avian
Create Enterprise-class component driven applications that scale.

## Key Features
- Enterprise-class application server that meets infinitely scalable demands.
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
Host an HTML5 application using Avian...

    avian --name appname --home /path/to/your/app --port 8080 --mode production

## Express Globals Added by Avian
### Properties Added to All Request Objects
`req.argv` contains a copy of all arguments passed to avian at start

`req.cache` is a RedisClient instance hooked to avian's config object cache. Feel free to use it for your own needs as well.

### Using Typescript?
To make typescript aware of the globals Avian adds to your project simply place the below import into any .d.ts file that is within your project
```typescript
import * as Avian from "@flypapertech/avian"
```

# Documentation
    docs/README.md

# Examples
    docs/examples/README.md

# Contributors
    Dan Stephenson
    Nick Fredricks

# Copyright
2017 - 2018 FlyPaper Technologies, LLC
2014 - 2018 Thoughtpivot, LLC

