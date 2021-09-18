const Chs = require("../../schema/Chs")

module.exports = {
    name: 'chs',
    ownerOnly: true,
    description: "Управление сеировым списком", 
    usage: "chs add/del id",

    async execute(client, message, args) { // 
         if(!args[1] || isNaN(+args[1])) return message.lineReply("Ты что то проебался | add/dell айди") 
         const isChs = await Chs.findOne({ userID: args[1] })
         switch(args[0]) {
             case 'add':
                if(!isChs) Chs.create({ userID: args[1], chs: true })
                else if(!isChs.chs) await Chs.updateMany({ userID: args[1], chs: false }, { chs: true}) // а все норм
                    else if(isChs.chs) return message.lineReply('Он и так в чс')
                 message.lineReply("Готовченко")
                 break;
            case 'dell':
                if(!isChs.chs || !isChs) return message.lineReply('его и так нет в чс')
                await Chs.updateMany({ userID: args[1], chs: true }, { chs: false})
                message.lineReply("Готовченко")
                break;
         }
    }
} // relaod