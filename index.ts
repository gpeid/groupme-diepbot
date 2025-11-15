require("dotenv").config();

const bot = require("./bot.js");
const express = require("express");
import type { Request, Response } from "express";

const app = express();
app.use(express.json()); // To parse JSON bodies
app.use(express.urlencoded({ extended: true })); // To parse URL-encoded bodies
const port = Number(process.env.PORT || 5001);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");

});
app.post("/", (req: Request, res: Response) => {
  bot.postMessage(req, res);
});

// app.get("/messages", (req, res) => {
//   messages.groupMessages(req, res);
// });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
