// US 06: Rozwiązywanie zagadek pomieszczenie 2 -> dane komnaty Anubisa (teksty, symbole, położenie elementów)

const KATALOG = '/images/pharaon/room2'

export const OBRAZY = {
    komnata: `${KATALOG}/komnata.png`,
    komnataOtwarta: `${KATALOG}/komnata-otwarta.jpg`,
    oltarzMaat: `${KATALOG}/oltarz-maat.jpg`,
    pioro: `${KATALOG}/pioro.jpg`,
    serceKrata: `${KATALOG}/serce-krata.jpg`,
    serceNisza: `${KATALOG}/serce-nisza.jpg`,
}

// Nazwy przedmiotów w ekwipunku
export const PRZEDMIOTY = {
    pioro: 'Pióro Maat',
    ankh: 'Krzyż Ankh',
    dzban: 'Gliniany dzban',
    serce: 'Kamienne serce',
}

// Za każdą pochodnią jest hieroglif; prawdziwe są tylko te za zapalonymi pochodniami (Lotos i Sokół to fałszywe tropy)
export const SYMBOLE = ['Skarabeusz', 'Wąż', 'Oko Horusa', 'Ibis', 'Lotos', 'Sokół', 'Szakal']

// Rozwiązanie ołtarza (indeksy w SYMBOLE): Skarabeusz -> Wąż -> Oko Horusa -> Ibis -> Szakal
export const KOLEJNOSC_MAAT = [0, 1, 2, 3, 6]

// Początkowe ułożenie bloków na ołtarzu
export const BLOKI_START = [0, 4, 5, 1, 2]

// Pochodnie:
// obszar  – klikalne miejsce: [left %, top %, szerokość %, wysokość %]
// plomien – tylko zapalone pochodnie: [left %, top % (podstawa płomienia nad czaszą), skala, opóźnienie animacji s]
export const POCHODNIE = [
    { symbol: 'Skarabeusz', obszar: [8, 15, 7, 28], plomien: [12.2, 29.4, 1, -0.2] },
    { symbol: 'Lotos', obszar: [22.5, 28, 5, 16] },
    { symbol: 'Wąż', obszar: [35.5, 28, 3.5, 15], plomien: [37.3, 36.9, 0.55, -0.6] },
    { symbol: 'Oko Horusa', obszar: [42, 29, 3.5, 15], plomien: [43.9, 38.1, 0.5, -0.1] },
    { symbol: 'Ibis', obszar: [70, 29, 3.5, 16], plomien: [71.6, 37.9, 0.55, -0.5] },
    { symbol: 'Sokół', obszar: [79, 24, 4.5, 21] },
    { symbol: 'Szakal', obszar: [86, 16, 6, 30], plomien: [88.7, 31.5, 1, -0.4] },
]

export const TEKSTY = {
    wstep: 'Ciężkie, kamienne wrota zatrzaskują się za Tobą z głuchym hukiem. Powietrze jest gęste, suche i pachnie starym pyłem oraz dymem z pochodni. W blasku migoczących płomieni wyłania się potężny posąg Anubisa - boga zmarłych, strzegącego przejścia w głąb piramidy. Przed nim stoi kamienny ołtarz. Jego puste szale wagi kołyszą się lekko, czekając na osąd. Za posągiem majaczą zamknięte, masywne drzwi pokryte hieroglifami. Aby przejść dalej, musicie udowodnić, że wasze czyny są lżejsze niż pióro prawdy. Szukaj go wyłącznie tam, gdzie pada blask ognia na kamienne filary - cień skrywa fałsz.',

    // Ołtarz Maat
    niszaPusta: 'Skrytka w niszy jest już pusta.',
    niszaPierwszyRaz: 'Widzisz ołtarz bogini Maat, a na nim kilka kamiennych bloków, każdy oznaczony innym symbolem. Gdzieś już je widziałeś.. Pierwszy z nich oznaczony Skarabeuszem jest znaczniej niżej od reszty, zupełnie jak wciśnięty przycisk, co to może oznaczać?',
    blokWcisniety: 'Blok ze Skarabeuszem jest wciśnięty głęboko w ołtarz i ani drgnie.',
    blokObrocony: (symbol) => `Kamienny blok obraca się z ciężkim zgrzytem. Widoczny symbol to: ${symbol}.`,
    odkryciePiora: 'Po ułożeniu ostatniego przycisku ołtarz gwałtownie zadrżał. Wskutek wstrząsów otaczający go pył i kurz wzbiły się wysoko w powietrze, tworząc gęstą mgłę. Przez krótką chwilę nie dało się dostrzec zupełnie niczego.\n\nGdy pył w końcu opadł, zauważyłeś, że ołtarz się otworzył. W jego wnętrzu spoczywało Pióro Prawdy. Ostrożnie zabierasz je ze sobą. Kto wie, być może jeszcze okaże się przydatne.',

    // Pochodnie
    pochodniaZapalona: (symbol) => `Blask płonącej pochodni wyraźnie oświetla płaskorzeźbę za nią. Wyryto na niej symbol: ${symbol}.`,
    pochodniaZgaszona: (symbol) => `Pochodnia jest zgaszona, z jej czaszy unosi się jedynie cienka smużka dymu. W półmroku z trudem dostrzegasz wyryty za nią symbol: ${symbol}.`,

    // Krzyż Ankh i dzban
    ankhZablokowany: 'Kamienny krzyż Ankh tkwi nieruchomo w ołtarzu, jakby przytrzymywała go niewidzialna siła. Najpierw musisz odnaleźć symbol prawdy.',
    ankhZabrany: 'Podnosisz kamienny krzyż Ankh. Tak! To ten kształt! Może za jego pomocą uda się otworzyć zamknięte serce.',
    dzbanZablokowany: 'Gliniany dzban ani drgnie – wydaje się przyrośnięty do kamiennego ołtarza. Najpierw musisz odnaleźć symbol prawdy.',
    dzbanZwykly: 'Na ołtarzu stoi zwykły, gliniany dzban. Na razie nie wydaje się do niczego potrzebny.',
    dzbanZabrany: 'Zauważasz, że dzban jest czymś wypełniony. Zaglądasz do środka i dostrzegasz niewielkie kule. Są zaskakująco ciężkie, jakby wykonano je z ołowiu. Może właśnie tego potrzebujesz, by wypełnić tajemniczy otwór? Pora się przekonać!',

    // Serce za kratą
    sercePuste: 'Nisza za kratą jest już pusta.',
    odkrycieSerca: 'Coś przykuwa twoją uwagę w kącie komnaty. Podchodzisz bliżej i dostrzegasz czarne, skamieniałe serce, zamknięte za metalową kratą. Po jego lewej stronie znajduje się otwór na klucz o bardzo charakterystycznym kształcie. Wygląda dziwnie znajomo…\n\nPo prawej stronie zauważasz kolejny otwór, jednak ten jest szczelnie zamknięty. Zastanawiasz się, co mogłoby go otworzyć.',
    ankhWZamku: 'Krzyż Ankh idealnie pasuje do zamka! Jednak coś jest nie tak… Zamiast otworzyć kratę chroniącą serce, odsłonił się jedynie niewielki otwór. Co można z nim zrobić? Może mechanizm działa na zasadzie dźwigni? Być może wystarczy wypełnić otwór czymś ciężkim, aby uniosły się kraty? Tylko skąd wziąć przedmiot, który będzie jednocześnie wystarczająco ciężki i na tyle mały, by zmieścić się w otworze?',
    zamekAnkhPusty: 'Otwór na klucz ma kształt krzyża Ankh. Gdzieś już widziałeś taki kształt…',
    otworZamkniety: 'Okrągły otwór jest szczelnie zamknięty. Zastanawiasz się, co mogłoby go otworzyć.',
    otworPusty: 'Mechanizm jest otwarty, ale w środku jest pusto. Wygląda na to, że trzeba go czymś obciążyć.',
    zdobycieSerca: 'Kule idealnie pasowały do otworu! Już po wrzuceniu pierwszej z nich zauważyłeś, że krata delikatnie się uniosła. Gdy umieściłeś w środku wszystkie kule, krata podniosła się całkowicie, odsłaniając skamieniałe serce. Zabierasz je ze sobą. Chyba już wiesz, co z nim zrobić…',

    // Waga
    wagaRownowaga: 'Szale wagi trwają w idealnej równowadze.',
    wagaBezPiora: 'Szale wagi są puste. Potrzebujesz symbolu prawdy, który zrównoważy ciężar duszy.',
    wagaBezSerca: 'Masz już Pióro Prawdy, ale na drugiej szali brakuje czegoś, co zostanie z nim zważone.',
    final: 'Delikatnie kładziesz serce i pióro na szalach wagi. Przez chwilę z przerażeniem obserwujesz, jak waga niepewnie się kołysze. Raz cięższe wydaje się serce, za moment szala przechyla się na stronę pióra. Na szczęście po chwili obie szale powoli się wyrównują. Tym razem ci się udało! Drzwi powoli otwierają się, odsłaniając przejście do kolejnej komnaty.',
}
