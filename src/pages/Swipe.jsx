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
    <div className="min-h-screen flex flex-col items-center justify-center p-4 pb-24" style={{backgroundColor: "#0077b6"}}>

      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold" style={{color: "#fda4af"}}>GYMatch</h1>
        <p className="text-sm" style={{color: "#e0f7ff"}}>Personas en tu gimnasio</p>
      </div>

      {/* Notificacion match */}
      {match && (
        <div className="fixed top-6 left-0 right-0 flex justify-center z-50">
          <div className="px-6 py-3 rounded-full font-bold text-lg shadow-lg" style={{backgroundColor: "#fda4af", color: "#005f99"}}>
            ¡Es un match con {match.nombre}! ❤️
          </div>
        </div>
      )}

      {/* Tarjeta */}
      <div className="relative w-72 h-96">
        {indice >= perfilesPrueba.length ? (
          <div className="w-full h-full rounded-2xl flex items-center justify-center" style={{backgroundColor: "#005f99"}}>
            <p className="text-center p-4" style={{color: "#e0f7ff"}}>No hay más perfiles en tu gimnasio por ahora 😊</p>
          </div>
        ) : (
          <div className="w-72 h-96 rounded-2xl shadow-xl flex flex-col items-center justify-center p-6" style={{backgroundColor: "#005f99"}}>
            <div className="text-8xl mb-4">{perfil.foto}</div>
            <h2 className="text-2xl font-bold" style={{color: "white"}}>{perfil.nombre}, {perfil.edad}</h2>
            <p className="font-medium mt-1" style={{color: "#fda4af"}}>{perfil.gimnasio}</p>
            <p className="mt-2 text-sm" style={{color: "#e0f7ff"}}>{perfil.objetivo}</p>
            <p className="text-xs mt-1" style={{color: "#bae6fd"}}>{perfil.horario}</p>
          </div>
        )}
      </div>

      {/* Botones */}
      <div className="flex gap-6 mt-8">
        <button
          onClick={() => handleSwipe("left")}
          className="w-16 h-16 rounded-full flex items-center justify-center text-2xl shadow-lg transition"
          style={{backgroundColor: "#005f99", border: "none", outline: "none"}}
        >
          ❌
        </button>
        <button
          onClick={() => handleSwipe("right")}
          className="w-16 h-16 rounded-full flex items-center justify-center text-2xl shadow-lg transition"
          style={{backgroundColor: "#fda4af", border: "none", outline: "none"}}
        >
          ❤️
        </button>
      </div>

      {false && ultimoSwipe && (
        <p className="text-sm mt-4" style={{color: "#e0f7ff"}}>
          {ultimoSwipe.direction === "right" ? "❤️" : "❌"} {ultimoSwipe.nombre}
        </p>
      )}

      <Navbar />
    </div>
  )
}