
import { Link } from 'react-router-dom'
import { rooms } from '../data/rooms'

function Rooms() {
    return (
        <section className="rooms-section">
            <Link to="/" className="back-button">
                ← Wróć na stronę główną
            </Link>

            <p className="eyebrow">WYBIERZ SWOJE WYZWANIE</p>

            <h1 className="rooms-heading">
                Który pokój
                <br />
                <span>wybierzesz?</span>
            </h1>

            <p className="rooms-intro">
                Każde drzwi prowadzą do innej historii.
                Wybierz swoją i sprawdź, czy uda Ci się uciec.
            </p>

            <div className="rooms-grid">
                {rooms.map((room) => (
                    <article className="room-card" key={room.id}>
                        <div className="room-art">
                            <span className="room-number">{room.number}</span>
                            <span className="room-symbol">{room.symbol}</span>
                            <span className="room-art-label">CLASSIFIED FILE</span>
                        </div>

                        <div className="room-content">
                            <p className="room-category">{room.category}</p>
                            <h2>{room.title}</h2>

                            <p className="room-description">
                                {room.description}
                            </p>

                            <div className="room-details">
                                <span>
                                    <span className="detail-label">POZIOM</span>
                                    <strong>{room.difficulty}</strong>
                                </span>

                                <span>
                                    <span className="detail-label">CZAS</span>
                                    <strong>{room.time}</strong>
                                </span>
                            </div>

                            <Link
                                to={`/rooms/${room.id}`}
                                className="room-button"
                            >
                                WYBIERZ POKÓJ <span>↗</span>
                            </Link>
                        </div>
                    </article>
                ))}
            </div>
        </section>
    )
}

export default Rooms
