const fs = require("fs")

;(() => {
    let total = 0

    const data = fs.readFileSync("data.txt", "utf8").split("\n")

    data.forEach((line) => {
        const lineData = line.split(":")
        const cardNumbers = lineData[1]?.split("|")
        const winningNumbersStr = cardNumbers[0]
        const myNumbersArr = cardNumbers[1].match(/[0-9]+/g)

        let cardPoints = 0
        myNumbersArr.forEach((number) => {
           if(winningNumbersStr.includes(` ${number} `)){
                if(cardPoints ==0) return cardPoints = 1
                cardPoints *= 2
           }
        })

        total += cardPoints
    })

    console.log(total)
})()

//26346