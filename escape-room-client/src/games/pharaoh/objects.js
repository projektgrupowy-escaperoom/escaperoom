// EPIC 2 TASK-05: Utworzenie widoku zagadki -> interaktywne przedmioty faraona

export const pharaohObjects = [
    {
        id: 'ancient-scroll',
        name: 'Starożytny zwój',
        roomId: 'entrance',
        puzzleId: 'scroll-puzzle',
        x: 18,
        y: 79,
        width: 12,
        height: 12,
        initiallyUnlocked: true
    },
    {
        id: 'sarcophagus',
        name: 'Sarkofag',
        roomId: 'entrance',
        puzzleId: 'sarcophagus-puzzle',
        x: 51,
        y: 48,
        width: 17,
        height: 27,
        initiallyUnlocked: false
    },
    {
        id: 'stone-door',
        name: 'Tajemne przejście',
        roomId: 'entrance',
        puzzleId: null,
        x: 10,
        y: 30,
        width: 15,
        height: 35,
        initiallyUnlocked: false
    }
]