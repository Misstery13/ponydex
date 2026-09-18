// ============================================================
// Componente raíz de la aplicación.
//
// Responsabilidades:
//   - Cargar los personajes una sola vez con el hook usePersonajes.
//   - Mostrar "Cargando..." o el error mientras no hay datos.
//   - Cambiar entre las dos pestañas (Ponydex y juego) con un estado.
//
// Los datos se cargan aquí (y no en cada pestaña) para que al cambiar
// de pestaña no se vuelva a llamar a la API.
// ============================================================

import { useState } from 'react'
import { usePersonajes } from './hooks/usePersonajes'
import { Ponydex } from './componentes/Ponydex'
import { JuegoAdivina } from './componentes/JuegoAdivina'
import './App.css'

type Pestana = 'ponydex' | 'juego'

function App() {
  const [pestana, setPestana] = useState<Pestana>('ponydex')
  const { personajes, cargando, error } = usePersonajes()

  return (
    <>
      <header className="cabecera">
        <h1>Ponydex</h1>
        <nav className="pestanas">
          <button
            type="button"
            className={pestana === 'ponydex' ? 'activa' : ''}
            onClick={() => setPestana('ponydex')}
          >
            Personajes
          </button>
          <button
            type="button"
            className={pestana === 'juego' ? 'activa' : ''}
            onClick={() => setPestana('juego')}
          >
            ¿Quién es ese pony?
          </button>
        </nav>
      </header>

      <main>
        {cargando && <p className="estado">Cargando personajes...</p>}
        {error && <p className="estado error">Ups: {error}</p>}
        {!cargando && !error && (
          pestana === 'ponydex'
            ? <Ponydex personajes={personajes} />
            : <JuegoAdivina personajes={personajes} />
        )}
      </main>

      <footer className="pie">
        <p>
          Datos de <a href="https://ponyapi.net" target="_blank" rel="noreferrer">ponyapi.net</a>
        </p>
        <p>Creado por Diana Melena</p>
      </footer>
    </>
  )
}

export default App
