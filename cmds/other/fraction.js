const { MessageEmbed } = require("discord.js")
const { MessageButton, MessageActionRow } = require("discord-buttons")

module.exports = {
    name: "fraction",
    category: 'Другое',
    description: 'Вступить во фракцию',
    usage: 'fraction',

    async execute(client, message, args) {
        let user = await User.findOne({ userID: message.author.id })
        if (user.fracid != 0) return message.lineReply(`Вы уже состоите во фракции, что бы выйти из нее напишите ${Config.prefix}fleave`)

        const policeButton = new MessageButton()
            .setStyle('blurple')
            .setEmoji('👮‍♂️')
            .setID('police_fraction')

        const medicButton = new MessageButton()
            .setStyle('blurple')
            .setEmoji('👨‍⚕️')
            .setID('medic_fraction')

        const fractionsButtons = new MessageActionRow()
            .addComponents([policeButton, medicButton])

        let helpembed = new MessageEmbed()
            .setColor(Config.colors.shark)
            .setTitle('Помощь по фракциям')
            .addField('👮‍♂️ Полиция', 'Что бы вступить нажмите на кнопку')
            .addField('👨‍⚕️ Больница', 'Что бы вступить нажмите на кнопку')

        if (!args[0]) return message.channel.send({ component: fractionsButtons, embed: helpembed })
        let police = new MessageEmbed()
            .setAuthor('Фракции')
            .setDescription('Вы успешно устроились на работу полицейским')
        user.fracid = '2'
        user.save()
        if (args[0] = '2') return message.lineReply(police)
        let hospital = new MessageEmbed()
            .setAuthor('Фракции')
            .setDescription('Вы успешно устроились на работу врачом')
        user.fracid = '1'
        user.save()
        if (args[0] = '1') return message.lineReply(hospital)

    }
}