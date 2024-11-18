import React, { useContext, useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import "../css/Profile.css"
import {
  createChat,
  deleteProfile,
  getChats,
  getProfile,
  getUserPosts,
  toggleFollow,
} from "../utils/apis"
import { appContext } from "../context/appContext"
import PostsList from "../components/PostsList"
import LoadingScreen from "../components/LoadingScreen"
import UserList from "../components/UserList"
import EditProfile from "../components/EditProfile"
import { getImageUrl } from "../utils/pp"

let defaultPhoto = "profile.jpg"

const Profile = () => {
  const { param: username } = useParams()
  const { user } = useContext(appContext)
  const navigate = useNavigate()

  const [data, setData] = useState(null)
  const [isFollowed, setIsFollowed] = useState(false)
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [showFollowers, setShowFollowers] = useState(false)
  const [showFollowing, setShowFollowing] = useState(false)
  const [showEditProfile, setShowEditProfile] = useState(false)

  const getProfileData = async () => {
    try {
      const res = await getProfile(username)
      if (res.success) {
        setData(res)
        console.log(res)
        setIsFollowed(res.followers.includes(user))
      }
    } finally {
      setLoading(false)
    }
  }

  const getPosts = async () => {
    const res = await getUserPosts(username)
    if (res.success) {
      setPosts(res.posts)
    }
  }

  const handleFollow = async () => {
    const res = await toggleFollow(username)
    if (res.success) {
      getProfileData()
    }
  }

  const handleMessage = async () => {
    const res = await getChats()
    if (res.success) {
      const chat = res.chats.find((chat) => chat.user1 === username || chat.user2 === username)
      if (chat) {
        navigate(`/chats/${chat.id}`)
      } else {
        const res = await createChat(username)
        if (res.success) {
          navigate(`/chats/${res.chat.id}`)
        } else {
          console.log(res)
          alert("Failed to create chat")
        }
      }
    } else {
      alert("Failed to get chats", res.message)
    }
  }

  const handleDeleteProfile = async () => {
    if (
      window.confirm("Are you sure you want to delete your profile? This action cannot be undone.")
    ) {
      try {
        const res = await deleteProfile()
        if (res.success) {
          localStorage.removeItem("user")
          localStorage.removeItem("token")
          window.location.reload()
        } else {
          alert("Failed to delete profile")
        }
      } catch (error) {
        console.error("Error deleting profile:", error)
        alert("An error occurred while deleting profile")
      }
    }
  }

  useEffect(() => {
    setLoading(true)
    setPosts([])
    setData(null)
    getProfileData()
    getPosts()
  }, [username])

  return (
    <div className="profileMain">
      {loading ? (
        <LoadingScreen />
      ) : (
        data && (
          <>
            <div className="profile-header">
              <div className="profile-info">
                <div className="photo">
                  <img src={getImageUrl(data.user.profile_image) || defaultPhoto} alt="profile" />
                </div>
                <div className="details">
                  <h1 className="name">{data.user.name}</h1>
                  <div className="stats">
                    <div className="stat">
                      <span className="stat-value">{posts.length}</span>
                      <span className="stat-label">Posts</span>
                    </div>
                    <div className="stat" onClick={() => setShowFollowers(true)}>
                      <span className="stat-value">{data.followers.length}</span>
                      <span className="stat-label">Followers</span>
                    </div>
                    <div className="stat" onClick={() => setShowFollowing(true)}>
                      <span className="stat-value">{data.following.length}</span>
                      <span className="stat-label">Following</span>
                    </div>
                  </div>
                  {username !== user && (
                    <div className="buttons">
                      <button
                        className={`btn ${isFollowed ? "outlined" : "filled"}`}
                        onClick={handleFollow}
                      >
                        {isFollowed ? "Unfollow" : "Follow"}
                      </button>
                      <button
                        onClick={handleMessage}
                        className={`btn ${isFollowed ? "filled" : "outlined"}`}
                      >
                        Message
                      </button>
                    </div>
                  )}
                  {username === user && (
                    <>
                      <div className="buttons">
                        <button onClick={() => setShowEditProfile(true)} className="btn outlined">
                          Edit Profile
                        </button>
                        <button className="delete-profile-btn" onClick={handleDeleteProfile}>
                          Delete Profile
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
            <div className="profile-content">
              <div className="profile-posts">
                <PostsList posts={posts.reverse()} />
              </div>
            </div>

            {showFollowers && (
              <UserList
                users={data.followers}
                title="Followers"
                onClose={() => setShowFollowers(false)}
              />
            )}

            {showFollowing && (
              <UserList
                users={data.following}
                title="Following"
                onClose={() => setShowFollowing(false)}
              />
            )}

            {showEditProfile && (
              <EditProfile
                userData={data.user}
                onClose={() => setShowEditProfile(false)}
                onUpdate={getProfileData}
              />
            )}
          </>
        )
      )}
    </div>
  )
}

export default Profile
