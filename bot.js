const cool = require("cool-ascii-faces");

const botID = process.env.BOT_ID;

// const botRegex = /^\/cool guy|gabujeeno|kylan|tree of wisdom$/;
const botRegex = /\bgabujeeno\b|\bkylan\b|\btree of wisdom\b/i;

function respond() {
  const botResponse = cool();

  const request = this.req.body;
  console.log("groupme post body", request);
  const text = request?.text?.toLowerCase().trim();

  console.log("regex test", botRegex.test(text));
  request?.text && botRegex.test(text)
    ? postMessage(botResponse)
    : console.log("Text ignored don't care");
}

async function postMessage(text) {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify({
      bot_id: botID,
      text: text,
    }),
    redirect: "follow",
  };

  fetch("https://api.groupme.com/v3/bots/post/", requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.error(error));
  // const options = {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify({
  //     bot_id: botID,
  //     text: text,
  //   }),
  // };
  // try {
  //   console.log("Posting bot response...");

  //   await fetch(`https://api.groupme.com/v3/bots/post`, options)
  //     .then((response) => {
  //       console.log(response);

  //       if (!response.ok) {
  //         throw new Error(`HTTP error! status: ${response.status}`);
  //       }
  //     })
  //     .catch((error) => {
  //       console.error("Error during fetch:", error); // Handle any errors
  //     });
  // } catch (error) {
  //   console.error("Error fetching messages:", error);
  // }
}
exports.respond = respond;
