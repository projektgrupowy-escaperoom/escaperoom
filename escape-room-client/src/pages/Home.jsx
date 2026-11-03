
import { Link } from 'react-router-dom'

function Home() {
    return (
        <section className="hero">
            <p className="eyebrow">TWOJA PRZYGODA ZACZYNA SIĘ TUTAJ</p>

            <h1>
                Każdy pokój
                <br />
                <span>skrywa tajemnicę.</span>
            </h1>

            <p className="description">
                Rozwiązuj zagadki, odkrywaj tajemnice i sprawdź,
                czy uda Ci się uciec z pokoju.
            </p>

            <Link to="/rooms" className="start-button">
                ODKRYJ POKOJE <span>→</span>
            </Link>

            <div className="stats">
                <div>
                    <strong>01</strong>
                    <span>CEL: UCIECZKA</span>
                </div>
                <div>
                    <strong>∞</strong>
                    <span>TAJEMNIC DO ODKRYCIA</span>
                </div>
                <div>
                    <strong>?</strong>
                    <span>CZY ZDOŁASZ UCIEC?</span>
                </div>
            </div>
        </section>
    )
}

export default Home
