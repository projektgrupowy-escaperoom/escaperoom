// US 06: Rozwiązywanie zagadek pomieszczenie 2 -> stan i logika zagadki w komnacie Anubisa
import { useState } from 'react'
import { BLOKI_START, KOLEJNOSC_MAAT, OBRAZY, POCHODNIE, PRZEDMIOTY, SYMBOLE, TEKSTY } from './data'

export function useRoom2({ openPanel, setFoundObjects }) {
    const [zbadanoNiszePierwszyRaz, setZbadanoNiszePierwszyRaz] = useState(false)
    const [mamPioro, setMamPioro] = useState(false)
    const [mamAnkh, setMamAnkh] = useState(false)
    const [mamNaczynie, setMamNaczynie] = useState(false)
    const [ankhWlozony, setAnkhWlozony] = useState(false)
    const [mamSerce, setMamSerce] = useState(false)
    // Serce i pióro są kładzione na wagę jednocześnie
    const [naWadze, setNaWadze] = useState(false)
    const [bramaOtwarta, setBramaOtwarta] = useState(false)
    const [bloki, setBloki] = useState(BLOKI_START)
    const [komunikat, setKomunikat] = useState('')
    // { src, alt } albo null
    const [grafika, setGrafika] = useState(null)

    const dodaj = (nazwa) => setFoundObjects((p) => [...p, nazwa])
    const usun = (nazwa) => setFoundObjects((p) => p.filter((x) => x !== nazwa))

    const otworz = (panel, tekst, obraz = null) => {
        setKomunikat(tekst)
        setGrafika(obraz)
        openPanel(panel)
    }
    // Zwykły komunikat w komnacie
    const pokaz = (tekst) => otworz('komnata2', tekst)
    // Komunikat z przyciskiem "Dalej", który wraca do sali głównej
    const pokazDalej = (tekst, obraz = null) => otworz('dalej', tekst, obraz)

    // Część z sercem jest zablokowana, dopóki gracz nie zdobędzie Pióra Maat
    const znalezionoPioro = mamPioro || naWadze

    const kliknijNisze = () => {
        if (znalezionoPioro) return pokaz(TEKSTY.niszaPusta)
        setKomunikat(zbadanoNiszePierwszyRaz ? '' : TEKSTY.niszaPierwszyRaz)
        setZbadanoNiszePierwszyRaz(true)
        openPanel('nisza')
    }

    const obrocBlok = (i) => {
        // Pierwszy blok (Skarabeusz) jest na stałe wciśnięty – wyznacza początek sekwencji
        if (i === 0) return setKomunikat(TEKSTY.blokWcisniety)
        // Pozostałe bloki przełączają się między symbolami innymi niż Skarabeusz (indeksy 1..n-1)
        const nowe = bloki.map((b, j) => (j === i ? (b % (SYMBOLE.length - 1)) + 1 : b))
        setBloki(nowe)
        if (nowe.every((b, j) => b === KOLEJNOSC_MAAT[j])) {
            setMamPioro(true)
            dodaj(PRZEDMIOTY.pioro)
            pokazDalej(TEKSTY.odkryciePiora, { src: OBRAZY.pioro, alt: 'Pióro Prawdy w otwartym ołtarzu' })
        } else {
            setKomunikat(TEKSTY.blokObrocony(SYMBOLE[nowe[i]]))
        }
    }

    const zabierzAnkh = () => {
        if (!znalezionoPioro) return pokaz(TEKSTY.ankhZablokowany)
        setMamAnkh(true)
        dodaj(PRZEDMIOTY.ankh)
        pokaz(TEKSTY.ankhZabrany)
    }

    const zabierzNaczynie = () => {
        if (!znalezionoPioro) return pokaz(TEKSTY.dzbanZablokowany)
        // Dzban można zabrać dopiero po włożeniu krzyża Ankh do zamka przy sercu
        if (!ankhWlozony) return pokaz(TEKSTY.dzbanZwykly)
        setMamNaczynie(true)
        dodaj(PRZEDMIOTY.dzban)
        pokaz(TEKSTY.dzbanZabrany)
    }

    const wlozAnkh = () => {
        setMamAnkh(false)
        setAnkhWlozony(true)
        usun(PRZEDMIOTY.ankh)
    }

    const wezSerce = () => {
        setMamNaczynie(false)
        setMamSerce(true)
        usun(PRZEDMIOTY.dzban)
        dodaj(PRZEDMIOTY.serce)
        pokazDalej(TEKSTY.zdobycieSerca, { src: OBRAZY.serceNisza, alt: '' })
    }

    // Widok serca za kratą – otwierany złotym kołem po prawej stronie komnaty (dostępny po zdobyciu pióra)
    const kliknijSerce = () => {
        if (mamSerce || naWadze) return pokaz(TEKSTY.sercePuste)
        // Po powrocie z dzbanem gracz od razu wsypuje kule do otworu i zabiera serce
        if (ankhWlozony && mamNaczynie) return wezSerce()
        // Po powrocie z krzyżem Ankh gracz od razu wkłada go do zamka
        if (mamAnkh) wlozAnkh()
        otworz('serce', mamAnkh || ankhWlozony ? TEKSTY.ankhWZamku : TEKSTY.odkrycieSerca)
    }

    // Lewy otwór w kształcie krzyża Ankh
    const kliknijZamekAnkh = () => {
        if (ankhWlozony) return setKomunikat(TEKSTY.ankhWZamku)
        if (!mamAnkh) return setKomunikat(TEKSTY.zamekAnkhPusty)
        wlozAnkh()
        setKomunikat(TEKSTY.ankhWZamku)
    }

    // Prawy, okrągły otwór – otwiera się po włożeniu krzyża Ankh
    const kliknijPrawyOtwor = () => {
        if (!ankhWlozony) return setKomunikat(TEKSTY.otworZamkniety)
        if (!mamNaczynie) return setKomunikat(TEKSTY.otworPusty)
        wezSerce()
    }

    // Waga – serce i pióro kładzione są razem, gdy gracz ma oba przedmioty
    const kliknijWage = () => {
        if (naWadze) return pokaz(TEKSTY.wagaRownowaga)
        if (!mamPioro) return pokaz(TEKSTY.wagaBezPiora)
        if (!mamSerce) return pokaz(TEKSTY.wagaBezSerca)
        setMamPioro(false)
        setMamSerce(false)
        setNaWadze(true)
        usun(PRZEDMIOTY.pioro)
        usun(PRZEDMIOTY.serce)
        pokazDalej(TEKSTY.final)
    }

    // Wywoływane przy zamykaniu okna: po położeniu serca i pióra na wadze pokazuje się ostatni obraz komnaty
    const poZamknieciuPanelu = () => {
        if (naWadze) setBramaOtwarta(true)
    }

    // Klikalne miejsca: [nazwa, left %, top %, szerokość %, wysokość %, akcja]
    const punkty = [
        ...POCHODNIE.map(({ symbol, obszar, plomien }) => [
            'Pochodnia',
            ...obszar,
            () => pokaz(plomien ? TEKSTY.pochodniaZapalona(symbol) : TEKSTY.pochodniaZgaszona(symbol)),
        ]),
        !mamAnkh && !ankhWlozony && ['Krzyż Ankh', 55, 67, 8, 10, zabierzAnkh],
        !mamNaczynie && !mamSerce && !naWadze && ['Gliniany dzban', 36, 57, 5, 13, zabierzNaczynie],
        ['Waga', 40, 45, 19, 22, kliknijWage],
    ].filter(Boolean)

    return {
        bloki,
        bramaOtwarta,
        grafika,
        komunikat,
        znalezionoPioro,
        punkty,
        kliknijNisze,
        kliknijSerce,
        kliknijZamekAnkh,
        kliknijPrawyOtwor,
        obrocBlok,
        poZamknieciuPanelu,
    }
}
