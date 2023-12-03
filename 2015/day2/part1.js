const fs = require("fs")

;(() => {
    let total = 0

    const data = fs.readFileSync("data.txt", "utf8").split("\r\n")

    data.forEach((line) => {
        const measurements = line.split("x").map((measurement) => parseInt(measurement, 10))

        const calculations = [
            measurements[0] * measurements[1] * 2,
            measurements[0] * measurements[2] * 2,
            measurements[1] * measurements[2] * 2,
        ]

        let lowestCalculation = calculations[0]
        calculations.forEach((calculation) => {
            if (calculation < lowestCalculation) lowestCalculation = calculation
        })

        const singlePresent = calculations[0] + calculations[1] + calculations[2] + lowestCalculation / 2

        total += singlePresent
    })

    console.log(total)
})()

//1606483
