import React, { useContext, useState, useRef, useEffect } from "react"
import "../css/NavBar.css"
import { Link } from "react-router-dom"
import { appContext } from "../context/appContext"
import { searchUsers } from "../utils/apis"

const Navbar = () => {
  const { user } = useContext(appContext)

  const [showMenu, setShowMenu] = useState(false)
  const [showSearch, setShowSearch] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [results, setResults] = useState([])

  const searchInputRef = useRef(null)

  const handleLogout = () => {
    localStorage.removeItem("user")
    localStorage.removeItem("token")
    window.location.reload()
  }

  const handleSearch = async (e) => {
    setSearchQuery(e.target.value)
    if (e.target.value.length < 1) {
      setResults([])
      return
    }
    const res = await searchUsers(e.target.value)
    console.log(res)

    setResults(res.users)
  }

  useEffect(() => {
    if (showSearch && searchInputRef.current) {
      searchInputRef.current.focus()
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
              e.stopPropagation() // Prevent click event from propagating to nav-pop-up-menu-bg
            }}
          >
            <div className="search-bar">
              <input
                onChange={handleSearch}
                type="text"
                placeholder="Search username"
                ref={searchInputRef}
              />
            </div>

            {results.length > 0 && (
              <div className="results-list">
                {results.map((result) => {
                  return (
                    <div className="search-result">
                      <Link to={`/${result.Username}`}>{result.Username}</Link>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </div>
      )}

      {showMenu && (
        <div
          className="nav-pop-up-menu-bg"
          onClick={() => {
            setShowMenu(false)
          }}
        >
          <div
            className="nav-pop-up-menu"
            onClick={(e) => {
              e.stopPropagation() // Prevent click event from propagating to nav-pop-up-menu-bg
            }}
          >
            <img src="https://static.vecteezy.com/system/resources/previews/011/490/381/original/happy-smiling-young-man-avatar-3d-portrait-of-a-man-cartoon-character-people-illustration-isolated-on-white-background-vector.jpg" />
            <Link to={`/${user}`} className="view-profile">
              View Profile
            </Link>
            <div onClick={handleLogout} className="logout">
              logout
            </div>
          </div>
        </div>
      )}
      <div className="nav">
        <div className="left">
          {!showSearch && (
            <div
              className="search-bar"
              onClick={() => {
                setShowSearch(true)
              }}
            >
              <input type="text" placeholder="Search username" />
            </div>
          )}
        </div>
        <div className="middle">
          <Link to="/" className="tab">
            Home
          </Link>
          <Link className="tab">About</Link>
        </div>
        <div className="right">
          <div
            className="profileImage"
            onClick={() => {
              setShowMenu(!showMenu)
            }}
          >
            <img src="https://static.vecteezy.com/system/resources/previews/011/490/381/original/happy-smiling-young-man-avatar-3d-portrait-of-a-man-cartoon-character-people-illustration-isolated-on-white-background-vector.jpg" />
          </div>
        </div>
      </div>
    </>
  )
}

export default Navbar
