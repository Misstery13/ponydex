// ============================================================
// Ventana de detalle que se abre al hacer clic en una tarjeta.
//
// Muestra la galería de imágenes (con miniaturas para cambiar de foto),
// los datos del personaje y un enlace a la wiki. Se cierra haciendo clic
// fuera, con el botón ✕ o con la tecla Escape.
// ============================================================

import { useEffect, useState } from 'react'
import type { Personaje } from '../tipos'
import { traducirSexo, traducirTipo } from '../traducciones'

interface Props {
  personaje: Personaje
  alCerrar: () => void
}

export function ModalPersonaje({ personaje, alCerrar }: Props) {
  // Índice de la imagen que se está mostrando en grande
  const [indiceImagen, setIndiceImagen] = useState(0)

  // Cerrar con la tecla Escape. El return limpia el listener al desmontar.
  useEffect(() => {
    const alPresionarTecla = (e: KeyboardEvent) => {
      if (e.key === 'Escape') alCerrar()
    }
    window.addEventListener('keydown', alPresionarTecla)
    return () => window.removeEventListener('keydown', alPresionarTecla)
  }, [alCerrar])

  return (
    <div className="modal-fondo" onClick={alCerrar}>
      {/* stopPropagation evita que un clic DENTRO del modal llegue al fondo y lo cierre */}
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="modal-cerrar" onClick={alCerrar} aria-label="Cerrar">
          ✕
        </button>

        <div className="modal-galeria">
          <img
            src={personaje.image[indiceImagen]}
            alt={personaje.name}
            onError={(e) => {
              e.currentTarget.src = `${import.meta.env.BASE_URL}placeholder.svg`
            }}
          />
          {/* Solo mostramos miniaturas si hay más de una imagen */}
          {personaje.image.length > 1 && (
            <div className="miniaturas">
              {personaje.image.map((src, i) => (
                <button
                  key={src}
                  type="button"
                  className={i === indiceImagen ? 'miniatura activa' : 'miniatura'}
                  onClick={() => setIndiceImagen(i)}
                >
                  <img src={src} alt="" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="modal-info">
          <span className="tarjeta-id">#{String(personaje.id).padStart(3, '0')}</span>
          <h2>{personaje.name}</h2>
          {personaje.alias && <p className="alias">{personaje.alias}</p>}

          <div className="etiquetas">
            {personaje.kind.map((tipo) => (
              <span key={tipo} className={`etiqueta etiqueta-${tipo.toLowerCase()}`}>
                {traducirTipo(tipo)}
              </span>
            ))}
          </div>

          {/* Cada dato es opcional en la API, por eso el && antes de mostrarlo */}
          <dl>
            {personaje.sex && (
              <>
                <dt>Sexo</dt>
                <dd>{traducirSexo(personaje.sex)}</dd>
              </>
            )}
            {personaje.residence && (
              <>
                <dt>Residencia</dt>
                <dd>{personaje.residence}</dd>
              </>
            )}
            {personaje.occupation && (
              <>
                <dt>Ocupación</dt>
                <dd>{personaje.occupation}</dd>
              </>
            )}
          </dl>

          <a href={personaje.url} target="_blank" rel="noreferrer" className="enlace-wiki">
            Ver en la wiki ↗
          </a>
        </div>
      </div>
    </div>
  )
}
