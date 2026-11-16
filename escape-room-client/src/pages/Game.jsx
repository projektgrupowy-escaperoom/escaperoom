
// TASK-04: Utworzenie interfejsu rozpoczynania gry -> stan ekranu startowego
import { useState } from 'react'
// EPIC 2 TASK 03: Utworzenie mechanizmu rozpoczynania gry -> useSearchParams do odczytu sesji z adresu
import { Link, useParams, useSearchParams } from 'react-router-dom'
import { rooms } from '../data/rooms'

function Game() {
    const { id } = useParams()
    // EPIC 2 TASK 03: Utworzenie mechanizmu rozpoczynania gry -> identyfikator sesji utworzonej przyciskiem „Zacznij grę”
    const [searchParams] = useSearchParams()
    const sessionId = searchParams.get('session')
    // TASK-04: Utworzenie interfejsu rozpoczynania gry -> przed kliknięciem START tło jest przyciemnione
    const [started, setStarted] = useState(false)
    const room = rooms.find((item) => item.id === Number(id))

    if (!room) {
        return (
            <section className="rooms-section">
                <h1>Nie znaleziono pokoju</h1>
                <Link to="/rooms" className="back-button">
                    ← Wróć do listy pokoi
                </Link>
            </section>
        )
    }

    // EPIC 2 TASK 03: Utworzenie mechanizmu rozpoczynania gry -> rozgrywka z aktywną sesją zajmuje całe okno karty
    if (sessionId && room.gameImage) {
        return (
            <section className="game-fullscreen">
                <div className="game-main-frame">
                    <img
                        src={room.gameImage}
                        alt="Komnata faraona"
                        className="game-main-image"
                    />

                    {/* EPIC 2 TASK 03: Utworzenie mechanizmu rozpoczynania gry -> animowany ogień na pochodniach */}
                    <span className="torch-fire torch-fire-left" aria-hidden="true">
                        <span className="torch-glow" />
                        <span className="torch-flame" />
                        <span className="torch-flame torch-flame-inner" />
                    </span>

                    <span className="torch-fire torch-fire-right" aria-hidden="true">
                        <span className="torch-glow" />
                        <span className="torch-flame" />
                        <span className="torch-flame torch-flame-inner" />
                    </span>
                </div>

                {/* TASK-04: Utworzenie interfejsu rozpoczynania gry -> przyciemnione tło i przycisk START na środku; kliknięcie tylko je ukrywa (logika rozgrywki do zaimplementowania) */}
                {!started && (
                    <div className="game-start-overlay">
                        <button
                            type="button"
                            className="game-start-button"
                            onClick={() => setStarted(true)}
                        >
                            START
                        </button>
                    </div>
                )}

                <p className="game-session-id">
                    {room.title.toUpperCase()} • SESJA GRY • {sessionId}
                </p>
            </section>
        )
    }

    return (
        <section className="rooms-section">
            <Link to={`/rooms/${room.id}`} className="back-button">
                ← Wróć do opisu pokoju
            </Link>

            <div className="selected-room">
                <p className="eyebrow">
                    ROZGRYWKA • POKÓJ {room.number}
                </p>

                <div className="selected-symbol">{room.symbol}</div>

                <h1>{room.title}</h1>

                <p className="rooms-intro">
                    Przygotuj się na wyzwanie. Twoim zadaniem będzie
                    rozwiązanie zagadek i znalezienie drogi do wyjścia.
                </p>

                <div className="room-story">
                    <h2>Twoja przygoda zaczyna się tutaj.</h2>

                    <p className="room-story-text">
                        Wybrany pokój: {room.title}
                    </p>

                    <p className="coming-soon">
                        SYSTEM ZAGADEK — W PRZYGOTOWANIU
                    </p>
                </div>

                <Link to="/rooms" className="back-button">
                    Wybierz inny pokój
                </Link>
            </div>
        </section>
    )
}

export default Game
