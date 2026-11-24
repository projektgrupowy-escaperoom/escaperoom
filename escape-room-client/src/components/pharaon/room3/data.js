
export const OBRAZY = {
    komnata: '/images/pharaon/room3/room3_layout.png',
}

export const STRAZNICY = [
    {
        id: 'human',
        nazwa: 'Człowiek',
        obraz: '/images/pharaon/room3/guardian_human.png',
    },
    {
        id: 'sphinx',
        nazwa: 'Sfinks',
        obraz: '/images/pharaon/room3/guardian_sphinx.png',
    },
    {
        id: 'falcon',
        nazwa: 'Sokół',
        obraz: '/images/pharaon/room3/guardian_falcon.png',
    },
    {
        id: 'cobra',
        nazwa: 'Kobra',
        obraz: '/images/pharaon/room3/guardian_cobra.png',
    },
]

// Południe -> Zachód -> Północ -> Wschód
export const POPRAWNA_KOLEJNOSC = [
    'falcon',
    'cobra',
    'human',
    'sphinx',
]

export const KOLEJNOSC_START = [
    'cobra',
    'human',
    'sphinx',
    'falcon',
]

export const MAPA_KIERUNKOW = [
    { kierunek: 'Północ', symbol: 'human' },
    { kierunek: 'Wschód', symbol: 'sphinx' },
    { kierunek: 'Południe', symbol: 'falcon' },
    { kierunek: 'Zachód', symbol: 'cobra' },
]

export const SZYFR = [
    { znak: '𓂋', litera: 'R' },
    { znak: '𓉔', litera: 'H' },
    { znak: '𓋴', litera: 'S' },
    { znak: '𓅱', litera: 'U' },
    { znak: '𓊪', litera: 'P' },
    { znak: '𓄿', litera: 'A' },
    { znak: '𓎡', litera: 'K' },
    { znak: '𓅓', litera: 'M' },
    { znak: '𓆑', litera: 'F' },
    { znak: '𓈖', litera: 'N' },
]

export const POPRAWNA_ODPOWIEDZ = [
    '𓉔',
    '𓅱',
    '𓅓',
    '𓄿',
    '𓈖',
]

// Litery zamków odpowiadają angielskim nazwom kierunków:
// South, West, North, East.
export const KLUCZE = [
    {
        id: 'falcon',
        kolor: 'zloty',
        nazwa: 'Złoty klucz',
        symbol: 'falcon',
        litera: 'S',
    },
    {
        id: 'cobra',
        kolor: 'zielony',
        nazwa: 'Zielony klucz',
        symbol: 'cobra',
        litera: 'W',
    },
    {
        id: 'human',
        kolor: 'czerwony',
        nazwa: 'Czerwony klucz',
        symbol: 'human',
        litera: 'N',
    },
    {
        id: 'sphinx',
        kolor: 'niebieski',
        nazwa: 'Niebieski klucz',
        symbol: 'sphinx',
        litera: 'E',
    },
]

export const TEKSTY = {
    papirusDroga: `Gdy świat pogrążył się w chaosie, bóg Ra zstąpił z niebios, by odnaleźć cztery pradawne pieczęcie, które miały przywrócić porządek na ziemi.

Pierwszą z nich ukryto na Południu, gdzie palące słońce wypalało każdy ślad na piasku.

Drugą powierzono mrocznym siłom Zachodu, tam, gdzie ostatnie promienie dnia giną za horyzontem.

Trzecią Ra odnalazł na Północy, pośród krain skutej lodem ciszy, gdzie nawet wiatr zdawał się nie wydawać dźwięku.

Ostatnia spoczywała na Wschodzie, gdzie każdego poranka słońce ponownie rozpoczynało swą wędrówkę.

Dopiero gdy cztery pieczęcie zostaną odnalezione we właściwej kolejności, równowaga świata zostanie przywrócona.`,

    papirusHistoria: `Kroniki królewskiego grobowca

W tej komnacie spoczywa faraon Nebcheperure Tutanchamon, władca, którego imię miało przetrwać wieki.

Po jego śmierci kapłani zgromadzili najcenniejsze skarby królestwa i złożyli je w głębi grobowca. Ściany ozdobiono historiami bogów, a wejścia powierzono strażnikom, którzy mieli czuwać nad wiecznym snem władcy.

Przez pokolenia nikt nie odważył się zakłócić ciszy tego miejsca. Piasek pochłonął ślady dawnych wędrowców, a imię faraona stopniowo zniknęło z pamięci ludzi.

Pozostała jedynie komnata, jej strażnicy i tajemnice, których nie zdołał zabrać ze sobą czas.`,
    papirusUszkodzony: '',
    papirusNotatki: `Notatki tłumacza

Dawna zagadka opowiada o istocie, która wraz z upływem życia zmienia sposób poruszania się.

Na początku potrzebuje czterech podpór, później dwóch, a u kresu życia pomaga sobie trzecią.

Starożytni zapisywali odpowiedź w języku obcych ludów. Warto pamiętać, że słowo oznaczające człowieka w języku angielskim składa się z pięciu liter.`,
}
