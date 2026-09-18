// ============================================================
// Mini-juego "¿Quién es ese pony?".
//
// Cómo funciona:
//   1. Se elige un personaje al azar y 3 "distractores" distintos.
//   2. Se muestra solo un recorte de su imagen (zoom a un punto aleatorio).
//   3. Al elegir una opción se revela la imagen completa y se marca en
//      verde la correcta / en rojo la elegida si falló.
//   4. "Siguiente" genera una ronda nueva. Puntos y racha se acumulan.
//
// Toda la lógica del juego vive aquí; los personajes llegan por props
// desde App (son los mismos datos que usa la Ponydex).
// ============================================================

import { useMemo, useState } from 'react'
import type { Personaje } from '../tipos'

interface Props {
  personajes: Personaje[]
}

// Una ronda del juego
interface Ronda {
  respuesta: Personaje
  opciones: Personaje[]
  // Punto de la imagen (en %) al que se hace zoom para ocultar al personaje
  foco: { x: number; y: number }
}

// Usamos solo los primeros N ids: la API los ordena por relevancia,
// así que son los personajes más reconocibles. Si el juego se siente
// muy fácil o muy difícil, cambia este número.
const TAMANO_POOL = 120

function elementoAleatorio<T>(lista: T[]): T {
  return lista[Math.floor(Math.random() * lista.length)]
}

function mezclar<T>(lista: T[]): T[] {
  return [...lista].sort(() => Math.random() - 0.5)
}

function numeroEntre(min: number, max: number): number {
  return min + Math.random() * (max - min)
}

// Genera una ronda: un personaje correcto + 3 distractores distintos.
// Usamos un Set para garantizar que no se repitan opciones.
function crearRonda(pool: Personaje[]): Ronda {
  const respuesta = elementoAleatorio(pool)
  const opciones = new Set<Personaje>([respuesta])
  while (opciones.size < 4) {
    opciones.add(elementoAleatorio(pool))
  }
  return {
    respuesta,
    opciones: mezclar([...opciones]),
    // Evitamos las orillas (25%-75%) para que el recorte casi siempre
    // caiga sobre el personaje y no sobre el fondo.
    foco: { x: numeroEntre(25, 75), y: numeroEntre(25, 75) },
  }
}

export function JuegoAdivina({ personajes }: Props) {
  // Quitamos los "Human" (versiones de Equestria Girls) porque confunden
  const pool = useMemo(
    () => personajes.filter((p) => !p.kind.includes('Human')).slice(0, TAMANO_POOL),
    [personajes],
  )

  // useState con función: la ronda inicial se calcula una sola vez
  const [ronda, setRonda] = useState<Ronda>(() => crearRonda(pool))
  const [elegido, setElegido] = useState<Personaje | null>(null)
  const [puntos, setPuntos] = useState(0)
  const [jugadas, setJugadas] = useState(0)
  const [racha, setRacha] = useState(0)

  const revelado = elegido !== null
  const acerto = elegido?.id === ronda.respuesta.id

  function elegir(opcion: Personaje) {
    if (revelado) return // ya respondió esta ronda, ignoramos más clics
    setElegido(opcion)
    setJugadas((n) => n + 1)
    if (opcion.id === ronda.respuesta.id) {
      setPuntos((n) => n + 1)
      setRacha((n) => n + 1)
    } else {
      setRacha(0)
    }
  }

  function siguiente() {
    setRonda(crearRonda(pool))
    setElegido(null)
  }

  return (
    <section className="juego">
      <div className="marcador">
        <span>Puntos: <strong>{puntos}</strong> / {jugadas}</span>
        <span>Racha: <strong>{racha}</strong></span>
      </div>

      <h2>¿Quién es ese pony?</h2>

      {/* La clase "revelado" quita el zoom vía CSS con una transición */}
      <div className={revelado ? 'juego-imagen revelado' : 'juego-imagen'}>
        <div className="juego-marco">
          <img
            src={ronda.respuesta.image[0]}
            alt="Personaje misterioso"
            style={{ transformOrigin: `${ronda.foco.x}% ${ronda.foco.y}%` }}
          />
        </div>
      </div>

      <div className="opciones">
        {ronda.opciones.map((opcion) => {
          // Calculamos la clase según el estado: correcta / incorrecta / normal
          let clase = 'opcion'
          if (revelado) {
            if (opcion.id === ronda.respuesta.id) clase += ' correcta'
            else if (opcion.id === elegido?.id) clase += ' incorrecta'
          }
          return (
            <button
              key={opcion.id}
              type="button"
              className={clase}
              onClick={() => elegir(opcion)}
              disabled={revelado}
            >
              {opcion.name}
            </button>
          )
        })}
      </div>

      {revelado && (
        <div className="resultado">
          <p>{acerto ? '¡Correcto!' : `Era ${ronda.respuesta.name}`}</p>
          <button type="button" className="boton-principal" onClick={siguiente}>
            Siguiente →
          </button>
        </div>
      )}
    </section>
  )
}
