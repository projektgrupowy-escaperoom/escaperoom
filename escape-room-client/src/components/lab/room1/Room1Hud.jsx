// Laboratorium – Pokój 1: interfejs – lupka (podpowiedzi), plecak, pasek komunikatów, „duszek” przeciągania
import { useState } from 'react'
import { ItemIcon } from './ImageWithFallback'
import { NAZWY_WIDOKOW, NOTATKI, PODPOWIEDZI, PRZEDMIOTY, TEKSTY } from './data'

// US-07: Podpowiedzi pomieszczenie 1 labolatorium -> panel lupki: stopniowane podpowiedzi, notatki i dziennik zdarzeń
function PanelLupka({ room, odkryte, setOdkryte }) {
    const { etap, notatki, dziennik, otworzNotatke } = room
    const lista = PODPOWIEDZI[etap]
    const ile = Math.max(odkryte[etap] ?? 0, etap === 6 ? 1 : 0)

    return (
        <section className="lab1-panel" aria-label="Podpowiedzi">
            <header className="lab1-panel-head">
                <h2>🔍 Podpowiedzi</h2>
                <button type="button" className="lab1-close" onClick={room.zamknijPanel} aria-label="Zamknij">×</button>
            </header>

            <p className="lab1-stage-label">{etap <= 5 ? `Etap ${etap} z 5` : 'Wyjście'}</p>
            <div className="lab1-progress" aria-hidden="true">
                {[1, 2, 3, 4, 5].map((n) => (
                    <span key={n} className={n < etap ? 'done' : n === etap ? 'now' : ''} />
                ))}
            </div>

            {ile === 0 && <p className="lab1-muted">Utknąłeś? Odsłaniaj podpowiedzi po jednej – od najdelikatniejszej.</p>}
            <ol className="lab1-hints">
                {lista.slice(0, ile).map((p) => <li key={p}>{p}</li>)}
            </ol>
            {ile < lista.length && (
                <button type="button" className="lab1-btn" onClick={() => setOdkryte((o) => ({ ...o, [etap]: ile + 1 }))}>
                    Pokaż podpowiedź ({ile + 1}/{lista.length})
                </button>
            )}

            <h3>Notatki i wskazówki</h3>
            {notatki.length === 0 ? (
                <p className="lab1-muted">Nie znaleziono jeszcze żadnych notatek.</p>
            ) : (
                <ul className="lab1-notes-list">
                    {notatki.map((id) => (
                        <li key={id}>
                            <button type="button" onClick={() => otworzNotatke(id)}>{NOTATKI[id].tytul}</button>
                        </li>
                    ))}
                </ul>
            )}

            <h3>Dziennik zdarzeń</h3>
            <ul className="lab1-log">
                {dziennik.slice(0, 8).map((t, i) => <li key={`${i}-${t}`}>{t}</li>)}
            </ul>
        </section>
    )
}

// US-06: Rozwiązywanie zagadek pomieszczenie 1 labolatorium -> panel plecaka z przedmiotami do przeciągania
function PanelPlecak({ room, dnd }) {
    const { plecak, wybrany } = room
    return (
        <section className={`lab1-panel lab1-panel--bag ${dnd.trwa ? 'is-passthrough' : ''}`} aria-label="Plecak">
            <header className="lab1-panel-head">
                <h2>🎒 Plecak</h2>
                <button type="button" className="lab1-close" onClick={room.zamknijPanel} aria-label="Zamknij">×</button>
            </header>
            <p className="lab1-muted">{plecak.length ? TEKSTY.plecakInstrukcja : TEKSTY.plecakPusty}</p>
            <ul className="lab1-bag">
                {plecak.map((id) => {
                    const p = PRZEDMIOTY[id]
                    const przeciagany = dnd.przeciagany?.id === id
                    return (
                        <li key={id}>
                            <button
                                type="button"
                                className={`lab1-bag-item ${wybrany === id ? 'is-selected' : ''} ${przeciagany ? 'is-ghosted' : ''}`}
                                title={p.rodzaj === 'notatka' ? 'Kliknij, aby przeczytać' : 'Przeciągnij na obiekt na scenie (albo kliknij, aby wybrać)'}
                                {...dnd.propsPrzedmiotu(id)}
                            >
                                <ItemIcon przedmiot={p} />
                                <span>{p.nazwa}</span>
                            </button>
                        </li>
                    )
                })}
            </ul>
        </section>
    )
}

// US-06: Rozwiązywanie zagadek pomieszczenie 1 labolatorium -> górny pasek z przyciskami lupki i plecaka
export function Room1Hud({ room, dnd }) {
    const { panel, plecak, wybrany, widok } = room
    // US-07: Podpowiedzi pomieszczenie 1 labolatorium -> ile podpowiedzi odsłonięto na każdym etapie (przetrwa zamknięcie panelu)
    const [odkryte, setOdkryte] = useState({})

    return (
        <>
            <div className="lab1-topbar">
                <div className="lab1-title">
                    <strong>Klatka Reakcyjna</strong>
                    <span>{NAZWY_WIDOKOW[widok]}</span>
                </div>

                {wybrany && (
                    <button type="button" className="lab1-chip" onClick={room.anulujWybor} title="Anuluj wybór">
                        <ItemIcon przedmiot={PRZEDMIOTY[wybrany]} />
                        {PRZEDMIOTY[wybrany].nazwa} <span aria-hidden="true">×</span>
                    </button>
                )}

                <div className="lab1-tools">
                    {/* US-07: Podpowiedzi pomieszczenie 1 labolatorium -> przycisk lupki */}
                    <button
                        type="button"
                        className={`lab1-tool ${panel === 'lupka' ? 'is-active' : ''}`}
                        onClick={() => room.przelaczPanel('lupka')}
                        aria-label="Lupka – podpowiedzi"
                        title="Lupka – podpowiedzi"
                    >
                        🔍
                    </button>
                    <button
                        type="button"
                        className={`lab1-tool ${panel === 'plecak' ? 'is-active' : ''}`}
                        onClick={() => room.przelaczPanel('plecak')}
                        aria-label="Plecak – ekwipunek"
                        title="Plecak – ekwipunek"
                    >
                        🎒
                        {plecak.length > 0 && <span className="lab1-badge">{plecak.length}</span>}
                    </button>
                </div>
            </div>

            {/* US-07: Podpowiedzi pomieszczenie 1 labolatorium -> otwarty panel lupki */}
            {panel === 'lupka' && <PanelLupka room={room} odkryte={odkryte} setOdkryte={setOdkryte} />}
            {panel === 'plecak' && <PanelPlecak room={room} dnd={dnd} />}

            {dnd.przeciagany && (
                <div className="lab1-ghost" style={{ left: dnd.przeciagany.x, top: dnd.przeciagany.y }} aria-hidden="true">
                    <ItemIcon przedmiot={PRZEDMIOTY[dnd.przeciagany.id]} />
                </div>
            )}
        </>
    )
}

// US-06: Rozwiązywanie zagadek pomieszczenie 1 labolatorium -> pasek komunikatów z feedbackiem akcji gracza
export function MessageBar({ tekst }) {
    return (
        <div className="lab1-message" role="status" aria-live="polite">
            <span className="lab1-message-icon" aria-hidden="true">⚗</span>
            <p key={tekst}>{tekst || '…'}</p>
        </div>
    )
}
