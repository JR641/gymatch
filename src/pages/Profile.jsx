import { useState } from "react"
import { auth, db } from "../firebase/config"
import { doc, setDoc } from "firebase/firestore"
import { useNavigate } from "react-router-dom"

export default function Profile() {
  const [nombre, setNombre] = useState("")
  const [edad, setEdad] = useState("")
  const [gimnasio, setGimnasio] = useState("")
  const [objetivo, setObjetivo] = useState("")
  const [horario, setHorario] = useState("")
  const [error, setError] = useState("")

  const navigate = useNavigate()

  const objetivos = [
    "Perder peso",
    "Ganar músculo",
    "Cardio",
    "Crossfit",
    "Mantenimiento"
  ]

  const horarios = [
    "Mañanas (6:00 - 12:00)",
    "Mediodía (12:00 - 16:00)",
    "Tardes (16:00 - 20:00)",
    "Noches (20:00 - 23:00)"
  ]

  const handleGuardar = async () => {
    if (!nombre || !edad || !gimnasio || !objetivo || !horario) {
      setError("Por favor rellena todos los campos")
      return
    }

    try {
      await setDoc(doc(db, "usuarios", auth.currentUser.uid), {
        nombre,
        edad,
        gimnasio,
        objetivo,
        horario,
        uid: auth.currentUser.uid,
        email: auth.currentUser.email,
        foto: "",
        createdAt: new Date()
      })
      navigate("/swipe")
    } catch (err) {
      setError("Error al guardar el perfil")
    }
  }

  return (
    <div className="min-h-screen p-6" style={{backgroundColor: "#0077b6"}}>
      <div className="max-w-md mx-auto">

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold" style={{color: "#fda4af"}}>GYMatch</h1>
          <p className="mt-2" style={{color: "#e0f7ff"}}>Cuéntanos sobre ti</p>
        </div>

        {/* Foto de perfil */}
        <div className="flex justify-center mb-6">
          <div className="w-24 h-24 rounded-full flex items-center justify-center" style={{backgroundColor: "#005f99"}}>
            <span className="text-4xl">👤</span>
          </div>
        </div>

        {/* Formulario */}
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Tu nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="w-full text-gray-800 rounded-2xl p-4 outline-none placeholder-gray-400"
            style={{backgroundColor: "white"}}
          />
          <input
            type="number"
            placeholder="Tu edad"
            value={edad}
            onChange={(e) => setEdad(e.target.value)}
            className="w-full text-gray-800 rounded-2xl p-4 outline-none placeholder-gray-400"
            style={{backgroundColor: "white"}}
          />
          <input
            type="text"
            placeholder="¿A qué gimnasio vas?"
            value={gimnasio}
            onChange={(e) => setGimnasio(e.target.value)}
            className="w-full text-gray-800 rounded-2xl p-4 outline-none placeholder-gray-400"
            style={{backgroundColor: "white"}}
          />

          {/* Objetivo */}
          <div>
            <p className="mb-2" style={{color: "#e0f7ff"}}>¿Cuál es tu objetivo?</p>
            <div className="grid grid-cols-2 gap-2">
              {objetivos.map((obj) => (
                <button
                  key={obj}
                  onClick={() => setObjetivo(obj)}
                  style={{
                    backgroundColor: objetivo === obj ? "#fda4af" : "#005f99",
                    color: objetivo === obj ? "#005f99" : "white"
                  }}
                  className="p-3 rounded-xl text-sm font-medium transition"
                >
                  {obj}
                </button>
              ))}
            </div>
          </div>

          {/* Horario */}
          <div>
            <p className="mb-2" style={{color: "#e0f7ff"}}>¿Cuándo sueles ir?</p>
            <div className="space-y-2">
              {horarios.map((h) => (
                <button
                  key={h}
                  onClick={() => setHorario(h)}
                  style={{
                    backgroundColor: horario === h ? "#fda4af" : "#005f99",
                    color: horario === h ? "#005f99" : "white"
                  }}
                  className="w-full p-3 rounded-xl text-sm font-medium transition"
                >
                  {h}
                </button>
              ))}
            </div>
          </div>

          {error && <p style={{color: "white"}} className="text-sm">{error}</p>}

          <button
            onClick={handleGuardar}
            className="w-full font-bold py-4 rounded-2xl transition text-lg"
            style={{backgroundColor: "#fda4af", color: "#005f99"}}
          >
            Guardar perfil
          </button> 
        </div>

      </div>
    </div>
  )
}