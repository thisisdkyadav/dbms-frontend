import React, { useContext, useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { appContext } from "../context/appContext"
import "../css/Login.css"
import { login } from "../utils/apis"

const Login = () => {
  const { user, setUser } = useContext(appContext)
  const navigate = useNavigate()

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = () => {
    if (!username || !password) {
      alert("Please fill in all fields")
      return
    }
    login(username, password).then((res) => {
      if (res.success) {
        console.log(res)

        // save to token to local storage and set user
        localStorage.setItem("token", res.token)
        localStorage.setItem("user", res.user)
        setUser(res.user)
        navigate("/")
      } else {
        alert(res.message)
      }
    })
  }

  useEffect(() => {
    if (user) {
      navigate("/")
    }
  }, [user, navigate])

  return (
    <>
      <div className="login-form-main">
        <div className="form">
          <div className="top">Account Login</div>
          <div className="middle">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="form-input"
              placeholder="Username"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-input"
              placeholder="Password"
            />
          </div>
          <div className="bottom">
            <input type="submit" className="button submit" onClick={handleLogin} />
            <Link to="/signup" className="button change">
              Don't have an account? Register
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login
