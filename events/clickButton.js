const User = require("../schema/User")
const message = require("./message")

module.exports = async (client, button, message) => {
    if (button.id === 'police_fraction') { 

        let user = await User.findOne({ userID: button.clicker.user.id })
        if (user.fracid != 0) return button.channel.send(`Вы уже состоите во фракции, что бы выйти из нее напишите ${Config.prefix}fleave`)
        user.fracid = 2 // Коп
        await user.save()
        button.channel.send(`<@${button.clicker.user.id}> ты успешно стал полицейским! Иди помогай гражданам данного сервера!`)
        button.defer()
    }

    if (button.id === 'medic_fraction') {
        let user = await User.findOne({ userID: button.clicker.user.id })
        if (user.fracid != 0) return button.channel.send(`Вы уже состоите во фракции, что бы выйти из нее напишите ${Config.prefix}fleave`)
        user.fracid = 1 // Медик
        await user.save()
        button.channel.send(`<@${button.clicker.user.id}> ты успешно стал медиком, иди спасай жизни!`)
        button.defer()
    }

}