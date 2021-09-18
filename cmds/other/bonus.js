const { MessageEmbed } = require("discord.js")

const ms = require("ms")
const Converter = require("timestamp-conv")
module.exports = {
    name: "bonus",
    category: 'Другое',
    description: 'Выдача бонуса',
    usage: 'bonus',

    async execute(client, message, args) {
        let user = await User.findOne({ userID: message.author.id })
        let nUser = await User.findOne({ userID: message.author.id })

        if (nUser.bonusTimeout > Date.now()) {
            let coold = new Converter.timestamp(nUser.bonusTimeout - Date.now()).getHour()

            const bonusDecline = new MessageEmbed()
                .setColor(Config.colors.danger)
                .setTitle("❌ Бонус")
                .setDescription(`Бонус не выдан!\nДо следующего бонуса ${coold} ч.`)
            return message.lineReply(bonusDecline)
        }

        if (nUser.bonusTimeout == null) {
            const bonusGive = new MessageEmbed()
                .setColor(Config.colors.success)
                .setTitle("💳 Бонус")
                .setDescription("Бонус в размере 500 долларов зачислен вам на счет!\nДо следующего бонуса - 24 часа")

            message.lineReply(bonusGive)
            let CD = Date.now() + ms("1d")
            nUser.bonusTimeout = CD
            nUser.balance += 500
            nUser.save()
        }


        const checkBonus = async () => {
            const now = new Date()

            const conditional = {
                bonusTimeout: {
                    $lt: now
                }
            }

            const results = await User.find(conditional)

            if (results && results.length) {
                for (const result of results) {

                    await User.updateMany(conditional, { bonusTimeout: null })
                }

                setTimeout(checkBonus, 1000 * 30)
            }
            checkBonus()



        }
    }
}