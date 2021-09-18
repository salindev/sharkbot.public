const { MessageEmbed } = require("discord.js")
cooldownpol = new Map()
module.exports = {
    name: "policework",
    category: 'Работы',
    description: 'Работать полицейским',
    usage: 'policework',

    async execute(client, message, args) {
        let rakalas = randomnumber(1000, 10000)
        let user = await User.findOne({ userID: message.author.id })
        if (user.fracid != '2') return message.lineReply('Вы не работаете в полиции');
        let balance = new MessageEmbed()
        balance.setColor(Config.colors.shark)
        balance.setTitle('Полиция')
        balance.setDescription('Вы уже работали в эти 30 минут!')
        if(cooldownpol.get(message.author.id) != undefined) return message.lineReply(balance)
        let target = message.author
        user.balance += rakalas
        user.save()
        const embed = new MessageEmbed()
        embed.setColor(Config.colors.shark)
embed.setTitle('Полиция')
embed.setDescription(`Вы успешно отработали смену и получили ${rakalas} монет!`)
message.lineReply(embed)
cooldownpol.set(message.author.id, Date.now() + require("ms")("30m"))
setInterval(() => {
cooldownpol.delete(message.author.id) }, require("ms")("30m"))         
        function randomnumber(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;        
        }
        }
}