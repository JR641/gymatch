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
    <div className="min-h-screen flex items-center justify-center p-4" style={{backgroundColor: "#0077b6"}}>
      <div className="w-full max-w-md">

        {/* Logo */}
        <div className="text-center mb-10">
          <div className="text-6xl mb-4">🏋️</div>
          <h1 className="text-5xl font-black" style={{color: "#fda4af"}}>GYMatch</h1>
          <p className="mt-3 text-lg" style={{color: "#e0f7ff"}}>Conecta con tu gimnasio</p>
        </div>

        {/* Card */}
        <div className="rounded-3xl p-8 shadow-2xl" style={{backgroundColor: "#005f99"}}>
          <h2 className="font-bold text-xl mb-6 text-white">
            {isRegister ? "Crear cuenta" : "Iniciar sesión"}
          </h2>

          <div className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full text-gray-800 rounded-2xl p-4 outline-none placeholder-gray-400"
              style={{backgroundColor: "white"}}
            />
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full text-gray-800 rounded-2xl p-4 outline-none placeholder-gray-400"
              style={{backgroundColor: "white"}}
            />
            

            {error && <p className="text-red-300 text-sm">{error}</p>}
            {success && <p className="text-green-300 text-sm">{success}</p>}

            <button
              onClick={handleSubmit}
              className="w-full font-bold py-4 rounded-2xl transition text-lg"
              style={{backgroundColor: "#fda4af", color: "#005f99"}}
            >
              {isRegister ? "Crear cuenta" : "Iniciar sesión"}
            </button>

            <p
              onClick={() => { setIsRegister(!isRegister); setError(""); setSuccess("") }}
              className="text-center cursor-pointer transition text-sm"
              style={{color: "#e0f7ff"}}
            >
              {isRegister ? "¿Ya tienes cuenta? Inicia sesión" : "¿No tienes cuenta? Regístrate"}
            </p>
          </div>
        </div>

      </div>
    </div>
  )
}