
import { Link, useParams } from 'react-router-dom'
import { rooms } from '../data/rooms'

function Game() {
    const { id } = useParams()
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
