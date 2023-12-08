const fs = require("fs")

const FIVE_OF_A_KIND=1,
 FOUR_OF_A_KIND=2,
 FULL_HOUSE=3,
 THREE_OF_A_KIND=4,
 TWO_PAIR=5,
 ONE_PAIR=6,
 HIGH_CARD=7

const CARD_VALUES = {
    A: 14,
    K: 13,
    Q: 12,
    T: 10,
    J: 1
}


function convertHandToCardValues(hand){
    const cards = hand.split('')

    return cards.map(card => /[0-9]/g.test(card) ? parseInt(card) : CARD_VALUES[card])
}

function getLowestValue(current, newValue){
    return current > newValue ? newValue : current
}

function getHandScore(cardValues){
    let lowest = 999

    for(let i = 2; i < 15; i++){
        let testCardSet = cardValues.map(value => value == 1 ? i : value)
        const cardSet = new Set(testCardSet)
        
        if(cardSet.size === 1) return FIVE_OF_A_KIND

        if(cardSet.size === 2){
            const array = []
            testCardSet.forEach(value => array[value] = array[value] ? array[value] + 1 : 1)
            if(testCardSet.includes(1)) return FIVE_OF_A_KIND

            if(array.join().includes('3')) {
                lowest = getLowestValue(lowest, FULL_HOUSE)
                continue;
            }
            lowest = getLowestValue(lowest, FOUR_OF_A_KIND)
            continue;
        }

        if(cardSet.size === 3){
            const array = []
            testCardSet.forEach(value => array[value] = array[value] ? array[value] + 1 : 1)
            if(array.join().includes('3')) {
                lowest = getLowestValue(lowest, THREE_OF_A_KIND)
                continue;
            } 

            lowest = getLowestValue(lowest, TWO_PAIR)
            continue;
        }

        if(cardSet.size === 4) {
            lowest = getLowestValue(lowest, ONE_PAIR)
            continue;
        }  

        if(cardSet.size === 5) {
            lowest = getLowestValue(lowest, HIGH_CARD)
            continue;
        }  
    }

    return lowest
}

function findCardValue(card){
    if(Object.keys(CARD_VALUES).includes(card)){
        return CARD_VALUES[card]
    }

    return parseInt(card)
}

;(() => {
    const data = fs.readFileSync("data.txt", "utf8").split("\n")

    const handsAndBets = []

    data.forEach((line, i) => {
        const [hand, bet] = line.split(' ');
        const cardValues = convertHandToCardValues(hand)
        const handScore = getHandScore(cardValues)
        handsAndBets.push({id: i, cardValues, bet: parseInt(bet), handScore})
    })

    const handsOrderedByTypeScore = handsAndBets.sort(({handScore: handScoreA}, {handScore : handScoreB}) => handScoreA - handScoreB)
   
    const groupedHandTypes = []
    handsOrderedByTypeScore.forEach(hand => {
        if(!groupedHandTypes[hand.handScore]) groupedHandTypes[hand.handScore] = []; 
        groupedHandTypes[hand.handScore].push(hand)}
    );

    const orderedResults = groupedHandTypes.reverse().map(handType => {
        return handType.sort(({cardValues: cardValuesA, bet: betA},{cardValues: cardValuesB, bet: betB}) =>{
            
            for(let i = 0; i < cardValuesA.length; i++){
                if(findCardValue(cardValuesA[i]) > findCardValue(cardValuesB[i])) return 1
                else if(findCardValue(cardValuesA[i]) < findCardValue(cardValuesB[i])) return -1
            }
            
            if(betA > betB) return - 1

            return -1
        })
    })
    console.log(orderedResults.flat().reverse())

    console.log(orderedResults.flat().reduce((p,{bet},i) => p + (bet * (i + 1)), 0))
})()

//251224870