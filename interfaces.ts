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

function findHouses(arg1: string | House[]): HouseWithID[] {
    if (typeof arg1 === "string") {
        const parsedHouses = JSON.parse(arg1)
        const housesWithID = parsedHouses.map((house: House): HouseWithID => ({
            ...house,
            id: uuidv4()
        }))

        return housesWithID
    }
    const housesWithID = arg1.map((house: House): HouseWithID => ({
        ...house,
        id: uuidv4()
    }))

    return housesWithID
}

console.log(findHouses(JSON.stringify(houses)))

console.log(findHouses(JSON.stringify(houses), ({ name }) => name === "Atreides"))

console.log(findHouses(houses))