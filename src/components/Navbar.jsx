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
    <div style={{
      position: "fixed",
      bottom: "24px",
      left: "50%",
      transform: "translateX(-50%)",
      backgroundColor: "#0096c7",
      borderRadius: "999px",
      padding: "12px 32px",
      display: "flex",
      gap: "32px",
      alignItems: "center",
      boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
      zIndex: 100
    }}>

      <button
        onClick={() => navigate("/swipe")}
        style={{background: "none", border: "none", color: location.pathname === "/swipe" ? "#fda4af" : "white", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: "4px"}}
      >
        <span style={{fontSize: "24px"}}>🔥</span>
        <span style={{fontSize: "11px", fontWeight: "600"}}>Descubrir</span>
      </button>

      <button
        onClick={() => navigate("/matches")}
        style={{background: "none", border: "none", color: location.pathname === "/matches" ? "#fda4af" : "white", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: "4px"}}
      >
        <span style={{fontSize: "24px"}}>❤️</span>
        <span style={{fontSize: "11px", fontWeight: "600"}}>Matches</span>
      </button>

      <button
        onClick={() => navigate("/chat")}
        style={{background: "none", border: "none", color: location.pathname === "/chat" ? "#fda4af" : "white", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: "4px"}}
      >
        <span style={{fontSize: "24px"}}>💬</span>
        <span style={{fontSize: "11px", fontWeight: "600"}}>Chat</span>
      </button>

      <button
        onClick={handleLogout}
        style={{background: "none", border: "none", color: "white", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: "4px"}}
      >
        <span style={{fontSize: "24px"}}>🚪</span>
        <span style={{fontSize: "11px", fontWeight: "600"}}>Salir</span>
      </button>

    </div>
  )
}