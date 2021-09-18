const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "fleave",
    category: 'Другое',
    description: 'Выйти из фракции',
    usage: 'fleave',

    async execute(client, message, args) {
        let user = await User.findOne({ userID: message.author.id })
        if (user.fracid === 0) return message.shark(`Вы не состоите в фракции`);
        user.fracid = 0
        await user.save()
        message.shark('Вы успешно вышли из фракции')

    }
}