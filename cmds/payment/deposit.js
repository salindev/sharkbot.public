const User = require("../../schema/User")
const { format } = require('formatnumbers');

module.exports = {
    name: 'deposit',
    category: 'Транзакции',
    description: 'Кладет на ваш банковский счёт деньги',
    usage: 'deposit <сумма>',
    aliases: ['dep'],

    async execute(client, message, args) {
        if (!args[0]) return message.lineReply('Вы не указали сумму депозита')
        if (isNaN(args[0])) return message.lineReply('Сумма должна быть числом')
        if (args[0] < 0) return message.lineReply('Число не должно быть меньше нуля')
        let user = await User.findOne({ userID: message.author.id })
        if (user.balance < +args[0]) return message.lineReply(`Не достаточно средств для депозита,\nУ вас на руках: ${format(user.balance)}`)

        user.balance -= +args[0]
        user.bank += +args[0]
        await user.save()
        message.success(`Деньги успешно положены!\nСостояние вашего счёта: ${format(user.bank)}`)
    }
}