import logo from "./logo.svg"
import "./App.css"
import Login from "./pages/Login"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { appContext } from "./context/appContext"
import Home from "./pages/Home"
import { useState, useEffect } from "react"
import Profile from "./pages/Profile"
import Signup from "./pages/Signup"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    children: [
      {
        path: ":param",
        element: <Profile />,
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

  useEffect(() => {
    const user = localStorage.getItem("user")
    setUser(user)
  }, [])

  return (
    <>
      <appContext.Provider value={{ user, setUser }}>
        <RouterProvider router={router} />
      </appContext.Provider>
    </>
  )
}

export default App
