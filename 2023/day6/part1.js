const fs = require("fs")

;(() => {
    const data = fs.readFileSync("data.txt", "utf8").split("\n")
    const times = data[0].match(/[0-9]+/g)
    const records = data[1].match(/[0-9]+/g)

    const distancesTraveled = times.map((time, i) =>{
        const results = []
        for(let j = 0; j < time; j++){
            const result = (time - j) * j
            if(result > records[i]) results.push((time - j) * j)
        }
        return results.length
    })

    console.log(distancesTraveled.reduce((p, c) => p * c))

})()

//1312850