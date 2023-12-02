const fs = require("fs")

const COLOURS = ["red", "green", "blue"]

;(() => {
    let total = 0

    const data = fs.readFileSync("data.txt", "utf8").split("\n")

    data.forEach((line) => {
        const lineData = line.split(":")
        const values = lineData[1]?.split(/;|,/g)
        const highestValues = {}

        values.forEach((value) => {
            const count = parseInt(value.match(/\d+/g)[0])

            COLOURS.forEach((colour) => {
                if (value.includes(colour) && (highestValues[colour] ?? 0) < count) {
                    highestValues[colour] = count
                }
            })
        })

        let gameTotal = 1
        COLOURS.forEach((colour) => (gameTotal *= highestValues[colour]))

        total += gameTotal
    })

    console.log(total)
})()

// 49710
