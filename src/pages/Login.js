import React, { useContext, useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { appContext } from "../context/appContext"
import "../css/Login.css"
import { login } from "../utils/apis"

const Login = () => {
  const { user, setUser } = useContext(appContext)
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = () => {
    if (!username || !password) {
      alert("Please fill in all fields")
      return
    }
    setLoading(true)
    login(username, password).then((res) => {
      if (res.success) {
        localStorage.setItem("token", res.token)
        localStorage.setItem("user", res.user)
        setUser(res.user)
        navigate("/")
      } else {
        alert(res.message)
      }
      setLoading(false)
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
          <div className="top">
            <h1>Welcome Back</h1>
          </div>

          <div className="middle">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="form-input"
              placeholder="Username"
              disabled={loading}
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-input"
              placeholder="Password"
              disabled={loading}
            />
          </div>

          <div className="bottom">
            <button
              onClick={handleLogin}
              className={`button submit ${loading ? "loading" : ""}`}
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
            <Link to="/signup" className="button change">
              Don't have an account? Register
            </Link>
            {/* <Link to="/forgot-password" className="forgot-password">
              Forgot Password?
            </Link> */}
          </div>
        </div>
      </div>
    </>
  )
}

export default Login
