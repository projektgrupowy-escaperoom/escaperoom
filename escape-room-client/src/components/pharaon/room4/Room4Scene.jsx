
import { FRAGMENTY_PIECZECI } from './data'

export default function Room4Scene({
    openPanel,
    znajdzFragment,
    obeliskiUstawione,
    lustraUstawione,
    znalezioneFragmenty,
    pieczecZlozona,
    bramaOtwarta,
}) {
    return (
        <div className="game-room4-container">
            <img
                className="game-room4-background"
                src="/images/pharaon/room4/sanktuarium.png"
                alt="Sanktuarium Wiecznego Słońca"
            />

            {/* Papirus z przepowiednią */}
            <button
                type="button"
                className="game-r4-hotspot r4-papyrus"
                onClick={() => openPanel('papirus')}
                aria-label="Papirus z przepowiednią"
                title="Papirus"
            />

            {/* Cztery obeliski */}
            <button
                type="button"
                className="game-r4-hotspot r4-obelisks"
                onClick={() => openPanel('obeliski')}
                aria-label="Cztery obeliski"
                title="Obeliski"
            />

            {/* Mechanizm zwierciadeł */}
            {obeliskiUstawione && (
                <button
                    type="button"
                    className="game-r4-hotspot r4-mirrors"
                    onClick={() => openPanel('lustra')}
                    aria-label="Mechanizm zwierciadeł"
                    title="Zwierciadła"
                />
            )}

            {/* Trzy fragmenty pieczęci */}
            {lustraUstawione &&
                FRAGMENTY_PIECZECI.map((fragment) => (
                    <button
                        key={fragment.id}
                        type="button"
                        className={`game-r4-hotspot r4-fragment-${fragment.id}`}
                        onClick={() => znajdzFragment(fragment.id)}
                        disabled={znalezioneFragmenty.includes(fragment.id)}
                        aria-label={fragment.nazwa}
                        title={fragment.nazwa}
                    />
                ))}

            {/* Ołtarz do złożenia pieczęci */}
            {lustraUstawione && (
                <button
                    type="button"
                    className="game-r4-hotspot r4-altar"
                    onClick={() => openPanel('fragmenty')}
                    aria-label="Ołtarz pieczęci faraona"
                    title="Ołtarz pieczęci"
                />
            )}

            {/* Ostatnia brama */}
            <button
                type="button"
                className="game-r4-hotspot r4-exit"
                onClick={() => openPanel('brama')}
                aria-label="Ostatnia brama świątyni"
                title="Brama wyjściowa"
            />

            {/* Informacje o postępie */}
            {pieczecZlozona && !bramaOtwarta && (
                <div className="r4-scene-status">
                    Pieczęć faraona jest gotowa!
                </div>
            )}

            {bramaOtwarta && (
                <div className="r4-scene-status r4-scene-success">
                    Brama została otwarta! Możesz opuścić świątynię.
                </div>
            )}
        </div>
    )
}
