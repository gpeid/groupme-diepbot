require("dotenv").config();

const http = require("http");
const director = require("director");
const cool = require("cool-ascii-faces");
const bot = require("./bot.js");
const messages = require("./messages.js");
const express = require("express");

// const router = new director.http.Router({
//   "/": {
//     post: bot.respond,
//     get: ping,
//   },
//   "/messages": {
//     get: messages.groupMessages,
//   },
// });

// const server = http.createServer((req, res) => {
//   req.chunks = [];
//   req.on("data", (chunk) => {
//     req.chunks.push(chunk.toString());
//   });

//   router.dispatch(req, res, (err) => {
//     res.writeHead(err.status, { "Content-Type": "text/plain" });
//     res.end(err.message);
//   });
// });

// const port = Number(process.env.PORT || 5001);
// server.listen(port);

// function ping() {
//   this.res.writeHead(200);
//   this.res.end("Hey, I'm Cool Guy.");
// }

const app = express();
app.use(express.json()); // To parse JSON bodies
app.use(express.urlencoded({ extended: true })); // To parse URL-encoded bodies
const port = Number(process.env.PORT || 5001);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/", (req, res) => {
  res.send(req.body);
  bot.respond.call({ req, res});
});

// app.get("/messages", (req, res) => {
//   messages.groupMessages(req, res);
// });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
