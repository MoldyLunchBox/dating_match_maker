const { query, fetchInfo } = require("../utils/utils");

// socketHandlers.js
const getConversations = async (socket, data, id) => {
  try {
    const getConversations = 'SELECT * FROM conversations WHERE user1_id = ? OR user2_id = ? ';
    console.log("my id", id)
    let conversations = await query(getConversations, [id, id]);
    if (conversations && conversations.length) {
      const arr = await Promise.all(conversations.map(async (e) => {
        const user = await fetchInfo("users", "fname, lname", "id = ?", e.user1_id == id ? e.user2_id : e.user1_id);
        console.log(user);
      
        if (user && user.length) {
          return {
            name: `${user[0].fname} ${user[0].lname}`,
            timeRecent: e.last_message_time,
            userId: e.user1_id == id ? e.user2_id : e.user1_id
          };
        }
      }));
      
      console.log(arr[0]); // This will log the array of resolved values
      
      socket.emit("getConversations", {msg: arr})

    }

  } catch (err) {
    console.log(err)
  }
};

module.exports = {
  getConversations,
};