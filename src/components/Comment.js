import React from "react"
import { Link } from "react-router-dom"

const Comment = ({ comment, setActiveCommentReply }) => {
  return (
    <div className="comment">
      <div className="comment-content">
        <div className="comment-top">
          <Link to={`/${comment.author}`} className="comment-top-left">
            <img src="profile.jpg" alt="profile" />
            {comment.author}
          </Link>
          <div className="comment-top-right">
            {new Date(comment.time).toLocaleString()}
            <div onClick={() => setActiveCommentReply(comment.id)} className="comment-reply">
              Reply
            </div>
          </div>
        </div>
        <div className="comment-text">{comment.text}</div>
      </div>
      {/* Render replies */}
      {comment.children && comment.children.length > 0 && (
        <div className="comment-replies">
          {comment.children.map((reply) => (
            <Comment key={reply.id} comment={reply} setActiveCommentReply={setActiveCommentReply} />
          ))}
        </div>
      )}
    </div>
  )
}

export default Comment
