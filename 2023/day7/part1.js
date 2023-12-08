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
    J: 11,
    T: 10
}


function convertHandToCardValues(hand){
    const cards = hand.split('')

    return cards.map(card => /[0-9]/g.test(card) ? parseInt(card) : CARD_VALUES[card])
}


function getHandScore(cardValues){
    const cardSet = new Set(cardValues)
    if(cardSet.size === 1) return FIVE_OF_A_KIND

    if(cardSet.size === 2){
        const array = []
        cardValues.forEach(value => array[value] = array[value] ? array[value] + 1 : 1)
        if(array.join().includes('3')) return FULL_HOUSE
        return FOUR_OF_A_KIND
    }

    if(cardSet.size === 3){
        const array = []
        cardValues.forEach(value => array[value] = array[value] ? array[value] + 1 : 1)
        if(array.join().includes('3')) return THREE_OF_A_KIND
        return TWO_PAIR
    }

    if(cardSet.size === 4) return ONE_PAIR

    if(cardSet.size === 5) return HIGH_CARD
}

function findCardValue(card){
    if(Object.keys(CARD_VALUES).includes(card)){
        return CARD_VALUES[card]
    }

    return parseInt(card)
}

;(() => {
    let total = 0

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



    console.log(orderedResults.flat().reduce((p,{bet},i) => p + (bet * (i + 1)), 0))
})()

//250347426