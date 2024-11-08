import React, { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import "../css/Profile.css"
import { getProfile, toggleFollow } from "../utils/apis"
import { appContext } from "../context/appContext"

let defaultPhoto =
  "https://static.vecteezy.com/system/resources/previews/011/490/381/original/happy-smiling-young-man-avatar-3d-portrait-of-a-man-cartoon-character-people-illustration-isolated-on-white-background-vector.jpg"

const Profile = () => {
  const { param } = useParams()
  const { user } = useContext(appContext)

  const [data, setData] = useState(null)
  const [isFollowed, setIsFollowed] = useState(false)

  const getProfileData = async () => {
    const res = await getProfile(param)
    setData(res)

    setIsFollowed(res.followers.includes(user))
  }

  const handleFollow = async () => {
    const res = await toggleFollow(param)
    if (res.success) {
      getProfileData()
    }
  }

  useEffect(() => {
    getProfileData()
  }, [param])

  return (
    <div className="profileMain">
      {data && (
        <>
          <div className="profile-info">
            <div className="details">
              <h1 className="name">{data.user.Name}</h1>
              <div className="followers">
                <span>Followers: {data.followers.length}</span>
                <span>Following: {data.following.length}</span>
              </div>
              {param !== user && (
                <div className="buttons">
                  <div className={isFollowed ? "outlined" : "fill"} onClick={handleFollow}>
                    {isFollowed ? "UnFollow" : "Follow"}
                  </div>
                  <div className={isFollowed ? "fill" : "outlined"}>Message</div>
                </div>
              )}
            </div>
            <div className="photo">
              <img src={defaultPhoto} alt="profile" />
            </div>
          </div>
          <div className="profile-posts"></div>
        </>
      )}
    </div>
  )
}

export default Profile
