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
        nombre, edad, gimnasio, objetivo, horario, genero, orientacion, buscando,
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

  const BotonesGrid = ({ opciones, valor, setValor }) => (
    <div style={{display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px"}}>
      {opciones.map((op) => (
        <button key={op} onClick={() => setValor(op)} style={{
          backgroundColor: valor === op ? "#fda4af" : "#005f99",
          color: valor === op ? "#005f99" : "white",
          border: "none", borderRadius: "16px",
          padding: "12px", fontSize: "14px",
          fontWeight: "600", cursor: "pointer"
        }}>{op}</button>
      ))}
    </div>
  )

  return (
    <div style={{minHeight: "100vh", backgroundColor: "#0077b6", padding: "24px 16px 40px"}}>
      <div style={{maxWidth: "400px", margin: "0 auto"}}>

        {/* Header */}
        <div style={{textAlign: "center", marginBottom: "24px"}}>
          <h1 style={{fontSize: "32px", fontWeight: "900", color: "#fda4af", margin: "0"}}>GYMatch</h1>
          <p style={{color: "#e0f7ff", margin: "8px 0 0"}}>Cuéntanos sobre ti</p>
        </div>

        {/* Card principal */}
        <div style={{backgroundColor: "#005f99", borderRadius: "32px", padding: "24px", boxShadow: "0 20px 60px rgba(0,0,0,0.3)", display: "flex", flexDirection: "column", gap: "20px"}}>

          {/* Foto */}
          <label style={{cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center"}}>
            <div style={{
              width: "100px", height: "100px", borderRadius: "50%",
              backgroundColor: "#0077b6", overflow: "hidden",
              display: "flex", alignItems: "center", justifyContent: "center"
            }}>
              {foto
                ? <img src={foto} alt="perfil" style={{width: "100%", height: "100%", objectFit: "cover"}}/>
                : <span style={{fontSize: "40px"}}>📷</span>
              }
            </div>
            <p style={{color: "#e0f7ff", fontSize: "14px", margin: "8px 0 0"}}>Toca para añadir foto</p>
            <input type="file" accept="image/*" onChange={handleFoto} style={{display: "none"}}/>
          </label>

          {/* Inputs */}
          <input type="text" placeholder="Tu nombre" value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            style={{width: "100%", backgroundColor: "white", color: "#1f2937", borderRadius: "16px", padding: "16px", border: "none", outline: "none", fontSize: "16px", boxSizing: "border-box"}}
          />
          <input type="number" placeholder="Tu edad" value={edad}
            onChange={(e) => setEdad(e.target.value)}
            style={{width: "100%", backgroundColor: "white", color: "#1f2937", borderRadius: "16px", padding: "16px", border: "none", outline: "none", fontSize: "16px", boxSizing: "border-box"}}
          />
          <input type="text" placeholder="¿A qué gimnasio vas?" value={gimnasio}
            onChange={(e) => setGimnasio(e.target.value)}
            style={{width: "100%", backgroundColor: "white", color: "#1f2937", borderRadius: "16px", padding: "16px", border: "none", outline: "none", fontSize: "16px", boxSizing: "border-box"}}
          />

          {/* Género */}
          <div>
            <p style={{color: "#e0f7ff", marginBottom: "8px", fontWeight: "600"}}>¿Cuál es tu género?</p>
            <BotonesGrid opciones={generos} valor={genero} setValor={setGenero}/>
          </div>

          {/* Orientación */}
          <div>
            <p style={{color: "#e0f7ff", marginBottom: "8px", fontWeight: "600"}}>¿Cuál es tu orientación sexual?</p>
            <BotonesGrid opciones={orientaciones} valor={orientacion} setValor={setOrientacion}/>
          </div>

          {/* Qué busca */}
          <div>
            <p style={{color: "#e0f7ff", marginBottom: "8px", fontWeight: "600"}}>¿Qué estás buscando?</p>
            <BotonesGrid opciones={buscandoOpciones} valor={buscando} setValor={setBuscando}/>
          </div>

          {/* Objetivo */}
          <div>
            <p style={{color: "#e0f7ff", marginBottom: "8px", fontWeight: "600"}}>¿Cuál es tu objetivo?</p>
            <BotonesGrid opciones={objetivos} valor={objetivo} setValor={setObjetivo}/>
          </div>

          {/* Horario */}
          <div>
            <p style={{color: "#e0f7ff", marginBottom: "8px", fontWeight: "600"}}>¿Cuándo sueles ir?</p>
            <div style={{display: "flex", flexDirection: "column", gap: "8px"}}>
              {horarios.map((h) => (
                <button key={h} onClick={() => setHorario(h)} style={{
                  backgroundColor: horario === h ? "#fda4af" : "#0077b6",
                  color: horario === h ? "#005f99" : "white",
                  border: "none", borderRadius: "16px",
                  padding: "12px", fontSize: "14px",
                  fontWeight: "600", cursor: "pointer"
                }}>{h}</button>
              ))}
            </div>
          </div>

          {error && <p style={{color: "white", fontSize: "14px", margin: "0"}}>{error}</p>}

          <button onClick={handleGuardar} style={{
            width: "100%", backgroundColor: "#fda4af", color: "#005f99",
            fontWeight: "bold", padding: "16px", borderRadius: "16px",
            border: "none", fontSize: "18px", cursor: "pointer"
          }}>
            Guardar perfil
          </button>

        </div>
      </div>
    </div>
  )
}