// server.js
const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const { createServer } = require("http");
const { parse } = require("url");
const next = require("next");

const dev = process.env.NODE_ENV !== "production";
const hostname = 'localhost'
const port = 3000
// when using middleware `hostname` and `port` must be provided below
const app = next({ dev, hostname, port })
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();
  server.use(cookieParser());
  server.use(express.json());
  server.use(
    express.urlencoded({
      extended: true,
    })
  );
  server.get("/_next/*", (req, res) => {
    return handle(req, res);
  });
  server.get("*", (req, res) => {
    handle(req, res);
  });
  server.listen(3000, (err) => {
    if (err) throw err;
    console.log("> Ready on http://localhost:3000");
  });
});
