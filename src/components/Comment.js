import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { getMiniProfile } from "../utils/apis"
import CommentInput from "./CommentInput"
import { getImageUrl } from "../utils/pp"

const Comment = ({ comment, loadComments, activeCommentReply, setActiveCommentReply }) => {
  const [userData, setUserData] = useState(null)

  const getUserData = async () => {
    const res = await getMiniProfile(comment.author)
    if (res.success) {
      setUserData(res.user)
    }
  }

  useEffect(() => {
    getUserData()
  }, [])

  return (
    <div className="comment">
      <div className="comment-content">
        <div className="comment-top">
          <Link to={`/${comment.author}`} className="comment-top-left">
            <img src={getImageUrl(userData?.profile_image) || "profile.jpg"} alt="profile" />
            <div className="comment-user-info">
              <span className="comment-name">{userData?.name || comment.author}</span>
              {/* <span className="comment-username">@{comment.author}</span> */}
            </div>
          </Link>
          <div className="comment-top-right">
            {new Date(comment.time.replace(" ", "T")).toLocaleString()}
            <div onClick={() => setActiveCommentReply(comment.id)} className="comment-reply">
              Reply
            </div>
          </div>
        </div>
        <div className="comment-text">{comment.text}</div>
      </div>
      {activeCommentReply === comment.id && (
        <CommentInput
          postId={comment.post}
          parentComment={comment.id}
          onCommentAdded={loadComments}
        />
      )}
      {/* Render replies */}
      {comment.children && comment.children.length > 0 && (
        <div className="comment-replies">
          {comment.children.map((reply) => (
            <Comment
              key={reply.id}
              loadComments={loadComments}
              comment={reply}
              activeCommentReply={activeCommentReply}
              setActiveCommentReply={setActiveCommentReply}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default Comment
