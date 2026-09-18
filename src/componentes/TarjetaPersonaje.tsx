// ============================================================
// Tarjeta pequeña de un personaje (la que se ve en la cuadrícula).
//
// Es un componente "tonto": solo recibe datos por props y avisa al
// padre cuando le hacen clic. No guarda estado propio.
// ============================================================

import type { Personaje } from '../tipos'
import { traducirTipo } from '../traducciones'

interface Props {
  personaje: Personaje
  alSeleccionar: (personaje: Personaje) => void
}

export function TarjetaPersonaje({ personaje, alSeleccionar }: Props) {
  return (
    <button type="button" className="tarjeta" onClick={() => alSeleccionar(personaje)}>
      <img
        src={personaje.image[0]}
        alt={personaje.name}
        loading="lazy" // el navegador solo descarga la imagen cuando está por verse
        onError={(e) => {
          // Si la imagen de la wiki falla, mostramos un placeholder local
          e.currentTarget.src = `${import.meta.env.BASE_URL}placeholder.svg`
        }}
      />
      <h3>{personaje.name}</h3>
      {/* padStart rellena con ceros: 6 -> "006", estilo Pokédex */}
      <span className="tarjeta-id">#{String(personaje.id).padStart(3, '0')}</span>
      <div className="etiquetas">
        {personaje.kind.map((tipo) => (
          // La clase usa la clave en inglés (etiqueta-earth) para asignar el color,
          // pero el texto que se muestra va traducido.
          <span key={tipo} className={`etiqueta etiqueta-${tipo.toLowerCase()}`}>
            {traducirTipo(tipo)}
          </span>
        ))}
      </div>
    </button>
  )
}
