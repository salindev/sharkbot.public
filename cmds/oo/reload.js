const { inspect } = require("util")
const { MessageEmbed } = require('discord.js')

module.exports = {
    name: "reload",
    aliases: ['re', 'reload', 'rel'],
    ownerOnly: true,
    description: "Релоад команды",
    async execute(client, message, args) {

        let category = args[0]
        let command = args[1]

        try {
            delete require.cache[require.resolve(`../../cmds/${category}/${command}.js`)]
            client.commands.delete(command)

            const pull = require(`../../cmds/${category}/${command}.js`)
            client.commands.set(command, pull)
            return message.shark(`Команда **${command}** успешно перезагружена!`)
        }
        catch (err) {
            return message.shark(`Ошибка перезагрузки команды **${command}: \n${err.message}`)
        }

    }
}
