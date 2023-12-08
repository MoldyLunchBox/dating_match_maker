
const { query, fetchInfo, saveInfo } = require("../../utils/utils");


const profileView = async (socket, data, id) => {
  try {
    const { token, username } = data
    console.log("here we go we r in teh socket profileView", data, id)
    if (!data || !token || !username || !id) {
      return socket.emit("profileData", { msg: null })

    }
    const user = await fetchInfo("users", "fname, id, avatar, lname, username, age, nickname,gender, job , country , city , online ", "username =? ", username)

    if (user && user.length) {
      await saveInfo("profile_views", "(viewer_id, viewed_id)", [id, user[0].id])
      const views = await fetchInfo("profile_views", "id", "viewed_id =?", user[0].id)
      const likes = await fetchInfo("likes", "is_like", "liked_id =?", user[0].id);
      const likesCount = likes.filter(record => record.is_like === 1).length;
      const dislikesCount = likes.filter(record => record.is_like === 0).length;
 
      const userData = { ...user[0], views: views.length, likes: likesCount, dislikes: dislikesCount }
      socket.emit("profileData", { msg: userData })
    }
    // }

  } catch (err) {
    console.log(err)
  }
};

const profileLike = async (socket, data, id) => {
  try {
    const { token, userId, is_like } = data
    console.log("here we go we r in teh profile like", data, userId, id, is_like)
    if (!data || !token || !userId || !id || is_like == undefined) {
      return socket.emit("profileLiked", { msg: null })

    }

    const updateResult = await query("UPDATE likes SET is_like = ? WHERE liker_id = ? AND liked_id = ?", [is_like, id, userId]);
    console.log(updateResult)
    if (!updateResult.affectedRows) {
      const saveResult = await saveInfo("likes", "(liker_id, liked_id, is_like)", [id, userId, true])
      console.log(saveResult)
    }
    // const ret = fetchInfo("likes", "id")

  } catch (err) {
    console.log(err)
  }
};

module.exports = {
  profileView,
  profileLike,
};