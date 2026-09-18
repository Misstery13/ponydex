// ============================================================
// Pantalla principal: buscador + filtro por tipo + cuadrícula.
//
// Recibe la lista completa de personajes y se encarga de filtrarla
// según lo que el usuario escribe y el tipo que elige. Todo el filtrado
// se hace en memoria (sin volver a llamar a la API) porque ya tenemos
// todos los datos cargados.
// ============================================================

import { useMemo, useState } from 'react'
import type { Personaje } from '../tipos'
import { traducirTipo } from '../traducciones'
import { TarjetaPersonaje } from './TarjetaPersonaje'
import { ModalPersonaje } from './ModalPersonaje'

interface Props {
  personajes: Personaje[]
}

const TODOS = 'Todos'

export function Ponydex({ personajes }: Props) {
  const [busqueda, setBusqueda] = useState('')
  const [tipo, setTipo] = useState(TODOS)
  // Personaje abierto en el modal (null = modal cerrado)
  const [seleccionado, setSeleccionado] = useState<Personaje | null>(null)

  // Lista de tipos para el <select>, ordenada de más a menos personajes.
  // useMemo evita recalcularla en cada render: solo cambia si cambian los personajes.
  const tipos = useMemo(() => {
    const conteo = new Map<string, number>()
    for (const p of personajes) {
      for (const t of p.kind) conteo.set(t, (conteo.get(t) ?? 0) + 1)
    }
    return [...conteo.entries()]
      .sort((a, b) => b[1] - a[1])
      .map(([t]) => t)
  }, [personajes])

  // Aplica el buscador y el filtro por tipo al mismo tiempo
  const filtrados = useMemo(() => {
    const termino = busqueda.trim().toLowerCase()
    return personajes.filter((p) => {
      const coincideNombre = p.name.toLowerCase().includes(termino)
      const coincideTipo = tipo === TODOS || p.kind.includes(tipo)
      return coincideNombre && coincideTipo
    })
  }, [personajes, busqueda, tipo])

  return (
    <section>
      <div className="barra-herramientas">
        <input
          type="search"
          placeholder="Buscar pony..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
        <select value={tipo} onChange={(e) => setTipo(e.target.value)}>
          <option value={TODOS}>{TODOS}</option>
          {tipos.map((t) => (
            // El value queda en inglés (es lo que comparamos con la API),
            // el texto visible va traducido.
            <option key={t} value={t}>
              {traducirTipo(t)}
            </option>
          ))}
        </select>
        <span className="contador">{filtrados.length} personajes</span>
      </div>

      {filtrados.length === 0 ? (
        <p className="vacio">No se encontró ningún personaje</p>
      ) : (
        <div className="cuadricula">
          {filtrados.map((p) => (
            <TarjetaPersonaje key={p.id} personaje={p} alSeleccionar={setSeleccionado} />
          ))}
        </div>
      )}

      {seleccionado && (
        <ModalPersonaje personaje={seleccionado} alCerrar={() => setSeleccionado(null)} />
      )}
    </section>
  )
}
