const { MessageEmbed } = require("discord.js") 
const Discord = require('discord.js')
cooldownjan = new Map()
module.exports = {
    name: "janitor",
    category: 'Работы',
    description: 'Работа "Дворником"',
    usage: 'janitor',
    async execute(client, message, args) {
        let rakalas = randomnumber(500, 10000)
        let balance = new MessageEmbed()
        balance.setColor('#0867c7')
        balance.setTitle('Работа дворником')
        balance.setDescription('Вы уже работали в эти 30 минут!')
        if(cooldownjan.get(message.author.id) != undefined) return message.lineReply(balance)
        let target = message.author
        let user = await User.findOne({ userID: target.id })
        user.balance += rakalas
        user.save()
        const embed = new MessageEmbed()
        embed.setColor('#0867c7')
embed.setTitle('Работа дворником')
embed.setDescription(`Вы успешно поработали и получили ${rakalas} монет!`)
message.lineReply(embed)
cooldownjan.set(message.author.id, Date.now() + require("ms")("30m"))
setInterval(() => {
cooldownjan.delete(message.author.id) }, require("ms")("30m"))
function randomnumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }  
}
} 