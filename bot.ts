import { baseUrl, botID } from "./src/config";
import { dimSumWordsArray } from "./src/data/triggerWords";
import { postToGroupmeBot } from "./src/services/botService";
import { buildRegexStringFromArray } from "./src/utils/utils";

const axios = require("axios");
const cool = require("cool-ascii-faces");
const {
  triggerWordsArray,
  foodWordsArray,
  dimSumDishArray,
  commandsArray,
} = require("./src/data/triggerWords");

interface WordsObject {
  general: string[];
  food: string[];
  dimSum: string[];
  commands: string[];
}

// Define the shape of your dish object
interface Dish {
  name: string;
  description: string;
  alt_name: string;
}

interface PostRequest {
  body: PostRequestBody;
}

interface PostRequestBody {
  text: string;
}

async function postMessage(req: PostRequest, res: Response) {
  const request = req.body;
  const text = request?.text;

  const { data, dimSumWordsArray } = await dimSumDishArray();


  const triggerWordsObject = async () => {
    const wordsObject = {
      general: triggerWordsArray,
      food: foodWordsArray,
      dimSum: dimSumWordsArray,
      commands: commandsArray,
    }
    return wordsObject
  };

  const getTriggerWordTypeFromObject = async (word: string): Promise<"general" | "food" | "dimSum" | "commands" | undefined> => {
    const wordsObject = await triggerWordsObject();
    // console.log('object', object)
    const wordTypes = Object.keys(await triggerWordsObject());
    // console.log("wordsObject", wordsObject);
    // console.log("wordTypes", wordTypes);
    for (let i = 0; i < wordTypes.length; i++) {
      if (
        wordsObject[wordTypes[i]].find(
          (wordInArray: string) => wordInArray.toLowerCase() === word.toLowerCase()
        )
      ) {
        return wordTypes[i] as "general" | "food" | "dimSum" | "commands";
      }
    }
  };

  const wordType = await getTriggerWordTypeFromObject(text);

  const listAllTriggerWordsCommand = async (commandString: string) => {
    switch (commandString) {
      case "/list dimsum": {
        const dimSumWords = (dimSumWordsArray) || [];
        return dimSumWords.join(", ");
      }
      default:
        console.log("No command entered");
    }
  };

  // Dimsum response logic
  // use regex builder here to avoid tolowercase or keep it idk
  const dish = await data.find(
    (item: Dish) => item.name.toLowerCase() === text.toLowerCase() || item.alt_name.toLowerCase() === text.toLowerCase()
  );

  const botResponseObject = {
    general: { text: cool() },
    food: { text: "YUM!!" },

    dimSum: { ...dish, text: `${dish?.name}: ${dish?.description}` },
    commands: { text: `Available words: ${await listAllTriggerWordsCommand(text)}` },
  } as const;

  type BotResponseKey = keyof typeof botResponseObject;
  const botResponse = botResponseObject[wordType as BotResponseKey];

  // replace with regex?

  const isTriggerWord = async (requestWord: string): Promise<boolean | null> => {
    const word = await getTriggerWordTypeFromObject(requestWord) || "";
    if (word) {
      const botRegex = buildRegexStringFromArray(
        (await triggerWordsObject())[word]
      );
      return botRegex?.test(requestWord) ?? null;
    }
    return null;
  };

  request?.text && await isTriggerWord(text)
    ? await postToGroupmeBot(req, res, botResponse)
    : res.status(200).json({ ...req.body, message: "Text ignored." });
}

exports.postMessage = postMessage;
