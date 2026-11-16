
import { Link, useParams } from 'react-router-dom'
import { rooms } from '../data/rooms'

function RoomDetails() {
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
            <Link to="/rooms" className="back-button">
                ← Wróć do listy pokoi
            </Link>

            <div className="selected-room">
                <p className="eyebrow">
                    KARTA ROZGRYWKI • {room.number}
                </p>

                <div className="selected-symbol">{room.symbol}</div>

                <h1>{room.title}</h1>

                <p className="rooms-intro">{room.description}</p>

                <div className="selected-details">
                    <div>
                        <span className="detail-label">POZIOM TRUDNOŚCI</span>
                        <strong>{room.difficulty}</strong>
                    </div>

                    <div>
                        <span className="detail-label">LIMIT CZASU</span>
                        <strong>{room.time}</strong>
                    </div>
                </div>

                <div className="room-story">
                    <p className="eyebrow">TWOJA MISJA</p>

                    <h2>Poznaj historię</h2>

                    {room.story.split('\n\n').map((paragraph, index) => (
                        <p key={index} className="room-story-text">
                            {paragraph}
                        </p>
                    ))}
                </div>

                <div className="start-game-section">
                    <h2>GOTOWY NA WYZWANIE?</h2>

                    <p>
                        Przygotuj się, skup uwagę i sprawdź,
                        czy uda Ci się rozwiązać wszystkie zagadki.
                    </p>

                    <Link
                        to={`/game/${room.id}`}
                        className="start-game-button"
                    >
                        ZACZNIJ GRĘ <span>→</span>
                    </Link>

                    <span className="start-game-note">
                        CZAS ROZGRYWKI: {room.time.toUpperCase()}
                    </span>
                </div>
            </div>
        </section>
    )
}

export default RoomDetails
