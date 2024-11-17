import React, { useState } from "react"
import { createComment } from "../utils/apis"

const CommentInput = ({ postId, onCommentAdded, parentComment = null }) => {
  const [text, setText] = useState("")

  const handleComment = async () => {
    if (!text) {
      alert("Please write a comment")
      return
    }
    const res = await createComment(postId, text, parentComment)

    if (res.success) {
      setText("")
      onCommentAdded()
    } else {
      alert("Failed to create comment")
    }
  }

  return (
    <div className="comment-input">
      <input
        value={text}
        onChange={(e) => {
          setText(e.target.value)
        }}
        type="text"
        placeholder="Write a comment"
      />
      <button onClick={handleComment}>Comment</button>
    </div>
  )
}

export default CommentInput
