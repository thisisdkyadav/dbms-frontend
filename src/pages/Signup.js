import React, { useContext, useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { appContext } from "../context/appContext"
import "../css/Signup.css"
import { signup } from "../utils/apis"

const Signup = () => {
  const { user } = useContext(appContext)
  const navigate = useNavigate()

  const [name, setName] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")

  const handleSignup = async () => {
    if (!name || !username || !password || !email || !phone) {
      alert("Please fill in all fields")
      return
    }
    const res = await signup(name, username, password, email, phone)
    if (res.success) {
      navigate("/login")
    } else {
      alert(res.message)
    }
  }

  useEffect(() => {
    if (user) {
      navigate("/")
    }
  }, [user, navigate])

  return (
    <>
      <div className="signup-form-main">
        <div className="form">
          <div className="top">Account signup</div>
          <div className="middle">
            <div className="middle-top">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="form-input name"
                placeholder="Name"
              />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="form-input username"
                placeholder="Username"
              />
            </div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-input"
              placeholder="Password"
            />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-input"
              placeholder="Email"
            />
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="form-input"
              placeholder="Phone"
            />
          </div>
          <div className="bottom">
            <input type="submit" className="button submit" onClick={handleSignup} />
            <Link to="/" className="button change">
              Don't have an account? Register
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default Signup
