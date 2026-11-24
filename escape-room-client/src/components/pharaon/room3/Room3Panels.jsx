
import {
    SZYFR,
    STRAZNICY,
    MAPA_KIERUNKOW,
    TEKSTY,
    KLUCZE,
} from './data'

export default function Room3Panels({
    activePanel,
    closePanel,
    openPanel,
    komunikat,

    znalezionoZwoj,
    znajdzZwoj,

    kolejnosc,
    wybranaPozycja,
    kliknijStraznika,
    sprawdzStraznikow,
    straznicyOdkryci,

    wybraneZnaki,
    wybierzZnak,
    usunZnak,
    wyczyscZnaki,
    sprawdzSfinksa,

    kluczeZdobyte,

    wybranaLitera,
    wybierzLitera,
    wybranyKlucz,
    wybierzKlucz,
    otwarteZamki,
    uzyteKlucze,
    sprawdzZamek,
    bramaOtwarta,
    przejdzDalej,
}) {
    if (!activePanel) return null

    const getGuardian = (id) =>
        STRAZNICY.find((straznik) => straznik.id === id)

    const renderGuardianImage = (id, className) => {
        const guardian = getGuardian(id)

        if (!guardian) return null

        return (
            <img
                className={className}
                src={guardian.obraz}
                alt={guardian.nazwa}
            />
        )
    }

    const renderPapyrus = (title, content) => (
        <div className="r3-panel-content">
            <h2>{title}</h2>
            <div className="r3-papyrus-text">{content}</div>
        </div>
    )

    const renderCipher = () => (
        <div className="r3-panel-content">
            <h2>Alfabet starożytnych</h2>
            <p>
                Każdy znak odpowiada jednej literze. Zapamiętaj ich znaczenie,
                ponieważ będą potrzebne do rozwiązania zagadki Sfinksa.
            </p>

            <div className="r3-cipher-grid">
                {SZYFR.map((element) => (
                    <div className="r3-cipher-item" key={element.litera}>
                        <span className="r3-cipher-symbol">{element.znak}</span>
                        <span className="r3-cipher-letter">{element.litera}</span>
                    </div>
                ))}
            </div>
        </div>
    )

    const renderGuardians = () => (
        <div className="r3-panel-content">
            <h2>Posągi czterech strażników</h2>
            <p>
                Ustaw głowy strażników we właściwej kolejności.
                Wskazówki znajdziesz na papirusach i mapie.
            </p>

            <div className="r3-guardians-grid">
                {kolejnosc.map((id, index) => {
                    const guardian = getGuardian(id)

                    return (
                        <button
                            type="button"
                            key={`${id}-${index}`}
                            className={[
                                'r3-guardian',
                                wybranaPozycja === index ? 'selected' : '',
                            ].join(' ')}
                            onClick={() => kliknijStraznika(index)}
                            disabled={straznicyOdkryci}
                        >
                            <span>Pozycja {index + 1}</span>

                            {renderGuardianImage(id, 'r3-guardian-image')}

                            <strong>{guardian?.nazwa}</strong>
                        </button>
                    )
                })}
            </div>

            <p>
                Kliknij jednego strażnika, a następnie drugiego,
                aby zamienić ich miejscami.
            </p>

            <button
                type="button"
                className="r3-action-button"
                onClick={sprawdzStraznikow}
            >
                Sprawdź ustawienie
            </button>
        </div>
    )

    const renderMap = () => (
        <div className="r3-panel-content">
            <h2>Mapa komnaty</h2>
            <p>
                Cztery strony świata oznaczono symbolami strażników.
            </p>

            <div className="r3-map-grid">
                {MAPA_KIERUNKOW.map((element) => {
                    const guardian = getGuardian(element.symbol)

                    return (
                        <div className="r3-map-item" key={element.kierunek}>
                            <strong>{element.kierunek}</strong>

                            {renderGuardianImage(
                                element.symbol,
                                'r3-direction-symbol'
                            )}

                            <span>{guardian?.nazwa}</span>
                        </div>
                    )
                })}
            </div>
        </div>
    )

    const renderSphinx = () => (
        <div className="r3-panel-content">
            <h2>Zagadka Sfinksa</h2>

            <div className="r3-sphinx-riddle">
                What walks on four legs at dawn,
                two legs at midday,
                and three legs at dusk?
            </div>

            <p>
                Zapisz odpowiedź za pomocą hieroglifów.
                Skorzystaj z alfabetu na papirusie.
            </p>

            {znalezionoZwoj ? (
                <button
                    type="button"
                    className="r3-secondary-button"
                    onClick={() => openPanel('cipher')}
                >
                    Otwórz alfabet
                </button>
            ) : (
                <p>
                    Nie masz jeszcze alfabetu. 
                </p>
            )}

            <div className="r3-answer-slots">
                {Array.from({ length: 5 }).map((_, index) => (
                    <button
                        type="button"
                        className="r3-answer-slot"
                        key={index}
                        onClick={() => usunZnak(index)}
                        title="Usuń znak"
                    >
                        {wybraneZnaki[index] || '_'}
                    </button>
                ))}
            </div>

            <div className="r3-hieroglyphs-grid">
                {SZYFR.map((element) => (
                    <button
                        type="button"
                        key={element.litera}
                        onClick={() => wybierzZnak(element.znak)}
                        disabled={wybraneZnaki.length >= 5}
                    >
                        {element.znak}
                    </button>
                ))}
            </div>

            <button
                type="button"
                className="r3-secondary-button"
                onClick={wyczyscZnaki}
            >
                Wyczyść odpowiedź
            </button>

            <button
                type="button"
                className="r3-action-button"
                onClick={sprawdzSfinksa}
                disabled={wybraneZnaki.length !== 5}
            >
                Sprawdź odpowiedź
            </button>
        </div>
    );

    const renderKeys = () => (
        <div className="r3-panel-content">
            <h2>Odnalezione klucze</h2>

            <p>
                W skrytce znajdowały się cztery klucze.
                Każdy wykonano z innego metalu i ozdobiono symbolem
                jednego ze strażników.
            </p>

            <div className="r3-keys-grid">
                {KLUCZE.map((klucz) => (
                    <div
                        className={`r3-found-key ${klucz.kolor}`}
                        key={klucz.id}
                    >
                        {renderGuardianImage(
                            klucz.symbol,
                            'r3-key-symbol'
                        )}

                        <strong>{klucz.nazwa}</strong>
                    </div>
                ))}
            </div>

            <p>
                Na kamiennej bramie znajduje się wiele zamków.
                Tylko cztery z nich pozwolą otworzyć przejście.
            </p>
        </div>
    )

    const renderDoors = () => (
        <div className="r3-panel-content">
            <h2>Brama czterech strażników</h2>
            <p>
                Wybierz literę zamka, a następnie klucz,
                który do niego pasuje.
            </p>

            <div className="r3-locks-grid">
                {'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map((litera) => (
                    <button
                        type="button"
                        key={litera}
                        className={[
                            'r3-lock',
                            wybranaLitera === litera ? 'selected' : '',
                            otwarteZamki.includes(litera) ? 'opened' : '',
                        ].join(' ')}
                        onClick={() => wybierzLitera(litera)}
                        disabled={otwarteZamki.includes(litera)}
                    >
                        {litera}
                    </button>
                ))}
            </div>

            <h3>Dostępne klucze</h3>

            <div className="r3-key-options">
                {KLUCZE.map((klucz) => (
                    <button
                        type="button"
                        key={klucz.id}
                        className={[
                            'r3-key-option',
                            wybranyKlucz === klucz.id ? 'selected' : '',
                        ].join(' ')}
                        onClick={() => wybierzKlucz(klucz.id)}
                        disabled={uzyteKlucze.includes(klucz.id)}
                    >
                        {renderGuardianImage(
                            klucz.symbol,
                            'r3-key-symbol'
                        )}

                        <span>{klucz.nazwa}</span>
                        <small>
                            {uzyteKlucze.includes(klucz.id)
                                ? 'Użyty'
                                : 'Dostępny'}
                        </small>
                    </button>
                ))}
            </div>

            <button
                type="button"
                className="r3-action-button"
                onClick={sprawdzZamek}
                disabled={!wybranaLitera || !wybranyKlucz}
            >
                Użyj klucza
            </button>

            <p className="r3-lock-progress">
                Otwarte zamki: {otwarteZamki.length} / 4
            </p>

            {bramaOtwarta && (
                <>
                    {/* TODO: Podłączyć obsługę kliknięcia, która uruchomi
            komponent przejścia do Komnaty 4. */}

                    <button
                        type="button"
                        className="r3-action-button"
                    >
                        Przejdź do kolejnej komnaty
                    </button>
                </>
            )}
        </div>
    )

    return (
        <div
            className="r3-panel-overlay"
            onClick={closePanel}
        >
            <div
                className="r3-panel"
                onClick={(event) => event.stopPropagation()}
            >
                <button
                    type="button"
                    className="r3-panel-close"
                    onClick={closePanel}
                    aria-label="Zamknij panel"
                >
                    ×
                </button>

                {komunikat && (
                    <p className="r3-message">{komunikat}</p>
                )}

                {activePanel === 'cipher' && renderCipher()}

                {activePanel === 'papyrusTravel' &&
                    renderPapyrus('Przepowiednia o czterech podróżach Ra', TEKSTY.papirusDroga)}

                {activePanel === 'papyrusHistory' &&
                    renderPapyrus('Kroniki królewskiego grobowca', TEKSTY.papirusHistoria)}

                {activePanel === 'papyrusDamaged' &&
                    renderPapyrus('Uszkodzony papirus', TEKSTY.papirusUszkodzony)}

                {activePanel === 'papyrusNotes' &&
                    renderPapyrus('Notatki badacza', TEKSTY.papirusNotatki)}

                {activePanel === 'map' && renderMap()}

                {activePanel === 'guardians' && renderGuardians()}

                {activePanel === 'wallOpened' && (
                    <div className="r3-panel-content">
                        <h2>Ukryte przejście</h2>
                        <p>
                            Kamienna ściana powoli przesunęła się,
                            odsłaniając ukrytą część komnaty.
                        </p>
                        <p>
                            Na ścianie pojawiła się zagadka Sfinksa.
                            Odpowiedź należy zapisać za pomocą pięciu hieroglifów.
                        </p>
                    </div>
                )}

                {activePanel === 'sphinx' && renderSphinx()}

                {activePanel === 'keysFound' && renderKeys()}

                {activePanel === 'doors' && renderDoors()}
            </div>
        </div>
    )
}
