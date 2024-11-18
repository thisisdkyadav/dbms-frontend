import "./App.css"
import Login from "./pages/Login"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { appContext } from "./context/appContext"
import Home from "./pages/Home"
import { useState, useEffect } from "react"
import Profile from "./pages/Profile"
import Signup from "./pages/Signup"
import NewPost from "./components/NewPost"
import Chats from "./pages/Chats"
import io from "socket.io-client"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    children: [
      {
        path: ":param",
        element: <Profile />,
      },
      {
        path: "/chats",
        element: <Chats />,
      },
      {
        path: "/chats/:chatId",
        element: <Chats />,
      },
      {
        path: "/newpost",
        element: <NewPost />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
])

function App() {
  const [user, setUser] = useState(null)
  const [socket, setSocket] = useState(null)
  const [initializing, setInitializing] = useState(true)

  let disconnectSocketio

  const handleNewMessage = async (message) => {}
  const initSocketio = async (username) => {
    const socketio = io("http://localhost:8000", {
      query: { username },
      transports: ["websocket"],
    })
    setSocket(socketio)

    disconnectSocketio = () => {
      socketio.close()
      setSocket(null)
    }
  }

  useEffect(() => {
    const username = localStorage.getItem("user")
    if (!username) {
      setInitializing(false)
      return
    }
    setUser(username)
    setInitializing(false)
    initSocketio(username)

    return () => {
      disconnectSocketio()
    }
  }, [])

  return (
    <>
      <appContext.Provider value={{ user, setUser, socket, initializing }}>
        <RouterProvider router={router} />
      </appContext.Provider>
    </>
  )
}

export default App
