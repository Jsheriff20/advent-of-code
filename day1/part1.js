const fs = require("fs");

(() => {
    let total = 0

    const data = fs.readFileSync("data.txt", "utf8").split("\n");

    data.forEach(value =>{
        const digits = value.match(/\d+/g,)
        const firstNumber = digits[0][0] 
        const lastNumbers = digits[digits.length - 1]
        const lastNumber = lastNumbers[lastNumbers.length - 1]
        total += parseInt(firstNumber + lastNumber)
    })

    console.log(total)
})()



