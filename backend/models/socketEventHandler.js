const { query, fetchInfo, saveInfo } = require("../utils/utils");

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

const sendMessage = async (socket, data, id) => {
  try {
    console.log("send messages", id)
    console.log(data)
    const { conversation_id, message } = data
    const ret = await saveInfo("chat_messages", "(conversation_id, sender_id, message_content)", [conversation_id, id, message]);
    console.log("message sent", ret)
    // const getConversations = 'SELECT * FROM conversations WHERE user1_id = ? OR user2_id = ? ';
    // console.log("my id", id)
    // let conversations = await query(getConversations, [id, id]);
    // if (conversations && conversations.length) {
    //   const arr = await Promise.all(conversations.map(async (e) => {
    //     const user = await fetchInfo("users", "fname, lname", "id = ?", e.user1_id == id ? e.user2_id : e.user1_id);
    //     console.log(user);

    //     if (user && user.length) {
    //       return {
    //         name: `${user[0].fname} ${user[0].lname}`,
    //         timeRecent: e.last_message_time,
    //         userId: e.user1_id == id ? e.user2_id : e.user1_id,
    //         conversation_id: e.conversation_id
    //       };
    //     }
    //   }));

    //   console.log(arr[0]); // This will log the array of resolved values

    //   socket.emit("getConversations", {msg: arr})

    // }

  } catch (err) {
    console.log(err)
  }
};

const requestMessage = async (socket, data, id) => {
  try {
    console.log("request messages", id)
    console.log(data)
    const { conversation_id } = data
    const ret = await fetchInfo("chat_messages", "message_content, timestamp, sender_id", 'conversation_id = ?', conversation_id);
    console.log("message sent")
    // const getConversations = 'SELECT * FROM conversations WHERE user1_id = ? OR user2_id = ? ';
    // console.log("my id", id)
    // let conversations = await query(getConversations, [id, id]);
    // if (conversations && conversations.length) {
    //   const arr = await Promise.all(conversations.map(async (e) => {
    //     const user = await fetchInfo("users", "fname, lname", "id = ?", e.user1_id == id ? e.user2_id : e.user1_id);
    //     console.log(user);

    //     if (user && user.length) {
    //       return {
    //         name: `${user[0].fname} ${user[0].lname}`,
    //         timeRecent: e.last_message_time,
    //         userId: e.user1_id == id ? e.user2_id : e.user1_id,
    //         conversation_id: e.conversation_id
    //       };
    //     }
    //   }));

    //   console.log(arr[0]); // This will log the array of resolved values
if(ret && ret.length){
  const convo = await Promise.all(ret.map((msg)=>{
    return ({
      message_content: msg.message_content,
      timestamp: msg.timestamp,
      sender_id: msg.sender_id,
    })
  }))
  console.log(convo)

  socket.emit("receiveMessage", { msg: convo })
}

    // }

  } catch (err) {
    console.log(err)
  }
};
module.exports = {
  getConversations,
  sendMessage,
  requestMessage,
};