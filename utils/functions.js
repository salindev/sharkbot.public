module.exports = {
    randoming: (min, max) => {
        return Math.floor(Math.random() * +max - 1) + +min
    }
}