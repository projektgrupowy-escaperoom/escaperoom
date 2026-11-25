
import { useState } from 'react'
import { createPortal } from 'react-dom'
import { useRoom4 } from './useRoom4'
import { NAZWA_KOMNATY, HISTORIA } from './data'
import Room4Scene from './Room4Scene'
import Room4Panels from './Room4Panels'
import './room4.css'

export default function Room4({ onFinish }) {
    const [introVisible, setIntroVisible] = useState(true)
    const room = useRoom4()

    const content = introVisible ? (
        <main className="room4-intro">
            <div className="room4-intro-content">
                <h1>{NAZWA_KOMNATY}</h1>

                <p className="room4-intro-story">
                    {HISTORIA.wstep}
                </p>

                <button
                    type="button"
                    className="r4-action-button"
                    onClick={() => setIntroVisible(false)}
                >
                    Wejdź do sanktuarium
                </button>
            </div>
        </main>
    ) : (
        <main className="room4-page">
            <header className="room4-header">
                <h1>{NAZWA_KOMNATY}</h1>
                <p>
                    Przywróć światło Ra i otwórz ostatnią
                    bramę prowadzącą na wolność.
                </p>
            </header>

            <Room4Scene
                {...room}
            />

            <Room4Panels
                {...room}
                onFinish={onFinish}
            />

            
        </main>
    )

    return createPortal(content, document.body)
}
