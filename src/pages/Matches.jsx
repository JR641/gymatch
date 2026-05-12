import Navbar from "../components/Navbar"

const matchesPrueba = [
  { uid: "1", nombre: "Carlos", edad: 25, gimnasio: "McFit", objetivo: "Ganar músculo", foto: "💪" },
  { uid: "2", nombre: "Laura", edad: 23, gimnasio: "McFit", objetivo: "Perder peso", foto: "🏃‍♀️" },
]

export default function Matches() {
  return (
    <div className="min-h-screen p-6 pb-24" style={{backgroundColor: "#0077b6"}}>

      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold" style={{color: "#fda4af"}}>GYMatch</h1>
        <p className="text-sm" style={{color: "#e0f7ff"}}>Tus matches</p>
      </div>

      {matchesPrueba.length === 0 ? (
        <div className="flex items-center justify-center h-64">
          <p className="text-center" style={{color: "#e0f7ff"}}>Aún no tienes matches. ¡Sigue deslizando! 🔥</p>
        </div>
      ) : (
        <div className="space-y-4">
          {matchesPrueba.map((match) => (
            <div
              key={match.uid}
              className="rounded-2xl p-4 flex items-center gap-4"
              style={{backgroundColor: "#005f99"}}
            >
              <div className="w-16 h-16 rounded-full flex items-center justify-center text-3xl" style={{backgroundColor: "#0077b6"}}>
                {match.foto}
              </div>
              <div>
                <h3 className="font-bold text-lg" style={{color: "white"}}>{match.nombre}, {match.edad}</h3>
                <p className="text-sm" style={{color: "#fda4af"}}>{match.gimnasio}</p>
                <p className="text-xs" style={{color: "#e0f7ff"}}>{match.objetivo}</p>
              </div>
              <div className="ml-auto">
                <span className="text-2xl">❤️</span>
              </div>
            </div>
          ))}
        </div>
      )}

      <Navbar />
    </div>
  )
}