import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import "../css/UserList.css"
import { getMiniProfile } from "../utils/apis"
import { getImageUrl } from "../utils/pp"

const UserList = ({ users, title, onClose }) => {
  const [usersData, setUsersData] = useState({})

  useEffect(() => {
    const fetchUsersData = async () => {
      const data = {}
      for (const username of users) {
        const res = await getMiniProfile(username)
        if (res.success) {
          data[username] = res.user
        }
      }
      setUsersData(data)
    }
    fetchUsersData()
  }, [users])

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{title}</h2>
          <button className="close-btn" onClick={onClose}>
            ×
          </button>
        </div>
        <div className="users-list">
          {users.map((username, index) => (
            <Link to={`/${username}`} className="user-item" key={index} onClick={onClose}>
              <img
                src={getImageUrl(usersData[username]?.profile_image) || "profile.jpg"}
                alt={username}
              />
              <div className="user-info">
                <span className="username">{username}</span>
                {usersData[username]?.name && (
                  <span className="fullname">{usersData[username].name}</span>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default UserList
