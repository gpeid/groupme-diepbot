const HTTPS = require("https");
const cool = require("cool-ascii-faces");
const util = require("util");

const botID = process.env.BOT_ID;


const botRegex = /^\/cool guy|gabujeeno|kylan$/;

function respond() {
  const request = JSON.parse(this.req.chunks[0]);
  console.log(request);
  if (request.text && botRegex.test(request.text)) {
    this.res.writeHead(200);
    postMessage();
    this.res.end();
  } else {
    console.log("don't care");
    this.res.writeHead(200);
    this.res.end();
  }
}

const postMessage = () => {
  const botResponse = cool();

  const options = {
    hostname: "api.groupme.com",
    path: "/v3/bots/post",
    method: "POST",
  };
  const body = {
    bot_id: botID,
    text: botResponse,
  };

  console.log("sending " + botResponse + " to " + botID);

  const botReq = HTTPS.request(options, (res) => {
    console.log(util.inspect(res.statusCode, false, 1, true));

    if (res.statusCode === 200) {
      // res.send(`${res.statusCode} OK`);
      //neat
    } else if (res.statusCode === 202) {
      // res.send(`${res.statusCode} OK`);
    } else {
      console.log(`rejecting bad status code ${res.statusCode}"`);
    }
  });

  botReq.on("error", (err) => {
    console.log(`error posting message ${JSON.stringify(err)}`);
  });
  botReq.on("timeout", (err) => {
    console.log(err);
    console.log(`timeout posting message ${JSON.stringify(err)}`);
  });
  botReq.end(JSON.stringify(body));
};

exports.respond = respond;
