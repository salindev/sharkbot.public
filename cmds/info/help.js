const { MessageEmbed } = require('discord.js')
const { prefix } = require('../../jsons/config.json')

module.exports = {
    name: 'help',
    category: 'Информация',
    description: 'Помощь по командам бота',
    usage: 'help',
    async execute(client, message, args) {
        if (!args[0]) {
            const generalEmbed = new MessageEmbed()
                .setColor('#0867c7')
                .setTitle(`Префикс  ${prefix}`)
                .setDescription(`[Сервер бота](https://discord.gg/mhuYDC9Eud) | [Оценить бота 1](https://bots.server-discord.com/854431011079979008) | [Оценить бота 2](https://top.gg/bot/854431011079979008)\n${prefix}help <команда> - помощь по команде`)
                .addField(`:books: Информация(${prefix}help Информация)`, `
                ${getCMD('Информация')}
          `)
                .addField(`:money_with_wings: Транзакции(${prefix}help Транзакции)`, `
                ${getCMD('Транзакции')}
          `)
                .addField(`:game_die: Игры(${prefix}help Игры)`, `
                ${getCMD('Игры')} 
          `)
                .addField(`:thinking: Другое(${prefix}help Другое)`, ` 
                ${getCMD('Другое')} 
          `)
          .addField(`:convenience_store: Работы(${prefix}help Работы)`, ` 
          ${getCMD('Работы')} 
    `)
    
                .setFooter(`${message.author.tag}`, message.author.avatarURL({ dynamic: true }))
            return message.lineReply(generalEmbed)
        }
        let txt = args.shift()
        let txt1 = txt.toLowerCase()

        //-----------------------------------------------------------------------------------------------------------\\      
        if (txt1 == 'информация') {
            const infoEmbed = new MessageEmbed()
                .setColor(Config.colors.shark)
                .setTitle(`Доступные команды 📚 Информации:`)
                .addField(`${prefix}help`, desc('help'))
                .addField(`${prefix}profile`, desc('profile'))
                .setFooter(`${message.author.tag}`, message.author.avatarURL({ dynamic: true }))
            return message.lineReply(infoEmbed)
        }
        //-----------------------------------------------------------------------------------------------------------\\ 
        if (txt1 == 'транзакции') {
            const infoEmbed = new MessageEmbed()
                .setColor(Config.colors.shark)
                .setTitle(`Доступные команды 💸 Транзакции:`)
                .addField(`${prefix}pay`, desc('pay'))
                .addField(`${prefix}deposit`, desc('deposit'))
                .addField(`${prefix}withdraw`, desc('withdraw'))
                .setFooter(`${message.author.tag}`, message.author.avatarURL({ dynamic: true }))
            return message.lineReply(infoEmbed)
        }
        //-----------------------------------------------------------------------------------------------------------\\ 
        if (txt1 == 'игры') {
            const gamesEmbed = new MessageEmbed()
                .setColor(Config.colors.shark)
                .setTitle(`Доступные команды 🎲 Игр:`)
                .addField(`${prefix}slot`, desc('slot'))
                .setFooter(`${message.author.tag}`, message.author.avatarURL({ dynamic: true }))
            return message.lineReply(gamesEmbed)
        }
        //-----------------------------------------------------------------------------------------------------------\\ 
        if (txt1 == 'другое') {
            const gamesEmbed = new MessageEmbed()
                .setColor(Config.colors.shark)
                .setTitle(`Доступные команды 🤔 Другое:`)
                .addField(`${prefix}bonus`, desc('bonus'))
                .addField(`${prefix}fraction`, desc('fraction'))
                .addField(`${prefix}fleave`, desc('fleave'))
                .addField(`${prefix}idea`, desc('idea'))

                .setFooter(`${message.author.tag}`, message.author.avatarURL({ dynamic: true }))
            return message.lineReply(gamesEmbed)
        }
                //-----------------------------------------------------------------------------------------------------------\\ 
                if (txt1 == 'работы') {
                    const jobsEmbed = new MessageEmbed()
                        .setColor(Config.colors.shark)
                        .setTitle(`Доступные команды 🤔 Работы:`)
                        .addField(`${prefix}janitor`, desc('janitor'))        
                        .addField(`${prefix}policework`, desc('policework'))        
                        .addField(`${prefix}medicwork`, desc('medicwork'))        

                        .setFooter(`${message.author.tag}`, message.author.avatarURL({ dynamic: true }))
                    return message.lineReply(jobsEmbed)
                }
        //-----------------------------------------------------------------------------------------------------------\\ 
        const cmd = txt1
        let command = client.commands.get(cmd) || client.commands.find((kek) => kek.aliases && kek.aliases.includes(cmd))
        if (!command) return message.lineReply('Извините, но я ни чем не могу вам помочь!');

        const commandHelp = new MessageEmbed()
            .setColor(Config.colors.shark)
            .setTitle(`Инфо о команде ${command.name}`)
            .addField(`Использование:`, ` \`\`\`${command.usage}\`\`\` `)
            .addFields(
                { name: `Категория:`, value: command.category, inline: true },
                { name: '\u200b', value: '\u200b', inline: true },
                { name: `Описание:`, value: command.description, inline: true }
            )
            .addField('Алиасы:', aliasFind(command))
            .addFields(
                { name: `Права для пользователя:`, value: permsFind(command), inline: true },
                { name: '\u200b', value: '\u200b', inline: true },
                { name: `Права для бота:`, value: forMePermsFind(command), inline: true }
            )
            .setThumbnail(client.user.displayAvatarURL())
            .setFooter(`${message.author.tag}`, message.author.avatarURL({ dynamic: true }))

        return message.lineReply(commandHelp)



        function aliasFind(cmd) {
            if (cmd.aliases) return `${cmd.aliases}`
            else return `У команды нет алиасов`
        }
        function permsFind(cmd) {
            if (cmd.permissions) return `${cmd.permissions}`
            else return `Для пользователя не надо прав`
        }
        function forMePermsFind(cmd) {
            if (cmd.forMePerms) return `${cmd.forMePerms}`
            else return `Для меня не надо прав`
        }

        //-------------------------------------------------------------\\

        function getCMD(cat) {
            return client.commands.filter(c => c.category == cat).map(c => `\`${prefix}${c.name}\``).join(", ") || "Нет команд"
        }

        function desc(cmd) {
            return client.commands.get(cmd).description || "Нет описания"
        }

    }
}
