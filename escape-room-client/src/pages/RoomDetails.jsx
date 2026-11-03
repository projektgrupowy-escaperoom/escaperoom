
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

                <p className="coming-soon">
                    SYSTEM ROZGRYWKI — W PRZYGOTOWANIU
                </p>
            </div>
        </section>
    )
}

export default RoomDetails
