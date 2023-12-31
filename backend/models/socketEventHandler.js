const getIo = require("../socket/socketSingleton");
const { query, fetchInfo, saveInfo } = require("../utils/utils");
// socketHandlers.js
const getConversations = async (socket, data, id) => {
  try {
 
  //  await  saveInfo("profile_views", )
      // socket.emit("getConversations", { msg: arr })
    console.log("data", data)
    console.log("to save the view count we need", "  table:", "  fields:", "  values:")

  } catch (err) {
    console.log(err)
  }
};

const sendMessage = async (socket, data, id, io) => {
  try {
    console.log("send messages", id)
    const { conversation_id, message } = data
    const ret = await saveInfo("chat_messages", "(conversation_id, sender_id, message_content)", [conversation_id, id, message]);
    requestMessage(socket, data, id, io)
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

const requestMessage = async (socket, data, id, io) => {
  try {
    console.log("request messages", id)
    const { conversation_id } = data
    const ret = await fetchInfo("chat_messages", "message_content, timestamp, sender_id", 'conversation_id = ?', conversation_id);
    console.log("message sent")
    const roomsToLeave = [];
    for (const room of socket.rooms) {
      if (room.startsWith("convo-")) {
        roomsToLeave.push(room);
      }
    }
    // Leave existing rooms
    for (const room of roomsToLeave) {
      socket.leave(room);
    }
    const newRoom = "convo-" + conversation_id;
    socket.join(newRoom);
    const connectedSockets = io.sockets.adapter.rooms.get("convo-2");

    if (connectedSockets) {
      // The connectedSockets variable contains a Set of socket IDs connected to the room
      console.log("Connected sockets in room convo-2:", connectedSockets);
    } else {
      console.log("No sockets connected to room convo-2.");
    }


    if (ret && ret.length) {
      let user1 = null
      let user2 = null
      const convo = await Promise.all(ret.map(async (msg) => {
        if (!user1 || !user2) {
          const info = await fetchInfo("users", "avatar, username", "id =?", msg.sender_id)
          if (info && info.length) {

            user1 = !user1 ? { avatar: info[0].avatar, username: info[0].username, id: msg.sender_id } : user1
            user2 = user1 && !user2 && user1.username != info[0].username ? { avatar: info[0].avatar, username: info[0].username, id: msg.sender_id } : user2
          }
        }
        console.log("\n-------\n",user1, user2,"\n---------\n")
        const user = user1 && user1.id === msg.sender_id ? user1 : user2
        return ({
          message_content: msg.message_content,
          timestamp: msg.timestamp,
          sender_id: msg.sender_id,
          ...user
        })
      }))
      // console.log(convo)
      io.to(newRoom).emit('receiveMessage', { msg: convo });
      // socket.emit("receiveMessage", { msg: convo })
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