export const rooms = [
    {
        id: 1,
        number: '01',
        title: 'Opuszczone laboratorium',
        category: 'SCI-FI • TAJEMNICA',
        description:
            'Tajemnicze eksperymenty, ukryte notatki i odliczanie. Odkryj, co wydarzyło się w zamkniętym laboratorium.',
        image: '/images/laboratory.jpg',
        story:
            'Kilka miesięcy temu w podziemnym laboratorium chemicznym dr. Juliana Vance’a przeprowadzono eksperyment, który wymknął się spod kontroli. Obiekt odcięto od świata, a szalony naukowiec zniknął z główną dokumentacją badań – nikt nie wiedział, co naprawdę działo się za zamkniętymi drzwiami.\n\nBudzisz się w jednym z pomieszczeń jako porwany przez niego „Obiekt 04”. Drzwi wyjściowe są zablokowane zamkiem szyfrowym i zaworem, a w głośnikach rozbrzmiewa nagrana wiadomość doktora. Wokół na stołach znajdujesz tajemnicze notatki, kolby z odczynnikami, wskaźniki barw i narzędzia.\n\nMusisz przeszukać pomieszczenie, przeprowadzić właściwą reakcję chemiczną, złamać kod i wydostać się dalej. Uważaj jednak – nie każda substancja w tym laboratorium jest bezpieczna i nie wszystko powinno zostać tu odkryte.',
        difficulty: 'Średni',
        time: '15 minut',
        symbol: '⚗',
    },
    {
        id: 2,
        number: '02',
        title: 'Tajemnica faraona',
        category: 'PRZYGODA • HISTORIA',
        description:
            'Starożytna świątynia skrywa sekret. Rozszyfruj hieroglify i odnajdź drogę do ukrytego skarbu.',
        image: '/images/pharaoh.jpg',
        // EPIC 2 TASK 03: Utworzenie mechanizmu rozpoczynania gry -> główna grafika rozgrywki
        gameImage: '/images/pharaoh-chamber-2.png',
        story:
            'Podczas wyprawy archeologicznej odnajdujesz wejście do starożytnej świątyni, która przez tysiące lat pozostawała ukryta pod piaskami pustyni. Według legendy faraon ukrył w jej wnętrzu bezcenny skarb, którego pilnuje tajemnicza klątwa.\n\nGdy przekraczasz próg świątyni, wejście niespodziewanie się zamyka. Wokół znajdują się starożytne symbole, zagadkowe inskrypcje i mechanizmy, które od wieków nie były używane.\n\nAby wydostać się ze świątyni, musisz rozszyfrować hieroglify, odnaleźć ukryte wskazówki i rozwiązać zagadki pozostawione przez faraona. Czy uda Ci się odkryć tajemnicę grobowca i znaleźć wyjście?',
        difficulty: 'Łatwy',
        time: '15 minut',
        symbol: '𓂀',
    },
    {
        id: 3,
        number: '03',
        title: 'Ostatni pociąg',
        category: 'THRILLER • ZAGADKA',
        description:
            'Pociąg zatrzymał się w środku nocy. Masz niewiele czasu, aby odkryć prawdę i znaleźć wyjście.',
        image: '/images/train.jpg',
        story:
            'Jest późna noc. Podróżujesz ostatnim pociągiem, który przemierza opustoszałą trasę. Nagle skład gwałtownie się zatrzymuje, światła zaczynają migotać, a wszystkie drzwi zostają zablokowane.\n\nNa pokładzie nie ma żadnych pasażerów. Znajdujesz jedynie pozostawione przedmioty, tajemnicze wiadomości i zegar, który odmierza czas. Z każdą minutą sytuacja staje się coraz bardziej niepokojąca.\n\nMusisz przeszukać wagony, połączyć ze sobą znalezione wskazówki i odkryć, dlaczego pociąg zatrzymał się w tym miejscu. Nie wiesz, co wydarzyło się wcześniej ani dokąd zmierzał skład. Jedno jest pewne – musisz znaleźć wyjście, zanim będzie za późno.',
        difficulty: 'Trudny',
        time: '15 minut',
        symbol: '⏱',
    },
]