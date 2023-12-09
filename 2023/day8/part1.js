const fs = require("fs")

;(() => {
    const data = fs.readFileSync("data.txt", "utf8").split("\r\n")

    let stepCount = 0

    const inputs = data[0].split("")
    const directionsMapping = {}

    data.splice(0, 2)
    data.forEach((directionMap) => {
        const info = directionMap
            .replace(/[^a-zA-Z]/g, ",")
            .split(",")
            .filter((map) => !!map)

        directionsMapping[info[0]] = { L: info[1], R: info[2] }
    })

    let currentPosition = directionsMapping.AAA
    do {
        const currentStep = stepCount % inputs.length
        currentPosition = directionsMapping[currentPosition[inputs[currentStep]]]
        stepCount++
    } while (currentPosition != directionsMapping.ZZZ)

    console.log(stepCount)
})()
