const { MessageEmbed } = require("discord.js")
cooldownmed = new Map()
module.exports = {
    name: "medicwork",
    category: 'Работы',
    description: 'Работать врачём',
    usage: 'medicwork',

    async execute(client, message, args) {
        let rakalas = randomnumber(1000, 10000)
        let user = await User.findOne({ userID: message.author.id })
        if (user.fracid != '1') return message.lineReply('Вы не работаете врачом');
        let balance = new MessageEmbed()
        balance.setColor(Config.colors.shark)
        balance.setTitle('Больница')
        balance.setDescription('Вы уже работали в эти 30 минут!')
        if(cooldownmed.get(message.author.id) != undefined) return message.lineReply(balance)
        let target = message.author
        user.balance += rakalas
        user.save()
        const embed = new MessageEmbed()
        embed.setColor(Config.colors.shark)
embed.setTitle('Больница')
embed.setDescription(`Вы успешно отработали смену и получили ${rakalas} монет!`)
message.lineReply(embed)
cooldownmed.set(message.author.id, Date.now() + require("ms")("30m"))
setInterval(() => {
cooldownmed.delete(message.author.id) }, require("ms")("30m"))         
        function randomnumber(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;        
        }
        }
}