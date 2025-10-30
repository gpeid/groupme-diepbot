const accessToken = process.env.GROUPME_ACCESS_TOKEN;
const groupID = process.env.GROUP_ID;

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

    this.res.writeHead(200);
    this.res.end(recentMessages.join("\n"));
  } catch (error) {
    console.error("Error fetching messages:", error);
  }
}

exports.groupMessages = fetchGroupMessages;
