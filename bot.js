const cool = require("cool-ascii-faces");

const botID = process.env.BOT_ID;

const botRegex = /^\/cool guy|gabujeeno|kylan|tree of wisdom$/;

function respond() {
  console.log(this.req.body);
  const botResponse = cool();

  const request = this.req.body;
  const text = request?.text?.toLowerCase().trim();

  const botResponseText = request?.text && botRegex.test(text) && botResponse;

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

    await fetch(`https://api.groupme.com/v3/bots/post`, options)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        console.log(response);
      })
      .catch((error) => {
        console.error("Error during fetch:", error); // Handle any errors
      });
  } catch (error) {
    console.error("Error fetching messages:", error);
  }
}
exports.respond = respond;
