import React, { useContext, useState, useEffect } from "react"
import "../css/Chats.css"
import MessagesView from "../components/MessagesView"
import { appContext } from "../context/appContext"
import { Link, useParams } from "react-router-dom"
import { getMiniProfile, getChats } from "../utils/apis"
import { getImageUrl } from "../utils/pp"

const Chats = () => {
  const { chatId } = useParams()

  const { user } = useContext(appContext)

  const [chats, setChats] = useState([])
  const [usersData, setUsersData] = useState({})

  const getReceiverIds = () => {
    const receiverIds = []
    for (let chat of chats) {
      console.log(chat, chatId)

      if (chat.id == chatId) {
        receiverIds.push(chat.user1)
        receiverIds.push(chat.user2)
      }
    }
    console.log(receiverIds)

    return receiverIds
  }

  const loadUserData = async (username) => {
    const res = await getMiniProfile(username)
    if (res.success) {
      setUsersData((prev) => ({
        ...prev,
        [username]: res.user,
      }))
    }
  }

  const initChats = async () => {
    const res = await getChats(user)
    if (res.success) {
      console.log(res)

      setChats(res.chats)
      const users = new Set(res.chats.flatMap((chat) => [chat.user1, chat.user2]))
      users.forEach((username) => {
        if (username !== user) loadUserData(username)
      })
    }
  }

  useEffect(() => {
    initChats()
  }, [])

  return (
    <div className="chats">
      <div className="chats-list">
        {chats.length === 0 ? (
          <div className="empty-state">No chats available</div>
        ) : (
          chats.map((chat, index) => {
            const otherUser = chat.user1 === user ? chat.user2 : chat.user1
            const userData = usersData[otherUser]

            return (
              <Link
                to={`/chats/${chat.id}`}
                key={index}
                className={`chat ${chatId == chat.id ? "active" : ""}`}
              >
                <img
                  className="chat-avatar"
                  src={getImageUrl(userData?.profile_image) || "profile.jpg"}
                  alt={otherUser}
                />
                <div className="chat-info">
                  <div className="chat-name">{userData?.name || otherUser}</div>
                  <div className="chat-username">@{otherUser}</div>
                </div>
              </Link>
            )
          })
        )}
      </div>

      {chatId ? (
        <MessagesView chatId={chatId} receiverIds={getReceiverIds()} />
      ) : (
        <div className="empty-messages-view">
          <div className="empty-state">
            <img src="/chat-icon.svg" alt="Select chat" />
            <p>Select a chat to start messaging</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default Chats
