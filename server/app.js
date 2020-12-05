"use strict";

const express = require("express");
const path = require("path");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const debug = require("debug");
const http = require("http");
//const models = require('./models');
const config = require("./config/config.json")[process.env.NODE_ENV || "development"];
const viewPath = config.path;
const session = require("express-session");

const compression = require("compression");
const moment = require("moment-timezone");
const timeout = require("connect-timeout");

const { sequelize } = require("./models");

const isDev = process.env.NODE_ENV !== "production";

const next = require("next")({ dev: isDev });
const handle = next.getRequestHandler();

const port = config.port;

const axiosConfig = require("./config/axios.config");
axiosConfig(process.env.NODE_ENV || "development");

next.prepare().then(() => {
  const app = express();

  // morgan setup
  app.enable("trust proxy");
  logger.token("User", (req, res) => {
    return !req.session ? "Source" : req.session.user == undefined ? "Guest" : req.session.user.name;
  });
  logger.token("Date", (req, res, tz) => {
    return moment().tz(tz).format("YYYY-MM-DD HH:mm:ss Z");
  });
  logger.format("SCG", ':User :remote-addr [:Date[Asia/Seoul]] ":method :url HTTP/:http-version" :status :res[content-length] ":user-agent" - :response-time ms');

  app.use(timeout("30s"));
  app.use(logger(app.get("env") === "development" ? "dev" : "SCG"));

  app.use(bodyParser.json());
  app.use(
    bodyParser.urlencoded({
      extended: false,
    })
  );
  app.use(cookieParser());
  app.use(compression());

  // session for 3 hours
  app.use(
    session({
      key: "SystemConsultantGroup",
      secret: "ITSeminar",
      proxy: true,
      resave: false,
      saveUninitialized: true,
      cookie: {
        maxAge: 3 * 60 * 60 * 1000,
      },
    })
  );

  app.use("/webdata", express.static(path.join(__dirname, "/../webdata")));

  // rest api
  app.use("/rest", require("./routes"));
  app.set("rest", require("./routes"));

  //app.use(require("./util/ssrHandle")(app));

  app.get("*", (req, res) => {
    return handle(req, res);
  });

  //error handling
  app.use(function (err, req, res, next) {
    console.error(err.stack);
    next(err);
    res.send("error");
  });

  app.listen(port, (err) => {
    if (err) throw err;
    console.log("Server ready on http://localhost:" + port);
  });
});
