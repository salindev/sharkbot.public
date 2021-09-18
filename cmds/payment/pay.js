const User = require("../../schema/User")
const { format } = require('formatnumbers');

module.exports = {
    name: 'pay',
    category: 'Транзакции',
    description: 'Перевод денег из банка другому пользователю сервера',
    usage: 'pay <@member> <сумма>',

    async execute(client, message, args) {
        const target = await message.mentions.members.first()
        if (!target) return message.lineReply('Вы не указали пользователя для перевода')
        if (target.id === message.author.id) return message.lineReply('Не возможно перевести деньги себе!')
        if (target.guild.id != message.guild.id) return message.lineReply('Пользователь должен находиться на этом сервере')
        if (!args[1]) return message.lineReply('Вы не указали сумму перевода')
        if (isNaN(args[1])) return message.lineReply('Сумма должна быть числом')
        if (args[1] < 0) return message.lineReply('Число не должно быть меньше нуля')
        if (args[1] === '0') return message.lineReply('Нельзя перевести ноль')

        let user = await User.findOne({ userID: message.author.id })
        if (user.bank < +args[1]) return message.lineReply(`Не достаточно средств для перевода,\nСостояние вашего счёта: ${format(user.bank)}`)

        let targetUS = await User.findOne({ userID: target.id })
        targetUS.bank += +args[1]
        await targetUS.save()

        user.bank -= +args[1]
        await user.save()

        message.success(`Деньги успешно переведены!\nСостояние вашего счета: ${format(user.bank)}`)
    }
}