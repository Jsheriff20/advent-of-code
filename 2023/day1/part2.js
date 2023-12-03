const fs = require("fs");

const NUMBERS = ["one","two","three","four","five","six","seven","eight", "nine"]

function findFirstNumber(str, direction){
    let number = ''
    let analysingWord = ''

    for(let i = 0; i < str.length; i++){
        if(!!number) return number;

        if(direction === 'reverse'){
            const index =  str.length - i
            analysingWord = str[index] + analysingWord;
        } 
        else analysingWord += str[i] 

        NUMBERS.forEach((word) => {
            
            const wordsIndex = analysingWord.indexOf(word)
            if(wordsIndex === -1) return;

            number = word
        })
    }

    return number
}

function convertWordsToNumbers(str){
    let formattedStr = str
    let dictionary = {}
    let firstWord = findFirstNumber(str, 'forward')
    let lastWord = findFirstNumber(str, 'reverse')

    //build dictionary
    NUMBERS.map((word, i) => {
        dictionary[word] = i + 1
    })

    const firstValue = formattedStr.replace(firstWord, dictionary[firstWord]) // replace first occurrence only 
    const lastValue = formattedStr.replaceAll(lastWord, dictionary[lastWord]) // replace any occurrence

    return firstValue + lastValue // combined as it does not matter as the first and last will remain the same
}

(() => {
    let total = 0

    const data = fs.readFileSync("data.txt", "utf8").split("\n");

    data.forEach(value =>{
        const digits = convertWordsToNumbers(value).match(/\d+/g,)
        const firstNumber = digits[0][0] 
        const lastNumbers = digits[digits.length - 1]
        const lastNumber = lastNumbers[lastNumbers.length - 1]
        total += parseInt(firstNumber + lastNumber)
    })

    console.log(total)
})()


//54473
