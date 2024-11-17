import React from "react"
import "../css/PostsList.css"
import Post from "./Post"

const PostsList = ({ posts }) => {
  return (
    <div className="posts-list">
      {posts.map((post, index) => (
        <Post key={index} data={post} />
      ))}
    </div>
  )
}

export default PostsList
