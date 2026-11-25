
import { useState } from 'react'

import {
    OBELISKI,
    POPRAWNA_KOLEJNOSC_OBELISKOW,
    KIERUNKI_LUSTER,
    POPRAWNE_USTAWIENIE_LUSTER,
    FRAGMENTY_PIECZECI,
    PLANSZA_SWIATLA,
    POPRAWNA_KOLEJNOSC_PIECZECI,
} from './data'

const KROKI = {
    prawo: [1, 0],
    lewo: [-1, 0],
    gora: [0, -1],
    dol: [0, 1],
}

const ODBICIA = {
    '/': {
        prawo: 'gora',
        gora: 'prawo',
        lewo: 'dol',
        dol: 'lewo',
    },
    '\\': {
        prawo: 'dol',
        dol: 'prawo',
        lewo: 'gora',
        gora: 'lewo',
    },
}

export function obliczPromien(ustawieniaLuster) {
    const plansza = PLANSZA_SWIATLA
    let x = plansza.start.x
    let y = plansza.start.y
    let kierunek = plansza.start.kierunek

    const sciezka = [{ x, y }]
    const odwiedzone = new Set()

    while (true) {
        const stan = `${x},${y},${kierunek}`

        if (odwiedzone.has(stan)) {
            return { sciezka, sukces: false }
        }

        odwiedzone.add(stan)

        const [dx, dy] = KROKI[kierunek]
        x += dx
        y += dy


        if (
            x < 0 ||
            y < 0 ||
            x >= plansza.rozmiar ||
            y >= plansza.rozmiar
        ) {
            return { sciezka, sukces: false }
        }

        sciezka.push({ x, y })

        if (x === plansza.cel.x && y === plansza.cel.y) {
            return { sciezka, sukces: true }
        }

        const przeszkoda = plansza.przeszkody.some(
            (pole) => pole.x === x && pole.y === y
        )

        if (przeszkoda) {
            return { sciezka, sukces: false }
        }

        const lustro = plansza.lustra.find(
            (element) => element.x === x && element.y === y
        )

        if (lustro) {
            const ustawienie = ustawieniaLuster[lustro.id]
            kierunek = ODBICIA[ustawienie]?.[kierunek]

            if (!kierunek) {
                return { sciezka, sukces: false }
            }
        }
    }
}

export function useRoom4() {
    const [activePanel, setActivePanel] = useState(null)
    const [komunikat, setKomunikat] = useState('')

    // Zagadka 1: cztery obeliski
    const [kolejnosc, setKolejnosc] = useState(
        OBELISKI.map((obelisk) => obelisk.id)
    )
    const [wybranaPozycja, setWybranaPozycja] = useState(null)
    const [obeliskiUstawione, setObeliskiUstawione] = useState(false)

    // Zagadka 2: trzy zwierciadła
    const [lustra, setLustra] = useState([
        'gora',
        'zachod',
        'wschod',
    ])
    const [lustraUstawione, setLustraUstawione] = useState(false)


    const [ustawieniaLuster, setUstawieniaLuster] = useState(
        () => Object.fromEntries(
            PLANSZA_SWIATLA.lustra.map((lustro) => [
                lustro.id,
                lustro.poczatkoweUstawienie,
            ])
        )
    )

    const promien = obliczPromien(ustawieniaLuster)

    const obrocLustroNaPlanszy = (id) => {
        if (!obeliskiUstawione || lustraUstawione) return

        setUstawieniaLuster((aktualne) => ({
            ...aktualne,
            [id]: aktualne[id] === '/' ? '\\' : '/',
        }))

        setKomunikat('')
    }

    const sprawdzPromien = () => {
        if (!obeliskiUstawione) {
            setKomunikat('Najpierw uruchom obeliski.')
            return
        }

        if (!promien.sukces) {
            setKomunikat('Promień nie dotarł do tarczy Ra. Zmień ustawienie luster.')
            return
        }

        setLustraUstawione(true)
        setKomunikat('Światło dotarło do tarczy Ra! Pieczęci zostały odblokowane.')
    }


    // Zagadka 3: fragmenty pieczęci
    const [znalezioneFragmenty, setZnalezioneFragmenty] = useState([])
    const [pieczecZlozona, setPieczecZlozona] = useState(false)
    const [kolejnoscPieczeci, setKolejnoscPieczeci] = useState([])

    // Ostatnia brama
    const [bramaOtwarta, setBramaOtwarta] = useState(false)

    const openPanel = (panel) => {
        setKomunikat('')
        setActivePanel(panel)
    }

    const closePanel = () => {
        setActivePanel(null)
        setKomunikat('')
        setWybranaPozycja(null)
    }

    // Zamiana miejscami dwóch obelisków
    const kliknijObelisk = (index) => {
        if (obeliskiUstawione) return

        if (wybranaPozycja === null) {
            setWybranaPozycja(index)
            setKomunikat('Wybierz drugi obelisk, aby zamienić je miejscami.')
            return
        }

        if (wybranaPozycja === index) {
            setWybranaPozycja(null)
            setKomunikat('')
            return
        }

        setKolejnosc((aktualna) => {
            const nowa = [...aktualna]

                ;[nowa[wybranaPozycja], nowa[index]] = [
                    nowa[index],
                    nowa[wybranaPozycja],
                ]

            return nowa
        })

        setWybranaPozycja(null)
        setKomunikat('Obeliski zamieniły się miejscami.')
    }

    const sprawdzObeliski = () => {
        const poprawne = POPRAWNA_KOLEJNOSC_OBELISKOW.every(
            (id, index) => kolejnosc[index] === id
        )

        if (!poprawne) {
            setKomunikat('Obeliski są ustawione w złej kolejności.')
            return
        }

        setObeliskiUstawione(true)
        setKomunikat('Obeliski rozbłysły! Mechanizm zwierciadeł jest aktywny.')
    }

    // Zmiana kierunku jednego zwierciadła
    const obrocLustro = (index) => {
        if (!obeliskiUstawione || lustraUstawione) return

        setLustra((aktualne) => {
            const nowe = [...aktualne]
            const kierunki = KIERUNKI_LUSTER.map((kierunek) => kierunek.id)
            const obecnyIndex = kierunki.indexOf(nowe[index])

            nowe[index] = kierunki[(obecnyIndex + 1) % kierunki.length]

            return nowe
        })

        setKomunikat('')
    }

    const sprawdzLustra = () => {
        if (!obeliskiUstawione) {
            setKomunikat('Najpierw ustaw obeliski.')
            return
        }

        const poprawne = POPRAWNE_USTAWIENIE_LUSTER.every(
            (id, index) => lustra[index] === id
        )

        if (!poprawne) {
            setKomunikat('Promienie Słońca nie docierają do pieczęci.')
            return
        }

        setLustraUstawione(true)
        setKomunikat('Promienie połączyły się. Możesz odnaleźć fragmenty pieczęci!')
    }

    // Znalezienie fragmentu pieczęci w komnacie
    const znajdzFragment = (id) => {
        if (!lustraUstawione) {
            setKomunikat('Najpierw uruchom mechanizm zwierciadeł.')
            setActivePanel('fragmenty')
            return
        }

        if (!FRAGMENTY_PIECZECI.some((fragment) => fragment.id === id)) {
            return
        }

        if (znalezioneFragmenty.includes(id)) {
            setKomunikat('Ten fragment został już znaleziony.')
        } else {
            setZnalezioneFragmenty((aktualne) => [...aktualne, id])
            setKomunikat('Zdobyto fragment pieczęci faraona!')
        }

        setActivePanel('fragmenty')
    }


    const zlozPieczec = () => {
        if (znalezioneFragmenty.length !== FRAGMENTY_PIECZECI.length) {
            setKomunikat('Nie masz jeszcze wszystkich fragmentów pieczęci.')
            return
        }

        if (kolejnoscPieczeci.length !== FRAGMENTY_PIECZECI.length) {
            setKomunikat('Ułóż wszystkie trzy fragmenty na ołtarzu.')
            return
        }

        const poprawna = POPRAWNA_KOLEJNOSC_PIECZECI.every(
            (id, index) => kolejnoscPieczeci[index] === id
        )

        if (!poprawna) {
            setKomunikat('Pieczęć nie reaguje. Kolejność symboli jest nieprawidłowa.')
            return
        }

        setPieczecZlozona(true)
        setKomunikat('Symbole rozbłysły! Pieczęć faraona została odtworzona.')
    }


    const wybierzFragmentPieczeci = (id) => {
        if (pieczecZlozona) return

        if (!znalezioneFragmenty.includes(id)) {
            setKomunikat('Najpierw odnajdź ten fragment w komnacie.')
            return
        }

        if (kolejnoscPieczeci.includes(id)) return

        setKolejnoscPieczeci((aktualne) => [...aktualne, id])
        setKomunikat('')
    }

    const wyczyscKolejnoscPieczeci = () => {
        if (pieczecZlozona) return

        setKolejnoscPieczeci([])
        setKomunikat('')
    }


    const otworzBrame = () => {
        if (!pieczecZlozona) {
            setKomunikat('Do otwarcia bramy potrzebujesz całej pieczęci.')
            return
        }

        setBramaOtwarta(true)
        setKomunikat('Ostatnia brama została otwarta! Droga na wolność jest przed tobą.')
    }

    return {
        activePanel,
        komunikat,
        openPanel,
        closePanel,

        kolejnosc,
        wybranaPozycja,
        kliknijObelisk,
        sprawdzObeliski,
        obeliskiUstawione,

        lustra,
        obrocLustro,
        sprawdzLustra,
        lustraUstawione,
        ustawieniaLuster,
        promien,
        obrocLustroNaPlanszy,
        sprawdzPromien,

        znalezioneFragmenty,
        znajdzFragment,
        kolejnoscPieczeci,
        wybierzFragmentPieczeci,
        wyczyscKolejnoscPieczeci,
        zlozPieczec,
        pieczecZlozona,

        bramaOtwarta,
        otworzBrame,
    }
}
