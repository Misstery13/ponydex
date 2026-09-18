// ============================================================
// Hook personalizado para cargar los personajes.
//
// Encapsula el patrón típico de "pedir datos a una API":
//   - useEffect para lanzar la petición una sola vez al montar
//   - tres estados: datos, cargando y error
//
// Así App.tsx solo hace `const { personajes, cargando, error } = usePersonajes()`
// y no se preocupa por promesas ni por limpiar efectos.
// ============================================================

import { useEffect, useState } from 'react'
import { obtenerPersonajes } from '../api'
import type { Personaje } from '../tipos'

export function usePersonajes() {
  const [personajes, setPersonajes] = useState<Personaje[]>([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Bandera para ignorar la respuesta si el componente se desmonta
    // antes de que termine el fetch (evita un warning de React).
    let cancelado = false

    obtenerPersonajes()
      .then((datos) => {
        if (!cancelado) setPersonajes(datos)
      })
      .catch((err: Error) => {
        if (!cancelado) setError(err.message)
      })
      .finally(() => {
        if (!cancelado) setCargando(false)
      })

    return () => {
      cancelado = true
    }
  }, []) // [] = solo se ejecuta una vez

  return { personajes, cargando, error }
}
