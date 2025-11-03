const axios = require("axios");
const cool = require("cool-ascii-faces");

const botID = process.env.BOT_ID;
const baseUrl = process.env.GROUPME_BASE_URL;

// const botRegex = /^\/cool guy|gabujeeno|kylan|tree of wisdom$/;
const botRegex = /\bgabujeeno\b|\bkylan\b|\btree of wisdom\b/i;

// function respond() {
//   const botResponse = cool();

//   const request = this.req.body;
//   console.log("groupme post body", request);
//   const text = request?.text?.toLowerCase().trim();

//   console.log("regex test", botRegex.test(text));
//   request?.text && botRegex.test(text)
//     ? postMessage(botResponse)
//     : console.log("Text ignored don't care");
// }

// function postMessage(text) {
// const myHeaders = new Headers();
// myHeaders.append("Content-Type", "application/json");

// const requestOptions = {
//   method: "POST",
//   headers: myHeaders,
//   body: JSON.stringify({
//     bot_id: botID,
//     text: text,
//   }),
//   redirect: "follow",
// };

// fetch("https://api.groupme.com/v3/bots/post/", requestOptions)
//   .then((response) => response.text())
//   .then((result) => console.log(result))
//   .catch((error) => console.error(error));

// Fetch api
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
// }

async function postMessage(req, res) {
  const botResponse = cool();

  const request = req.body;
  console.log("groupme post body", req.body);
  const text = request?.text?.toLowerCase().trim();

  console.log(text);

  console.log("regex test", botRegex.test(text));

  const postToGroupmeBot = async () => {
    try {
      const apiUrl = `${baseUrl}/bots/post`;
      const dataToSend = JSON.stringify({
        bot_id: botID,
        text: botResponse,
      });
      const headers = {
        "Content-Type": "application/json",
      };

      const response = await axios.post(apiUrl, dataToSend, {
        headers: headers,
      });
      console.log(`posting message... ${botResponse}`);
      res.status(response.status).json(req.body);
      // res.send(req.body);
    } catch (error) {
      console.error("Error making external API POST request:", error.message);
      if (error.response) {
        res.status(error.response.status).json(error.response.data);
      } else if (error.request) {
        // The request was made but no response was received
        res
          .status(500)
          .json({ message: "No response received from external API" });
      } else {
        // Something happened in setting up the request that triggered an Error
        res
          .status(500)
          .json({ message: "Error setting up external API request" });
      }
    }
  };

  request?.text && botRegex.test(text)
    ? await postToGroupmeBot(botResponse)
    : res.status(200).json({ ...req.body, message: "Text ignored." });
}

exports.postMessage = postMessage;
