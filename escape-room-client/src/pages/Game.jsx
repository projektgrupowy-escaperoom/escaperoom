
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

    // US 06: Rozwiązywanie zagadek pomieszczenie 2
    const [chamber, setChamber] = useState('entrance')

    // US 06: Rozwiązywanie zagadek pomieszczenie 2
    // Za każdą pochodnią jest hieroglif; prawdziwe są tylko te za 5 zapalonymi pochodniami (Lotos i Sokół to fałszywe tropy)
    const symbole = ['Skarabeusz', 'Wąż', 'Oko Horusa', 'Ibis', 'Lotos', 'Sokół', 'Szakal']
    // Zapalone pochodnie zgodnie ze wskazówkami zegara (widok z góry), zaczynając od Skarabeusza:
    // Skarabeusz -> Wąż -> Oko Horusa -> Ibis -> Szakal
    const kolejnoscMaat = [0, 1, 2, 3, 6]
    const [zbadanoNiszePierwszyRaz, setZbadanoNiszePierwszyRaz] = useState(false)
    const [mamPioro, setMamPioro] = useState(false)
    const [mamAnkh, setMamAnkh] = useState(false)
    const [mamNaczynie, setMamNaczynie] = useState(false)
    const [ankhWlozony, setAnkhWlozony] = useState(false)
    const [mamSerce, setMamSerce] = useState(false)
    const [pioroNaWadze, setPioroNaWadze] = useState(false)
    const [serceNaWadze, setSerceNaWadze] = useState(false)
    const [bramaOtwarta, setBramaOtwarta] = useState(false)
    const [bloki, setBloki] = useState([0, 4, 5, 1, 2])
    const [komunikat, setKomunikat] = useState('')
    const [grafika, setGrafika] = useState(null)

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
        // US 06: po położeniu serca i pióra na wadze zamknięcie komunikatu pokazuje ostatni obraz komnaty
        if (pioroNaWadze && serceNaWadze) setBramaOtwarta(true)
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

    // US 06: Rozwiązywanie zagadek pomieszczenie 2
    const zdobycieSerca = 'Kule idealnie pasowały do otworu! Już po wrzuceniu pierwszej z nich zauważyłeś, że krata delikatnie się uniosła. Gdy umieściłeś w środku wszystkie kule, krata podniosła się całkowicie, odsłaniając skamieniałe serce. Zabierasz je ze sobą. Chyba już wiesz, co z nim zrobić…'
    const finał = 'Delikatnie kładziesz serce i pióro na szalach wagi. Przez chwilę z przerażeniem obserwujesz, jak waga niepewnie się kołysze. Raz cięższe wydaje się serce, za moment szala przechyla się na stronę pióra. Na szczęście po chwili obie szale powoli się wyrównują. Tym razem ci się udało! Drzwi powoli otwierają się, odsłaniając przejście do kolejnej komnaty.'

    const odkryciePiora = 'Po ułożeniu ostatniego przycisku ołtarz gwałtownie zadrżał. Wskutek wstrząsów otaczający go pył i kurz wzbiły się wysoko w powietrze, tworząc gęstą mgłę. Przez krótką chwilę nie dało się dostrzec zupełnie niczego.\n\nGdy pył w końcu opadł, zauważyłeś, że ołtarz się otworzył. W jego wnętrzu spoczywało Pióro Prawdy. Ostrożnie zabierasz je ze sobą. Kto wie, być może jeszcze okaże się przydatne.'
    const odkrycieSerca = 'Coś przykuwa twoją uwagę w kącie komnaty. Podchodzisz bliżej i dostrzegasz czarne, skamieniałe serce, zamknięte za metalową kratą. Po jego lewej stronie znajduje się otwór na klucz o bardzo charakterystycznym kształcie. Wygląda dziwnie znajomo…\n\nPo prawej stronie zauważasz kolejny otwór, jednak ten jest szczelnie zamknięty. Zastanawiasz się, co mogłoby go otworzyć.'

    const pokaz = (tekst, obraz = null) => {
        setKomunikat(tekst)
        setGrafika(obraz)
        openPanel('komnata2')
    }

    // Komunikat z przyciskiem "Dalej", który wraca do sali głównej
    const pokazDalej = (tekst, obraz = null) => {
        setKomunikat(tekst)
        setGrafika(obraz)
        openPanel('dalej')
    }


    const dodaj = (nazwa) => setFoundObjects((p) => [...p, nazwa])
    const usun = (nazwa) => setFoundObjects((p) => p.filter((x) => x !== nazwa))

    const kliknijNisze = () => {
        if (mamPioro || pioroNaWadze) return pokaz('Skrytka w niszy jest już pusta.')
        setKomunikat(zbadanoNiszePierwszyRaz ? '' : 'Widzisz ołtarz bogini Maat, a na nim kilka kamiennych bloków, każdy oznaczony innym symbolem. Gdzieś już je widziałeś.. Pierwszy z nich oznaczony Skarabeuszem jest znaczniej niżej od reszty, zupełnie jak wciśnięty przycisk, co to może oznaczać?')
        setZbadanoNiszePierwszyRaz(true)
        openPanel('nisza')
    }

    const obrocBlok = (i) => {
        // Pierwszy blok (Skarabeusz) jest na stałe wciśnięty – wyznacza początek sekwencji
        if (i === 0) return setKomunikat('Blok ze Skarabeuszem jest wciśnięty głęboko w ołtarz i ani drgnie.')
        // Pozostałe bloki przełączają się między symbolami innymi niż Skarabeusz (indeksy 1..n-1)
        const nowe = bloki.map((b, j) => (j === i ? (b % (symbole.length - 1)) + 1 : b))
        setBloki(nowe)
        const ulozone = nowe.every((b, j) => b === kolejnoscMaat[j])
        if (ulozone) {
            setMamPioro(true)
            dodaj('🪶 Pióro Maat')
            setKomunikat(odkryciePiora)
            openPanel('pioro')
        } else {
            setKomunikat(`Kamienny blok obraca się z ciężkim zgrzytem. Widoczny symbol to: ${symbole[nowe[i]]}.`)
        }
    }

    const kliknijPochodnie = (symbol, zapalona) => pokaz(zapalona
        ? `Blask płonącej pochodni wyraźnie oświetla płaskorzeźbę za nią. Wyryto na niej symbol: ${symbol}.`
        : `Pochodnia jest zgaszona, z jej czaszy unosi się jedynie cienka smużka dymu. W półmroku z trudem dostrzegasz wyryty za nią symbol: ${symbol}.`)

    // Część z sercem jest zablokowana, dopóki gracz nie zdobędzie Pióra Maat
    const znalezionoPioro = mamPioro || pioroNaWadze

    const zabierzAnkh = () => {
        if (!znalezionoPioro) return pokaz('Kamienny krzyż Ankh tkwi nieruchomo w ołtarzu, jakby przytrzymywała go niewidzialna siła. Najpierw musisz odnaleźć symbol prawdy.')
        setMamAnkh(true)
        dodaj('☥ Krzyż Ankh')
        pokaz('Podnosisz kamienny krzyż Ankh. Tak! To ten kształt! Może za jego pomocą uda się otworzyć zamknięte serce.')
    }

    const zabierzNaczynie = () => {
        if (!znalezionoPioro) return pokaz('Gliniany dzban ani drgnie – wydaje się przyrośnięty do kamiennego ołtarza. Najpierw musisz odnaleźć symbol prawdy.')
        // Dzban można zabrać dopiero po włożeniu krzyża Ankh do zamka przy sercu
        if (!ankhWlozony) return pokaz('Na ołtarzu stoi zwykły, gliniany dzban. Na razie nie wydaje się do niczego potrzebny.')
        setMamNaczynie(true)
        dodaj('🏺 Gliniany dzban')
        pokaz('Zauważasz, że dzban jest czymś wypełniony. Zaglądasz do środka i dostrzegasz niewielkie kule. Są zaskakująco ciężkie, jakby wykonano je z ołowiu. Może właśnie tego potrzebujesz, by wypełnić tajemniczy otwór? Pora się przekonać!')
    }

    // Widok serca za kratą – otwierany złotym kołem po prawej stronie komnaty (dostępny po zdobyciu pióra)
    const kliknijSerce = () => {
        if (mamSerce || serceNaWadze) return pokaz('Nisza za kratą jest już pusta.')
        // Po powrocie z dzbanem gracz od razu wsypuje kule do otworu i zabiera serce
        if (ankhWlozony && mamNaczynie) return wezSerce()
        // Po powrocie z krzyżem Ankh gracz od razu wkłada go do zamka
        if (mamAnkh) wlozAnkh()
        setKomunikat(mamAnkh || ankhWlozony ? ankhWZamku : odkrycieSerca)
        openPanel('serce')
    }

    const ankhWZamku = 'Krzyż Ankh idealnie pasuje do zamka! Jednak coś jest nie tak… Zamiast otworzyć kratę chroniącą serce, odsłonił się jedynie niewielki otwór. Co można z nim zrobić? Może mechanizm działa na zasadzie dźwigni? Być może wystarczy wypełnić otwór czymś ciężkim, aby uniosły się kraty? Tylko skąd wziąć przedmiot, który będzie jednocześnie wystarczająco ciężki i na tyle mały, by zmieścić się w otworze?'

    const wlozAnkh = () => {
        setMamAnkh(false)
        setAnkhWlozony(true)
        usun('☥ Krzyż Ankh')
    }

    // Lewy otwór w kształcie krzyża Ankh
    const kliknijZamekAnkh = () => {
        if (ankhWlozony) return setKomunikat(ankhWZamku)
        if (!mamAnkh) return setKomunikat('Otwór na klucz ma kształt krzyża Ankh. Gdzieś już widziałeś taki kształt…')
        wlozAnkh()
        setKomunikat(ankhWZamku)
    }

    // Prawy, okrągły otwór – otwiera się po włożeniu krzyża Ankh
    const kliknijPrawyOtwor = () => {
        if (!ankhWlozony) return setKomunikat('Okrągły otwór jest szczelnie zamknięty. Zastanawiasz się, co mogłoby go otworzyć.')
        if (!mamNaczynie) return setKomunikat('Mechanizm jest otwarty, ale w środku jest pusto. Wygląda na to, że trzeba go czymś obciążyć.')
        wezSerce()
    }

    const wezSerce = () => {
        setMamNaczynie(false)
        setMamSerce(true)
        usun('🏺 Gliniany dzban')
        dodaj('🖤 Kamienne serce')
        pokazDalej(zdobycieSerca, '/images/heart-niche.jpg')
    }

    // Waga – serce i pióro kładzione są razem, gdy gracz ma oba przedmioty
    const kliknijWage = () => {
        if (pioroNaWadze && serceNaWadze) return pokaz('Szale wagi trwają w idealnej równowadze.')
        if (!mamPioro) return pokaz('Szale wagi są puste. Potrzebujesz symbolu prawdy, który zrównoważy ciężar duszy.')
        if (!mamSerce) return pokaz('Masz już Pióro Prawdy, ale na drugiej szali brakuje czegoś, co zostanie z nim zważone.')
        setMamPioro(false)
        setMamSerce(false)
        setPioroNaWadze(true)
        setSerceNaWadze(true)
        usun('🪶 Pióro Maat')
        usun('🖤 Kamienne serce')
        pokazDalej(finał)
    }

    // US 06: Rozwiązywanie zagadek pomieszczenie 2 -> klikalne miejsca: [nazwa, left %, top %, szerokość %, wysokość %, akcja]
    const punkty = [
        // Pochodnie (na końcu listy, żeby leżały nad niszami tam, gdzie obszary się nakładają)
        ['Pochodnia', 8, 15, 7, 28, () => kliknijPochodnie('Skarabeusz', true)],
        ['Pochodnia', 22.5, 28, 5, 16, () => kliknijPochodnie('Lotos', false)],
        ['Pochodnia', 35.5, 28, 3.5, 15, () => kliknijPochodnie('Wąż', true)],
        ['Pochodnia', 42, 29, 3.5, 15, () => kliknijPochodnie('Oko Horusa', true)],
        ['Pochodnia', 70, 29, 3.5, 16, () => kliknijPochodnie('Ibis', true)],
        ['Pochodnia', 79, 24, 4.5, 21, () => kliknijPochodnie('Sokół', false)],
        ['Pochodnia', 86, 16, 6, 30, () => kliknijPochodnie('Szakal', true)],
        !mamAnkh && !ankhWlozony && ['Krzyż Ankh', 55, 67, 8, 10, zabierzAnkh],
        !mamNaczynie && !mamSerce && !serceNaWadze && ['Gliniany dzban', 36, 57, 5, 13, zabierzNaczynie],
        ['Waga', 40, 45, 19, 22, kliknijWage],
    ].filter(Boolean)

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

                            {/* US 06: Rozwiązywanie zagadek pomieszczenie 2 */}
                            {chamber === 'anubis' && (
                                <img src={bramaOtwarta ? '/images/corbram.jpg' : '/images/anubis-chamber.png'} alt="Komnata Anubisa" className="game-anubis-room" />
                            )}

                            {/* US 06: Rozwiązywanie zagadek pomieszczenie 2 -> zapalona ostatnia pochodnia po prawej stronie */}
                            {chamber === 'anubis' && !bramaOtwarta && (
                                <span className="torch-fire torch-fire-anubis-right" aria-hidden="true">
                                    <span className="torch-glow" />
                                    <span className="torch-flame" />
                                    <span className="torch-flame torch-flame-inner" />
                                </span>
                            )}

                            {/* US 06: Rozwiązywanie zagadek pomieszczenie 2 -> złote koło otwierające ołtarz Maat */}
                            {chamber === 'anubis' && !bramaOtwarta && (
                                <button
                                    type="button"
                                    className="game-passage-button game-maat-button"
                                    aria-label="Ołtarz bogini Maat"
                                    onClick={kliknijNisze}
                                />
                            )}

                            {/* US 06: Rozwiązywanie zagadek pomieszczenie 2 -> złote koło prowadzące do serca (po zdobyciu pióra) */}
                            {chamber === 'anubis' && !bramaOtwarta && znalezionoPioro && (
                                <button
                                    type="button"
                                    className="game-passage-button game-heart-button"
                                    aria-label="Serce za kratą"
                                    onClick={kliknijSerce}
                                />
                            )}

                            {/* PRZEJŚCIE DO POMIESZCZENIA 3 */}
                            {chamber === 'anubis' && bramaOtwarta && (
                                <button
                                    type="button"
                                    className="game-passage-button game-room3-button"
                                    aria-label="Przejdź do kolejnej komnaty"
                                    onClick={() => {
                                        // TODO: przejście do pomieszczenia 3
                                    }}
                                />
                            )}

                            {/* US 06: Rozwiązywanie zagadek pomieszczenie 2 */}
                            {chamber === 'anubis' && !bramaOtwarta && punkty.map(([nazwa, x, y, w, h, akcja], i) => (
                                <button
                                    key={i}
                                    type="button"
                                    className="game-c2-spot"
                                    aria-label={nazwa}
                                    style={{ left: `${x}%`, top: `${y}%`, width: `${w}%`, height: `${h}%` }}
                                    onClick={akcja}
                                />
                            ))}

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

                            {/* US 06: Rozwiązywanie zagadek pomieszczenie 2 */}
                            {gateOpened && chamber === 'entrance' && (
                                <button
                                    type="button"
                                    className="game-passage-button"
                                    aria-label="Przejdź dalej"
                                    onClick={() => setChamber('intro')}
                                />
                            )}

                            {/* US 06: Rozwiązywanie zagadek pomieszczenie 2 */}
                            {chamber === 'intro' && (
                                <div className="game-panel-overlay">
                                    <div className="game-panel">
                                        <p>
                                            Ciężkie, kamienne wrota zatrzaskują się za Tobą z głuchym hukiem. Powietrze jest gęste, suche i pachnie starym pyłem oraz dymem z pochodni. W blasku migoczących płomieni wyłania się potężny posąg Anubisa - boga zmarłych, strzegącego przejścia w głąb piramidy. Przed nim stoi kamienny ołtarz. Jego puste szale wagi kołyszą się lekko, czekając na osąd. Za posągiem majaczą zamknięte, masywne drzwi pokryte hieroglifami. Aby przejść dalej, musicie udowodnić, że wasze czyny są lżejsze niż pióro prawdy. Szukaj go wyłącznie tam, gdzie pada blask ognia na kamienne filary - cień skrywa fałsz.
                                        </p>

                                        <button type="button" className="game-riddle-button" onClick={() => setChamber('anubis')}>
                                            Dalej
                                        </button>
                                    </div>
                                </div>
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

                                        {/* US 06: Rozwiązywanie zagadek pomieszczenie 2 */}
                                        {activePanel === 'komnata2' && (
                                            <>
                                                <p>{komunikat}</p>
                                                {grafika && (
                                                    <div className="game-object-image">
                                                        <img src={grafika} alt="" />
                                                    </div>
                                                )}
                                            </>
                                        )}

                                        {/* US 06: Rozwiązywanie zagadek pomieszczenie 2 -> komunikat z powrotem do sali głównej */}
                                        {activePanel === 'dalej' && (
                                            <>
                                                {komunikat.split('\n\n').map((akapit, i) => <p key={i}>{akapit}</p>)}
                                                {grafika && (
                                                    <div className="game-object-image">
                                                        <img src={grafika} alt="" />
                                                    </div>
                                                )}
                                                <button type="button" className="game-riddle-button" onClick={closePanel}>
                                                    Dalej
                                                </button>
                                            </>
                                        )}

                                        {/* US 06: Rozwiązywanie zagadek pomieszczenie 2 -> odnalezienie Pióra Prawdy */}
                                        {activePanel === 'pioro' && (
                                            <>
                                                {komunikat.split('\n\n').map((akapit, i) => <p key={i}>{akapit}</p>)}
                                                <div className="game-object-image">
                                                    <img src="/images/feather-niche.jpg" alt="Pióro Prawdy w otwartym ołtarzu" />
                                                </div>
                                                <button type="button" className="game-riddle-button" onClick={closePanel}>
                                                    Dalej
                                                </button>
                                            </>
                                        )}

                                        {/* US 06: Rozwiązywanie zagadek pomieszczenie 2 -> serce za kratą */}
                                        {activePanel === 'serce' && (
                                            <>
                                                <h2>Serce za kratą</h2>
                                                {komunikat.split('\n\n').map((akapit, i) => <p key={i}>{akapit}</p>)}
                                                <div className="game-object-image">
                                                    <div className="game-heart-view">
                                                        <img src="/images/heart-cage.jpg" alt="Kamienne serce za metalową kratą" />
                                                        <button type="button" className="game-c2-spot game-heart-ankh-lock" aria-label="Otwór w kształcie krzyża Ankh" onClick={kliknijZamekAnkh} />
                                                        <button type="button" className="game-c2-spot game-heart-right-lock" aria-label="Okrągły otwór" onClick={kliknijPrawyOtwor} />
                                                    </div>
                                                </div>
                                            </>
                                        )}

                                        {/* US 06: Rozwiązywanie zagadek pomieszczenie 2 */}
                                        {activePanel === 'nisza' && (
                                            <>
                                                <h2>Ołtarz bogini Maat</h2>
                                                <div className="game-object-image">
                                                    <img src="/images/maat-altar.jpg" alt="Ołtarz bogini Maat z pięcioma kamiennymi blokami" />
                                                </div>
                                                {komunikat && <p>{komunikat}</p>}
                                                {bloki.map((b, i) => (
                                                    <button key={i} type="button" className={i === 0 ? 'game-riddle-button game-riddle-button-pressed' : 'game-riddle-button'} onClick={() => obrocBlok(i)}>
                                                        {i + 1}. {symbole[b]}
                                                    </button>
                                                ))}
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
