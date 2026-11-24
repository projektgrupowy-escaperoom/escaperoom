
import { OBRAZY } from './data'

export default function Room3Scene({
    openPanel,
    znajdzZwoj,
    straznicyOdkryci,
    kluczeZdobyte,
    bramaOtwarta,
}) {
    return (
        <div className="game-room3-container">
            <img
                className="game-room3-background"
                src={OBRAZY.komnata}
                alt="Komnata Zapomnianych Strażników"
            />

            {/* Papirus przy mumii */}
            <button
                type="button"
                className="game-r3-hotspot r3-mummy-papyrus"
                onClick={znajdzZwoj}
                aria-label="Papirus przy mumii"
            />

            {/* Cztery głowy strażników */}
            <button
                type="button"
                className="game-r3-hotspot r3-guardians"
                onClick={() => openPanel('guardians')}
                aria-label="Posągi czterech strażników"
            />

            {/* Papirus na stole - podróż strażnika */}
            <button
                type="button"
                className="game-r3-hotspot r3-scroll-one"
                onClick={() => openPanel('papyrusTravel')}
                aria-label="Papirus z opisem podróży"
            />

            {/* Papirus historyczny */}
            <button
                type="button"
                className="game-r3-hotspot r3-scroll-two"
                onClick={() => openPanel('papyrusHistory')}
                aria-label="Papirus historyczny"
            />

            {/* Mapa */}
            <button
                type="button"
                className="game-r3-hotspot r3-map"
                onClick={() => openPanel('map')}
                aria-label="Mapa komnaty"
            />

            {/* Uszkodzony papirus */}
            <button
                type="button"
                className="game-r3-hotspot r3-scroll-three"
                onClick={() => openPanel('papyrusDamaged')}
                aria-label="Uszkodzony papirus"
            />

            {/* Notatki badacza */}
            <button
                type="button"
                className="game-r3-hotspot r3-scroll-four"
                onClick={() => openPanel('papyrusNotes')}
                aria-label="Notatki badacza"
            />

            {/* Ukryta zagadka pojawia się po rozwiązaniu pierwszej */}
            {straznicyOdkryci && (
                <>
                    <div className="r3-wall-opening">
                        <span>UKRYTA KOMNATA</span>
                    </div>

                    <button
                        type="button"
                        className="game-r3-hotspot r3-hidden-riddle"
                        onClick={() => openPanel('sphinx')}
                        aria-label="Zagadka Sfinksa"
                    />
                </>
            )}

            {/* Drzwi można otworzyć dopiero po zdobyciu kluczy */}
            {kluczeZdobyte && (
                <button
                    type="button"
                    className="game-r3-hotspot r3-door"
                    onClick={() => openPanel('doors')}
                    aria-label="Brama czterech strażników"
                />
            )}

            {bramaOtwarta && (
                <div className="r3-gate-status">
                    Brama została otwarta
                </div>
            )}
        </div>
    )
}
