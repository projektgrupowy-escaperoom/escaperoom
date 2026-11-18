// EPIC 2 TASK-05: Utworzenie widoku zagadki -> pomieszczenia pokoju faraona

export const pharaohRooms = [
    {
        id: 'entrance',
        name: 'Komnata wejściowa',
        description: 'Pierwsza komnata starożytnego grobowca.',
        image: '/images/pharaoh-chamber.jpg',
        objects: ['ancient-scroll', 'sarcophagus', 'stone-door']
    },
    {
        id: 'burial',
        name: 'Komnata faraona',
        description: 'Miejsce spoczynku starożytnego władcy.',
        image: '/images/pharaoh-burial.jpg',
        objects: ['wall-symbols', 'golden-key']
    },
    {
        id: 'treasure',
        name: 'Ukryty skarbiec',
        description: 'Ostatnie pomieszczenie grobowca.',
        image: '/images/pharaoh-treasure.jpg',
        objects: ['treasure-chest']
    }
]