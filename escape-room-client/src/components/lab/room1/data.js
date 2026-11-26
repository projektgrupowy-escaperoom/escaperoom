// Laboratorium – Pokój 1: Klatka Reakcyjna (Lab. Chemii 01)
// Wszystkie stałe pokoju: grafiki, teksty, przedmioty, podpowiedzi i układ hotspotów.

// US-06: Rozwiązywanie zagadek pomieszczenie 1 labolatorium -> grafiki sceny i przedmiotów
const BAZA = '/images/lab/room1/'

export const OBRAZY = {
    pokoj: `${BAZA}labroom1.png`,
    stol: `${BAZA}colbs.png`,
    drzwi: `${BAZA}doorlock.png`,
    srubokret: `${BAZA}screwdriver.jpg`,
    odczynnik: `${BAZA}reagent_x.jpg`,
    neutralizator: `${BAZA}neutralizer.jpg`,
}

// US-06: Rozwiązywanie zagadek pomieszczenie 1 labolatorium -> kod zamka szyfrowego (7-2-6-4)
export const KOD_ZAMKA = '7264'

// US-06: Rozwiązywanie zagadek pomieszczenie 1 labolatorium -> komunikaty fabularne i feedback akcji gracza
export const TEKSTY = {
    intro: 'Ciężkie powieki otwierają się powoli. Czujesz gryzący zapach octu, alkoholu i rozgrzanego szkła. Wokół ciągną się blaty laboratorium chemicznego -kolby, zlewki, etykiety i półki z odczynnikami. Drzwi wyjściowe są zamknięte.',
    vance: 'Witaj w moim laboratorium, Obiekcie 04. Potrzebowałem kogoś świeżego do obserwacji skutków moich mieszanek - a ty akurat znalazłeś się pod ręką. Drzwi są zamknięte. Jeśli zdołasz odczytać moje notatki i przeprowadzić prostą reakcję na stole, może uda ci się wyjść. Powodzenia - będę patrzył.',
    sciereczka: 'Odsunięto brudną ściereczkę. Pod spodem leży śrubokręt.',
    srubkiBezNarzedzia: 'Śrubki są mocno dokręcone. Potrzebuję odpowiedniego narzędzia – przydałby się śrubokręt.',
    oslonaZdjeta: 'Odkręcono osłonę. Wewnątrz znajdujesz buteleczkę z odczynnikiem «X» oraz Notatkę #1.',
    dodano: (nazwa) => `Dodano do plecaka: ${nazwa}.`,
    notatka1: 'Uwaga do eksperymentu: Odczynnik X daje wyraźną, szmaragdową barwę wyłącznie po połączeniu z roztworem B. Kolba A i C to stare próby, nie warto na nie tracić odczynnika. Sprawdź na tablicy, jaką cyfrę oznacza kolor szmaragdowy.',
    tablica: 'Bursztynowy = 3 / Szmaragdowy = 7 / Fioletowy = 5',
    zlaKolba: 'Płyn lekko mętnieje i pieni się, ale nie daje szmaragdowej barwy. To nie ta próbka.',
    kolbaB: 'Roztwór zmienia kolor na szmaragdowy! Według tablicy barw odpowiada to cyfrze 7.',
    notatka2: 'Krótka ściągawka z dzisiejszego dnia: Szmaragdowa reakcja daje pierwszą cyfrę zamka. Wzór etanolu (C2H5OH) ma DWA atomy węgla. Trzecią cyfrę możemy znaleźć jako ostatnią na etykiecie butelki z neutralizatorem (6). Czwartą cyfrą jesteś TY obiekcie numer...',
    zlyKod: 'Kod nieprawidłowy. Sprawdź notatki, tablicę barw oraz wynik reakcji.',
    dobryKod: 'Zamek elektroniczny zwolniony. Pozostaje jeszcze zwolnić blokadę zaworu przy drzwiach.',
    drzwiZablokowane: 'Drzwi są zaryglowane. Mechanizm przy zaworze jest zablokowany – przyda się neutralizator.',
    zaworZneutralizowany: 'Blokada puszczona! Mechanizm drzwi zwolniony – przejście stoi otworem. Kliknij jasnoniebieskie kółko, aby przejść dalej.',
    zlePrzedmiot: 'Ten przedmiot nie pasuje w to miejsce. Spróbuj innego rozwiązania.',
    // US-08: Ukończenie pokoju pomieszczenie 1 labolatorium -> komunikat po kliknięciu jasnoniebieskiego kółka
    wyjscie: 'Opuszczasz «Klatkę Reakcyjną» i wkraczasz głębiej do laboratorium dr. Vance’a...',
    plecakInstrukcja: 'Plecak – przeciągnij wybrany przedmiot bezpośrednio na obiekt na scenie, aby go użyć.',
    plecakPusty: 'Twój plecak jest na razie pusty.',

    // Komunikaty pomocnicze (sytuacje nieobjęte listą wymaganą)
    srubkiZNarzedziem: 'Śrubki trzymają metalową osłonę skrzynki. Przeciągnij śrubokręt z plecaka 🎒 na skrzynkę.',
    skrzynkaPusta: 'Skrzynka jest już pusta.',
    zaworPrzedKodem: 'Zawór ani drgnie – najpierw trzeba zwolnić zamek elektroniczny przy drzwiach.',
    zamekJuzZwolniony: 'Zamek elektroniczny jest już zwolniony – diody świecą na zielono.',
    zaworJuzZwolniony: 'Zawór jest zneutralizowany. Mechanizm drzwi czeka już tylko na zamek.',
    kolbaAOpis: 'Kolba A – niebieski roztwór. Etykieta: stara próba.',
    kolbaBOpis: 'Kolba B – żółtawy roztwór. Ktoś zostawił przy niej świeżą etykietę.',
    kolbaCOpis: 'Kolba C – fioletowy roztwór. Etykieta: stara próba.',
    kolbaBGotowa: 'Kolba B świeci szmaragdowo. Według tablicy barw to cyfra 7.',
    dziennikEksperymentu: 'Dziennik eksperymentu na ścianie: „A: ?  B: 7.2  C: ?  …  Check color change!”. Ktoś najwyraźniej skupiał się na roztworze B.',
    stolZDaleka: 'Podejdź bliżej do stołu z kolbami (kliknij go), aby wybrać konkretną kolbę.',
    wybrano: (nazwa) => `Wybrano: ${nazwa}. Kliknij obiekt na scenie, aby go użyć.`,
    neutralizatorEtykieta: 'Biały kanister z etykietą „NEUTRALIZER 06”.',
}

// US-06: Rozwiązywanie zagadek pomieszczenie 1 labolatorium -> przedmioty, które można przeciągać na scenę
export const PRZEDMIOTY = {
    srubokret: { id: 'srubokret', nazwa: 'Śrubokręt', obraz: OBRAZY.srubokret, ikona: '🪛', rodzaj: 'narzedzie' },
    odczynnik: { id: 'odczynnik', nazwa: 'Odczynnik „X”', obraz: OBRAZY.odczynnik, ikona: '🧪', rodzaj: 'narzedzie' },
    neutralizator: { id: 'neutralizator', nazwa: 'Neutralizator', obraz: OBRAZY.neutralizator, ikona: '⚗️', rodzaj: 'narzedzie' },
    notatka1: { id: 'notatka1', nazwa: 'Notatka #1', ikona: '📄', rodzaj: 'notatka' },
    notatka2: { id: 'notatka2', nazwa: 'Notatka #2', ikona: '📝', rodzaj: 'notatka' },
}

// US-07: Podpowiedzi pomieszczenie 1 labolatorium -> notatki i wskazówki do ponownego przeczytania (lupka / plecak)
export const NOTATKI = {
    vance: { tytul: 'Wiadomość dr. Juliana Vance’a', tresc: TEKSTY.vance, styl: 'glos' },
    notatka1: { tytul: 'Notatka #1', tresc: TEKSTY.notatka1, styl: 'papier' },
    tablica: { tytul: 'Tablica wskaźników barw', tresc: TEKSTY.tablica, styl: 'tablica' },
    notatka2: { tytul: 'Notatka #2', tresc: TEKSTY.notatka2, styl: 'papier' },
}

// US-07: Podpowiedzi pomieszczenie 1 labolatorium -> stopniowane podpowiedzi dla etapów 1–5 (+ etap 6: wyjście)
export const PODPOWIEDZI = {
    1: [
        'Rozejrzyj się po blacie po lewej stronie – coś leży pod brudną szmatką.',
        'Kliknij ściereczkę na lewym blacie.',
        'Pod ściereczką leży śrubokręt – kliknij go, aby zabrać go do plecaka.',
    ],
    2: [
        'Na środkowym stole stoi metalowa skrzynka z przykręconą osłoną.',
        'Otwórz plecak 🎒 i przeciągnij śrubokręt na skrzynkę ze śrubkami.',
        'Po zdjęciu osłony kliknij skrzynkę i zabierz odczynnik «X» oraz Notatkę #1.',
    ],
    3: [
        'Przeczytaj Notatkę #1 – mówi, z którym roztworem reaguje odczynnik.',
        'Podejdź do stołu z kolbami A, B i C. Tylko roztwór B daje szmaragdową barwę.',
        'Przeciągnij odczynnik «X» z plecaka na Kolbę B i sprawdź cyfrę na tablicy barw.',
    ],
    4: [
        'Kod ma 4 cyfry. Pierwszą dała reakcja w kolbie B (tablica barw).',
        'Notatka #2 leży na środkowym stole, obok skrzynki – wyjaśnia pozostałe cyfry.',
        'Szmaragd = 7, węgle w C2H5OH = 2, NEUTRALIZER 06 = 6, ty jesteś Obiektem 04 = 4 → wpisz 7264 na zamku przy drzwiach.',
    ],
    5: [
        'Zamek puścił, ale czerwony zawór przy drzwiach wciąż blokuje mechanizm.',
        'Biały kanister „NEUTRALIZER 06” stoi na dolnej półce pod środkowym stołem – zabierz go.',
        'Podejdź do drzwi i przeciągnij neutralizator z plecaka na czerwony zawór.',
    ],
    // US-08: Ukończenie pokoju pomieszczenie 1 labolatorium -> podpowiedź po otwarciu drzwi
    6: ['Drzwi są otwarte! Kliknij jasnoniebieskie kółko w przejściu.'],
}

// US-06: Rozwiązywanie zagadek pomieszczenie 1 labolatorium -> hotspoty w procentach obrazu 1672×941: [x, y, szerokość, wysokość]
export const UKLAD = {
    pokoj: {
        sciereczka: [21.5, 78.5, 12, 21],
        skrzynka: [61, 57.5, 7.2, 6.5],
        notatka2: [55.6, 66.5, 10.5, 5.2],
        stol: [40, 46, 20, 16],
        neutralizator: [71.4, 77.5, 4.4, 14.5],
        drzwi: [75.7, 13.3, 15.5, 60],
        // US-08: Ukończenie pokoju pomieszczenie 1 labolatorium -> środek jasnoniebieskiego kółka w drzwiach
        wyjscie: [83.5, 45],
    },
    stol: {
        tablica: [17.6, 3.2, 30.8, 23.4],
        kolbaA: [31.4, 28, 11.4, 37],
        kolbaB: [44.6, 28, 11.3, 37],
        kolbaC: [57.4, 28, 11.1, 37],
        dziennik: [73, 4.2, 23.3, 39],
        cieczA: [31.6, 57.6, 11, 7.8],
        cieczB: [44.9, 57.6, 10.8, 7.8],
        cieczC: [57.6, 57.6, 10.8, 7.8],
    },
    drzwi: {
        zamek: [34.7, 16, 16.7, 52.5],
        zawor: [62.8, 41, 22.4, 37],
        klamka: [14.4, 73, 17, 22.6],
        skrzydlo: [0, 0, 31.4, 100],
        ekran: [38.3, 20.6, 10.2, 8.3],
        // US-08: Ukończenie pokoju pomieszczenie 1 labolatorium -> jasnoniebieskie kółko w zbliżeniu drzwi
        wyjscie: [15.7, 45],
    },
}

// US-06: Rozwiązywanie zagadek pomieszczenie 1 labolatorium -> nazwy widoków w górnym pasku
export const NAZWY_WIDOKOW = {
    pokoj: 'Lab. Chemii 01',
    stol: 'Stół z kolbami',
    drzwi: 'Drzwi wyjściowe',
    skrzynka: 'Wnętrze skrzynki',
}
