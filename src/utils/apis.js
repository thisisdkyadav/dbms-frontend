const baseurl = "http://localhost:8000/api"

export const login = async (username, password) => {
  try {
    const response = await fetch(`${baseurl}/user/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    })

    const data = await response.json()
    return data
  } catch (err) {
    console.log(err)
  }
}

export const signup = async (name, username, password, email, phone) => {
  try {
    const response = await fetch(`${baseurl}/user/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, username, password, email, phone }),
    })

    const data = await response.json()
    return data
  } catch (err) {
    console.log(err)
  }
}

export const getProfile = async (username) => {
  try {
    const token = localStorage.getItem("token")
    const response = await fetch(`${baseurl}/user/${username}/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    const data = await response.json()
    return data
  } catch (err) {
    console.log(err)
  }
}

export const searchUsers = async (usernameInitial) => {
  try {
    const token = localStorage.getItem("token")
    const response = await fetch(`${baseurl}/user/search/${usernameInitial}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    const data = await response.json()
    return data
  } catch (err) {
    console.log(err)
  }
}

export const toggleFollow = async (username) => {
  try {
    const token = localStorage.getItem("token")
    const response = await fetch(`${baseurl}/user/${username}/followToggle`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    const data = await response.json()
    return data
  } catch (err) {
    console.log(err)
  }
}

export const getChats = async () => {
  try {
    const token = localStorage.getItem("token")
    const response = await fetch(`${baseurl}/message/chats`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    const data = await response.json()
    return data
  } catch (err) {
    console.log(err)
  }
}

export const createChat = async (receiverId) => {
  try {
    console.log(receiverId)

    const token = localStorage.getItem("token")
    const response = await fetch(`${baseurl}/message/createChat`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ receiverId }),
    })
    const data = await response.json()
    return data
  } catch (err) {
    console.log(err)
  }
}

export const getMessages = async (chatId) => {
  try {
    const token = localStorage.getItem("token")
    const response = await fetch(`${baseurl}/message/all/${chatId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    const data = await response.json()
    return data
  } catch (err) {
    console.log(err)
  }
}

export const sendMessage = async (chatId, text, receiverIds) => {
  try {
    const token = localStorage.getItem("token")
    const response = await fetch(`${baseurl}/message/send`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ chatId, text, receiverIds }),
    })
    const data = await response.json()
    return data
  } catch (err) {
    console.log(err)
  }
}

export const getProfileImage = async (username) => {
  try {
    const token = localStorage.getItem("token")
    const response = await fetch(`${baseurl}/user/${username}/profileImage`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    const data = await response.json()
    return data
  } catch (err) {
    console.log(err)
  }
}

export const uploadMedia = async (formData) => {
  try {
    const token = localStorage.getItem("token")

    const response = await fetch(`${baseurl}/upload`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    })
    const data = await response.json()
    return data
  } catch (err) {
    console.log(err)
  }
}

export const createPost = async (postData) => {
  try {
    const token = localStorage.getItem("token")
    const response = await fetch(`${baseurl}/post/create`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    })
    const data = await response.json()
    return data
  } catch (err) {
    console.log(err)
  }
}

export const getUserPosts = async (username) => {
  try {
    const token = localStorage.getItem("token")
    const response = await fetch(`${baseurl}/post/user/${username}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    const data = await response.json()
    return data
  } catch (err) {
    console.log(err)
  }
}

export const likePost = async (postId) => {
  try {
    const token = localStorage.getItem("token")
    const response = await fetch(`${baseurl}/post/${postId}/like`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    const data = await response.json()
    return data
  } catch (err) {
    console.log(err)
  }
}

export const getPostById = async (postId) => {
  try {
    const token = localStorage.getItem("token")
    const response = await fetch(`${baseurl}/post/${postId}/get`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    const data = await response.json()
    return data
  } catch (err) {
    console.log(err)
  }
}

export const getPostOfFollowedUsers = async () => {
  try {
    const token = localStorage.getItem("token")
    const response = await fetch(`${baseurl}/post/followed`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    const data = await response.json()
    return data
  } catch (err) {
    console.log(err)
  }
}

export const createComment = async (postId, text, parentComment) => {
  try {
    const token = localStorage.getItem("token")
    const response = await fetch(`${baseurl}/comment/create`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ postId, text, parentComment }),
    })
    const data = await response.json()
    return data
  } catch (err) {
    console.log(err)
  }
}

export const getComments = async (postId) => {
  try {
    const token = localStorage.getItem("token")
    const response = await fetch(`${baseurl}/comment/getAll/${postId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    console.log(response)
    const data = await response.json()
    return data
  } catch (err) {
    console.log(err)
  }
}

export const deletePost = async (postId) => {
  try {
    const token = localStorage.getItem("token")
    const response = await fetch(`${baseurl}/post/delete/${postId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    const data = await response.json()
    return data
  } catch (err) {
    console.log(err)
  }
}

export const getMiniProfile = async (username) => {
  try {
    const token = localStorage.getItem("token")
    const response = await fetch(`${baseurl}/user/${username}/miniProfile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    const data = await response.json()
    return data
  } catch (err) {
    console.log(err)
  }
}

export const deleteMessage = async (messageId) => {
  try {
    const token = localStorage.getItem("token")
    const response = await fetch(`${baseurl}/message/delete/${messageId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    const data = await response.json()
    return data
  } catch (err) {
    console.log(err)
  }
}

export const updateProfile = async (changes) => {
  console.log(changes)

  try {
    const token = localStorage.getItem("token")
    const response = await fetch(`${baseurl}/user/updateProfile`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(changes),
    })
    const data = await response.json()
    return data
  } catch (err) {
    console.log(err)
  }
}

export const deleteProfile = async () => {
  try {
    const token = localStorage.getItem("token")
    const response = await fetch(`${baseurl}/user/delete`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    const data = await response.json()
    return data
  } catch (err) {
    console.log(err)
  }
}
