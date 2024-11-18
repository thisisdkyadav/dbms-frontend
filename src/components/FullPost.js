import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import PostBody from "./PostBody"
import CommentInput from "./CommentInput"
import { getComments } from "../utils/apis"
import Comment from "./Comment"

const createCommentTree = (comments) => {
  const commentMap = {}
  const roots = []

  comments.forEach((comment) => {
    commentMap[comment.id] = {
      ...comment,
      children: [],
    }
  })

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
