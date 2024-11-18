import React, { useContext, useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { appContext } from "../context/appContext"
import { getPostById, likePost, deletePost, getMiniProfile } from "../utils/apis"
import { getImageUrl } from "../utils/pp"

const getMediaUrl = getImageUrl

const getMediaType = (mediaUrl) => {
  if (!mediaUrl) return null

  const extension = mediaUrl.split(".").pop().toLowerCase()

  const videoExtensions = ["mp4", "webm", "mov", "avi"]
  const imageExtensions = ["jpg", "jpeg", "png", "gif", "webp"]

  if (videoExtensions.includes(extension)) return "video"
  if (imageExtensions.includes(extension)) return "image"

  return null
}

const PostBody = ({ data, setActivePost, fullMode = false }) => {
  const { user } = useContext(appContext)
  const navigate = useNavigate()

  const [isLiked, setIsLiked] = useState(false)
  const [post, setPost] = useState(data)
  const [showMenu, setShowMenu] = useState(false)
  const [mediaLoaded, setMediaLoaded] = useState(false)
  const [userData, setUserData] = useState(null)

  const handleLike = async () => {
    const res = await likePost(post.id)
    if (res.success) {
      const p = await getPostById(post.id)
      if (p.success) {
        setPost(p.post)
      }
    }
  }

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      const res = await deletePost(post.id)
      if (res.success) {
        setPost(null)
      } else {
        alert("Failed to delete post")
      }
    }
  }

  const getUserData = async () => {
    const res = await getMiniProfile(post.author)
    if (res.success) {
      setUserData(res.user)
    }
  }

  useEffect(() => {
    if (post && user) {
      setIsLiked(post.liked_by.includes(user))
      getUserData()
    }
  }, [post, user])

  if (!post) {
    return
  }

  return (
    <div className="post-body">
      <div className="post-top">
        <Link to={`/${post.author}`} className="post-top-left">
          <img src={getImageUrl(userData?.profile_image) || "profile.jpg"} alt="profile" />
          <div className="post-author">
            <div className="author-name">{userData?.name || post.author}</div>
            <div className="post-time">
              {new Date(post.time.replace(" ", "T")).toLocaleString()}
            </div>
          </div>
        </Link>
        {post.author === user && (
          <div className="post-menu">
            <div className="menu-icon" onClick={() => setShowMenu(!showMenu)}>
              •••
            </div>
            {showMenu && (
              <div className="menu-dropdown">
                <div className="menu-item delete" onClick={handleDelete}>
                  Delete Post
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="post-middle">
        {post.media && (
          <div className={`media-container ${mediaLoaded ? "loaded" : ""}`}>
            <div className="loading-spinner"></div>
            {getMediaType(post.media) === "video" ? (
              <video
                src={getMediaUrl(post.media)}
                className="post-media"
                controls
                onLoadedData={() => setMediaLoaded(true)}
              />
            ) : (
              <img
                src={getMediaUrl(post.media)}
                alt="post media"
                className="post-media"
                onLoad={() => setMediaLoaded(true)}
              />
            )}
          </div>
        )}
        <div className="post-text">{post.text}</div>
      </div>

      <div className="post-bottom">
        <div className="post-stats">{post.like_count} likes</div>
        <div className="post-actions">
          <button className={`action-btn ${isLiked ? "liked" : ""}`} onClick={handleLike}>
            <img src={isLiked ? "like_red.svg" : "like.svg"} alt="like" />
            Like
          </button>
          <button className="action-btn" onClick={() => setActivePost(!fullMode)}>
            <img src="comment.svg" alt="comment" />
            Comment
          </button>
        </div>
      </div>
    </div>
  )
}

export default PostBody
