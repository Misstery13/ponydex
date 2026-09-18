// ============================================================
// Tipos de TypeScript para los datos de la API.
//
// Los nombres de los campos (name, kind, image...) están en inglés
// porque así los devuelve https://ponyapi.net y no los podemos cambiar.
// Todo lo demás en el proyecto (componentes, variables, funciones)
// lo escribimos en español.
// ============================================================

// Un personaje tal como lo devuelve /v1/character
export interface Personaje {
  id: number
  name: string
  alias?: string
  url: string
  sex?: string
  residence?: string
  occupation?: string
  kind: string[] // tipos: Earth, Pegasus, Unicorn...
  image: string[] // lista de URLs de imágenes
}

// Todas las respuestas de la API vienen envueltas así: { status, data }
export interface RespuestaApi<T> {
  status: number
  data: T
}
