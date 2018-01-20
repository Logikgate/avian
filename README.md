[![Build Status](https://travis-ci.org/ispyhumanfly/avian.svg?branch=master)](https://travis-ci.org/ispyhumanfly/avian)

[![NPM](https://nodei.co/npm/avian.png)](https://npmjs.org/package/avian)

# Avian
Easily power your enterprise-class HTML5 web, mobile or desktop application.

# About
A highly scalable, and easy to use environment for hosting modern HTML5 web, mobile and desktop applications.

## Key Features
- Component-based design paradigm while keeping things flexible.
- Multi-core / Multi-threaded server side operations.
- No database, just Redis. Each Avian component is responsible for managing its own storage objects.

Host an HTML5 application using Avian...

    avian --name appname --home /path/to/your/app --port 8080 --mode production

# Installation
Avian can easily be installed using various methods.

## System Requirements
Avian uses a Redis cache for fast retrieval of component storage objects. Because of this, the following developer tools are required on the installation system to build the hiredis wrapper.

- macOS/Linux
    - Redis Server
    - GCC 4.8+ / Python 2.x
- Windows
    - Redis Server
    - Visual Studio, Windows SDK, .NET and Python 2.x.

# NPM
The latest stable release of Avian is available via the Node Package Manager.

## Global
    npm install avian -g

## Local
    npm install avian --save

# GitHub
The source code is available on GitHub.

## Global
    npm install https://github.com/ispyhumanfly/avian -g

## Local
    npm install https://github.com/ispyhumanfly/avian --save

## Clone
    git clone https://github.com/ispyhumanfly/avian.git

# Example Applications
Yes, eventually, and soon, we will have *real* documentation. For now, I'm working to create example Avian applications using popular frameworks.

## Avian w/ Vuetify
    examples/vuetify/README.md
## Avian w/ jQuery
    examples/jquery/README.md

# Author
Dan Stephenson (ispyhumanfly@gmail.com)

# License
MIT
