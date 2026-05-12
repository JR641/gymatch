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
  const [genero, setGenero] = useState("")
  const [orientacion, setOrientacion] = useState("")
  const [buscando, setBuscando] = useState("")
  const [foto, setFoto] = useState("")
  const [error, setError] = useState("")

  const navigate = useNavigate()

  const objetivos = ["Perder peso", "Ganar músculo", "Cardio", "Crossfit", "Mantenimiento"]
  const horarios = ["Mañanas (6:00 - 12:00)", "Mediodía (12:00 - 16:00)", "Tardes (16:00 - 20:00)", "Noches (20:00 - 23:00)"]
  const generos = ["Hombre", "Mujer", "No binario", "Prefiero no decirlo"]
  const orientaciones = ["Heterosexual", "Homosexual", "Bisexual", "Prefiero no decirlo"]
  const buscandoOpciones = ["Amigos", "Compañero de entreno", "Pareja", "Lo que surja"]

  const handleFoto = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => setFoto(reader.result)
      reader.readAsDataURL(file)
    }
  }

  const handleGuardar = async () => {
    if (!nombre || !edad || !gimnasio || !objetivo || !horario || !genero || !orientacion || !buscando) {
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
        genero,
        orientacion,
        buscando,
        uid: auth.currentUser.uid,
        email: auth.currentUser.email,
        foto: foto || "",
        createdAt: new Date()
      })
      navigate("/swipe")
    } catch (err) {
      setError("Error al guardar el perfil")
    }
  }

  return (
    <div className="min-h-screen p-6 pb-10" style={{backgroundColor: "#0077b6"}}>
      <div className="max-w-md mx-auto">

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold" style={{color: "#fda4af"}}>GYMatch</h1>
          <p className="mt-2" style={{color: "#e0f7ff"}}>Cuéntanos sobre ti</p>
        </div>

        {/* Foto de perfil */}
        <div className="flex justify-center mb-6">
          <label style={{cursor: "pointer"}}>
            <div className="w-28 h-28 rounded-full flex items-center justify-center overflow-hidden" style={{backgroundColor: "#005f99"}}>
              {foto
                ? <img src={foto} alt="perfil" style={{width: "100%", height: "100%", objectFit: "cover"}}/>
                : <span className="text-5xl">📷</span>
              }
            </div>
            <p className="text-center text-sm mt-2" style={{color: "#e0f7ff"}}>Toca para añadir foto</p>
            <input type="file" accept="image/*" onChange={handleFoto} style={{display: "none"}}/>
          </label>
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

          {/* Género */}
          <div>
            <p className="mb-2" style={{color: "#e0f7ff"}}>¿Cuál es tu género?</p>
            <div className="grid grid-cols-2 gap-2">
              {generos.map((g) => (
                <button key={g} onClick={() => setGenero(g)}
                  style={{backgroundColor: genero === g ? "#fda4af" : "#005f99", color: genero === g ? "#005f99" : "white", border: "none"}}
                  className="p-3 rounded-xl text-sm font-medium transition">
                  {g}
                </button>
              ))}
            </div>
          </div>

          {/* Orientación */}
          <div>
            <p className="mb-2" style={{color: "#e0f7ff"}}>¿Cuál es tu orientación sexual?</p>
            <div className="grid grid-cols-2 gap-2">
              {orientaciones.map((o) => (
                <button key={o} onClick={() => setOrientacion(o)}
                  style={{backgroundColor: orientacion === o ? "#fda4af" : "#005f99", color: orientacion === o ? "#005f99" : "white", border: "none"}}
                  className="p-3 rounded-xl text-sm font-medium transition">
                  {o}
                </button>
              ))}
            </div>
          </div>

          {/* Qué busca */}
          <div>
            <p className="mb-2" style={{color: "#e0f7ff"}}>¿Qué estás buscando?</p>
            <div className="grid grid-cols-2 gap-2">
              {buscandoOpciones.map((b) => (
                <button key={b} onClick={() => setBuscando(b)}
                  style={{backgroundColor: buscando === b ? "#fda4af" : "#005f99", color: buscando === b ? "#005f99" : "white", border: "none"}}
                  className="p-3 rounded-xl text-sm font-medium transition">
                  {b}
                </button>
              ))}
            </div>
          </div>

          {/* Objetivo */}
          <div>
            <p className="mb-2" style={{color: "#e0f7ff"}}>¿Cuál es tu objetivo?</p>
            <div className="grid grid-cols-2 gap-2">
              {objetivos.map((obj) => (
                <button key={obj} onClick={() => setObjetivo(obj)}
                  style={{backgroundColor: objetivo === obj ? "#fda4af" : "#005f99", color: objetivo === obj ? "#005f99" : "white", border: "none"}}
                  className="p-3 rounded-xl text-sm font-medium transition">
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
                <button key={h} onClick={() => setHorario(h)}
                  style={{backgroundColor: horario === h ? "#fda4af" : "#005f99", color: horario === h ? "#005f99" : "white", border: "none"}}
                  className="w-full p-3 rounded-xl text-sm font-medium transition">
                  {h}
                </button>
              ))}
            </div>
          </div>

          {error && <p style={{color: "white"}} className="text-sm">{error}</p>}

          <button
            onClick={handleGuardar}
            className="w-full font-bold py-4 rounded-2xl transition text-lg"
            style={{backgroundColor: "#fda4af", color: "#005f99", border: "none"}}
          >
            Guardar perfil
          </button>
        </div>

      </div>
    </div>
  )
}