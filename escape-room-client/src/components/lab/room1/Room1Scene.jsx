// Laboratorium – Pokój 1: scena (widok główny + zbliżenia stołu, drzwi i skrzynki)
// US-06: Rozwiązywanie zagadek pomieszczenie 1 labolatorium -> scena z klikalnymi obiektami i celami upuszczenia
import { ImageWithFallback, ItemIcon } from './ImageWithFallback'
import { OBRAZY, PRZEDMIOTY, UKLAD } from './data'

const pozycja = ([x, y, w, h]) => ({ left: `${x}%`, top: `${y}%`, width: `${w}%`, height: `${h}%` })

// Klikalny obiekt sceny, który jest jednocześnie celem upuszczenia
function Hotspot({ id, rect, label, room, dnd, className = '', children }) {
    return (
        <button
            type="button"
            className={`lab1-hotspot ${className} ${dnd.nadCelem === id ? 'is-target' : ''}`}
            style={rect ? pozycja(rect) : undefined}
            aria-label={label}
            title={label}
            data-label={label}
            onClick={() => room.kliknij(id)}
            {...dnd.propsCelu(id)}
        >
            {children}
        </button>
    )
}

// Tło widoku; gdy pliku brak, rysujemy gradient i pokazujemy podpisy hotspotów (CSS: .lab1-bg-fallback ~ …)
function Tlo({ src, alt, wariant }) {
    return (
        <ImageWithFallback
            key={src}
            src={src}
            alt={alt}
            className="lab1-bg"
            fallback={<div className={`lab1-bg lab1-bg-fallback lab1-bg-fallback--${wariant}`} role="img" aria-label={alt} />}
        />
    )
}

// US-08: Ukończenie pokoju pomieszczenie 1 labolatorium -> jasnoniebieskie kółko w otwartych drzwiach
function Wyjscie({ srodek, room }) {
    const [x, y] = srodek
    return (
        <button
            type="button"
            className="lab1-exit"
            style={{ left: `${x}%`, top: `${y}%` }}
            aria-label="Przejdź do kolejnego pomieszczenia"
            title="Przejdź dalej"
            onClick={() => room.kliknij('wyjscie')}
        />
    )
}

function Wroc({ room }) {
    return (
        <button type="button" className="lab1-back" onClick={() => room.kliknij('wroc')}>
            ← Wróć do laboratorium
        </button>
    )
}

// US-06: Rozwiązywanie zagadek pomieszczenie 1 labolatorium -> widok główny: ściereczka, śrubokręt, skrzynka, notatka #2, neutralizator, drzwi
function WidokPokoj({ room, dnd }) {
    const { stan, drzwiOtwarte } = room
    const u = UKLAD.pokoj
    const [cx, cy, cw, ch] = u.sciereczka

    return (
        <>
            <Tlo src={OBRAZY.pokoj} alt="Laboratorium chemiczne dr. Vance’a" wariant="pokoj" />

            {!stan.sciereczkaOdsunieta && (
                <Hotspot id="sciereczka" rect={u.sciereczka} label="Brudna ściereczka" room={room} dnd={dnd} />
            )}
            {stan.sciereczkaOdsunieta && !stan.srubokretZabrany && (
                <Hotspot
                    id="srubokret"
                    rect={[cx + cw * 0.18, cy + ch * 0.12, cw * 0.64, ch * 0.76]}
                    label="Śrubokręt – zabierz"
                    room={room}
                    dnd={dnd}
                    className="lab1-pickup"
                >
                    <ItemIcon przedmiot={PRZEDMIOTY.srubokret} />
                </Hotspot>
            )}

            <Hotspot
                id="skrzynka"
                rect={u.skrzynka}
                label={stan.oslonaZdjeta ? 'Otwarta skrzynka' : 'Metalowa skrzynka – osłona na śrubkach'}
                room={room}
                dnd={dnd}
                className={stan.oslonaZdjeta ? 'lab1-box is-open' : 'lab1-box'}
            >
                {!stan.oslonaZdjeta && (
                    <span className="lab1-screws" aria-hidden="true">
                        <i /><i /><i /><i />
                    </span>
                )}
            </Hotspot>

            {!stan.notatka2Zabrana && (
                <Hotspot id="notatka2" rect={u.notatka2} label="Plik notatek" room={room} dnd={dnd} className="lab1-glint" />
            )}

            <Hotspot id="stol" rect={u.stol} label="Stół z kolbami – podejdź bliżej" room={room} dnd={dnd} />

            {!stan.neutralizatorZabrany && (
                <Hotspot id="neutralizator" rect={u.neutralizator} label="Kanister „NEUTRALIZER 06”" room={room} dnd={dnd} />
            )}

            <Hotspot
                id="drzwi"
                rect={u.drzwi}
                label={drzwiOtwarte ? 'Otwarte drzwi' : 'Drzwi wyjściowe – podejdź bliżej'}
                room={room}
                dnd={dnd}
                className={drzwiOtwarte ? 'lab1-door-open' : ''}
            />
            {/* US-08: Ukończenie pokoju pomieszczenie 1 labolatorium -> wyjście w widoku głównym */}
            {drzwiOtwarte && <Wyjscie srodek={u.wyjscie} room={room} />}
        </>
    )
}

// US-06: Rozwiązywanie zagadek pomieszczenie 1 labolatorium -> zbliżenie stołu: kolby A/B/C i tablica barw
function WidokStol({ room, dnd }) {
    const { stan } = room
    const u = UKLAD.stol

    return (
        <>
            <Tlo src={OBRAZY.stol} alt="Stół z kolbami A, B i C" wariant="stol" />

            {stan.kolbaB && (
                <>
                    <div className="lab1-liquid lab1-liquid--emerald" style={pozycja(u.cieczB)} aria-hidden="true" />
                    <div className="lab1-digit" style={{ left: `${u.kolbaB[0] + u.kolbaB[2] / 2}%`, top: `${u.kolbaB[1] + 2}%` }}>
                        7
                    </div>
                </>
            )}
            {stan.piana && (
                <div
                    key={stan.piana + room.dziennik.length}
                    className="lab1-liquid lab1-foam"
                    style={pozycja(stan.piana === 'kolbaA' ? u.cieczA : u.cieczC)}
                    onAnimationEnd={room.zakonczPiane}
                    aria-hidden="true"
                />
            )}

            <Hotspot id="tablica" rect={u.tablica} label="Tablica wskaźników barw" room={room} dnd={dnd} />
            <Hotspot id="dziennik" rect={u.dziennik} label="Dziennik eksperymentu" room={room} dnd={dnd} />
            <Hotspot id="kolbaA" rect={u.kolbaA} label="Kolba A" room={room} dnd={dnd} className="lab1-flask" />
            <Hotspot
                id="kolbaB"
                rect={u.kolbaB}
                label={stan.kolbaB ? 'Kolba B – szmaragdowa' : 'Kolba B'}
                room={room}
                dnd={dnd}
                className="lab1-flask"
            />
            <Hotspot id="kolbaC" rect={u.kolbaC} label="Kolba C" room={room} dnd={dnd} className="lab1-flask" />

            <Wroc room={room} />
        </>
    )
}

// US-06: Rozwiązywanie zagadek pomieszczenie 1 labolatorium -> zbliżenie drzwi: zamek szyfrowy i zawór
function WidokDrzwi({ room, dnd }) {
    const { stan, drzwiOtwarte } = room
    const u = UKLAD.drzwi

    return (
        <>
            <Tlo src={OBRAZY.drzwi} alt="Drzwi z zamkiem szyfrowym i zaworem" wariant="drzwi" />

            {stan.zamekZwolniony && (
                <div className="lab1-screen-ok" style={pozycja(u.ekran)} aria-hidden="true">
                    UNLOCKED
                </div>
            )}
            {stan.zaworZneutralizowany && (
                <div className="lab1-valve-ok" style={pozycja(u.zawor)} aria-hidden="true" />
            )}
            {/* US-08: Ukończenie pokoju pomieszczenie 1 labolatorium -> otwarte skrzydło drzwi */}
            {drzwiOtwarte && <div className="lab1-door-gap" style={pozycja(u.skrzydlo)} aria-hidden="true" />}

            <Hotspot
                id="zamek"
                rect={u.zamek}
                label={stan.zamekZwolniony ? 'Zamek szyfrowy – zwolniony' : 'Zamek szyfrowy'}
                room={room}
                dnd={dnd}
            />
            <Hotspot
                id="zawor"
                rect={u.zawor}
                label={stan.zaworZneutralizowany ? 'Zawór – zneutralizowany' : 'Zablokowany zawór'}
                room={room}
                dnd={dnd}
                className="lab1-round"
            />
            {!drzwiOtwarte && <Hotspot id="klamka" rect={u.klamka} label="Klamka drzwi" room={room} dnd={dnd} />}
            {/* US-08: Ukończenie pokoju pomieszczenie 1 labolatorium -> wyjście w zbliżeniu drzwi */}
            {drzwiOtwarte && <Wyjscie srodek={u.wyjscie} room={room} />}

            <Wroc room={room} />
        </>
    )
}

// US-06: Rozwiązywanie zagadek pomieszczenie 1 labolatorium -> wnętrze skrzynki: odczynnik X i notatka #1
function WidokSkrzynka({ room, dnd }) {
    const { stan } = room
    const pusta = stan.odczynnikZabrany && stan.notatka1Zabrana

    return (
        <>
            <div className="lab1-bg lab1-crate" aria-hidden="true">
                <span className="lab1-crate-cover" />
            </div>

            <div className="lab1-crate-items">
                {!stan.odczynnikZabrany && (
                    <Hotspot id="odczynnik" label="Odczynnik „X” – zabierz" room={room} dnd={dnd} className="lab1-crate-item">
                        <ItemIcon przedmiot={PRZEDMIOTY.odczynnik} />
                        <span>Odczynnik „X”</span>
                    </Hotspot>
                )}
                {!stan.notatka1Zabrana && (
                    <Hotspot id="notatka1" label="Notatka #1 – zabierz" room={room} dnd={dnd} className="lab1-crate-item lab1-crate-note">
                        <span className="lab1-paper-mini">Uwaga…</span>
                        <span>Notatka #1</span>
                    </Hotspot>
                )}
                {pusta && <p className="lab1-crate-empty">Skrzynka jest już pusta.</p>}
            </div>

            <Wroc room={room} />
        </>
    )
}

const WIDOKI = { pokoj: WidokPokoj, stol: WidokStol, drzwi: WidokDrzwi, skrzynka: WidokSkrzynka }

export function Room1Scene({ room, dnd }) {
    const Widok = WIDOKI[room.widok] ?? WidokPokoj
    return (
        <div className={`lab1-stage lab1-stage--${room.widok} ${dnd.trwa ? 'is-dragging' : ''} ${room.wybrany ? 'is-aiming' : ''}`}>
            <Widok room={room} dnd={dnd} />
        </div>
    )
}
