
const { query, fetchInfo, saveInfo } = require("../../utils/utils");


const profileView = async (socket, data, id) => {
  try {
    const { token, username } = data
    console.log("here we go we r in teh getdata", data, id)
    if (!data || !token || !username || !id) {
      return socket.emit("profileData", { msg: null })

    }
    const user = await fetchInfo("users", "fname, id, avatar, lname, username, age, nickname,gender, job , country , city , online ","username =? ",username )
    
    if (user && user.length){
      await saveInfo("profile_views", "(viewer_id, viewed_id)",[id, user[0].id])
      const views = await fetchInfo("profile_views", "id", "viewed_id =?", user[0].id)
      const userData = {...user[0],views:views.length}
      console.log("vews", views)
      socket.emit("profileData", { msg: userData })
    }
      // }
  
    } catch (err) {
    console.log(err)
  }
};

module.exports = {
  profileView
};