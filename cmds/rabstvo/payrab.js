const { MessageEmbed } = require('discord.js')

module.exports = {
    name: 'payrab',
    category: 'Рабство',
    description: 'Оплатить рабовладение, 30.000 монет',
    usage: 'payrab',

    async execute(client, message, args) {
        let msgAutor = await User.findOne({ userID: message.author.id })
        if(msgAutor.balance < 30000) return message.lineReply(`У вас не достаточно средств`)
        if(msgAutor.rab) return message.lineReply('Вы находитесь в рабстве')

        let CD = Date.now() + ms("1w")

        msgAutor.rabstvoTimeout = CD
        msgAutor.balance -= 30000
        await msgAutor.save()

        const embed = new MessageEmbed()
            .setColor(Config.colors.success)
            .setDescription('Вы успешно оплатили рабовладение!')
        message.lineReply(embed)

        setTimeout(async ()=>{
                const now = new Date()
        
                const conditional = {
                    payRabs: {
                        $lt: now
                    },
                    rab: false
                }
        
                const results = await User.find(conditional)
        
                if(results && results.length) {
                    for(const result of results) {
                    if(result.rabs.length === 0) continue;
        
                    await User.updateMany(conditional, { payRabs: Date.now() + 21600000 })
                    
                    const etotPlayer = await client.users.cache.get(result.userID)
                    let sum = 0;
                    
                    for(let rab of result.rabs) {
                     const rabUS = await User.findOne({ userID: rab })
                     
                     if(rabUS.balance >= 500) { rabUS.balance -= 500; result.bank += 500; await rabUS.save(); await result.save(); sum+=500 } 
                        else if(rabUS.bank >= 500) { rabUS.bank -= 500; result.bank += 500; await rabUS.save(); await result.save(); sum+=500 } 
                            else continue;
                    } // я случайно)

                    etotPlayer.send(`Со своих рабов вы собрали ${sum} монет.\nРабов: ${result.rabs.length}\nВаш банковский счёт на данный момент: ${result.bank}\nДенег на руках: ${result.balance}`)
                } 
            }
        }, 21600000)
    }
}
