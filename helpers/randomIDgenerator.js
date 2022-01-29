//Generates and returns a random number between 1 and 10000
var generateRandomID = () => {
    return Math.ceil((Math.random()*10000))
}

module.exports = generateRandomID
