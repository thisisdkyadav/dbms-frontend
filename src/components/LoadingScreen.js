import React from "react"
import "../css/LoadingScreen.css"

const LoadingScreen = () => {
  return (
    <div className="loading-screen">
      <div className="spinner"></div>
      <div className="loading-text">Loading...</div>
    </div>
  )
}

export default LoadingScreen
