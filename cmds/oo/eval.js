const { inspect } = require("util")
const { MessageEmbed } = require('discord.js')
var PastebinAPI = require('pastebin-js'),
    pastebin = new PastebinAPI({
        'api_dev_key': 'апи_дев_кей_пастебин',
        'api_user_name': 'имя юзера пастебин',
        'api_user_password': 'пароль имя'
    });

module.exports = {
    name: "eval",
    aliases: ['eval', 'e', 'run'],
    ownerOnly: true,
    description: "Выполняет JavaScript код",
    async execute(client, message, args) {
        try {
            let evaluated = eval(args.join(" "))
            evaluated = require("util").inspect(evaluated, { depth: 0 })
            if (evaluated.includes(client.token)) evaluated = evaluated.replace(client.token, "TOKEN")
            if (message.content.includes(client.token)) evaluated = evaluated.replace(client.token, "соси даун")
            if (evaluated.length >= 1024)
                return pastebin
                    .createPaste(evaluated, "evaluated", "javascript", 1, "1D")
                    .then(function (data) {
                        let embed = new MessageEmbed()
                            .setTitle("Evaluate")
                            .addField("📥 • Input", `\`\`\`js\n${args.join(" ")}\n\`\`\``)
                            .addField(
                                "📤 • Output",
                                `[Output (will stay on pastebin 1 day)](${data})`
                            )
                            .setColor("#008080");
                        message.channel.send(embed);
                    });
            else {
                const embed = new MessageEmbed()
                    .setColor(Config.colors.shark)
                    .addField(':inbox_tray: input', `\`\`\`js\n${args.join(" ")}\n\`\`\``)
                    .addField(':outbox_tray: output', `\`\`\`js\n${evaluated}\n\`\`\``)
                message.channel.send(embed).then(async (msg) => {
                    await msg.react("✔")
                    await msg.react("❌")
                    const filter = (reaction, user) => reaction.emoji.name === '✔' || reaction.emoji.name === '❌' && user.id === message.author.id
                    msg.awaitReactions(filter, { max: 1 }).then((collected) => {
                        collected.map((emoji) => {
                            switch (emoji.emoji.name) {
                                case '✔': msg.reactions.removeAll(); break;
                                case '❌': msg.delete(); message.delete(); break;
                            }
                        })
                    })
                })
            }
        } catch (err) {
            message.channel.send(err, { code: "js" }).then((msg) => msg.delete({ timeout: 7500 }))
            message.delete({ timeout: 7500 })
        }


    }
}