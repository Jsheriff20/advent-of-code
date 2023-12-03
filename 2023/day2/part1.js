const fs = require("fs")

const COLOURS = ["red", "green", "blue"]
const BAG_CONTENT = { red: 12, green: 13, blue: 14 }

;(() => {
    let total = 0

    const data = fs.readFileSync("data.txt", "utf8").split("\n")

    data.forEach((line) => {
        const lineData = line.split(":")
        const games = lineData[1]?.split(/;+/g)
        let possible = true

        games.forEach((game) => {
            const gameInfoArray = game?.split(/,+/g)

            gameInfoArray.forEach((gameInfo) => {
                const count = parseInt(gameInfo.match(/\d+/g)[0])

                COLOURS.forEach((colour) => {
                    if (gameInfo.includes(colour) && count > BAG_CONTENT[colour]) possible = false
                })
            })
        })

        if (!possible) return

        const gameNumber = parseInt(lineData[0].replace("Game ", ""))
        total += gameNumber
    })

    console.log(total)
})()

// 2683
