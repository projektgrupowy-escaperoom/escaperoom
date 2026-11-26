// Obrazek z zapasowym widokiem – brak pliku w public/ nie wywala gry
// US-06: Rozwiązywanie zagadek pomieszczenie 1 labolatorium -> grafiki sceny i przedmiotów z fallbackiem
import { useState } from 'react'

export function ImageWithFallback({ src, alt, className, fallback = null, onStatus }) {
    const [blad, setBlad] = useState(false)

    if (!src || blad) return fallback

    return (
        <img
            src={src}
            alt={alt}
            className={className}
            draggable={false}
            onLoad={() => onStatus?.(true)}
            onError={() => {
                setBlad(true)
                onStatus?.(false)
            }}
        />
    )
}

// Miniatura przedmiotu: grafika albo emoji, gdy grafiki brak
export function ItemIcon({ przedmiot, className = '' }) {
    return (
        <ImageWithFallback
            src={przedmiot.obraz}
            alt={przedmiot.nazwa}
            className={`lab1-item-img ${className}`}
            fallback={<span className={`lab1-item-emoji ${className}`} aria-hidden="true">{przedmiot.ikona}</span>}
        />
    )
}
