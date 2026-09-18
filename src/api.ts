// ============================================================
// Capa de acceso a la API.
//
// Aquí está la única llamada `fetch` del proyecto. Separarla en su
// propio archivo hace que los componentes no sepan nada de URLs ni
// de cómo viene la respuesta; solo reciben un arreglo de Personaje.
// ============================================================

import type { Personaje, RespuestaApi } from './tipos'

const URL_BASE = 'https://ponyapi.net/v1'

// Trae todos los personajes de una sola vez (la API tiene ~555).
// Como son pocos datos, es más simple cargarlos todos al inicio y
// filtrar en el navegador que hacer una petición por cada búsqueda.
export async function obtenerPersonajes(): Promise<Personaje[]> {
  const respuesta = await fetch(`${URL_BASE}/character/all?limit=1000`)
  if (!respuesta.ok) {
    throw new Error(`Error ${respuesta.status} al consultar la API`)
  }
  const json: RespuestaApi<Personaje[]> = await respuesta.json()

  return (
    json.data
      // Algunos personajes vienen sin `kind` o sin `image`. Si no los
      // normalizamos, la app se rompe al hacer `.map` sobre undefined.
      .map((p) => ({ ...p, kind: p.kind ?? [], image: p.image ?? [] }))
      // Nos quedamos solo con los que tienen al menos una imagen
      .filter((p) => p.image.length > 0)
  )
}
