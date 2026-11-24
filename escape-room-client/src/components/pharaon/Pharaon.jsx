// US 06: Gra faraona -> komponent wywoływany w App.jsx
// Na razie obejmuje pokój 2; pokój 1 jest jeszcze w pages/Game.jsx, który przekazuje tu stan komnaty i ekwipunek
import Room2 from './room2/Room2'

export default function Pharaon({ chamber, setChamber, setFoundObjects }) {
    return <Room2 chamber={chamber} setChamber={setChamber} setFoundObjects={setFoundObjects} />
}
