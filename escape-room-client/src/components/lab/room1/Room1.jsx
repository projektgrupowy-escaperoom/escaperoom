// Opuszczone laboratorium – Pokój 1: Klatka Reakcyjna (Lab. Chemii 01)
// Point-and-click + drag & drop. Bez timera.
// US-06: Rozwiązywanie zagadek pomieszczenie 1 labolatorium -> główny komponent pokoju
import { useState } from 'react'
import { useRoom1 } from './useRoom1'
import { useDragAndDrop } from './useDragAndDrop'
import { Room1Scene } from './Room1Scene'
import { MessageBar, Room1Hud } from './Room1Hud'
import { IntroScreen, KeypadModal, NoteModal, TransitionScreen } from './Room1Modals'
import './room1.css'

function Room1Game({ onEnterNextRoom, onRestart }) {
    const room = useRoom1({ onEnterNextRoom })
    const dnd = useDragAndDrop({ onDrop: room.uzyj, onTap: room.dotknijPrzedmiotu })

    return (
        <div className={`lab1 ${dnd.trwa ? 'is-dragging' : ''}`}>
            <div className="lab1-frame">
                <Room1Hud room={room} dnd={dnd} />
                <Room1Scene room={room} dnd={dnd} />
                <MessageBar tekst={room.komunikat} />
            </div>

            {(room.faza === 'intro' || room.faza === 'vance') && (
                <IntroScreen faza={room.faza} onNext={room.zakonczIntro} onStart={room.rozpocznijGre} />
            )}
            {room.otwartaNotatka && <NoteModal id={room.otwartaNotatka} onClose={room.zamknijNotatke} />}
            {room.zamekOtwarty && <KeypadModal onSubmit={room.wpiszKod} onClose={room.zamknijZamek} />}
            {/* US-08: Ukończenie pokoju pomieszczenie 1 labolatorium -> ekran po wyjściu z pokoju */}
            {room.faza === 'przejscie' && <TransitionScreen onRestart={onRestart} />}
        </div>
    )
}

/**
 * US-08: Ukończenie pokoju pomieszczenie 1 labolatorium -> onEnterNextRoom i ponowna gra
 * @param {{ onEnterNextRoom?: () => void }} props – wywoływane po kliknięciu jasnoniebieskiego kółka
 */
export default function Room1({ onEnterNextRoom }) {
    // Zmiana klucza = pełny reset pokoju
    const [przebieg, setPrzebieg] = useState(0)
    return (
        <Room1Game
            key={przebieg}
            onEnterNextRoom={onEnterNextRoom}
            onRestart={() => setPrzebieg((n) => n + 1)}
        />
    )
}
