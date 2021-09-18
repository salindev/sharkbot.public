const ms = require('ms')

module.exports = {
    name: 'code',
    category: 'Рабство',
    description: 'Вступить в рабство',
    usage: 'code <КОД>',

    async execute(client, message, args) {
        if(!args[0]) return message.lineReply('Вы не указали код')
        const refka = args[0]

        let codeAutor = await User.findOne({ code: refka })
        if(!codeAutor) return message.lineReply('Код не найден')

        let msgAutor = await User.findOne({ userID: message.author.id })
        if(msgAutor.rab) return message.lineReply('Вы находитесь в рабстве')

        codeAutor.rabs.push(message.author.id)
        await codeAutor.save()

        msgAutor.rab = true;
        await msgAutor.save()
        
        message.lineReply('Вы успешно вступили в рабство :D')

}
} 