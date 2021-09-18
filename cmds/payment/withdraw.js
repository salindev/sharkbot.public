const User = require("../../schema/User")

module.exports = {
    name: 'withdraw',
    category: 'Транзакции',
    description: 'Выводит деньги с вашего банковского счёта',
    usage: 'withdraw <сумма>',
    aliases: ['wit'],

    async execute(client, message, args) {
        if (!args[0]) return message.lineReply('Вы не указали сумму вывода')
        if (isNaN(args[0])) return message.lineReply('Сумма должна быть числом')
        if (args[0] < 0) return message.lineReply('Число не должно быть меньше нуля')
        let user = await User.findOne({ userID: message.author.id })
        if (user.bank < +args[0]) return message.lineReply(`Не достаточно средств для вывода,\nУ вас на счету: ${user.bank}`)

        user.bank -= +args[0]
        user.balance += +args[0]
        await user.save()
        message.success(`Деньги успешно выведены!\nУ вас на руках: ${user.balance}`)
    }
}