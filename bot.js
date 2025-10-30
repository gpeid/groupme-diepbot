const HTTPS = require("https");
const cool = require("cool-ascii-faces");
const util = require("util");

const botID = process.env.BOT_ID;
const accessToken = process.env.GROUPME_ACCESS_TOKEN;
const groupID = process.env.GROUP_ID;

const botRegex = /^\/cool guy|gabujeeno|kylan$/;

function respond() {
  const request = JSON.parse(this.req.chunks[0]);
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

async function fetchGroupMessages() {
  try {
    console.log("Fetching recent messages...");

    const response = await fetch(
      `https://api.groupme.com/v3/groups/${groupID}/messages?token=${accessToken}`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    const recentMessages = data.response.messages.map((msg) => msg.text);

    if (recentMessages[0] && botRegex.test(recentMessages[0])) {
      postMessage();
    } else {
      console.log("don't care");
    }

    this.res.writeHead(200);
    this.res.end(recentMessages.join("\n"));
  } catch (error) {
    console.error("Error fetching messages:", error);
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
exports.groupMessages = fetchGroupMessages;
