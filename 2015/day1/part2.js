const fs = require("fs")

;(() => {
    let level = 0

    const data = fs.readFileSync("data.txt", "utf8").split("\n")
    const charArray = data[0].split("")

    for (let i = 0; i < charArray.length; i++) {
        const char = charArray[i]

        if (char === "(") level++
        else if (char === ")") level--

        if (level < 0) return console.log(i + 1)
    }
})()
