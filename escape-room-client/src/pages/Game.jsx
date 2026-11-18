
// TASK-04: Utworzenie interfejsu rozpoczynania gry -> stan ekranu startowego
import { useState } from 'react'

// EPIC 2 TASK 03: Utworzenie mechanizmu rozpoczynania gry -> useSearchParams do odczytu sesji
import { Link, useParams, useSearchParams } from 'react-router-dom'
import { rooms } from '../data/rooms'
import '../styles/game.css'

function Game() {
    const { id } = useParams()

    // EPIC 2 TASK 03: Utworzenie mechanizmu rozpoczynania gry -> identyfikator sesji utworzonej przyciskiem „Zacznij grę”
    const [searchParams] = useSearchParams()
    const sessionId = searchParams.get('session')

    // TASK-04: Utworzenie interfejsu rozpoczynania gry -> przed kliknięciem START tło jest przyciemnione
    const [started, setStarted] = useState(false)

    // TASK-05: Utworzenie widoku zagadki -> zarządzanie otwartymi oknami interfejsu
    const [activePanel, setActivePanel] = useState(null)

    // TASK-05: Utworzenie widoku zagadki -> zapamiętanie odnalezionych obiektów
    const [foundObjects, setFoundObjects] = useState([])

    const [scrollAnswer, setScrollAnswer] = useState('')
    const [scrollFeedback, setScrollFeedback] = useState('')
    const [scrollSolved, setScrollSolved] = useState(false)

    const [anubisUnlocked, setAnubisUnlocked] = useState(false)
    const [tabletViewed, setTabletViewed] = useState(false)
    const [hieroglyphsViewed, setHieroglyphsViewed] = useState(false)

    const [sarcophagusAnswer, setSarcophagusAnswer] = useState('')
    const [sarcophagusFeedback, setSarcophagusFeedback] = useState('')
    const [sarcophagusOpened, setSarcophagusOpened] = useState(false)

    const [hieroglyphsSolved, setHieroglyphsSolved] = useState(false)
    const [hieroglyphAnswer, setHieroglyphAnswer] = useState('')
    const [hieroglyphFeedback, setHieroglyphFeedback] = useState('')

    const [gateOpened, setGateOpened] = useState(false)

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

    // TASK-05: Utworzenie widoku zagadki -> otwieranie wybranego okna
    const openPanel = (panel) => {
        setActivePanel(panel)
    }

    // TASK-05: Utworzenie widoku zagadki -> zamykanie aktualnego okna
    const closePanel = () => {
        setActivePanel(null)
    }

    // TASK-05: Utworzenie widoku zagadki -> zapamiętanie odnalezienia zwoju
    const discoverScroll = () => {
        setFoundObjects((previous) => {
            if (previous.includes('scroll')) {
                return previous
            }

            return [...previous, 'scroll']
        })

        openPanel('scroll')
    }

    const checkScrollAnswer = () => {
        if (scrollAnswer.trim().toLowerCase() === 'anubis') {
            setScrollSolved(true)
            setAnubisUnlocked(true)
            setScrollFeedback('Wypowiedziane imię odbiło się echem od kamiennych ścian. W półmroku coś drgnęło, jakby strażnik grobowca usłyszał swoje wezwanie.')
        } else {
            setScrollFeedback('To nie jest poprawna odpowiedź. Spróbuj ponownie.')
        }
    }

    const discoverAnubis = () => {
        setTabletViewed(true)
        openPanel('tablet')
    }

    const discoverHieroglyphs = () => {
        setHieroglyphsViewed(true)
        openPanel('hieroglyphs')
    }

    const checkHieroglyphAnswer = () => {
        if (hieroglyphAnswer.trim().toLowerCase() === 'horus') {
            setHieroglyphsSolved(true)
            setHieroglyphFeedback('Poprawnie! Wiadomość wskazuje na oko Horusa.')
        } else {
            setHieroglyphFeedback('To nie jest poprawna odpowiedź. Spróbuj ponownie.')
        }
    }

    const discoverSarcophagus = () => {
        setSarcophagusAnswer('')
        setSarcophagusFeedback('')
        openPanel('sarcophagus')
    }

    const checkSarcophagusAnswer = () => {
        if (sarcophagusAnswer.trim().toUpperCase() === 'HORUS') {
            setSarcophagusOpened(true)
            setSarcophagusFeedback('Kamienne wieko zaczyna drżeć. Po chwili rozlega się głuchy trzask, a przed Tobą ukazuje się zawartość sarkofagu.')
        } else {
            setSarcophagusFeedback('Zamek pozostaje nieruchomy. To nie jest właściwe hasło.')
        }
    }

    const discoverGate = () => {
        openPanel('gate')
    }

    const openGate = () => {
        setGateOpened(true)
    }

    // EPIC 2 TASK 03: Utworzenie mechanizmu rozpoczynania gry -> rozgrywka z aktywną sesją zajmuje całe okno karty
    if (sessionId && room.gameImage) {
        return (
            <section className="game-fullscreen">
                <div className="game-main-frame">

                    <img
                        src={gateOpened ? "/images/pharaoh-chamber-open.png" : room.gameImage}
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

                    {/* TASK-05: Utworzenie widoku zagadki -> interfejs dostępny po rozpoczęciu gry */}
                    {started && (
                        <div className="game-ui">

                            {/* TASK-05: Utworzenie widoku zagadki -> przycisk otwierania zadań */}
                            <button
                                type="button"
                                className="game-ui-button game-tasks-button"
                                title="Zadania"
                                aria-label="Otwórz zadania"
                                onClick={() => openPanel('tasks')}
                            >
                                ☷
                            </button>

                            {/* TASK-05: Utworzenie widoku zagadki -> przycisk otwierania dziennika */}
                            <button
                                type="button"
                                className="game-ui-button game-journal-button"
                                title="Dziennik"
                                aria-label="Otwórz dziennik"
                                onClick={() => openPanel('journal')}
                            >
                                📜
                            </button>

                            {/* TASK-05: Utworzenie widoku zagadki -> przycisk otwierania ekwipunku */}
                            <button
                                type="button"
                                className="game-ui-button game-inventory-button"
                                title="Ekwipunek"
                                aria-label="Otwórz ekwipunek"
                                onClick={() => openPanel('inventory')}
                            >
                                🎒
                                {foundObjects.length > 0 && (
                                    <span className="inventory-count">
                                        {foundObjects.length}
                                    </span>
                                )}
                            </button>

                            <button
                                type="button"
                                className="game-interactive-object game-scroll-object"
                                title="Zbadaj zwój"
                                aria-label="Zbadaj zwój"
                                onClick={discoverScroll}
                            />

                            {anubisUnlocked && (
                                <button
                                    type="button"
                                    className="game-interactive-object game-anubis-object"
                                    title="Zbadaj posąg Anubisa"
                                    aria-label="Zbadaj posąg Anubisa"
                                    onClick={() => openPanel('anubis')}
                                />
                            )}

                            {anubisUnlocked && (
                                <button
                                    type="button"
                                    className="game-interactive-object game-hieroglyphs-object"
                                    title="Zbadaj hieroglify"
                                    aria-label="Zbadaj hieroglify"
                                    onClick={() => openPanel('hieroglyphs')}
                                />
                            )}

                            {scrollSolved && (
                                <button
                                    type="button"
                                    className="game-interactive-object game-sarcophagus-object"
                                    title="Zbadaj sarkofag"
                                    aria-label="Zbadaj sarkofag"
                                    onClick={discoverSarcophagus}
                                />
                            )}

                            {sarcophagusOpened && (
                                <button
                                    type="button"
                                    className="game-interactive-object game-gate-object"
                                    title="Zbadaj bramę"
                                    aria-label="Zbadaj bramę"
                                    onClick={discoverGate}
                                />
                            )}

                            {/* TASK-05: Utworzenie widoku zagadki -> otwierane okna interfejsu */}
                            {activePanel && (
                                <div
                                    className="game-panel-overlay"
                                    onClick={closePanel}
                                >
                                    <div
                                        className="game-panel"
                                        onClick={(event) => event.stopPropagation()}
                                    >

                                        {/* TASK-05: Utworzenie widoku zagadki -> przycisk zamykania okna */}
                                        <button
                                            type="button"
                                            className="game-panel-close"
                                            onClick={closePanel}
                                            aria-label="Zamknij okno"
                                        >
                                            ×
                                        </button>

                                        {/* TASK-05: Utworzenie widoku zagadki -> zawartość ekwipunku */}
                                        {activePanel === 'inventory' && (
                                            <>
                                                <h2>Ekwipunek</h2>

                                                <p>
                                                    Przedmioty odnalezione w komnacie:
                                                </p>

                                                {foundObjects.length === 0 ? (
                                                    <p className="game-empty-message">
                                                        Twój ekwipunek jest pusty.
                                                    </p>
                                                ) : (
                                                    <div className="game-inventory-list">
                                                        {foundObjects.map((item) => (
                                                            <div
                                                                className="game-inventory-item"
                                                                key={item}
                                                            >
                                                                {item === 'scroll'
                                                                    ? '📜 Stary zwój'
                                                                    : item}
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}
                                            </>
                                        )}

                                        {/* TASK-05: Utworzenie widoku zagadki -> zawartość listy zadań */}
                                        {activePanel === 'tasks' && (
                                            <>
                                                <h2>Twoje zadania</h2>

                                                <div className="game-task-item">
                                                    <span>
                                                        {foundObjects.includes('scroll')
                                                            ? '✓'
                                                            : '○'}
                                                    </span>

                                                    <div>
                                                        <strong>
                                                            Odnalezienie zwoju
                                                        </strong>

                                                        <p>
                                                            {foundObjects.includes('scroll')
                                                                ? 'Zwój został odnaleziony'
                                                                : 'Odnajdź zwój w komnacie'}
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="game-task-item">
                                                    <span>🔒</span>

                                                    <div>
                                                        <strong>
                                                            Odczytanie hieroglifów
                                                        </strong>
                                                        <p>Zadanie jeszcze niedostępne</p>
                                                    </div>
                                                </div>

                                                <div className="game-task-item">
                                                    <span>🔒</span>

                                                    <div>
                                                        <strong>
                                                            Otwarcie sarkofagu
                                                        </strong>
                                                        <p>Zadanie zablokowane</p>
                                                    </div>
                                                </div>

                                                <div className="game-task-item">
                                                    <span>🔒</span>

                                                    <div>
                                                        <strong>
                                                            Zdobycie trzech kluczy
                                                        </strong>
                                                        <p>Zadanie zablokowane</p>
                                                    </div>
                                                </div>

                                                <div className="game-task-item">
                                                    <span>🔒</span>

                                                    <div>
                                                        <strong>
                                                            Otwarcie przejścia
                                                        </strong>
                                                        <p>Zadanie zablokowane</p>
                                                    </div>
                                                </div>
                                            </>
                                        )}

                                        {/* TASK-05: Utworzenie widoku zagadki -> zawartość dziennika */}
                                        {activePanel === 'journal' && (
                                            <>
                                                <h2>Dziennik odkrywcy</h2>

                                                <p>
                                                    Znajdujesz się w starożytnej
                                                    komnacie faraona.
                                                </p>

                                                <p>
                                                    Przed Tobą znajduje się
                                                    tajemniczy sarkofag.
                                                </p>

                                                <p>
                                                    Ściany komnaty pokryte są
                                                    hieroglifami.
                                                </p>

                                                <p>
                                                    Po lewej stronie znajduje się
                                                    przejście zabezpieczone kratą.
                                                </p>

                                                {foundObjects.includes('scroll') && (
                                                    <p>
                                                        Odnalazłeś stary zwój.
                                                        Jego tajemnica czeka
                                                        na rozwiązanie.
                                                    </p>
                                                )}
                                            </>
                                        )}

                                        {/* TASK-06: Pierwsza zagadka ukryta na zwoju */}
                                        {activePanel === 'scroll' && (
                                            <>
                                                <h2>Stary zwój faraona</h2>

                                                {!scrollSolved ? (
                                                    <div className="game-scroll-content">
                                                        <p className="game-scroll-subtitle">
                                                            TAJEMNICZY PAPIRUS
                                                        </p>

                                                        <p>
                                                            Odnalazłeś stary papirus pokryty starożytnymi znakami.
                                                            Znajduje się na nim zagadka:
                                                        </p>

                                                        <div className="game-riddle">
                                                            <p>
                                                                Jestem strażnikiem krainy umarłych.
                                                            </p>

                                                            <p>
                                                                Mam głowę szakala i czuwam nad duszami zmarłych.
                                                            </p>

                                                            <p>
                                                                Towarzyszę im w drodze do sądu Ozyrysa.
                                                            </p>

                                                            <strong>Kim jestem?</strong>
                                                        </div>

                                                        <input
                                                            type="text"
                                                            value={scrollAnswer}
                                                            onChange={(event) => setScrollAnswer(event.target.value)}
                                                            placeholder="Wpisz odpowiedź..."
                                                            className="game-riddle-input"
                                                        />

                                                        <button
                                                            type="button"
                                                            className="game-riddle-button"
                                                            onClick={checkScrollAnswer}
                                                        >
                                                            Sprawdź odpowiedź
                                                        </button>

                                                        {scrollFeedback && (
                                                            <p className="game-riddle-feedback">
                                                                {scrollFeedback}
                                                            </p>
                                                        )}
                                                    </div>
                                                ) : (
                                                    <div className="game-scroll-content">
                                                        <p className="game-scroll-subtitle">
                                                            ZAGADKA ROZWIĄZANA
                                                        </p>

                                                        <h3>Gratulacje!</h3>

                                                        <p>
                                                                Wypowiedziane imię zdaje się poruszyć coś w głębi komnaty.
                                                                Wśród nieruchomych kamiennych postaci jedna przykuwa Twoją uwagę.
                                                                Przez chwilę masz wrażenie, że jej spojrzenie podąża za Tobą...
                                                        </p>

                                                        <p>
                                                                Przez chwilę masz wrażenie, że jej spojrzenie podąża za Tobą...
                                                        </p>
                                                    </div>
                                                )}
                                            </>
                                        )}


                                        {activePanel === 'anubis' && (
                                            <>
                                                <h2>Posąg Anubisa</h2>

                                                <p>
                                                    Za posągiem dostrzegasz ukrytą kamienną tabliczkę.
                                                    Wyryto na niej tajemnicze symbole.
                                                </p>

                                                <div className="game-object-image">
                                                    <img
                                                        src="/images/stone-tablet.png"
                                                        alt="Kamienna tabliczka z egipskimi hieroglifami"
                                                    />
                                                </div>

                                                <p>
                                                    Na powierzchni tabliczki wyryto rzędy tajemniczych znaków.
                                            
                                                    Wygląda na to, że ktoś zadbał, by przetrwały próbę czasu.
                                                </p>
                                            </>
                                        )}

                                        
                                        {activePanel === 'hieroglyphs' && (
                                            <>
                                                <h2>Starożytne hieroglify</h2>

                                                <p>
                                                    Kamienna ściana pokryta jest znakami, które przetrwały tysiące lat.
                                                    Pięć z nich wyrzeźbiono głębiej niż pozostałe, jakby miały szczególne znaczenie.
                                                </p>

                                                <div className="game-object-image">
                                                    <img
                                                        src="/images/hieroglyphs.png"
                                                        alt="Starożytne symbole wyryte w kamiennej ścianie"
                                                    />
                                                </div>

                                                <p>
                                                    Przesuwasz dłonią po zimnym kamieniu. Nagle uświadamiasz sobie,
                                                    że widziałeś już te znaki... gdzieś w pobliżu strażnika grobowca.
                                                    Być może kamień skrywa wiadomość, której znaczenie wciąż pozostaje
                                                    przed Tobą ukryte.
                                                </p>
                                            </>
                                        )}

                                        {activePanel === 'sarcophagus' && (
                                            <>
                                                <h2>Kamienny sarkofag</h2>

                                                {!sarcophagusOpened ? (
                                                    <div className="game-scroll-content">
                                                        <p>
                                                            Na wieku sarkofagu dostrzegasz pięć zagłębionych znaków.
                                                            Wyglądają jak starożytne zabezpieczenie.
                                                        </p>

                                                        <p>
                                                            Pod nimi wyryto krótką inskrypcję:
                                                        </p>

                                                        <div className="game-riddle">
                                                            <p>
                                                                Tylko imię tego, który widzi wszystko
                                                                z wysokości nieba, otworzy drogę do wnętrza.
                                                            </p>
                                                        </div>

                                                        <input
                                                            type="text"
                                                            value={sarcophagusAnswer}
                                                            onChange={(event) => setSarcophagusAnswer(event.target.value)}
                                                            placeholder="Wpisz hasło..."
                                                            className="game-riddle-input"
                                                        />

                                                        <button
                                                            type="button"
                                                            className="game-riddle-button"
                                                            onClick={checkSarcophagusAnswer}
                                                        >
                                                            Otwórz sarkofag
                                                        </button>

                                                        {sarcophagusFeedback && (
                                                            <p className="game-riddle-feedback">
                                                                {sarcophagusFeedback}
                                                            </p>
                                                        )}
                                                    </div>
                                                ) : (
                                                    <div className="game-scroll-content">
                                                        <h3>Sarkofag został otwarty</h3>

                                                        <p>
                                                            Wewnątrz, pośród starych tkanin i pyłu,
                                                            spoczywa niewielki klucz.
                                                        </p>

                                                            <p>
                                                                Na powierzchni klucza dostrzegasz znajomy symbol.
                                                                Przypomina znak wyryty na kamiennym przejściu.
                                                                Być może nie jest to zwykły klucz...
                                                            </p>
                                                    </div>
                                                )}
                                            </>
                                        )}

                                        {activePanel === 'gate' && (
                                            <>
                                                <h2>Kamienna brama</h2>

                                                {!gateOpened ? (
                                                    <div className="game-scroll-content">
                                                        <p>
                                                            Za ciężką kratą majaczy ciemny korytarz.
                                                            Na zamku dostrzegasz ślady dawnego mechanizmu.
                                                        </p>

                                                        <p>
                                                            Klucz znaleziony w sarkofagu zdaje się pasować
                                                            do tajemniczego otworu.
                                                        </p>

                                                        <button
                                                            type="button"
                                                            className="game-riddle-button"
                                                            onClick={openGate}
                                                        >
                                                            Przekręć klucz
                                                        </button>
                                                    </div>
                                                ) : (
                                                    <div className="game-scroll-content">
                                                        <h3>Brama została otwarta</h3>

                                                        <p>
                                                            Zamek ustępuje z głuchym szczękiem.
                                                            Ciężka krata powoli unosi się, odsłaniając
                                                            przejście skąpane w mroku.
                                                        </p>

                                                        <p>
                                                            Po drugiej stronie czeka kolejna tajemnica...
                                                        </p>
                                                    </div>
                                                )}
                                            </>
                                        )}

                                    </div>
                                </div>
                            )}
                        </div>
                    )}

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
                </div>

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
