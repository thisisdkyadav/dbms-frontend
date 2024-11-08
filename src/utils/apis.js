const baseurl = "http://localhost:8000/api"

// login function
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

// signup function
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
      // method: "POST",/
      headers: {
        Authorization: `Bearer ${token}`,
      },
      // body: JSON.stringify({ usernameInitial }),
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
