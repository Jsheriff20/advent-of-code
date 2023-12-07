const fs = require("fs")

function createJsonConversionMap(data){
    const conversionArray = []

    let currentJsonIndex = 1

    data.forEach((line) => {
        if(!line) return

        if((/[a-zA-Z]+/g).test(line)){
            currentJsonIndex++
            conversionArray[currentJsonIndex] = []
            return
        }

        conversionArray[currentJsonIndex].push(line.split(' ')?.map((value) => parseInt(value)))
    })

    return conversionArray.filter(map => map != null && map?.length )
}

function getConversionNumbers(source, conversions){
    let result = source
    conversions.forEach(conversion => {
        if(result != source) return

        // conversions order = destination range start | source range start | range length
        const sourceInRange = source >= conversion[1] && source < (conversion[1] + conversion[2] - 1)

        if(sourceInRange){
            const sourceRangePoint = source - conversion[1]
            result =  conversion[0] + sourceRangePoint
        }
    })

    return result
}

;(() => {
    const data = fs.readFileSync("data.txt", "utf8").split("\n")
    const seeds = data[0].replace('seeds: ', '').split(" ").map((value) => parseInt(value))


    const conversionArray = createJsonConversionMap(data)
    const array = [seeds]

    let index = 0
    do {
        const conversionResults = array[index].map((test)=> {
            return getConversionNumbers(test, conversionArray[index])
        })

        array.push(conversionResults)
        index++
    } while (index !== conversionArray.length);

    
    const lowestValue = array[array.length - 1].reduce((a, b) => Math.min(a, b), +Infinity);

    console.log(lowestValue)
})()

//261668924