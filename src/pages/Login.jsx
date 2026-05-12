import { useState } from "react"
import { auth } from "../firebase/config"
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth"

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isRegister, setIsRegister] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const handleSubmit = async () => {
    try {
      if (isRegister) {
        await createUserWithEmailAndPassword(auth, email, password)
        setSuccess("¡Cuenta creada correctamente! Ya puedes iniciar sesión")
        setIsRegister(false)
      } else {
        await signInWithEmailAndPassword(auth, email, password)
      }
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div style={{
      minHeight: "100vh",
      backgroundColor: "#0077b6",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "16px"
    }}>
      <div style={{width: "100%", maxWidth: "400px"}}>

        {/* Logo */}
        <div style={{textAlign: "center", marginBottom: "40px"}}>
          <img src="/icon-512.png" alt="GYMatch" style={{width: "120px", height: "120px", margin: "0 auto 16px", borderRadius: "24px"}}/>
          <p style={{marginTop: "8px", fontSize: "24px", color: "#e0f7ff", fontWeight: "bold"}}>Conecta con tu gimnasio</p>
        </div>

        {/* Card */}
        <div style={{backgroundColor: "#005f99", borderRadius: "24px", padding: "32px", boxShadow: "0 20px 60px rgba(0,0,0,0.3)"}}>
          <h2 style={{fontWeight: "bold", fontSize: "20px", marginBottom: "24px", color: "white"}}>
            {isRegister ? "Crear cuenta" : "Iniciar sesión"}
          </h2>

          <div style={{display: "flex", flexDirection: "column", gap: "16px"}}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                width: "100%",
                backgroundColor: "white",
                color: "#1f2937",
                borderRadius: "16px",
                padding: "16px",
                border: "none",
                outline: "none",
                fontSize: "16px",
                boxSizing: "border-box"
              }}
            />
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: "100%",
                backgroundColor: "white",
                color: "#1f2937",
                borderRadius: "16px",
                padding: "16px",
                border: "none",
                outline: "none",
                fontSize: "16px",
                boxSizing: "border-box"
              }}
            />

            {error && <p style={{color: "#fca5a5", fontSize: "14px", margin: "0"}}>{error}</p>}
            {success && <p style={{color: "#86efac", fontSize: "14px", margin: "0"}}>{success}</p>}

            <button
              onClick={handleSubmit}
              style={{
                width: "100%",
                backgroundColor: "#fda4af",
                color: "#005f99",
                fontWeight: "bold",
                padding: "16px",
                borderRadius: "16px",
                border: "none",
                fontSize: "18px",
                cursor: "pointer"
              }}
            >
              {isRegister ? "Crear cuenta" : "Iniciar sesión"}
            </button>

            <p
              onClick={() => { setIsRegister(!isRegister); setError(""); setSuccess("") }}
              style={{textAlign: "center", cursor: "pointer", fontSize: "14px", color: "#e0f7ff", margin: "0"}}
            >
              {isRegister ? "¿Ya tienes cuenta? Inicia sesión" : "¿No tienes cuenta? Regístrate"}
            </p>
          </div>
        </div>

      </div>
    </div>
  )
}