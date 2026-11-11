
import { useEffect, useState } from 'react'
import { Link, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Rooms from './pages/Rooms'
import RoomDetails from './pages/RoomDetails'
import Register from './pages/Register' // EPIC 1 US-01 TASK-02: Utworzenie formularza rejestracji -> import strony rejestracji
import Login from './pages/Login'
import './App.css'

function App() {
    const [gameInfo, setGameInfo] = useState(null)
    const [error, setError] = useState('')

    // EPIC 1 US-01 TASK-07: Stan zalogowanego użytkownika
    const [user, setUser] = useState(null)
    const [checkingSession, setCheckingSession] = useState(true)

    // EPIC 1 US-01 TASK-07: Sprawdzanie sesji
    async function checkSession() {
        try {
            const response = await fetch('/api/auth/me', {
                credentials: 'include'
            })

            if (response.ok) {
                const data = await response.json()
                setUser(data)
            } else {
                setUser(null)
            }
        } catch {
            setUser(null)
        } finally {
            setCheckingSession(false)
        }
    }

    useEffect(() => {
        // EPIC 1 US-01 TASK-07: Odczyt sesji po odświeżeniu
        checkSession()

        const handleAuthChange = () => checkSession()

        window.addEventListener('auth-changed', handleAuthChange)

        return () => {
            window.removeEventListener('auth-changed', handleAuthChange)
        }
    }, [])

    // EPIC 1 US-01 TASK-07: Wylogowanie użytkownika
    async function logout() {
        try {
            const response = await fetch('/api/auth/logout', {
                method: 'POST',
                credentials: 'include'
            })

            if (response.ok) {
                setUser(null)
            } else {
                alert('Nie udało się wylogować.')
            }
        } catch {
            alert('Brak połączenia z serwerem.')
        }
    }

    useEffect(() => {
        fetch('/api/game/info')
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

                <div style={{ display: 'flex', gap: 28 }}>
                    <Link to="/rooms" className="nav-label nav-link">
                        MYSTERY ROOMS
                    </Link>

                    {/* EPIC 1 US-01 TASK-07: Menu zależne od sesji */}
                    {!checkingSession && (
                        user ? (
                            <>
                                <span className="nav-label">
                                    WITAJ, {user.username}
                                </span>

                                <button
                                    type="button"
                                    className="nav-label nav-link"
                                    onClick={logout}
                                    style={{
                                        background: 'none',
                                        border: 'none',
                                        cursor: 'pointer',
                                        font: 'inherit',
                                        color: 'inherit'
                                    }}
                                >
                                    WYLOGUJ SIĘ
                                </button>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="nav-label nav-link">
                                    ZALOGUJ SIĘ
                                </Link>

                                {/* EPIC 1 US-01 TASK-02: Utworzenie formularza rejestracji -> link w menu */}
                                <Link to="/register" className="nav-label nav-link">
                                    ZAŁÓŻ KONTO
                                </Link>
                            </>
                        )
                    )}
                </div>
            </nav>

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/rooms" element={<Rooms />} />
                <Route path="/rooms/:id" element={<RoomDetails />} />
                {/* EPIC 1 US-01 TASK-02: Utworzenie formularza rejestracji -> adres strony */}
                <Route path="/register" element={<Register />} />
                {/* EPIC 1 US-01 TASK-05: Utworzenie formularza logowania -> adres strony */}
                <Route path="/login" element={<Login />} />
                <Route
                    path="*"
                    element={
                        <section className="rooms-section">
                            <h1>404 - Nie znaleziono strony</h1>
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
                    ? `API ONLINE - ${gameInfo.name}: ${gameInfo.status}`
                    : error || 'Łączenie z serwerem gry...'}
            </section>
        </main>
    )
}

export default App
