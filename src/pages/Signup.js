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
  const [confirmPassword, setConfirmPassword] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [errors, setErrors] = useState({
    username: "",
    email: "",
    phone: "",
    name: "",
    password: "",
  })

  const validateForm = () => {
    let isValid = true
    const newErrors = {}

    if (!username || username.length > 50 || !/^[a-zA-Z0-9_]+$/.test(username)) {
      newErrors.username = "Username must be alphanumeric and under 50 characters"
      isValid = false
    }

    if (!email || email.length > 50 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Please enter a valid email under 50 characters"
      isValid = false
    }

    if (!phone || !/^\d{10}$/.test(phone)) {
      newErrors.phone = "Please enter a valid 10-digit phone number"
      isValid = false
    }

    if (!name || name.length > 50) {
      newErrors.name = "Name must be under 50 characters"
      isValid = false
    }

    if (!password || password.length < 3) {
      newErrors.password = "Password must be at least 3 characters"
      isValid = false
    }

    if (password !== confirmPassword) {
      newErrors.password = "Passwords do not match"
      isValid = false
    }

    setErrors(newErrors)
    return isValid
  }

  const handleSignup = async () => {
    if (!validateForm()) {
      return
    }
    if (!name || !username || !password || !confirmPassword || !email || !phone) {
      alert("Please fill in all fields")
      return
    }
    if (password !== confirmPassword) {
      alert("Passwords do not match")
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
    <div className="signup-form-main">
      <div className="form">
        <div className="top">
          <h1>Create Account</h1>
        </div>

        <div className="middle">
          <div className="middle-top">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={`form-input ${errors.name ? "error" : ""}`}
              placeholder="Name"
            />
            {errors.name && <span className="error-message">{errors.name}</span>}
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={`form-input ${errors.username ? "error" : ""}`}
              placeholder="Username"
            />
            {errors.username && <span className="error-message">{errors.username}</span>}
          </div>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`form-input ${errors.email ? "error" : ""}`}
            placeholder="Email"
          />
          {errors.email && <span className="error-message">{errors.email}</span>}
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className={`form-input ${errors.phone ? "error" : ""}`}
            placeholder="Phone"
          />
          {errors.phone && <span className="error-message">{errors.phone}</span>}
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`form-input ${errors.password ? "error" : ""}`}
            placeholder="Password"
          />
          {errors.password && <span className="error-message">{errors.password}</span>}
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="form-input"
            placeholder="Confirm Password"
          />
        </div>

        <div className="bottom">
          <button onClick={handleSignup} className="button submit">
            Sign Up
          </button>
          <Link to="/login" className="button change">
            Already have an account? Login
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Signup
