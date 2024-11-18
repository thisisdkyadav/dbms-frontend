import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { getMiniProfile } from "../utils/apis"
import { getImageUrl } from "../utils/pp"

const SearchResults = ({ results, onClose }) => {
  const [usersData, setUsersData] = useState({})

  useEffect(() => {
    const fetchUsersData = async () => {
      const data = {}
      for (const user of results) {
        const res = await getMiniProfile(user.username)
        if (res.success) {
          data[user.username] = res.user
        }
      }
      setUsersData(data)
    }
    fetchUsersData()
  }, [results])

  return (
    <div className="results-list">
      {results.map((result, index) => {
        const userData = usersData[result.username]
        return (
          <Link to={`/${result.username}`} className="search-result" key={index} onClick={onClose}>
            <img
              src={getImageUrl(userData?.profile_image) || "profile.jpg"}
              alt={result.username}
              className="search-result-avatar"
            />

            <div className="search-result-info">
              <span className="search-result-name">{userData?.name || result.username}</span>
              <span className="search-result-username">@{result.username}</span>
            </div>
          </Link>
        )
      })}
    </div>
  )
}

export default SearchResults
