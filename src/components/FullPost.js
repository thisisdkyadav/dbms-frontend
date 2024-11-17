import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import PostBody from "./PostBody"
import CommentInput from "./CommentInput"
import { getComments } from "../utils/apis"

// Helper function to create comment tree
const createCommentTree = (comments) => {
  const commentMap = {}
  const roots = []

  // First pass: create map of all comments
  comments.forEach((comment) => {
    commentMap[comment.id] = {
      ...comment,
      children: [],
    }
  })

  // Second pass: create hierarchy
  comments.forEach((comment) => {
    if (comment.parent_comment) {
      const parent = commentMap[comment.parent_comment]
      if (parent) {
        parent.children.push(commentMap[comment.id])
      }
    } else {
      roots.push(commentMap[comment.id])
    }
  })

  return roots
}

// Component to render a single comment and its replies
const Comment = ({ comment, loadComments, activeCommentReply, setActiveCommentReply }) => {
  return (
    <div className="comment">
      <div className="comment-content">
        <div className="comment-top">
          <Link to={`/${comment.author}`} className="comment-top-left">
            <img src="profile.jpg" alt="profile" />
            {comment.author}
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

const FullPost = ({ data, setActivePost }) => {
  const [activeCommentReply, setActiveCommentReply] = useState(null)
  const [comments, setCommentsList] = useState([])
  const [commentTree, setCommentTree] = useState([])

  const loadComments = async () => {
    const res = await getComments(data.id)
    console.log(res)

    if (res.success) {
      setCommentsList(res.comments)
      setCommentTree(createCommentTree(res.comments))
    }
  }

  useEffect(() => {
    loadComments()
  }, [])

  return (
    <div onClick={() => setActivePost(false)} className="full-post">
      <div onClick={(e) => e.stopPropagation()} className="post-container">
        <PostBody data={data} fullMode={true} />
        <div className="comments-section">
          <CommentInput postId={data.id} onCommentAdded={loadComments} />
          <div className="comments-list">
            {commentTree.map((comment) => (
              <Comment
                key={comment.id}
                comment={comment}
                activeCommentReply={activeCommentReply}
                loadComments={loadComments}
                setActiveCommentReply={setActiveCommentReply}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default FullPost
