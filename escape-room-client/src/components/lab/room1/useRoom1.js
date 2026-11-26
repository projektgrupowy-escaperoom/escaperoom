// Laboratorium – Pokój 1: stan gry i logika zagadek
// US-06: Rozwiązywanie zagadek pomieszczenie 1 labolatorium -> stan i logika zagadek w Klatce Reakcyjnej
import { useState } from 'react'
import { KOD_ZAMKA, PRZEDMIOTY, TEKSTY } from './data'

const STAN_POCZATKOWY = {
    sciereczkaOdsunieta: false,
    srubokretZabrany: false,
    oslonaZdjeta: false,
    odczynnikZabrany: false,
    notatka1Zabrana: false,
    notatka2Zabrana: false,
    neutralizatorZabrany: false,
    kolbaB: false,
    piana: null, // 'kolbaA' | 'kolbaC' – krótka animacja błędnej reakcji
    zamekZwolniony: false,
    zaworZneutralizowany: false,
}

export function useRoom1({ onEnterNextRoom } = {}) {
    // 'intro' → 'vance' → 'gra' → 'przejscie'
    const [faza, setFaza] = useState('intro')
    const [widok, setWidok] = useState('pokoj')
    const [stan, setStan] = useState(STAN_POCZATKOWY)
    const [plecak, setPlecak] = useState([])
    const [notatki, setNotatki] = useState([]) // ids z NOTATKI, kolejność odkrycia
    const [dziennik, setDziennik] = useState([])
    const [otwartaNotatka, setOtwartaNotatka] = useState(null)
    const [zamekOtwarty, setZamekOtwarty] = useState(false)
    const [panel, setPanel] = useState(null) // 'lupka' | 'plecak' | null
    const [wybrany, setWybrany] = useState(null)

    const komunikat = dziennik[0] ?? ''
    // US-08: Ukończenie pokoju pomieszczenie 1 labolatorium -> drzwi otwierają się po kodzie i neutralizacji zaworu
    const drzwiOtwarte = stan.zamekZwolniony && stan.zaworZneutralizowany

    // US-07: Podpowiedzi pomieszczenie 1 labolatorium -> aktualny etap gry, do którego dopasowane są podpowiedzi
    const etap = !stan.srubokretZabrany ? 1
        : !(stan.oslonaZdjeta && stan.odczynnikZabrany && stan.notatka1Zabrana) ? 2
        : !stan.kolbaB ? 3
        : !stan.zamekZwolniony ? 4
        : !stan.zaworZneutralizowany ? 5
        : 6

    // US-06: Rozwiązywanie zagadek pomieszczenie 1 labolatorium -> komunikaty, plecak i notatki
    const pokaz = (tekst) => setDziennik((d) => [tekst, ...d].slice(0, 40))
    const ustaw = (zmiany) => setStan((s) => ({ ...s, ...zmiany }))
    const poznajNotatke = (id) => setNotatki((n) => (n.includes(id) ? n : [...n, id]))

    const dodajDoPlecaka = (id) => {
        setPlecak((p) => (p.includes(id) ? p : [...p, id]))
        pokaz(TEKSTY.dodano(PRZEDMIOTY[id].nazwa))
    }
    const usunZPlecaka = (id) => {
        setPlecak((p) => p.filter((x) => x !== id))
        setWybrany((w) => (w === id ? null : w))
    }

    const otworzNotatke = (id) => {
        poznajNotatke(id)
        setOtwartaNotatka(id)
    }

    // ---- Fazy fabularne ----
    // US-06: Rozwiązywanie zagadek pomieszczenie 1 labolatorium -> intro i wiadomość dr. Vance'a
    const zakonczIntro = () => {
        setFaza('vance')
        poznajNotatke('vance')
    }
    const rozpocznijGre = () => {
        setFaza('gra')
        pokaz(TEKSTY.intro)
    }
    // US-08: Ukończenie pokoju pomieszczenie 1 labolatorium -> kliknięcie jasnoniebieskiego kółka kończy pokój
    const przejdzDalej = () => {
        pokaz(TEKSTY.wyjscie)
        setPanel(null)
        setFaza('przejscie')
        onEnterNextRoom?.()
    }

    // ---- Kliknięcia obiektów na scenie ----
    // US-06: Rozwiązywanie zagadek pomieszczenie 1 labolatorium -> obsługa kliknięć obiektów na scenie
    const kliknij = (cel) => {
        // Kliknięcie celu z wybranym przedmiotem = użycie przedmiotu (alternatywa dla przeciągania)
        if (wybrany && PRZEDMIOTY[wybrany].rodzaj === 'narzedzie' && cel !== 'wroc') {
            const przedmiot = wybrany
            setWybrany(null)
            return uzyj(przedmiot, cel)
        }

        switch (cel) {
            case 'sciereczka':
                if (!stan.sciereczkaOdsunieta) {
                    ustaw({ sciereczkaOdsunieta: true })
                    return pokaz(TEKSTY.sciereczka)
                }
                return
            case 'srubokret':
                ustaw({ srubokretZabrany: true })
                return dodajDoPlecaka('srubokret')
            case 'skrzynka':
                if (stan.oslonaZdjeta) return setWidok('skrzynka')
                return pokaz(plecak.includes('srubokret') ? TEKSTY.srubkiZNarzedziem : TEKSTY.srubkiBezNarzedzia)
            case 'odczynnik':
                ustaw({ odczynnikZabrany: true })
                return dodajDoPlecaka('odczynnik')
            case 'notatka1':
                ustaw({ notatka1Zabrana: true })
                dodajDoPlecaka('notatka1')
                return otworzNotatke('notatka1')
            case 'notatka2':
                ustaw({ notatka2Zabrana: true })
                dodajDoPlecaka('notatka2')
                return otworzNotatke('notatka2')
            case 'neutralizator':
                ustaw({ neutralizatorZabrany: true })
                pokaz(TEKSTY.neutralizatorEtykieta)
                return dodajDoPlecaka('neutralizator')
            case 'stol':
                return setWidok('stol')
            case 'drzwi':
                return setWidok('drzwi')
            case 'tablica':
                pokaz(TEKSTY.tablica)
                return otworzNotatke('tablica')
            case 'dziennik':
                return pokaz(TEKSTY.dziennikEksperymentu)
            case 'kolbaA':
                return pokaz(TEKSTY.kolbaAOpis)
            case 'kolbaB':
                return pokaz(stan.kolbaB ? TEKSTY.kolbaBGotowa : TEKSTY.kolbaBOpis)
            case 'kolbaC':
                return pokaz(TEKSTY.kolbaCOpis)
            case 'zamek':
                if (stan.zamekZwolniony) return pokaz(TEKSTY.zamekJuzZwolniony)
                return setZamekOtwarty(true)
            case 'zawor':
            case 'klamka':
                if (stan.zaworZneutralizowany) return pokaz(TEKSTY.zaworJuzZwolniony)
                return pokaz(TEKSTY.drzwiZablokowane)
            // US-08: Ukończenie pokoju pomieszczenie 1 labolatorium -> przejście do kolejnego pomieszczenia
            case 'wyjscie':
                return przejdzDalej()
            case 'wroc':
                return setWidok('pokoj')
            default:
                return undefined
        }
    }

    // ---- Użycie przedmiotu na celu (drag & drop lub klik) ----
    // US-06: Rozwiązywanie zagadek pomieszczenie 1 labolatorium -> śrubokręt na śrubki, odczynnik na kolbę, neutralizator na zawór
    const uzyj = (przedmiot, cel) => {
        if (!cel || !PRZEDMIOTY[przedmiot]) return
        if (PRZEDMIOTY[przedmiot].rodzaj === 'notatka') return pokaz(TEKSTY.zlePrzedmiot)

        if (przedmiot === 'srubokret' && cel === 'skrzynka' && !stan.oslonaZdjeta) {
            ustaw({ oslonaZdjeta: true })
            usunZPlecaka('srubokret')
            pokaz(TEKSTY.oslonaZdjeta)
            return setWidok('skrzynka')
        }

        if (przedmiot === 'odczynnik') {
            if (cel === 'kolbaB') {
                ustaw({ kolbaB: true, piana: null })
                usunZPlecaka('odczynnik')
                return pokaz(TEKSTY.kolbaB)
            }
            if (cel === 'kolbaA' || cel === 'kolbaC') {
                ustaw({ piana: cel })
                return pokaz(TEKSTY.zlaKolba)
            }
            if (cel === 'stol') return pokaz(TEKSTY.stolZDaleka)
        }

        // US-08: Ukończenie pokoju pomieszczenie 1 labolatorium -> neutralizacja zaworu otwiera drzwi
        if (przedmiot === 'neutralizator' && (cel === 'zawor' || cel === 'drzwi' || cel === 'klamka')) {
            if (!stan.zamekZwolniony) return pokaz(TEKSTY.zaworPrzedKodem)
            ustaw({ zaworZneutralizowany: true })
            usunZPlecaka('neutralizator')
            return pokaz(TEKSTY.zaworZneutralizowany)
        }

        return pokaz(TEKSTY.zlePrzedmiot)
    }

    const zakonczPiane = () => ustaw({ piana: null })

    // ---- Zamek szyfrowy ----
    // US-06: Rozwiązywanie zagadek pomieszczenie 1 labolatorium -> sprawdzenie kodu 7264
    const wpiszKod = (kod) => {
        if (kod === KOD_ZAMKA) {
            ustaw({ zamekZwolniony: true })
            setZamekOtwarty(false)
            pokaz(TEKSTY.dobryKod)
            return true
        }
        pokaz(TEKSTY.zlyKod)
        return false
    }

    // ---- Plecak ----
    // US-06: Rozwiązywanie zagadek pomieszczenie 1 labolatorium -> wybór przedmiotu z plecaka
    // Krótkie kliknięcie przedmiotu w plecaku: notatkę czyta, narzędzie zaznacza do użycia
    const dotknijPrzedmiotu = (id) => {
        if (PRZEDMIOTY[id]?.rodzaj === 'notatka') return otworzNotatke(id)
        if (wybrany === id) return setWybrany(null)
        setWybrany(id)
        setPanel(null)
        pokaz(TEKSTY.wybrano(PRZEDMIOTY[id].nazwa))
    }

    const przelaczPanel = (nazwa) => setPanel((p) => (p === nazwa ? null : nazwa))

    return {
        faza, widok, stan, plecak, notatki, dziennik, komunikat, etap, drzwiOtwarte,
        otwartaNotatka, zamekOtwarty, panel, wybrany,
        zakonczIntro, rozpocznijGre, kliknij, uzyj, wpiszKod, zakonczPiane,
        dotknijPrzedmiotu, przelaczPanel, otworzNotatke,
        zamknijNotatke: () => setOtwartaNotatka(null),
        zamknijZamek: () => setZamekOtwarty(false),
        zamknijPanel: () => setPanel(null),
        anulujWybor: () => setWybrany(null),
    }
}
