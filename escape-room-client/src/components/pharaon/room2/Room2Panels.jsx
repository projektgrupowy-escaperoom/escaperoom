// US 06: Rozwiązywanie zagadek pomieszczenie 2 -> okna (panele) komnaty Anubisa
import { OBRAZY, SYMBOLE } from './data'

const Akapity = ({ tekst }) => tekst.split('\n\n').map((akapit, i) => <p key={i}>{akapit}</p>)

const Grafika = ({ obraz }) => obraz && (
    <div className="game-object-image">
        <img src={obraz.src} alt={obraz.alt} />
    </div>
)

export function Room2Panels({ activePanel, closePanel, room2 }) {
    const { komunikat, grafika, bloki, obrocBlok, kliknijZamekAnkh, kliknijPrawyOtwor } = room2

    switch (activePanel) {
        case 'komnata2':
            return <p>{komunikat}</p>

        // Komunikat z przyciskiem "Dalej", który wraca do sali głównej
        case 'dalej':
            return (
                <>
                    <Akapity tekst={komunikat} />
                    <Grafika obraz={grafika} />
                    <button type="button" className="game-riddle-button" onClick={closePanel}>
                        Dalej
                    </button>
                </>
            )

        case 'serce':
            return (
                <>
                    <h2>Serce za kratą</h2>
                    <Akapity tekst={komunikat} />
                    <div className="game-object-image">
                        <div className="game-heart-view">
                            <img src={OBRAZY.serceKrata} alt="Kamienne serce za metalową kratą" />
                            <button type="button" className="game-c2-spot game-heart-ankh-lock" aria-label="Otwór w kształcie krzyża Ankh" onClick={kliknijZamekAnkh} />
                            <button type="button" className="game-c2-spot game-heart-right-lock" aria-label="Okrągły otwór" onClick={kliknijPrawyOtwor} />
                        </div>
                    </div>
                </>
            )

        case 'nisza':
            return (
                <>
                    <h2>Ołtarz bogini Maat</h2>
                    <Grafika obraz={{ src: OBRAZY.oltarzMaat, alt: 'Ołtarz bogini Maat z pięcioma kamiennymi blokami' }} />
                    {komunikat && <p>{komunikat}</p>}
                    {bloki.map((b, i) => (
                        <button
                            key={i}
                            type="button"
                            className={i === 0 ? 'game-riddle-button game-riddle-button-pressed' : 'game-riddle-button'}
                            onClick={() => obrocBlok(i)}
                        >
                            {i + 1}. {SYMBOLE[b]}
                        </button>
                    ))}
                </>
            )

        default:
            return null
    }
}
