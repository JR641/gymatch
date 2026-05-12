import { useState, useEffect } from "react"
import { auth, db } from "./firebase/config"
import { onAuthStateChanged } from "firebase/auth"
import { doc, getDoc } from "firebase/firestore"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Login from "./pages/Login"
import Home from "./pages/Home"
import Profile from "./pages/Profile"
import Swipe from "./pages/Swipe"
import Matches from "./pages/Matches"
import Chat from "./pages/Chat"

function App() {
  const [user, setUser] = useState(null)
  const [perfil, setPerfil] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser)
      if (currentUser) {
        const docRef = doc(db, "usuarios", currentUser.uid)
        const docSnap = await getDoc(docRef)
        if (docSnap.exists()) {
          setPerfil(docSnap.data())
        }
      }
      setLoading(false)
    })
    return () => unsubscribe()
  }, [])

  if (loading) return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <p className="text-orange-500 text-xl">Cargando...</p>
    </div>
  )

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={!user ? <Login /> : perfil ? <Navigate to="/swipe" /> : <Navigate to="/perfil" />} />
        <Route path="/perfil" element={user ? <Profile /> : <Navigate to="/" />} />
        <Route path="/home" element={user ? <Home /> : <Navigate to="/" />} />
        <Route path="/swipe" element={user ? <Swipe /> : <Navigate to="/" />} />
        <Route path="/matches" element={user ? <Matches /> : <Navigate to="/" />} />
        <Route path="/chat" element={user ? <Chat /> : <Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App