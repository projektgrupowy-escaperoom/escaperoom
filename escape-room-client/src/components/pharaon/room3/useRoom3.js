
import { useState } from 'react'

import {
    KOLEJNOSC_START,
    POPRAWNA_KOLEJNOSC,
    POPRAWNA_ODPOWIEDZ,
    KLUCZE,
} from './data'

export function useRoom3({ onNextRoom } = {}) {
    const [activePanel, setActivePanel] = useState(null)
    const [komunikat, setKomunikat] = useState('')

    // Papirus przy mumii
    const [znalezionoZwoj, setZnalezionoZwoj] = useState(false)

    // Pierwsza zagadka
    const [kolejnosc, setKolejnosc] = useState([...KOLEJNOSC_START])
    const [wybranaPozycja, setWybranaPozycja] = useState(null)
    const [straznicyOdkryci, setStraznicyOdkryci] = useState(false)

    // Druga zagadka
    const [wybraneZnaki, setWybraneZnaki] = useState([])
    const [kluczeZdobyte, setKluczeZdobyte] = useState(false)

    // Drzwi
    const [wybranaLitera, setWybranaLitera] = useState(null)
    const [wybranyKlucz, setWybranyKlucz] = useState(null)
    const [otwarteZamki, setOtwarteZamki] = useState([])
    const [uzyteKlucze, setUzyteKlucze] = useState([])
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

    // Znalezienie papirusu przy mumii
    const znajdzZwoj = () => {
        setZnalezionoZwoj(true)
        openPanel('cipher')
    }

    // Zamiana dwóch głów strażników
    const kliknijStraznika = (index) => {
        if (straznicyOdkryci) return

        if (wybranaPozycja === null) {
            setWybranaPozycja(index)
            setKomunikat('Wybierz drugiego strażnika, aby zamienić ich miejscami.')
            return
        }

        if (wybranaPozycja === index) {
            setWybranaPozycja(null)
            setKomunikat('')
            return
        }

        setKolejnosc((aktualna) => {
            const nowa = [...aktualna]
            const pierwsza = nowa[wybranaPozycja]

            nowa[wybranaPozycja] = nowa[index]
            nowa[index] = pierwsza

            return nowa
        })

        setWybranaPozycja(null)
        setKomunikat('Strażnicy zamienili się miejscami.')
    }

    // Sprawdzenie pierwszej zagadki
    const sprawdzStraznikow = () => {
        const poprawna = POPRAWNA_KOLEJNOSC.every(
            (id, index) => kolejnosc[index] === id
        )

        if (!poprawna) {
            setKomunikat('To nie jest właściwa kolejność. Spróbuj ponownie.')
            return
        }

        setStraznicyOdkryci(true)
        setWybranaPozycja(null)
        openPanel('wallOpened')
    }

    // Dodawanie hieroglifów do odpowiedzi
    const wybierzZnak = (znak) => {
        if (wybraneZnaki.length >= 5) return

        setWybraneZnaki((aktualne) => [...aktualne, znak])
        setKomunikat('')
    }

    // Usuwanie hieroglifu z wybranej pozycji
    const usunZnak = (index) => {
        setWybraneZnaki((aktualne) =>
            aktualne.filter((_, i) => i !== index)
        )
        setKomunikat('')
    }

    const wyczyscZnaki = () => {
        setWybraneZnaki([])
        setKomunikat('')
    }

    // Sprawdzenie odpowiedzi Sfinksa
    const sprawdzSfinksa = () => {
        if (!znalezionoZwoj) {
            setKomunikat('Najpierw znajdź papirus z alfabetem.')
            return
        }

        if (wybraneZnaki.length !== 5) {
            setKomunikat('Odpowiedź musi składać się z pięciu znaków.')
            return
        }

        const poprawna = POPRAWNA_ODPOWIEDZ.every(
            (znak, index) => wybraneZnaki[index] === znak
        )

        if (!poprawna) {
            setKomunikat('Odpowiedź jest niepoprawna. Spróbuj ponownie.')
            return
        }

        setKluczeZdobyte(true)
        openPanel('keysFound')
    }

    // Wybór litery zamka
    const wybierzLitera = (litera) => {
        if (otwarteZamki.includes(litera)) return

        setWybranaLitera(litera)
        setKomunikat('')
    }

    // Wybór klucza
    const wybierzKlucz = (id) => {
        if (uzyteKlucze.includes(id)) return

        setWybranyKlucz(id)
        setKomunikat('')
    }

    // Dopasowanie klucza do zamka
    const sprawdzZamek = () => {
        if (!wybranaLitera || !wybranyKlucz) {
            setKomunikat('Wybierz literę zamka i klucz.')
            return
        }

        const klucz = KLUCZE.find(
            (element) => element.id === wybranyKlucz
        )

        if (!klucz) {
            setKomunikat('Nie znaleziono wybranego klucza.')
            return
        }

        if (klucz.litera !== wybranaLitera) {
            setKomunikat('Ten klucz nie pasuje do wybranego zamka.')
            return
        }

        const noweZamki = [...otwarteZamki, wybranaLitera]
        const noweKlucze = [...uzyteKlucze, wybranyKlucz]

        setOtwarteZamki(noweZamki)
        setUzyteKlucze(noweKlucze)
        setWybranaLitera(null)
        setWybranyKlucz(null)

        if (noweZamki.length === KLUCZE.length) {
            setBramaOtwarta(true)
            setKomunikat('Wszystkie zamki zostały otwarte. Brama jest wolna.')
        } else {
            setKomunikat('Zamek otwarty. Znajdź kolejne dopasowanie.')
        }
    }


    return {
        activePanel,
        komunikat,
        openPanel,
        closePanel,

        znalezionoZwoj,
        znajdzZwoj,

        kolejnosc,
        wybranaPozycja,
        kliknijStraznika,
        sprawdzStraznikow,
        straznicyOdkryci,

        wybraneZnaki,
        wybierzZnak,
        usunZnak,
        wyczyscZnaki,
        sprawdzSfinksa,

        kluczeZdobyte,

        wybranaLitera,
        wybierzLitera,
        wybranyKlucz,
        wybierzKlucz,
        otwarteZamki,
        uzyteKlucze,
        sprawdzZamek,
        bramaOtwarta,
    }
}
