import React, { useState } from "react"
import "../css/NewPost.css"
import { createPost, uploadMedia } from "../utils/apis"

const getMediaType = (file) => {
  if (!file) return null
  return file.type.startsWith("video/") ? "video" : "image"
}

const NewPost = () => {
  const [text, setText] = useState("")
  const [media, setMedia] = useState(null)
  const [preview, setPreview] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleMediaChange = (e) => {
    const file = e.target.files[0]
    setMedia(file)
    if (file) {
      const mediaType = getMediaType(file)
      setPreview({
        url: URL.createObjectURL(file),
        type: mediaType,
      })
    }
  }

  const handleSubmit = async () => {
    if (!text && !media) {
      alert("Please add some content to your post")
      return
    }

    try {
      setLoading(true)
      let mediaUrl = null

      if (media) {
        const formData = new FormData()
        formData.append("file", media)
        const response = await uploadMedia(formData)
        console.log(response)

        if (response.success) {
          mediaUrl = response.file.path
        }
      }

      const postData = {
        text,
        media: mediaUrl,
      }

      const res = await createPost(postData)
      console.log(res)

      if (res.success) {
        alert("Post created successfully")
        setText("")
        setMedia(null)
        setPreview(null)
      } else {
        alert("Failed to create post2")
      }
    } catch (error) {
      console.error("Error creating post:", error)
      alert("Failed to create post1")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="new-post">
      <div className="post-container">
        <div className="post-header">
          <h2>Create New Post</h2>
        </div>

        <div className={`post-content ${preview ? "with-media" : ""}`}>
          <textarea
            placeholder="Write your post here..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />

          <div className="media-input">
            <label htmlFor="media-upload" className="upload-button">
              <span>Add Photo/Video</span>
              <input
                id="media-upload"
                type="file"
                accept="image/*,video/*"
                onChange={handleMediaChange}
                hidden
              />
            </label>
          </div>

          {preview && (
            <div className="media-preview">
              {preview.type === "video" ? (
                <video src={preview.url} controls className="preview-media" />
              ) : (
                <img src={preview.url} alt="Preview" className="preview-media" />
              )}
              <button
                className="remove-media"
                onClick={() => {
                  setMedia(null)
                  setPreview(null)
                }}
              >
                Remove
              </button>
            </div>
          )}
        </div>

        <div className="post-footer">
          <button onClick={handleSubmit} className="post-button">
            Post
          </button>
        </div>
      </div>
    </div>
  )
}

export default NewPost
