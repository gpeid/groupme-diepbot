const axios = require("axios");
const cool = require("cool-ascii-faces");
const { buildRegexStringFromArray } = require("./src/utils/utils");

const botID = process.env.BOT_ID;
const baseUrl = process.env.GROUPME_BASE_URL;

const triggerWordsArray = ["kylan", "gabujeeno", "tree of wisdom", "gorf"];

const botRegex = buildRegexStringFromArray(triggerWordsArray);

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
