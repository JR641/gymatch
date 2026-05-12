import { useNavigate, useLocation } from "react-router-dom"
import { auth } from "../firebase/config"
import { signOut } from "firebase/auth"

export default function Navbar() {
  const navigate = useNavigate()
  const location = useLocation()

  const handleLogout = async () => {
    await signOut(auth)
    navigate("/")
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 px-6 py-5" style={{backgroundColor: "#0096c7"}}>
      <div className="flex justify-around items-center max-w-md mx-auto">

        <button
          onClick={() => navigate("/swipe")}
          style={{background: "none", border: "none", color: location.pathname === "/swipe" ? "#fda4af" : "white"}}
          className="flex flex-col items-center gap-1 transition"
        >
          <span className="text-3xl">🔥</span>
          <span className="text-sm">Descubrir</span>
        </button>

        <button
          onClick={() => navigate("/matches")}
          style={{background: "none", border: "none", color: location.pathname === "/matches" ? "#fda4af" : "white"}}
          className="flex flex-col items-center gap-1 transition"
        >
          <span className="text-3xl">❤️</span>
          <span className="text-sm">Matches</span>
        </button>

        <button
          onClick={() => navigate("/chat")}
          style={{background: "none", border: "none", color: location.pathname === "/chat" ? "#fda4af" : "white"}}
          className="flex flex-col items-center gap-1 transition"
        >
          <span className="text-3xl">💬</span>
          <span className="text-sm">Chat</span>
        </button>

        <button
          onClick={handleLogout}
          style={{background: "none", border: "none", color: "white"}}
          className="flex flex-col items-center gap-1 transition"
        >
          <span className="text-3xl">🚪</span>
          <span className="text-sm">Salir</span>
        </button>

      </div>
    </div>
  )
}