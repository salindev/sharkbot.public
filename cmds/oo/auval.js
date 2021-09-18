const User = require("../../schema/User")
const { format } = require('formatnumbers');

module.exports = {
    name: 'auval',
    description: "Уволить чела тыры-пыры",

    async execute(client, message, args) {
        const target = await message.mentions.members.first()
        if (!target) return message.success('Вы не указали пользователя для перевода')
        let targetUS = await User.findOne({ userID: target.id })
        targetUS.fracid = '0'
        targetUS.save()
        message.success(`Уволил нахер!`)
    }
}