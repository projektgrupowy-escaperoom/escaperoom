import { useState } from 'react'
import { createPortal } from 'react-dom'
import { useRoom3 } from './useRoom3'
import Room3Scene from './Room3Scene'
import Room3Panels from './Room3Panels'
import './room3.css'

export default function Room3({ onNextRoom }) {
    const [introVisible, setIntroVisible] = useState(true)
    const room = useRoom3({ onNextRoom })

    const content = introVisible ? (
        <main className="room3-intro">
            <div className="room3-intro-content">
                <h1>Komnata Zapomnianych Strażników</h1>

                <p>
                    Schodzisz po wąskich, kamiennych schodach coraz głębiej
                    pod powierzchnię ziemi. Powietrze staje się ciężkie,
                    a jedynym źródłem światła są płomienie pochodni
                    umieszczonych w ścianach.
                </p>

                <p>
                    Na końcu schodów otwiera się przed tobą ogromna komnata.
                    W jej centrum znajdują się cztery tajemnicze posągi,
                    a po przeciwnej stronie widać masywne, zamknięte drzwi.
                </p>

                <p>
                    Na stole leżą stare papirusy i mapa.
                    Wygląda na to, że ktoś pozostawił tu wskazówki.
                </p>

                <button
                    type="button"
                    className="r3-action-button"
                    onClick={() => setIntroVisible(false)}
                >
                    Wejdź do komnaty
                </button>
            </div>
        </main>
    ) : (
        <main className="room3-page">
            <div className="room3-header">
                <h1>Komnata Zapomnianych Strażników</h1>
            </div>

            <Room3Scene
                openPanel={room.openPanel}
                znajdzZwoj={room.znajdzZwoj}
                straznicyOdkryci={room.straznicyOdkryci}
                kluczeZdobyte={room.kluczeZdobyte}
                bramaOtwarta={room.bramaOtwarta}
            />


                <Room3Panels
                    {...room}
                    przejdzDalej={onNextRoom}
                />

        </main>
    )

    return createPortal(content, document.body)
}