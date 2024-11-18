import React, { useContext, useEffect, useState, useRef } from "react"
import { getMessages, sendMessage, deleteMessage } from "../utils/apis"
import { appContext } from "../context/appContext"

const MessagesView = ({ chatId, receiverIds }) => {
  const { user, socket } = useContext(appContext)

  const [messages, setMessages] = useState([])
  const [input, setInput] = useState("")
  const messagesEndRef = useRef(null)
  const messagesListRef = useRef(null)

  const initMessages = async () => {
    const res = await getMessages(chatId)
    if (res.success) {
      console.log(res)
      setMessages(res.messages)
    }

    scrollToBottom()
  }

  const handleSend = () => {
    if (input.length < 1) return
    sendMessage(chatId, input, receiverIds)
    setInput("")
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView()
  }

  const handleDeleteMessage = async (messageId) => {
    if (window.confirm("Are you sure you want to delete this message?")) {
      const res = await deleteMessage(messageId)
      if (res.success) {
        setMessages(messages.filter((m) => m.id !== messageId))
      }
    }
  }

  const formatMessageTime = (timestamp) => {
    const date = new Date(timestamp.replace(" ", "T"))
    const now = new Date()
    const isToday = date.toDateString() === now.toDateString()

    if (isToday) {
      return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    }
    return date.toLocaleDateString([], {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  useEffect(() => {
    initMessages()
    if (chatId && socket) {
      socket.on("newMessage", (message) => {
        initMessages()
      })
    }
  }, [chatId, socket])

  return (
    <div className="messages-view">
      <div className="messages-list" ref={messagesListRef}>
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.sender === user ? "sent" : "received"}`}>
            <div className="message-content">
              <div className="message-text">{message.text}</div>
              <div className="message-timestamp">{formatMessageTime(message.time)}</div>
              {message.sender === user && (
                <button className="message-delete" onClick={() => handleDeleteMessage(message.id)}>
                  ×
                </button>
              )}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="message-input">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message"
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  )
}

export default MessagesView
