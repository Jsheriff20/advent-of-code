const fs = require("fs")

function findAllSymbols(line, lineIndex) {
    let localLine = line
    let symbolLocations = []

    const matches = line.match(/[*]/g)
    matches?.map((symbol) => {
        const location = localLine.indexOf(symbol)
        symbolLocations.push({ location, id: `${lineIndex}-${location}` })
        localLine = localLine.replace(symbol, ".") // replace first instance of the symbol we found
    })

    return symbolLocations
}

function checkLinesPositionsForNumbers(line, lineIndex, symbolIndex, sourceSymbol) {
    const numberLocations = []
    const linePositionsToCheck = [symbolIndex - 1, symbolIndex, symbolIndex + 1]

    linePositionsToCheck.forEach((position) => {
        if (/[0-9]/.test(line[position])) numberLocations.push({ lineIndex, position, sourceSymbol })
    })

    return numberLocations
}

//find first number then work forwards to get the whole number
function findWholeNumbers(line, locatedNumIndex, sourceSymbol) {
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

    return { firstNumIndex, number, sourceSymbol }
}

;(() => {
    let total = 0

    const data = fs.readFileSync("data.txt", "utf8").split("\n")

    const locationsToCheck = data.map((line, i) => {
        return findAllSymbols(line, i)
    })

    const refinedNumberLocations = locationsToCheck.map((symbolLocations, i) => {
        const linesToCheck = [
            { lineIndex: i - 1, line: data[i - 1] },
            { lineIndex: i + 1, line: data[i + 1] },
            { lineIndex: i, line: data[i] },
        ]

        const numberLocations = []

        symbolLocations.forEach(({ location: symbolIndex, id }) => {
            linesToCheck.forEach(({ lineIndex, line }) => {
                numberLocations.push(checkLinesPositionsForNumbers(line ?? "", lineIndex, symbolIndex, id))
            })
        })

        return numberLocations.flat()
    })

    const potentialGears = []
    refinedNumberLocations.flat().map(({ lineIndex, position, sourceSymbol: sourceSymbolId }, i) => {
        if (lineIndex === null || position === null) return

        const { firstNumIndex, number, sourceSymbol } = findWholeNumbers(data[lineIndex], position, sourceSymbolId)

        if (!potentialGears[lineIndex]) potentialGears[lineIndex] = []
        potentialGears[lineIndex][firstNumIndex] = { number, sourceSymbol } //add to array based on firstNumIndex to prevent duplicates
    })

    let countOfEachSourceSymbol = {}
    potentialGears.flat().forEach(({ sourceSymbol }) => {
        countOfEachSourceSymbol[sourceSymbol] = (countOfEachSourceSymbol[sourceSymbol] ?? 0) + 1
    })

    const checkedGearsIds = []
    const checkedGearsNumbers = []

    const validGears = potentialGears
        .flat()
        .map(({ number, sourceSymbol }) => {
            if (checkedGearsIds.includes(sourceSymbol) && countOfEachSourceSymbol[sourceSymbol] === 2)
                return number * checkedGearsNumbers[checkedGearsIds.indexOf(sourceSymbol)]

            checkedGearsIds.push(sourceSymbol)
            checkedGearsNumbers.push(number)
        })
        .filter((gear) => !!gear)

    validGears.forEach((number) => (total += parseInt(number)))

    console.log(total)
})()

//81296995
