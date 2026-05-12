import { useState } from "react"
import Navbar from "../components/Navbar"

const perfilesPrueba = [
  { uid: "1", nombre: "Carlos", edad: 25, gimnasio: "McFit", objetivo: "Ganar músculo", horario: "Tardes (16:00 - 20:00)", foto: "💪" },
  { uid: "2", nombre: "Laura", edad: 23, gimnasio: "McFit", objetivo: "Perder peso", horario: "Mañanas (6:00 - 12:00)", foto: "🏃‍♀️" },
  { uid: "3", nombre: "Miguel", edad: 28, gimnasio: "McFit", objetivo: "Crossfit", horario: "Noches (20:00 - 23:00)", foto: "🏋️" },
  { uid: "4", nombre: "Sara", edad: 22, gimnasio: "McFit", objetivo: "Cardio", horario: "Mediodía (12:00 - 16:00)", foto: "🚴‍♀️" },
  { uid: "5", nombre: "Alejandro", edad: 30, gimnasio: "McFit", objetivo: "Mantenimiento", horario: "Tardes (16:00 - 20:00)", foto: "🧘" },
]

export default function Swipe() {
  const [indice, setIndice] = useState(0)
  const [ultimoSwipe, setUltimoSwipe] = useState(null)
  const [match, setMatch] = useState(null)

  const perfil = perfilesPrueba[indice]

  const handleSwipe = (direction) => {
    setUltimoSwipe({ direction, nombre: perfil.nombre })
    if (direction === "right") {
      setMatch(perfil)
      setTimeout(() => setMatch(null), 3000)
    }
    setIndice((prev) => prev + 1)
  }

  return (
    <div style={{
      minHeight: "100vh",
      backgroundColor: "#0077b6",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "16px",
      paddingBottom: "120px"
    }}>

      {/* Header */}
      <div style={{textAlign: "center", marginBottom: "16px"}}>
        <h1 style={{fontSize: "28px", fontWeight: "900", color: "#fda4af", margin: "0"}}>GYMatch</h1>
        <p style={{fontSize: "13px", color: "#e0f7ff", margin: "4px 0 0"}}>Personas en tu gimnasio</p>
      </div>

      {/* Notificacion match */}
      {match && (
        <div style={{position: "fixed", top: "24px", left: 0, right: 0, display: "flex", justifyContent: "center", zIndex: 50}}>
          <div style={{backgroundColor: "#fda4af", color: "#005f99", padding: "12px 24px", borderRadius: "999px", fontWeight: "bold", fontSize: "16px", boxShadow: "0 4px 20px rgba(0,0,0,0.2)"}}>
            ¡Es un match con {match.nombre}! ❤️
          </div>
        </div>
      )}

      {/* Tarjeta */}
      <div style={{width: "260px", height: "320px"}}>
        {indice >= perfilesPrueba.length ? (
          <div style={{
            width: "100%", height: "100%",
            backgroundColor: "#005f99",
            borderRadius: "32px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 20px 60px rgba(0,0,0,0.3)"
          }}>
            <p style={{color: "#e0f7ff", textAlign: "center", padding: "16px"}}>No hay más perfiles en tu gimnasio por ahora 😊</p>
          </div>
        ) : (
          <div style={{
            width: "260px",
            height: "320px",
            backgroundColor: "#005f99",
            borderRadius: "32px",
            boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px"
          }}>
            <div style={{fontSize: "64px", marginBottom: "12px"}}>{perfil.foto}</div>
            <h2 style={{fontSize: "20px", fontWeight: "bold", color: "white", margin: "0"}}>{perfil.nombre}, {perfil.edad}</h2>
            <p style={{color: "#fda4af", fontWeight: "500", margin: "4px 0 0", fontSize: "14px"}}>{perfil.gimnasio}</p>
            <p style={{color: "#e0f7ff", fontSize: "13px", margin: "6px 0 0"}}>{perfil.objetivo}</p>
            <p style={{color: "#bae6fd", fontSize: "12px", margin: "4px 0 0"}}>{perfil.horario}</p>
          </div>
        )}
      </div>

      {/* Botones */}
      <div style={{display: "flex", gap: "24px", marginTop: "24px"}}>
        <button
          onClick={() => handleSwipe("left")}
          style={{
            width: "56px", height: "56px",
            backgroundColor: "#005f99",
            borderRadius: "50%",
            border: "none", outline: "none",
            fontSize: "22px",
            cursor: "pointer",
            boxShadow: "0 4px 20px rgba(0,0,0,0.2)"
          }}
        >❌</button>
        <button
          onClick={() => handleSwipe("right")}
          style={{
            width: "56px", height: "56px",
            backgroundColor: "#fda4af",
            borderRadius: "50%",
            border: "none", outline: "none",
            fontSize: "22px",
            cursor: "pointer",
            boxShadow: "0 4px 20px rgba(0,0,0,0.2)"
          }}
        >❤️</button>
      </div>

      <Navbar />
    </div>
  )
}