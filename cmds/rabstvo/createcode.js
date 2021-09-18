const ms = require('ms')

module.exports = {
    name: 'createc',
    category: 'Рабство',
    description: 'Создать код на рабство за 100.000 монет',
    usage: 'сс',
    aliases: ['cc'],

    async execute(client, message, args) {
        let msgAutor = await User.findOne({ userID: message.author.id })
        if(msgAutor.balance < 100000) return message.lineReply(`Для того что бы стать рабовладельцем вам нужно 100.000 монет`)
        if(msgAutor.rab) return message.lineReply('Вы находитесь в рабстве')

        let refka = Math.random().toString(36).slice(-8)
        
        message.lineReply(`Вы успешно стали рабовладельцем, ваш код: ${refka}\nВам нужно оплачивать 30.000 каждую неделю, что бы не потерять статус рабовладельца\nКоманда s.payrab`)

        let CD = Date.now() + ms("1w")
        msgAutor.code = refka
        msgAuthor.rabs = []
        msgAutor.rabstvoTimeout = CD
        msgAutor.payRabs = Date.now() + 21600000
        msgAutor.balance -= 100000
        await msgAutor.save()

        const checkRab = async () => {
            const now = new Date()
    
            const conditional = {
                rabstvoTimeout: {
                    $lt: now
                }
            }
    
            const results = await User.find(conditional)
    
            if(results && results.length) {
                for(const result of results) {
    
                await User.updateMany(conditional, { rabstvoTimeout: undefined , rabs: undefined, refka: undefined })
                const etotPlayer = client.users.cache.get(result.userID)
                etotPlayer.send(`Вы не заплатили за рабовладельство и мы сбросили ваших рабов, забрали у вас права рабовладельца`)
            }
    
            setTimeout(checkRab, 1000 * 30)
        }
        checkRab()
  
    }
}
}