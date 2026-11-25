
import {
    HISTORIA,
    OBELISKI,
    KIERUNKI_LUSTER,
    FRAGMENTY_PIECZECI,
    PLANSZA_SWIATLA,
    INSKRYPCJA_PIECZECI,
} from './data'

export default function Room4Panels({
    activePanel,
    closePanel,
    komunikat,

    kolejnosc,
    wybranaPozycja,
    kliknijObelisk,
    sprawdzObeliski,
    obeliskiUstawione,

    lustra,
    obrocLustro,
    sprawdzLustra,
    lustraUstawione,
    ustawieniaLuster,
    promien,
    obrocLustroNaPlanszy,
    sprawdzPromien,


    znalezioneFragmenty,
    kolejnoscPieczeci,
    wybierzFragmentPieczeci,
    wyczyscKolejnoscPieczeci,
    zlozPieczec,
    pieczecZlozona,



    bramaOtwarta,
    otworzBrame,
    onFinish,
}) {
    if (!activePanel) return null

    const znajdzObelisk = (id) =>
        OBELISKI.find((obelisk) => obelisk.id === id)

    return (
        <div
            className="r4-panel-overlay"
            onClick={closePanel}
        >
            <div
                className="r4-panel"
                role="dialog"
                aria-modal="true"
                aria-label="Zagadka sanktuarium"
                onClick={(event) => event.stopPropagation()}
            >
                <button
                    type="button"
                    className="r4-panel-close"
                    onClick={closePanel}
                    aria-label="Zamknij okno"
                >
                    ×
                </button>

                {komunikat && (
                    <p className="r4-message">{komunikat}</p>
                )}

                {activePanel === 'papirus' && (
                    <div className="r4-panel-content">
                        <h2>Przepowiednia Ra</h2>
                        <div className="r4-papyrus-text">
                            {HISTORIA.papirus}
                        </div>
                        <p>
                            Rozejrzyj się po komnacie i odszukaj
                            cztery obeliski.
                        </p>
                    </div>
                )}

                {activePanel === 'obeliski' && (
                    <div className="r4-panel-content">
                        <h2>Cztery obeliski Słońca</h2>
                        <p>
                            Ustaw etapy podróży Ra w prawidłowej kolejności.
                            Kliknij dwa obeliski, aby zamienić je miejscami.
                        </p>

                        <div className="r4-obelisks-grid">
                            {kolejnosc.map((id, index) => {
                                const obelisk = znajdzObelisk(id)

                                return (
                                    <button
                                        key={id}
                                        type="button"
                                        className={[
                                            'r4-obelisk',
                                            wybranaPozycja === index
                                                ? 'selected'
                                                : '',
                                        ].join(' ')}
                                        onClick={() => kliknijObelisk(index)}
                                        disabled={obeliskiUstawione}
                                    >
                                        <span>Pozycja {index + 1}</span>

                                        <strong className="r4-obelisk-symbol">
                                            {obelisk?.symbol}
                                        </strong>
                                        <small>Obelisk {index + 1}</small>

                                    </button>
                                )
                            })}
                        </div>

                        <button
                            type="button"
                            className="r4-action-button"
                            onClick={sprawdzObeliski}
                            disabled={obeliskiUstawione}
                        >
                            Sprawdź ustawienie
                        </button>

                        {obeliskiUstawione && (
                            <p className="r4-success">
                                Obeliski zostały aktywowane.
                                Możesz teraz uruchomić zwierciadła.
                            </p>
                        )}
                    </div>
                )}


                {activePanel === 'lustra' && (
                    <div className="r4-panel-content">
                        <h2>Mechanizm światła Ra</h2>

                        <div className="r4-papyrus-text">
                            {HISTORIA.lustra}
                        </div>

                        <p>
                            Obracaj zwierciadła, aby poprowadzić
                            promień światła do tarczy Ra.
                            Kamienne bloki zatrzymują światło.
                        </p>

                        <div className="r4-light-board">
                            <svg
                                className="r4-light-beam"
                                viewBox="0 0 500 500"
                                aria-hidden="true"
                            >
                                <polyline
                                    points={promien.sciezka
                                        .map(({ x, y }) =>
                                            `${x * 100 + 50},${y * 100 + 50}`
                                        )
                                        .join(' ')}
                                    fill="none"
                                    stroke="#ffd45b"
                                    strokeWidth="9"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>

                            {Array.from({ length: 25 }, (_, index) => {
                                const x = index % 5
                                const y = Math.floor(index / 5)

                                const lustro = PLANSZA_SWIATLA.lustra.find(
                                    (element) => element.x === x && element.y === y
                                )

                                const przeszkoda = PLANSZA_SWIATLA.przeszkody.some(
                                    (element) => element.x === x && element.y === y
                                )

                                const start =
                                    PLANSZA_SWIATLA.start.x === x &&
                                    PLANSZA_SWIATLA.start.y === y

                                const cel =
                                    PLANSZA_SWIATLA.cel.x === x &&
                                    PLANSZA_SWIATLA.cel.y === y

                                const oswietlone = promien.sciezka.some(
                                    (element) => element.x === x && element.y === y
                                )

                                return (
                                    <div
                                        key={`${x}-${y}`}
                                        className={[
                                            'r4-light-cell',
                                            oswietlone ? 'lit' : '',
                                            przeszkoda ? 'blocked' : '',
                                            cel ? 'target' : '',
                                        ].join(' ')}
                                    >
                                        {lustro ? (
                                            <button
                                                type="button"
                                                className="r4-board-mirror"
                                                onClick={() =>
                                                    obrocLustroNaPlanszy(lustro.id)
                                                }
                                                disabled={lustraUstawione}
                                                title="Obróć zwierciadło"
                                            >
                                                {ustawieniaLuster[lustro.id]}
                                            </button>
                                        ) : start ? (
                                            <span title="Źródło światła">☀</span>
                                        ) : cel ? (
                                            <span title="Tarcza Ra">𓂀</span>
                                        ) : przeszkoda ? (
                                            <span title="Kamienna przeszkoda">▩</span>
                                        ) : null}
                                    </div>
                                )
                            })}
                        </div>

                        <button
                            type="button"
                            className="r4-action-button"
                            onClick={sprawdzPromien}
                            disabled={lustraUstawione}
                        >
                            Aktywuj tarczę Ra
                        </button>

                        {lustraUstawione && (
                            <p className="r4-success">
                                Światło dotarło do tarczy Ra!
                                Mechanizm pieczęci został odblokowany.
                            </p>
                        )}
                    </div>
                )}


                {activePanel === 'fragmenty' && (
                    <div className="r4-panel-content">
                        <h2>Pieczęć faraona</h2>
                        <p>
                            Odszukaj wszystkie fragmenty ukryte
                            w sanktuarium, a następnie połącz je
                            na kamiennym ołtarzu.
                        </p>

                        <div className="r4-fragments-grid">
                            {FRAGMENTY_PIECZECI.map((fragment) => {
                                const znaleziony =
                                    znalezioneFragmenty.includes(fragment.id)

                                return (
                                    <div
                                        key={fragment.id}
                                        className={[
                                            'r4-fragment',
                                            znaleziony ? 'found' : '',
                                        ].join(' ')}
                                    >
                                        <strong>{fragment.symbol}</strong>
                                        <span>{fragment.nazwa}</span>
                                        <small>
                                            {znaleziony
                                                ? 'Znaleziony'
                                                : 'Nieodnaleziony'}
                                        </small>
                                    </div>
                                )
                            })}
                        </div>

                        <p>
                            Fragmenty: {znalezioneFragmenty.length} /{' '}
                            {FRAGMENTY_PIECZECI.length}
                        </p>

                        <div className="r4-papyrus-text">
                            {INSKRYPCJA_PIECZECI}
                        </div>

                        <h3>Kamienny ołtarz</h3>

                        <p>
                            Klikaj odnalezione symbole w kolejności,
                            w jakiej mają znaleźć się na pieczęci.
                        </p>

                        <div className="r4-seal-slots">
                            {Array.from({ length: 3 }, (_, index) => {
                                const id = kolejnoscPieczeci[index]
                                const fragment = FRAGMENTY_PIECZECI.find(
                                    (element) => element.id === id
                                )

                                return (
                                    <div className="r4-seal-slot" key={index}>
                                        {fragment ? fragment.symbol : '?'}
                                    </div>
                                )
                            })}
                        </div>

                        <div className="r4-seal-options">
                            {FRAGMENTY_PIECZECI.map((fragment) => (
                                <button
                                    type="button"
                                    key={fragment.id}
                                    className="r4-seal-option"
                                    onClick={() => wybierzFragmentPieczeci(fragment.id)}
                                    disabled={
                                        pieczecZlozona ||
                                        !znalezioneFragmenty.includes(fragment.id) ||
                                        kolejnoscPieczeci.includes(fragment.id)
                                    }
                                >
                                    <strong>{fragment.symbol}</strong>
                                    <span>{fragment.nazwa}</span>
                                </button>
                            ))}
                        </div>

                        <button
                            type="button"
                            className="r4-action-button"
                            onClick={wyczyscKolejnoscPieczeci}
                            disabled={pieczecZlozona || kolejnoscPieczeci.length === 0}
                        >
                            Wyczyść ułożenie
                        </button>

                        <button
                            type="button"
                            className="r4-action-button"
                            onClick={zlozPieczec}
                            disabled={
                                znalezioneFragmenty.length !==
                                FRAGMENTY_PIECZECI.length ||
                                pieczecZlozona
                            }
                        >
                            Złóż pieczęć faraona
                        </button>

                        {pieczecZlozona && (
                            <p className="r4-success">
                                Pieczęć jest gotowa! Podejdź do ostatniej bramy.
                            </p>
                        )}
                    </div>
                )}

                {activePanel === 'brama' && (
                    <div className="r4-panel-content">
                        <h2>Ostatnia brama świątyni</h2>

                        <div className="r4-papyrus-text">
                            {HISTORIA.final}
                        </div>

                        {!bramaOtwarta ? (
                            <button
                                type="button"
                                className="r4-action-button"
                                onClick={otworzBrame}
                                disabled={!pieczecZlozona}
                            >
                                Umieść pieczęć i otwórz bramę
                            </button>
                        ) : (
                            <>
                                <p className="r4-success">
                                    Brama otwarta! Za nią widać światło dnia.
                                </p>

                                <button
                                    type="button"
                                    className="r4-action-button"
                                    onClick={() => {
                                        closePanel()
                                        onFinish?.()
                                    }}
                                >
                                    Opuść świątynię
                                </button>
                            </>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}
