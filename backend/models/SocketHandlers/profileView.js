const getIo = require("../socket/socketSingleton");
const { query, fetchInfo, saveInfo } = require("../utils/utils");


const profileView = async (socket, data, id) => {
    try {
      const getConversations = 'SELECT * FROM conversations WHERE user1_id = ? OR user2_id = ? ';
      let conversations = await query(getConversations, [id, id]);
      if (conversations && conversations.length) {
        const arr = await Promise.all(conversations.map(async (e) => {
          const user = await fetchInfo("users", "fname, lname", "id = ?", e.user1_id == id ? e.user2_id : e.user1_id);
  
          if (user && user.length) {
            return {
              name: `${user[0].fname} ${user[0].lname}`,
              timeRecent: e.last_message_time,
              userId: e.user1_id == id ? e.user2_id : e.user1_id,
              conversation_id: e.conversation_id
            };
          }
        }));
  
        console.log(arr[0]); // This will log the array of resolved values
  
        socket.emit("getConversations", { msg: arr })
  
      }
  
    } catch (err) {
      console.log(err)
    }
  };