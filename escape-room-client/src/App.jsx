
import { useEffect, useState } from 'react'
import { Link, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Rooms from './pages/Rooms'
import RoomDetails from './pages/RoomDetails'
import './App.css'

function App() {
    const [gameInfo, setGameInfo] = useState(null)
    const [error, setError] = useState('')

    useEffect(() => {
        fetch('http://localhost:5162/api/game/info')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Nie udało się pobrać danych gry.')
                }
                return response.json()
            })
            .then(setGameInfo)
            .catch(() => {
                setError(
                    'Nie udało się połączyć z API. Sprawdź adres backendu i czy serwer działa.'
                )
            })
    }, [])

    return (
        <main className="app">
            <nav className="navbar">
                <Link to="/" className="logo logo-button">
                    ESC<span>APE</span>
                </Link>

                <Link to="/rooms" className="nav-label nav-link">
                    MYSTERY ROOMS
                </Link>
            </nav>

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/rooms" element={<Rooms />} />
                <Route path="/rooms/:id" element={<RoomDetails />} />
                <Route
                    path="*"
                    element={
                        <section className="rooms-section">
                            <h1>404 — Nie znaleziono strony</h1>
                            <Link to="/" className="back-button">
                                ← Wróć na stronę główną
                            </Link>
                        </section>
                    }
                />
            </Routes>

            <section className="api-status">
                <span className={`status-dot ${gameInfo ? 'online' : ''}`} />
                {gameInfo
                    ? `API ONLINE — ${gameInfo.name}: ${gameInfo.status}`
                    : error || 'Łączenie z serwerem gry...'}
            </section>
        </main>
    )
}

export default App
