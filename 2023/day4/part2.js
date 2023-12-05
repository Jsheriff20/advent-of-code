const fs = require("fs")

;(() => {
    let cardCount = 0

    const data = fs.readFileSync("data.txt", "utf8").split("\n")

    const cards = []
    data.forEach((line) => {
        const lineData = line.split(":")
        const cardNumbers = lineData[1]?.split("|")
        const winningNumbersStr = cardNumbers[0]
        const myNumbersArr = cardNumbers[1].match(/[0-9]+/g)

        cards.push({winningNumbersStr, myNumbersArr, count:1})
    })

    cards.forEach(({winningNumbersStr, myNumbersArr, count}, i) => {
        cardCount += count

        let matches = 0
        myNumbersArr.forEach((number) => {
           if(winningNumbersStr.includes(` ${number} `)) matches++
        })

        for(let j = 0; j < matches; j++){
            if(!cards[i + j + 1]) return

             // get the next set of cards and add to their count
            cards[i + j + 1].count += count

        }
    })

    console.log(cardCount)
})()

//8467762