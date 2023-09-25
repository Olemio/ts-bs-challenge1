import { v4 as uuidv4 } from 'uuid'
import houses from "./houses.json"

interface House {
    name: string
    planets: string | string[]
}
interface HouseWithID extends House {
    id: string
}

function findHouses(
    arg1: string | House[],
    arg2?: (house: House) => boolean
): HouseWithID[] {
    let parsedHouses: House[]

    typeof arg1 === "string" ? parsedHouses = JSON.parse(arg1) : parsedHouses = arg1
    arg2 ? parsedHouses = parsedHouses.filter(house => arg2(house)) : null

    const housesWithID = parsedHouses.map(house => ({
        ...house,
        id: uuidv4()
    }))

    return housesWithID
}

console.log(1, findHouses(JSON.stringify(houses)))
console.log(2, findHouses(JSON.stringify(houses), ({ name }) => name === "Corrino"))
console.log(3, findHouses(houses))
console.log(4, findHouses(houses, ({ name }) => name === "Harkonnen"))