import { v4 as uuidv4 } from 'uuid'

const houses: House[] = [
    {
        "name": "Atreides",
        "planets": "Calladan"
    },
    {
        "name": "Corrino",
        "planets": [
            "Kaitan",
            "Salusa Secundus"
        ]
    },
    {
        "name": "Harkonnen",
        "planets": [
            "Giedi Prime",
            "Arrakis"
        ]
    }
]

interface House {
    name: string
    planets: string | string[]
}

interface HouseWithID {
    name: string
    planets: string | string[]
    id: string
}

function findHouses(houses: string): HouseWithID[];
function findHouses(
    houses: string,
    filter: (house: House) => boolean
): HouseWithID[];
function findHouses(houses: House[]): HouseWithID[];
function findHouses(
    houses: House[],
    filter: (house: House) => boolean
): HouseWithID[];

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