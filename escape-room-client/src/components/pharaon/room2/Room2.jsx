// US 06: Rozwiązywanie zagadek pomieszczenie 2 -> komnata Anubisa w całości (wstęp, scena i własne okna)
// Zwraca fragment, bo style w room2.css opierają się na selektorze rodzeństwa (.game-anubis-room ~ ...)
import { useState } from 'react'
import { useRoom2 } from './useRoom2'
import { Room2Intro, Room2Scene } from './Room2Scene'
import { Room2Panels } from './Room2Panels'

export default function Room2({ chamber, setChamber, setFoundObjects }) {
    const [activePanel, setActivePanel] = useState(null)
    const room2 = useRoom2({ openPanel: setActivePanel, setFoundObjects })

    const closePanel = () => {
        setActivePanel(null)
        // Po położeniu serca i pióra na wadze zamknięcie komunikatu pokazuje ostatni obraz komnaty
        room2.poZamknieciuPanelu()
    }

    return (
        <>
            {chamber === 'anubis' && <Room2Scene room2={room2} />}

            {chamber === 'intro' && <Room2Intro onDalej={() => setChamber('anubis')} />}

            {activePanel && (
                <div className="game-panel-overlay" onClick={closePanel}>
                    <div className="game-panel" onClick={(event) => event.stopPropagation()}>
                        <button type="button" className="game-panel-close" onClick={closePanel} aria-label="Zamknij okno">
                            ×
                        </button>

                        <Room2Panels activePanel={activePanel} closePanel={closePanel} room2={room2} />
                    </div>
                </div>
            )}
        </>
    )
}
