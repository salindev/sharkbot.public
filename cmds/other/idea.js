const { MessageEmbed } = require("discord.js")
cooldownidea = new Map()

module.exports = {
    name: 'idea',
    category: 'Другое',
    description: 'Написать свою идею',
    usage: 'idea <текст вашей идеи>',

    execute(client, message, args) {
        if(cooldownidea.get(message.author.id) != undefined) return message.error('Вы уже отправляли идею в эти 24 часа')
        if (!args[0]) return message.shark('Вы не написали идею');
        message.shark('Спасибо за вашу идею, мы скоро рассмотрим вашу идею') 
        let sosi = args.join(' ')
        let msgauthorname = message.author.username
        let msgauthordiscriminator = message.author.discriminator
        let embedick = new MessageEmbed()
        embedick.setAuthor(`идея от ${msgauthorname}#${msgauthordiscriminator}`)
        embedick.setDescription(`Суть идеи: ${sosi}`)
        embedick.setImage(message.author.displayAvatarURL())
        client.channels.cache.get('855455356229386331').send('<@&854784598868885524>, чекни какаха', embedick)
        cooldownidea.set(message.author.id, Date.now() + require("ms")("1d"))
setInterval(() => {
    cooldownidea.delete(message.author.id) }, require("ms")("1d"))

    }
}