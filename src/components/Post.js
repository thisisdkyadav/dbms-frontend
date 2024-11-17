import React, { useState } from "react"
import { Link } from "react-router-dom"
import FullPost from "./FullPost"
import PostBody from "./PostBody"

const Post = ({ data }) => {
  const [activePost, setActivePost] = useState(false)

  return (
    <>
      {activePost ? (
        <FullPost data={data} setActivePost={setActivePost} />
      ) : (
        <PostBody data={data} setActivePost={setActivePost} />
      )}
    </>
  )
}

export default Post
