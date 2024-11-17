import React, { useContext, useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { appContext } from "../context/appContext"
import { getPostById, likePost, deletePost } from "../utils/apis"

const PostBody = ({ data, setActivePost, fullMode = false }) => {
  const { user } = useContext(appContext)
  const navigate = useNavigate()

  const [isLiked, setIsLiked] = useState(false)
  const [post, setPost] = useState(data)
  const [showMenu, setShowMenu] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)

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
        // // Handle post deletion (e.g., redirect or remove from list)
        // navigate(`/${user}`)
        setPost(null)
      } else {
        alert("Failed to delete post")
      }
    }
  }

  useEffect(() => {
    if (post && user) {
      setIsLiked(post.liked_by.includes(user))
    }
  }, [post, user])

  if (!post) {
    return
  }

  return (
    <div className="post-body">
      <div className="post-top">
        <Link to={`/${post.author}`} className="post-top-left">
          <img src="profile.jpg" alt="profile" />
          <div className="post-author">
            <div className="author-name">{post.author}</div>
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
          <div className={`media-container ${imageLoaded ? "loaded" : ""}`}>
            <div className="loading-spinner"></div>
            <img
              src={`http://localhost:8000/${post.media}`}
              alt="post media"
              className="post-media"
              onLoad={() => setImageLoaded(true)}
            />
          </div>
        )}
        <div className="post-text">{post.text}</div>
      </div>

      <div className="post-bottom">
        <div className="post-stats">{post.liked_by.length} likes</div>
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
