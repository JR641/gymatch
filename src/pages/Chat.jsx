import { useState } from "react"
import Navbar from "../components/Navbar"

const chatsPrueba = [
  {
    uid: "1",
    nombre: "Carlos",
    foto: "💪",
    ultimoMensaje: "¡Hola! ¿Mañana entrenas?",
    hora: "10:30",
    mensajes: [
      { id: 1, texto: "¡Hola! Vi tu perfil y entrenamos en el mismo horario", mio: false },
      { id: 2, texto: "¡Qué tal! Sí, suelo ir por las tardes", mio: true },
      { id: 3, texto: "¿Mañana entrenas?", mio: false },
    ]
  },
  {
    uid: "2",
    nombre: "Laura",
    foto: "🏃‍♀️",
    ultimoMensaje: "¡Perfecto, nos vemos allí!",
    hora: "09:15",
    mensajes: [
      { id: 1, texto: "¡Hola! ¿También vas a McFit?", mio: false },
      { id: 2, texto: "¡Sí! Llevo meses yendo", mio: true },
      { id: 3, texto: "¡Perfecto, nos vemos allí!", mio: false },
    ]
  },
]

export default function Chat() {
  const [chatActivo, setChatActivo] = useState(null)
  const [mensaje, setMensaje] = useState("")

  if (chatActivo) {
    return (
      <div className="min-h-screen flex flex-col" style={{backgroundColor: "#0077b6"}}>

        {/* Header del chat */}
        <div className="p-4 flex items-center gap-3" style={{backgroundColor: "#005f99"}}>
          <button
            onClick={() => setChatActivo(null)}
            className="text-xl font-bold"
            style={{color: "#fda4af"}}
          >
            ←
          </button>
          <div className="w-10 h-10 rounded-full flex items-center justify-center text-xl" style={{backgroundColor: "#0077b6"}}>
            {chatActivo.foto}
          </div>
          <div>
            <h2 className="font-bold text-white">{chatActivo.nombre}</h2>
            <p className="text-xs" style={{color: "#e0f7ff"}}>McFit</p>
          </div>
        </div>

        {/* Mensajes */}
        <div className="flex-1 p-4 space-y-3 overflow-y-auto pb-32">
          {chatActivo.mensajes.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.mio ? "justify-end" : "justify-start"}`}
            >
              <div
                className="max-w-xs px-4 py-2 rounded-2xl text-sm text-white"
                style={{backgroundColor: msg.mio ? "#fda4af" : "#005f99", color: msg.mio ? "#005f99" : "white"}}
              >
                {msg.texto}
              </div>
            </div>
          ))}
        </div>

        {/* Input mensaje */}
        <div className="fixed bottom-0 left-0 right-0 p-4 flex gap-3" style={{backgroundColor: "#005f99"}}>
          <input
            type="text"
            placeholder="Escribe un mensaje..."
            value={mensaje}
            onChange={(e) => setMensaje(e.target.value)}
            className="flex-1 text-gray-800 rounded-full px-4 py-2 outline-none placeholder-gray-400"
            style={{backgroundColor: "white"}}
          />
          <button
            className="w-10 h-10 rounded-full flex items-center justify-center font-bold"
            style={{backgroundColor: "#fda4af", color: "#005f99"}}
          >
            ➤
          </button>
        </div>

      </div>
    )
  }

  return (
    <div className="min-h-screen p-6 pb-24" style={{backgroundColor: "#0077b6"}}>

      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold" style={{color: "#fda4af"}}>GYMatch</h1>
        <p className="text-sm" style={{color: "#e0f7ff"}}>Tus conversaciones</p>
      </div>

      {chatsPrueba.length === 0 ? (
        <div className="flex items-center justify-center h-64">
          <p className="text-center" style={{color: "#e0f7ff"}}>Aún no tienes conversaciones. ¡Consigue matches primero! ❤️</p>
        </div>
      ) : (
        <div className="space-y-3">
          {chatsPrueba.map((chat) => (
            <div
              key={chat.uid}
              onClick={() => setChatActivo(chat)}
              className="rounded-2xl p-4 flex items-center gap-4 cursor-pointer transition"
              style={{backgroundColor: "#005f99"}}
            >
              <div className="w-14 h-14 rounded-full flex items-center justify-center text-3xl" style={{backgroundColor: "#0077b6"}}>
                {chat.foto}
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <h3 style={{color: "white", fontWeight: "bold"}}>{chat.nombre}</h3>
                  <span className="text-xs" style={{color: "#bae6fd"}}>{chat.hora}</span>
                </div>
                <p className="text-sm mt-1" style={{color: "#e0f7ff"}}>{chat.ultimoMensaje}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      <Navbar />
    </div>
  )
}