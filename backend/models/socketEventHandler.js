const getIo = require("../socket/socketSingleton");
const { query, fetchInfo, saveInfo } = require("../utils/utils");
// socketHandlers.js
const getConversations = async (socket, data, id) => {
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
    //   for (const room of roomsToLeave) {
    //     socket.leave(room);
    // }
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
      const convo = await Promise.all(ret.map((msg) => {
        return ({
          message_content: msg.message_content,
          timestamp: msg.timestamp,
          sender_id: msg.sender_id,
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