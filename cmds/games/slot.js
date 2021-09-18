const { MessageEmbed } = require("discord.js")
module.exports = {
    name: "slot",
    category: 'Игры',
    description: 'Игра в слоты (Казино)',
    usage: 'slot <ставка>',

    async execute(client, message, args) {
        if (!args[0]) return message.lineReply(`Ошибка: Не найдена ставка!`);
        let target = message.author
        let user = await User.findOne({ userID: target.id })
        if (Number(args[0]) < 1) return message.channel.send("Число должно быть больше 0!")
        if (isNaN(args[0])) return message.channel.send("Должно быть число, а не буквы!")
        if (Number(args[0]) > user.balance) return message.channel.send("У вас не хватает средств")
        let slots = [":seven:", ":zero:", ":nine:"];
        let argsx2 = args[0] * 2
        let argsx10 = args[0] * 9
        let result1 = Math.floor((Math.random() * slots.length));
        let result2 = Math.floor((Math.random() * slots.length));
        let result3 = Math.floor((Math.random() * slots.length));
        let name = message.author.displayName;
        let icon = message.author.displayAvatarURL;

        if (slots[result1] === slots[result2] && slots[result2] === slots[result3]) {
            user.balance += Number(argsx10)
            user.save()
            let embed = new MessageEmbed()
                .setColor(Config.colors.success)
                .setFooter('Вы выиграли!', icon)
                .setTitle('Ваша ставка умножена в 10 раз!')
                .addField('Результаты:', slots[result1] + slots[result2] + slots[result3], true)
            return message.lineReply(embed);
        }

        if (slots[result1] === slots[result2] && slots[result3] != slots[result2]) {
            user.balance += Number(argsx2)
            user.save()
            let embed = new MessageEmbed()
                .setColor(Config.colors.success)
                .setFooter('Вы выиграли!', icon)
                .setTitle('Ваша ставка умножена!')
                .addField('Результаты:', slots[result1] + slots[result2] + slots[result3], true)
            return message.lineReply(embed);

        } else {
            user.balance -= Number(args[0])
            user.save()
            let embed2 = new MessageEmbed()
                .setColor(Config.colors.danger)
                .setFooter('Вы проиграли!', icon)
                .setTitle(':slot_machine: Слоты :slot_machine:')
                .addField('Результаты:', slots[result1] + slots[result2] + slots[result3], true)
            return message.lineReply(embed2);
        }
    }
}