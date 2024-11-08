import React, { useContext, useEffect } from "react"
import { useNavigate, Outlet, useLocation } from "react-router-dom"
import { appContext } from "../context/appContext"
import "../css/Home.css"
import Navbar from "../components/NavBar"

const Home = () => {
  const { user } = useContext(appContext)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    if (!user) {
      navigate("/login")
    }
  }, [user, navigate])

  if (!user) {
    return null // or a loading spinner, or any other fallback UI
  }

  const isRootPath = location.pathname === "/"

  return (
    <div className="home">
      <Navbar />
      {isRootPath ? (
        <>
          <h1>Home {user}</h1>
          {/* Other home content */}
        </>
      ) : (
        <Outlet /> // This is where the nested routes will be rendered
      )}
    </div>
  )
}

export default Home
