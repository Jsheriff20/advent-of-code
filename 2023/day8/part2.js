const fs = require("fs")

function getLCM(array) {
    const gcd = (a, b) => {
        if (!a) return b

        const remainder = b % a
        return gcd(remainder, a)
    }

    const lcm = (a, b) => (a * b) / gcd(a, b)

    return array.reduce(lcm)
}

;(() => {
    const data = fs.readFileSync("data.txt", "utf8").split("\r\n")

    let stepCount = 0

    const inputs = data[0].split("")
    const directionsMapping = {}

    data.splice(0, 2)
    data.forEach((directionMap) => {
        const info = directionMap
            .replace(/[^a-zA-Z0-9]/g, ",")
            .split(",")
            .filter((map) => !!map)

        directionsMapping[info[0]] = { L: info[1], R: info[2] }
    })

    const startingPositions = Object.keys(directionsMapping).filter((position) => position[2] === "A")
    const startingPositionsShortestPathVals = {}
    let currentPositions = startingPositions.map((currentPosition) => {
        startingPositionsShortestPathVals[currentPosition] = null
        return {
            currentPosition,
            ...directionsMapping[currentPosition],
        }
    })

    do {
        const currentStep = stepCount % inputs.length
        stepCount++

        currentPositions = currentPositions.map(({ currentPosition }, i) => {
            const nextPosition = directionsMapping[currentPosition][inputs[currentStep]]

            if (nextPosition[2] == "Z") startingPositionsShortestPathVals[startingPositions[i]] = stepCount

            return { currentPosition: nextPosition, ...directionsMapping[nextPosition] }
        })
    } while (Object.values(startingPositionsShortestPathVals).filter((pathVal) => !pathVal).length)

    console.log(getLCM(Object.values(startingPositionsShortestPathVals)))
})()

//13740108158591
