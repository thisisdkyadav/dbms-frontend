import React, { useContext, useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { appContext } from "../context/appContext"
import { getMiniProfile } from "../utils/apis"

const ProfileMenu = () => {
  const { user } = useContext(appContext)
  const [showMenu, setShowMenu] = useState(false)
  const [userData, setUserData] = useState(null)

  useEffect(() => {
    const loadUserData = async () => {
      const res = await getMiniProfile(user)
      if (res.success) {
        setUserData(res.user)
      }
    }
    loadUserData()
  }, [user])

  const handleLogout = () => {
    localStorage.removeItem("user")
    localStorage.removeItem("token")
    window.location.reload()
  }

  return (
    <>
      {showMenu && (
        <div className="nav-pop-up-menu-bg" onClick={() => setShowMenu(false)}>
          <div className="nav-pop-up-menu" onClick={(e) => e.stopPropagation()}>
            <img src={userData?.profile_image || "profile.jpg"} alt={user} />
            <div className="user-info">
              {userData?.name && <div className="user-name">{userData.name}</div>}
              <div className="user-username">@{user}</div>
            </div>
            <Link to={`/${user}`} className="view-profile">
              View Profile
            </Link>
            <div onClick={handleLogout} className="logout">
              Logout
            </div>
          </div>
        </div>
      )}

      <div className="profileImage" onClick={() => setShowMenu(!showMenu)}>
        <img src={userData?.profile_image || "profile.jpg"} alt={user} />
      </div>
    </>
  )
}

export default ProfileMenu
