// Laboratorium – Pokój 1: okna – intro, wiadomość Vance'a, notatki, zamek szyfrowy, ekran przejścia
import { useEffect, useState } from 'react'
import { KOD_ZAMKA, NOTATKI, TEKSTY } from './data'

function Okno({ children, onClose, className = '', etykieta }) {
    useEffect(() => {
        if (!onClose) return undefined
        const esc = (e) => e.key === 'Escape' && onClose()
        window.addEventListener('keydown', esc)
        return () => window.removeEventListener('keydown', esc)
    }, [onClose])

    return (
        <div className="lab1-overlay" onClick={onClose} role="presentation">
            <div
                className={`lab1-modal ${className}`}
                role="dialog"
                aria-modal="true"
                aria-label={etykieta}
                onClick={(e) => e.stopPropagation()}
            >
                {children}
            </div>
        </div>
    )
}

// US-06: Rozwiązywanie zagadek pomieszczenie 1 labolatorium -> intro fabularne i wiadomość dr. Vance'a
export function IntroScreen({ faza, onNext, onStart }) {
    if (faza === 'intro') {
        return (
            <div className="lab1-overlay lab1-overlay--solid">
                <div className="lab1-modal lab1-intro" role="dialog" aria-modal="true" aria-label="Wstęp">
                    <p className="lab1-kicker">Pokój 1</p>
                    <h1>Klatka Reakcyjna</h1>
                    <p className="lab1-story">{TEKSTY.intro}</p>
                    <button type="button" className="lab1-btn lab1-btn--big" onClick={onNext} autoFocus>
                        Rozejrzyj się
                    </button>
                </div>
            </div>
        )
    }
    return (
        <div className="lab1-overlay lab1-overlay--solid">
            <div className="lab1-modal lab1-intro lab1-voice" role="dialog" aria-modal="true" aria-label="Wiadomość dr. Vance'a">
                <p className="lab1-kicker">📢 Głośnik pod sufitem trzeszczy…</p>
                <h2>{NOTATKI.vance.tytul}</h2>
                <blockquote>{TEKSTY.vance}</blockquote>
                <p className="lab1-muted">Wiadomość możesz przeczytać ponownie w lupce 🔍.</p>
                <button type="button" className="lab1-btn lab1-btn--big" onClick={onStart} autoFocus>
                    Rozpocznij
                </button>
            </div>
        </div>
    )
}

// US-06: Rozwiązywanie zagadek pomieszczenie 1 labolatorium -> okno notatki (#1, #2, tablica barw, wiadomość Vance'a)
export function NoteModal({ id, onClose }) {
    const n = NOTATKI[id]
    if (!n) return null
    return (
        <Okno onClose={onClose} className={`lab1-note lab1-note--${n.styl}`} etykieta={n.tytul}>
            <h2>{n.tytul}</h2>
            {n.styl === 'tablica' ? (
                <ul className="lab1-colors">
                    <li><span style={{ background: '#d99a1e' }} />Bursztynowy = 3</li>
                    <li><span style={{ background: '#10b981' }} />Szmaragdowy = 7</li>
                    <li><span style={{ background: '#8b3fd9' }} />Fioletowy = 5</li>
                </ul>
            ) : (
                <p>{n.tresc}</p>
            )}
            <button type="button" className="lab1-btn" onClick={onClose} autoFocus>Zamknij</button>
        </Okno>
    )
}

// US-06: Rozwiązywanie zagadek pomieszczenie 1 labolatorium -> zamek szyfrowy przy drzwiach
const KLAWISZE = ['1', '2', '3', '4', '5', '6', '7', '8', '9', 'C', '0', 'OK']

export function KeypadModal({ onSubmit, onClose }) {
    const [kod, setKod] = useState('')
    const [blad, setBlad] = useState(false)

    const nacisnij = (k) => {
        if (k === 'C') {
            setKod('')
            return setBlad(false)
        }
        if (k === 'OK') {
            if (kod.length < KOD_ZAMKA.length) return undefined
            const ok = onSubmit(kod)
            if (!ok) {
                setBlad(true)
                setKod('')
            }
            return undefined
        }
        setBlad(false)
        setKod((c) => (c.length < KOD_ZAMKA.length ? c + k : c))
        return undefined
    }

    useEffect(() => {
        const klawiatura = (e) => {
            const obslugiwany = /^\d$/.test(e.key) || e.key === 'Backspace' || e.key === 'Enter'
            if (!obslugiwany) return
            // Bez tego Enter na sfokusowanym przycisku wywołałby dodatkowo jego kliknięcie
            e.preventDefault()
            if (e.key === 'Backspace') setKod((c) => c.slice(0, -1))
            else if (e.key === 'Enter') nacisnij('OK')
            else nacisnij(e.key)
        }
        window.addEventListener('keydown', klawiatura)
        return () => window.removeEventListener('keydown', klawiatura)
    })

    return (
        <Okno onClose={onClose} className="lab1-keypad" etykieta="Zamek szyfrowy">
            <p className="lab1-kicker">Zamek elektroniczny · drzwi wyjściowe</p>
            <div className={`lab1-display ${blad ? 'is-error' : ''}`} aria-live="polite">
                {Array.from({ length: KOD_ZAMKA.length }, (_, i) => (
                    <span key={i}>{kod[i] ?? '–'}</span>
                ))}
            </div>
            {blad && <p className="lab1-error">{TEKSTY.zlyKod}</p>}
            <div className="lab1-keys">
                {KLAWISZE.map((k) => (
                    <button
                        key={k}
                        type="button"
                        className={k === 'C' ? 'is-clear' : k === 'OK' ? 'is-ok' : ''}
                        onClick={() => nacisnij(k)}
                        aria-label={k === 'C' ? 'Wyczyść' : k === 'OK' ? 'Zatwierdź' : k}
                    >
                        {k === 'OK' ? '↵' : k}
                    </button>
                ))}
            </div>
            <button type="button" className="lab1-btn lab1-btn--ghost" onClick={onClose}>Odejdź od zamka</button>
        </Okno>
    )
}

// US-08: Ukończenie pokoju pomieszczenie 1 labolatorium -> ekran przejścia do Pokoju 2
export function TransitionScreen({ onRestart }) {
    return (
        <div className="lab1-overlay lab1-overlay--solid lab1-transition" data-state="room2-transition">
            <div className="lab1-modal lab1-intro">
                <div className="lab1-portal" aria-hidden="true" />
                <p className="lab1-story">{TEKSTY.wyjscie}</p>
                <p className="lab1-kicker">Pokój 1 ukończony · Następny: Pokój 2</p>
                <button type="button" className="lab1-btn lab1-btn--ghost" onClick={onRestart}>
                    Zagraj ponownie w Pokój 1
                </button>
            </div>
        </div>
    )
}
