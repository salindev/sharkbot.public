const { MessageEmbed } = require('discord.js')

module.exports = {
    name: "ci",
    owneronly: true,
    description: "Инвайт",
    async execute(client, message, args) {
        try {
            client.guilds.cache.get(args[0]).channels.cache.filter(c => c.type == 'text').first().createInvite({ temporary: true }).then((inv) => {
                message.channel.send(`discord.gg/${inv.code}`)
            })
        }
        catch {
            message.shark('Не достаточно прав!')
        }
    }
}
