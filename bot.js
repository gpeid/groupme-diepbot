const axios = require("axios");
const cool = require("cool-ascii-faces");
const { buildRegexStringFromArray } = require("./src/utils/utils");
const {
  triggerWordsArray,
  foodWordsArray,
  dimSumWordsArray,
  dimSumDishArray,
  commandsArray,
} = require("./src/data/triggerWords");

const botID = process.env.BOT_ID;
const baseUrl = process.env.GROUPME_BASE_URL;

const triggerWordsObject = {
  general: triggerWordsArray,
  food: foodWordsArray,
  dimSum: dimSumWordsArray,
  commands: commandsArray,
};

const getTriggerWordTypeFromObject = (word) => {
  const wordTypes = Object.keys(triggerWordsObject);

  for (let i = 0; i < wordTypes.length; i++) {
    if (
      triggerWordsObject[wordTypes[i]].find(
        (wordInArray) => wordInArray.toLowerCase() === word.toLowerCase()
      )
    ) {
      return wordTypes[i];
    }
  }
};

const listAllTriggerWordsCommand = (commandString) => {
  switch (commandString) {
    case "/list dimsum":
      return dimSumWordsArray.join(", ");
    default:
      console.log("No command entered");
  }
};

async function postMessage(req, res) {
  const request = req.body;
  const text = request?.text;
  const wordType = getTriggerWordTypeFromObject(text);

  // Dimsum response logic
  // use regex builder here to avoid tolowercase or keep it idk
  const dish = dimSumDishArray.find(
    (item) => item.name.toLowerCase() === text.toLowerCase()
  );
  const botResponseObject = {
    general: cool(),
    food: "YUM!!",
    dimSum: `${dish?.name}: ${dish?.description}`,
    commands: `Available trigger words: ${listAllTriggerWordsCommand(text)}`,
  };

  const botResponse = botResponseObject[wordType];

  // replace with regex?
  const isTriggerWord = (requestWord) => {
    if (getTriggerWordTypeFromObject(requestWord)) {
      const botRegex = buildRegexStringFromArray(
        triggerWordsObject[getTriggerWordTypeFromObject(requestWord)]
      );

      return botRegex.test(requestWord);
    } else {
      return null;
    }
  };

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

  request?.text && isTriggerWord(text)
    ? await postToGroupmeBot(botResponse)
    : res.status(200).json({ ...req.body, message: "Text ignored." });
}

exports.postMessage = postMessage;
