const fs = require("fs")

function findAllSymbols(line) {
    let localLine = line
    let symbolLocations = []

    const matches = line.match(/[^a-zA-Z0-9.\s]/g)
    matches?.map((symbol) => {
        const location = localLine.indexOf(symbol)
        symbolLocations.push(location)
        localLine = localLine.replace(symbol, ".") // replace first instance of the symbol we found
    })

    return symbolLocations
}

function checkLinesPositionsForNumbers(line, lineIndex, symbolIndex) {
    const numberLocations = []
    const linePositionsToCheck = [symbolIndex - 1, symbolIndex, symbolIndex + 1]

    linePositionsToCheck.forEach((position) => {
        if (/[0-9]/.test(line[position])) numberLocations.push({ lineIndex, position })
    })

    return numberLocations
}

//find first number then work forwards to get the whole number
function findWholeNumbers(line, locatedNumIndex) {
    let firstNumIndex = null
    let number = ""

    let currentIndex = locatedNumIndex
    while (true) {
        const checkingIndex = currentIndex - 1

        if (/[0-9]/g.test(line[checkingIndex])) {
            currentIndex = checkingIndex
            continue
        }

        firstNumIndex = currentIndex
        number += line[currentIndex]
        break
    }

    while (true) {
        const checkingIndex = currentIndex + 1

        if (/[0-9]/g.test(line[checkingIndex])) {
            currentIndex = checkingIndex
            number += line[checkingIndex]
            continue
        }

        break
    }

    return { firstNumIndex, number }
}

;(() => {
    let total = 0

    const data = fs.readFileSync("data.txt", "utf8").split("\n")

    const locationsToCheck = data.map((line) => {
        return findAllSymbols(line)
    })
    const refinedNumberLocations = locationsToCheck.map((symbolLocations, i) => {
        const linesToCheck = [
            { lineIndex: i - 1, line: data[i - 1] },
            { lineIndex: i + 1, line: data[i + 1] },
            { lineIndex: i, line: data[i] },
        ]

        const numberLocations = []

        symbolLocations.forEach((symbolIndex) => {
            linesToCheck.forEach(({ lineIndex, line }) => {
                numberLocations.push(checkLinesPositionsForNumbers(line ?? "", lineIndex, symbolIndex))
            })
        })

        return numberLocations.flat()
    })

    const partNumbers = []
    refinedNumberLocations.flat().map(({ lineIndex, position }) => {
        if (lineIndex === null || position === null) return

        const { firstNumIndex, number } = findWholeNumbers(data[lineIndex], position)

        if (!partNumbers[lineIndex]) partNumbers[lineIndex] = []
        partNumbers[lineIndex][firstNumIndex] = number //add to array based on firstNumIndex to prevent duplicates
    })
    partNumbers.flat().forEach((number) => (total += parseInt(number)))

    console.log(total)
})()

//517021
