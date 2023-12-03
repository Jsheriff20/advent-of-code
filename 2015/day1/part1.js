const fs = require("fs")

;(() => {
    let level = 0

    const data = fs.readFileSync("data.txt", "utf8").split("\n")

    data[0].split("").forEach((char) => {
        if (char === "(") level++
        else if (char === ")") level--
    })

    console.log(level)
})()

//138
