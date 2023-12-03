const fs = require("fs")

;(() => {
    let total = 0

    const data = fs.readFileSync("data.txt", "utf8").split("\r\n")

    data.forEach((line) => {
        const measurements = line.split("x").map((measurement) => parseInt(measurement, 10))
        console.log(measurements)

        let highestMeasurement = measurements[0]
        measurements.forEach((measurement) => {
            if (measurement > highestMeasurement) highestMeasurement = measurement
        })

        const volume = measurements[0] * measurements[1] * measurements[2]
        const shortestPerimeter = (measurements[0] + measurements[1] + measurements[2] - highestMeasurement) * 2

        const ribbonForPresent = volume + shortestPerimeter

        total += ribbonForPresent
    })

    console.log(total)
})()

//
