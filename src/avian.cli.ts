"use strict"

import * as events from "events"
import * as crypto from "crypto"
import * as cluster from "cluster"
import * as express from "express"
import * as glob from "glob"
import * as parser from "body-parser"
import * as os from "os"
import * as fs from "fs"
import * as path from "path"
import * as webpack from "webpack"
import { RedisClient } from "redis"

const session = require("express-session")

const jsonfile = require("jsonfile")
const compression = require("compression")

const argv = require("yargs").argv
argv.name = argv.name || process.env.AVIAN_APP_NAME || process.env.HOSTNAME || "localhost"
argv.home = argv.home || process.env.AVIAN_APP_HOME || process.cwd()
argv.port = argv.port || process.env.AVIAN_APP_PORT || process.env.PORT || 8080
argv.mode = argv.mode || process.env.AVIAN_APP_MODE || process.env.NODE_MODE || "development"

const componentJss = glob.sync(`${argv.home}/components/**/*.component.*`)
console.log(`${argv.home}/components/**/*.component.*`)
console.log(componentJss)
const compiler = webpack({
    entry: componentJss,
    output: {
        path: `${argv.home}/static`,
        filename: "components.bundle.js",
    },
    resolve: {
        alias: {
            vue: "vue/dist/vue.js"
        }
    }
})

class AvianUtils {
    getComponentRoot(component: string): string {
        if (fs.existsSync(`${argv.home}/components/${component}`))
            return `${argv.home}/components/${component}`
        else
            return `${argv.home}/components`
    }

    setConfigObjectCache(component: string, reqWithCache: RequestWithCache) {
        let component_root = this.getComponentRoot(component)
        let configStringJSON: string
        try {
            configStringJSON = JSON.stringify(jsonfile.readFileSync(`${component_root}/${component}.config.json`))
        } catch (err) {
            configStringJSON = JSON.stringify({})
        }

        let event = new events.EventEmitter()
        event.emit("synch",
            reqWithCache.cache.set(component, configStringJSON))
    }
}

const avianUtils = new AvianUtils()

interface RequestWithCache extends express.Request {
    cache: RedisClient
}

if (cluster.isMaster) {

    let cores = os.cpus()

    for (let i = 0; i < cores.length; i++) {
        cluster.fork()
    }
    cluster.on("exit", worker => {
        cluster.fork()
    })

} else {

    const avian = express()
    const watching = compiler.watch({
        aggregateTimeout: 300,
        poll: undefined
    }, (err, stats) => {

        console.log(stats)
    })

    avian.locals.argv = argv

    let redisStore = require("connect-redis")(session)

    avian.use(session({
        store: new redisStore({host: "127.0.0.1"}),
        secret: crypto.createHash("sha512").digest("hex"),
        resave: false,
        saveUninitialized: false
    }))

    avian.use(require("express-redis")(6379, "127.0.0.1", {return_buffers: true}, "cache"))

    avian.use("/assets", express.static(argv.home + "/assets"))
    avian.use("/", express.static(argv.home + "/static"))
    avian.use("/node_modules", express.static(argv.home + "/node_modules"))
    avian.use("/bower_components", express.static(argv.home + "/bower_components"))
    avian.use("/jspm_packages", express.static(argv.home + "/jspm_packages"))

    avian.set("view engine", "pug")
    avian.set("views", argv.home)

    // if (!fs.existsSync(home + "/temp/")) shx.mkdir(home + "/temp/")

    if (argv.mode === "production") {

        fs.mkdirSync(argv.home + "/cache/")
        fs.mkdirSync(argv.home + "/logs/")

        avian.use(require("express-bunyan-logger")({
            name: argv.name,
            streams: [
                {
                    level: "info",
                    stream: process.stdout
                },
                {
                    level: "info",
                    stream: process.stderr
                },
                {
                    level: "info",
                    type: "rotating-file",
                    path: argv.home + `/logs/${argv.name}.${process.pid}.json`,
                    period: "1d",
                    count: 365
                }
            ],
        }))

        avian.use(require("express-minify")({cache: argv.home + "/cache"}))
        avian.use(compression())
    }

    let event = new events.EventEmitter()
    event.on("synch", () => {this})

    avian.get("/:component", parser.urlencoded({ extended: true }), (req, res, next) => {
        let reqWithCache = req as RequestWithCache
        let component_root = avianUtils.getComponentRoot(req.params.component)
        try {
            avianUtils.setConfigObjectCache(req.params.component, reqWithCache)
            reqWithCache.cache.get(`${req.params.component}`, (err, config) => {
                res.locals.params = req.params
                res.locals.query = req.query
                res.render(`${component_root}/${req.params.component}.view.pug`, JSON.parse(config))
            })
        }
        catch (err) {
            if (err)
                res.redirect("/error")
        }
    })

    avian.get("/:component/config/objects.json", (req, res, next) => {
        let reqWithCache = req as RequestWithCache
        let component_root = avianUtils.getComponentRoot(req.params.component)
        try {
            avianUtils.setConfigObjectCache(req.params.component, reqWithCache)
            reqWithCache.cache.get(req.params.component, (err, config) => {
                res.json(JSON.parse(config))
            })
        }
        catch (err) {
            res.status(404)
                .send("Not Found")
        }
    })

    // Include individual component servers...
    let services = glob.sync(`${argv.home}/components/**/*service*`)
    for (let i = 0; i < services.length; i++) {
        let serviceFilename = path.basename(services[i])
        let ComponentRouter: express.Router = require(`${services[i]}`)
        let routeBase = serviceFilename.substring(0, serviceFilename.indexOf("."))
        avian.use(`/${routeBase}`, ComponentRouter)
    }

    avian.all("*", (req, res, next) => {
        res.redirect("/index")
    })

    const portal = avian.listen(argv.port, () => {

        console.log("Avian - Core: %s, Process: %sd, Name: %s, Home: %s, Port: %d",
            cluster.worker.id,
            process.pid,
            argv.name,
            argv.home,
            argv.port
        )
    })
}
