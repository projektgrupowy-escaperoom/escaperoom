// Laboratorium – Pokój 1: przeciąganie przedmiotów z plecaka na scenę.
// US-06: Rozwiązywanie zagadek pomieszczenie 1 labolatorium -> mechanika drag & drop
// Dwa mechanizmy na raz:
//  1) płynne przeciąganie wskaźnikiem (Pointer Events: mysz, dotyk, rysik) z „duszkiem” pod kursorem,
//  2) standardowe HTML5 drag & drop (dataTransfer) jako zapas, gdy Pointer Events nie są dostępne.
// Cele upuszczenia oznacza się atrybutem data-drop-target="<id>".
import { useEffect, useRef, useState } from 'react'

const PROG_PRZECIAGANIA = 6 // px – mniejszy ruch traktujemy jak kliknięcie
const MIME = 'text/plain'

export const WSPIERA_POINTER = typeof window !== 'undefined' && 'PointerEvent' in window

function celPodWskaznikiem(x, y) {
    const el = document.elementFromPoint(x, y)
    return el?.closest('[data-drop-target]')?.getAttribute('data-drop-target') ?? null
}

export function useDragAndDrop({ onDrop, onTap }) {
    const [drag, setDrag] = useState(null) // { id, x, y, ruch }
    const [nadCelem, setNadCelem] = useState(null)
    const sesja = useRef(null)
    const callbacki = useRef({ onDrop, onTap })

    useEffect(() => {
        callbacki.current = { onDrop, onTap }
    })

    const aktywny = drag !== null

    useEffect(() => {
        if (!aktywny) return undefined

        const ruch = (e) => {
            const s = sesja.current
            if (!s || e.pointerId !== s.pointerId) return
            if (!s.ruch && Math.hypot(e.clientX - s.sx, e.clientY - s.sy) > PROG_PRZECIAGANIA) s.ruch = true
            setDrag({ id: s.id, x: e.clientX, y: e.clientY, ruch: s.ruch })
            setNadCelem(s.ruch ? celPodWskaznikiem(e.clientX, e.clientY) : null)
        }
        const koniec = (e, anulowano = false) => {
            const s = sesja.current
            if (!s || e.pointerId !== s.pointerId) return
            sesja.current = null
            setDrag(null)
            setNadCelem(null)
            if (anulowano) return
            if (!s.ruch) return callbacki.current.onTap?.(s.id)
            const cel = celPodWskaznikiem(e.clientX, e.clientY)
            if (cel) callbacki.current.onDrop?.(s.id, cel)
        }
        const puszczenie = (e) => koniec(e)
        const anulowanie = (e) => koniec(e, true)

        window.addEventListener('pointermove', ruch)
        window.addEventListener('pointerup', puszczenie)
        window.addEventListener('pointercancel', anulowanie)
        return () => {
            window.removeEventListener('pointermove', ruch)
            window.removeEventListener('pointerup', puszczenie)
            window.removeEventListener('pointercancel', anulowanie)
        }
    }, [aktywny])

    // Właściwości dla przeciąganego przedmiotu (w plecaku)
    const propsPrzedmiotu = (id) => ({
        draggable: !WSPIERA_POINTER,
        onPointerDown: (e) => {
            if (e.pointerType === 'mouse' && e.button !== 0) return
            e.preventDefault()
            sesja.current = { id, pointerId: e.pointerId, sx: e.clientX, sy: e.clientY, ruch: false }
            setDrag({ id, x: e.clientX, y: e.clientY, ruch: false })
        },
        onDragStart: (e) => {
            e.dataTransfer.setData(MIME, id)
            e.dataTransfer.effectAllowed = 'move'
        },
        // Bez Pointer Events – zwykłe kliknięcie; z nimi – tylko aktywacja klawiaturą (detail === 0)
        onClick: (e) => {
            if (!WSPIERA_POINTER || e.detail === 0) callbacki.current.onTap?.(id)
        },
    })

    // Właściwości dla celu upuszczenia (obiekt na scenie)
    const propsCelu = (id) => ({
        'data-drop-target': id,
        onDragOver: (e) => {
            e.preventDefault()
            e.dataTransfer.dropEffect = 'move'
            if (nadCelem !== id) setNadCelem(id)
        },
        onDragLeave: () => setNadCelem((c) => (c === id ? null : c)),
        onDrop: (e) => {
            e.preventDefault()
            setNadCelem(null)
            const przedmiot = e.dataTransfer.getData(MIME)
            if (przedmiot) callbacki.current.onDrop?.(przedmiot, id)
        },
    })

    return {
        przeciagany: drag?.ruch ? drag : null,
        trwa: Boolean(drag?.ruch),
        nadCelem,
        propsPrzedmiotu,
        propsCelu,
    }
}
