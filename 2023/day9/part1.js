const fs = require("fs")

;(() => {
    let total = 0
    const data = fs.readFileSync("data.txt", "utf8").split("\n")


    data.forEach(line => {
        const extrapolatedRows = [line.split(' ').map(value => parseInt(value))]
        let i = 0

        do {
            const currentResults = extrapolatedRows[i]
            let extrapolatedRow = []
            for(let j = 0; j < currentResults.length - 1; j++){
                extrapolatedRow.push(currentResults[j + 1] - currentResults[j])
            }   

            extrapolatedRows.push(extrapolatedRow)
            i++
        } while (extrapolatedRows[extrapolatedRows.length - 1].filter(result => result !== 0).length);
        

        const extrapolatedResults = []


        do {
            const currentRow = extrapolatedRows[i]
            const prevRow = extrapolatedResults[extrapolatedResults.length - 1]
            let extrapolatedResult = currentRow

            if(currentRow.filter(result => result === 0).length == currentRow.length){
                extrapolatedResult = [...extrapolatedResult, 0]

            }
            else{
                const nextValue = currentRow[currentRow.length - 1] + prevRow[prevRow.length -  1]
                extrapolatedResult.push(nextValue)

                if(i === 0) total += nextValue
            }

            extrapolatedResults.push(extrapolatedResult)
            i--

        } while (i >= 0);
    })

    console.log(total)
})()
