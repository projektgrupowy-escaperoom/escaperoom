import { useState } from 'react'
import Room2 from './room2/Room2'
import Room3 from './room3/Room3'

export default function Pharaon({ chamber, setChamber, setFoundObjects }) {
    const [room3Active, setRoom3Active] = useState(false)

    if (room3Active) {
        return <Room3 />
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