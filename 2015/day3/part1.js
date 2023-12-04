const fs = require("fs")

;(() => {
    const data = fs.readFileSync("data.txt", "utf8").split("\r\n")

    const positionsVisited = ["{ x: 0, y: 0 }"]
    const currentPosition = { x: 0, y: 0 }

    data[0].split("").forEach((direction) => {
        if (direction === "^") currentPosition["y"]++
        else if (direction === "v") currentPosition["y"]--
        else if (direction === ">") currentPosition["x"]++
        else if (direction === "<") currentPosition["x"]--

        positionsVisited.push(JSON.stringify(currentPosition))
    })

    const checkedPositions = []

    positionsVisited.forEach((position) => {
        if (checkedPositions.includes(position)) return

        checkedPositions.push(position)
    })

    console.log(checkedPositions.length)
})()

//2591
