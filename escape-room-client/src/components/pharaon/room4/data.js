
export const NAZWA_KOMNATY = 'Sanktuarium Wiecznego Słońca'

export const HISTORIA = {
    wstep: `Za bramą czterech strażników odkrywasz ostatnią
komnatę świątyni. Na jej środku znajduje się ogromny
złoty dysk Słońca, otoczony kamiennymi obeliskami.

W oddali widzisz zamkniętą bramę, zza której
prześwituje światło dzienne.

To ostatnia próba. Jeśli przywrócisz moc Ra,
droga na powierzchnię zostanie otwarta.`,

    papirus: `FRAGMENT KRONIKI KAPŁANÓW RA

Cztery postacie strzegą niekończącej się
wędrówki słonecznej barki.

Ten, który każdego dnia rodzi się na nowo,
rozpoczyna podróż.

Skrzydlaty strażnik niebios obejmuje wartę,
gdy blask osiąga pełnię swojej potęgi.

Gdy światło zaczyna opuszczać krainę żywych,
na jego drodze staje bóstwo o rogach barana.

Ostatni strażnik nie niesie światła.
Przybywa wraz z ciemnością i próbuje
powstrzymać ponowne narodziny Słońca.

Dopiero gdy cztery postacie zajmą
właściwe miejsca, przebudzi się
mechanizm sanktuarium.`,

    lustra: `TAJEMNICA SIEDMIU ZWIERCIADŁ RA

Siedem srebrnych strażników spoczywa
w kamiennym labiryncie.

Promień rodzi się na zachodnim krańcu
i rozpoczyna podróż ku wschodowi.

Lecz prosta droga nie prowadzi
do zbawienia.

Najpierw światło musi wznieść się
ponad ciemność.

Następnie przemierza komnatę,
by zejść w głąb kamiennych murów.

Tam zawraca, szukając innej drogi,
i ponownie wznosi się ku niebu.

Dopiero po ostatniej wędrówce
na wschód może opaść na świętą tarczę.

Pamiętaj:
Kamień pochłania światło.
Zwierciadło zmienia jego drogę.
Tylko nieprzerwany promień
obudzi potęgę Ra.`,

    final: `Światło Ra powróciło do sanktuarium.

Umieść pieczęć faraona w kamiennym mechanizmie,
aby przerwać starożytną klątwę
i otworzyć ostatnią bramę.`,
}


export const OBELISKI = [
    {
        id: 'noc',
        nazwa: 'Tajemniczy obelisk',
        symbol: '🐍',
        opis: 'Symbol Apopisa',
    },
    {
        id: 'poludnie',
        nazwa: 'Tajemniczy obelisk',
        symbol: '🦅',
        opis: 'Symbol Horusa',
    },
    {
        id: 'swit',
        nazwa: 'Tajemniczy obelisk',
        symbol: '🪲',
        opis: 'Symbol Chepriego',
    },
    {
        id: 'zachod',
        nazwa: 'Tajemniczy obelisk',
        symbol: '🐏',
        opis: 'Symbol barana',
    },
]


export const POPRAWNA_KOLEJNOSC_OBELISKOW = [
    'swit',
    'poludnie',
    'zachod',
    'noc',
]

export const KIERUNKI_LUSTER = [
    {
        id: 'wschod',
        nazwa: 'Wschód',
        symbol: '→',
    },
    {
        id: 'gora',
        nazwa: 'Niebo',
        symbol: '↑',
    },
    {
        id: 'zachod',
        nazwa: 'Zachód',
        symbol: '←',
    },
]

export const POPRAWNE_USTAWIENIE_LUSTER = [
    'wschod',
    'gora',
    'zachod',
]

export const FRAGMENTY_PIECZECI = [
    {
        id: 'skarabeusz',
        nazwa: 'Fragment ze skarabeuszem',
        symbol: '🪲',
    },
    {
        id: 'ankh',
        nazwa: 'Fragment z symbolem Ankh',
        symbol: '☥',
    },
    {
        id: 'oko',
        nazwa: 'Fragment z Okiem Horusa',
        symbol: '𓂀',
    },
]

export const POPRAWNA_KOLEJNOSC_PIECZECI = [
    'ankh',
    'skarabeusz',
    'oko',
]

export const INSKRYPCJA_PIECZECI = `OSTATNIA PRÓBA FARAONA

Trzy znaki tworzą pieczęć wolności.

Najpierw ten, który oznacza życie
i otwiera drogę ku wieczności.

Za nim ten, który każdego ranka
odradza się wraz ze Słońcem.

Na końcu strażnik królewskiego wzroku,
którego oko dostrzega prawdę.

Gdy znaki połączą się we właściwym
porządku, faraon odda Ci wolność.`



export const PLANSZA_SWIATLA = {
    rozmiar: 5,

    start: {
        x: 0,
        y: 4,
        kierunek: 'prawo',
    },

    cel: {
        x: 4,
        y: 4,
    },

    // Siedem zwierciadeł do ustawienia
    lustra: [
        {
            id: 'lustro1',
            x: 1,
            y: 4,
            poczatkoweUstawienie: '\\',
        },
        {
            id: 'lustro2',
            x: 1,
            y: 2,
            poczatkoweUstawienie: '\\',
        },
        {
            id: 'lustro3',
            x: 3,
            y: 2,
            poczatkoweUstawienie: '/',
        },
        {
            id: 'lustro4',
            x: 3,
            y: 3,
            poczatkoweUstawienie: '\\',
        },
        {
            id: 'lustro5',
            x: 2,
            y: 3,
            poczatkoweUstawienie: '/',
        },
        {
            id: 'lustro6',
            x: 2,
            y: 1,
            poczatkoweUstawienie: '\\',
        },
        {
            id: 'lustro7',
            x: 4,
            y: 1,
            poczatkoweUstawienie: '/',
        },
    ],


    przeszkody: [
        { x: 0, y: 2 },
        { x: 0, y: 0 },
        { x: 1, y: 1 },
        { x: 3, y: 4 },
        { x: 4, y: 0 },
    ],
}


