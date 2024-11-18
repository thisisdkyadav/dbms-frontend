import React, { useContext, useEffect, useState } from "react"
import { useNavigate, Outlet, useLocation } from "react-router-dom"
import { appContext } from "../context/appContext"
import "../css/Home.css"
import Navbar from "../components/NavBar"
import PostsList from "../components/PostsList"
import LoadingScreen from "../components/LoadingScreen"
import { getPostOfFollowedUsers } from "../utils/apis"

const Home = () => {
  const { user, initializing } = useContext(appContext)
  const navigate = useNavigate()
  const location = useLocation()

  const [posts, setPosts] = useState([])

  const getPosts = async () => {
    const res = await getPostOfFollowedUsers()
    console.log(res)

    if (res.success) {
      setPosts(res.posts)
    }
  }

  useEffect(() => {
    if (!user && !initializing) {
      navigate("/login")
    }
  }, [user, navigate, initializing])

  useEffect(() => {
    if (user) {
      getPosts()
    }
  }, [user])

  if (initializing) {
    return <LoadingScreen />
  }

  const isRootPath = location.pathname === "/"

  return (
    <div className="home">
      <Navbar />
      <main>
        {isRootPath ? (
          <div className="home-main">
            <PostsList posts={posts} />
          </div>
        ) : (
          <Outlet />
        )}
      </main>
    </div>
  )
}

export default Home
