import { useState } from 'react'
import Room2 from './room2/Room2'
import Room3 from './room3/Room3'
import Room4 from './room4/Room4'
import VictoryScreen from './room4/VictoryScreen'

export default function Pharaon({ chamber, setChamber, setFoundObjects }) {
    const [room3Active, setRoom3Active] = useState(false)
    const [room4Active, setRoom4Active] = useState(false)
    const [gameFinished, setGameFinished] = useState(false)

    if (gameFinished) {
        return <VictoryScreen />
    }

    if (room4Active) {
        return (
            <Room4
                onFinish={() => setGameFinished(true)}
            />
        )
    }

    if (room3Active) {
        return (
            <Room3
                onNextRoom={() => setRoom4Active(true)}
            />
        )
    }


    return (
        <Room2
            chamber={chamber}
            setChamber={setChamber}
            setFoundObjects={setFoundObjects}
            onNextRoom={() => setRoom3Active(true)}
        />
    )
}