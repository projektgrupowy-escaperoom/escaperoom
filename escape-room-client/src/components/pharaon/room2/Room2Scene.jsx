// US 06: Rozwiązywanie zagadek pomieszczenie 2 -> widok komnaty Anubisa
// Komponent zwraca fragment, bo style w room2.css opierają się na selektorze rodzeństwa (.game-anubis-room ~ ...)
import { OBRAZY, POCHODNIE, TEKSTY } from './data'
import './room2.css'

export function Room2Scene({ room2, onNextRoom }) {
    const { bramaOtwarta, znalezionoPioro, punkty, kliknijNisze, kliknijSerce } = room2

    return (
        <>
            <img
                src={bramaOtwarta ? OBRAZY.komnataOtwarta : OBRAZY.komnata}
                alt="Komnata Anubisa"
                className="game-anubis-room"
            />

            {bramaOtwarta ? (
                // Przejście do pomieszczenia 3
                <button
                    type="button"
                    className="game-passage-button game-room3-button"
                    aria-label="Przejdź do kolejnej komnaty"
                    onClick={onNextRoom}
                />
            ) : (
                <>
                    {/* Animowany ogień na zapalonych pochodniach */}
                    {POCHODNIE.filter((p) => p.plomien).map(({ symbol, plomien: [x, y, skala, opoznienie] }) => (
                        <span
                            key={symbol}
                            className="torch-fire torch-fire-room2"
                            aria-hidden="true"
                            style={{ left: `${x}%`, top: `${y}%`, transform: `scale(${skala})`, '--flame-delay': `${opoznienie}s` }}
                        >
                            <span className="torch-glow" />
                            <span className="torch-flame" />
                            <span className="torch-flame torch-flame-inner" />
                        </span>
                    ))}

                    <button
                        type="button"
                        className="game-passage-button game-maat-button"
                        aria-label="Ołtarz bogini Maat"
                        onClick={kliknijNisze}
                    />

                    {znalezionoPioro && (
                        <button
                            type="button"
                            className="game-passage-button game-heart-button"
                            aria-label="Serce za kratą"
                            onClick={kliknijSerce}
                        />
                    )}

                    {punkty.map(([nazwa, x, y, w, h, akcja], i) => (
                        <button
                            key={i}
                            type="button"
                            className="game-c2-spot"
                            aria-label={nazwa}
                            style={{ left: `${x}%`, top: `${y}%`, width: `${w}%`, height: `${h}%` }}
                            onClick={akcja}
                        />
                    ))}
                </>
            )}
        </>
    )
}

// Ekran wejścia do komnaty, wyświetlany po przejściu przez bramę z pokoju 1
export function Room2Intro({ onDalej }) {
    return (
        <div className="game-panel-overlay">
            <div className="game-panel">
                <p>{TEKSTY.wstep}</p>

                <button type="button" className="game-riddle-button" onClick={onDalej}>
                    Dalej
                </button>
            </div>
        </div>
    )
}
