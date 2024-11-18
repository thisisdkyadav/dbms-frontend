import React, { useContext, useState, useRef, useEffect } from "react"
import "../css/NavBar.css"
import { Link } from "react-router-dom"
import { appContext } from "../context/appContext"
import { searchUsers } from "../utils/apis"
import ProfileMenu from "./ProfileMenu"
import SearchResults from "./SearchResults"

const Navbar = () => {
  const [showSearch, setShowSearch] = useState(false)
  const [results, setResults] = useState([])

  const searchInputRef = useRef(null)

  const handleSearch = async (e) => {
    if (e.target.value.length < 1) {
      setResults([])
      return
    }
    const res = await searchUsers(e.target.value)
    setResults(res.users)
  }

  useEffect(() => {
    if (showSearch && searchInputRef.current) {
      searchInputRef.current.focus()
    }

    if (!showSearch) {
      setResults([])
    }
  }, [showSearch])

  return (
    <>
      {showSearch && (
        <div
          className="nav-search-menu-bg"
          onClick={() => {
            setShowSearch(false)
          }}
        >
          <div
            className="nav-search-menu"
            onClick={(e) => {
              e.stopPropagation()
            }}
          >
            <div className="search-bar">
              <input
                onChange={handleSearch}
                type="text"
                placeholder="Search users..."
                ref={searchInputRef}
              />
            </div>

            {results.length > 0 && (
              <SearchResults results={results} onClose={() => setShowSearch(false)} />
            )}
          </div>
        </div>
      )}

      <div className="nav">
        <div className="left">
          <div
            className="search-bar"
            onClick={() => {
              setShowSearch(true)
            }}
          >
            <input type="text" placeholder="Search username" />
          </div>
          <div className="top-option">
            <Link to="/" className="tab">
              Home
            </Link>
            <Link to={"/chats"} className="tab">
              Chats
            </Link>
          </div>
        </div>

        <Link to={"/"} className="middle">
          EchoSpace
        </Link>
        <div className="right">
          <Link to={"/newpost"} className="new-post-btn">
            New Post
          </Link>
          <ProfileMenu />
        </div>
      </div>
    </>
  )
}

export default Navbar
