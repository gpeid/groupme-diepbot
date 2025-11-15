import axios from "axios";
import { baseUrl, botID } from "../config";

const postToGroupmeBot = async (req: Request, res: Response, botResponse) => {
    try {
        const apiUrl = `${baseUrl}/bots/post`;
        const dataToSend = JSON.stringify({
            bot_id: botID,
            text: botResponse?.text,
            ...(botResponse?.image_url && {
                attachments: [{
                    type: "image",
                    url: botResponse?.image_url
                }]
            })
        });
        const headers = {
            "Content-Type": "application/json",
        };

        const response = await axios.post(apiUrl, dataToSend, {
            headers: headers,
        });
        console.log(`posting message... ${JSON.stringify(botResponse)}`);
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



export { postToGroupmeBot }