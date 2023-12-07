const fs = require("fs")

;(() => {
    const data = fs.readFileSync("data.txt", "utf8").split("\n")
    const time = parseInt(data[0].match(/[0-9]+/g).join(''))
    const record = parseInt(data[1].match(/[0-9]+/g).join(''))


    const results = []
    for(let j = 0; j < time; j++){
        const result = (time - j) * j
        if(result > record) results.push((time - j) * j)
    }

    console.log(results.length)


})()

//26346