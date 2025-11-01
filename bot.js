const HTTPS = require("https");
const cool = require("cool-ascii-faces");
const util = require("util");

const botID = process.env.BOT_ID;

const botRegex = /^\/cool guy|gabujeeno|kylan|tree of wisdom$/;

function respond() {
  console.log(this.req.body);
  const botResponse = cool();

  const request = this.req.body;
  const text = request?.text?.toLowerCase().trim();

  const botResponseText =
    request?.text && botRegex.test(text)
      ? botResponse
      : "No match response found for text";

  console.log(request.text, botRegex.test(text));
  request?.text && botRegex.test(text)
    ? postMessage(botResponseText)
    : console.log("Text ignored don't care");
}

async function postMessage(text) {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      bot_id: botID,
      text: text,
    }),
  };
  try {
    console.log("Posting bot response...");

    const response = await fetch(
      `https://api.groupme.com/v3/bots/post/`,
      options
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    console.log(response);

    // const recentMessages = data.response.messages.map((msg) => msg.text);
  } catch (error) {
    console.error("Error fetching messages:", error);
  }
  console.log(`sending ${text} to ${botID}`);

  // const botReq = HTTPS.request(options, (res) => {
  //   console.log(res.statusCode);

  //   // console.log(util.inspect(res.statusCode, false, 1, true));

  //   if (res.statusCode === 200) {
  //     console.log(res.statusCode);
  //   } else if (res.statusCode === 202) {
  //     console.log("message posted successfully");
  //   } else {
  //     console.log(`rejecting bad status code ${res.statusCode}"`);
  //   }
  // });

  // botReq.on("error", (err) => {
  //   console.log(`error posting message ${JSON.stringify(err)}`);
  // });
  // botReq.on("timeout", (err) => {
  //   console.log(err);
  //   console.log(`timeout posting message ${JSON.stringify(err)}`);
  // });
  // botReq.end(JSON.stringify(body));
}
exports.respond = respond;
