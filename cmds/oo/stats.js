const { MessageEmbed } = require("discord.js")
const moment = require("moment");
require("moment-duration-format");
module.exports = {
    name: 'stats',
    category: 'ОО',
    description: 'stats',
    ownerOnly: false,

    execute(client, message, args) {
        let totalSeconds = (client.uptime / 1000);
        let days = Math.floor(totalSeconds / 86400);
        let hours = Math.floor(totalSeconds / 3600);
        totalSeconds %= 3600;
        let minutes = Math.floor(totalSeconds / 60);
        let seconds = totalSeconds % 60;
        let secondficsed = seconds.toFixed(0)        
        let allinaga = `${days}дней ${hours} часов, ${minutes} минут, ${secondficsed} секунд`
        let allmem = os.totalmem()
        let freemem = os.freemem()
        let typeos = os.type()
        let archos = os.arch()
        if(args[0] === 'os') return message.shark(`Всего: ${bytesToSize(allmem)}\nСвободно: ${bytesToSize(freemem)}`);
        let embed = new MessageEmbed()
            .setColor(Config.colors.shark)
            .setTitle("Статистика бота")
            .addField(" \u200B ", "Каналов : ` " + `${client.channels.cache.size}` + " `")
            .addField(" \u200B ", "Гильдий : ` " + `${client.guilds.cache.size}` + " `")
            .addField(" \u200B ", "Людей : ` " + `${client.users.cache.size}` + " `")
            .addField(" \u200B ", "Связь с дискорд: ` " + `${client.ws.ping}ms` + " `")
            .addField(" \u200B ", "Время создания сообщения: ` " + `${message.createdTimestamp - message.createdTimestamp}ms` + " `")
            .addField(" \u200B ", "Аптайм: ` " + `${allinaga}` + " `")
            .addField(" \u200B ", "OS: ` " + `${typeos} ${archos}` + " `")

        message.channel.send(embed)
        function bytesToSize(bytes) {
            var sizes = ['БАЙТ', 'КБ', 'МБ', 'ГБ', 'ТБ'];
            if (bytes == 0) return '0 Byte';
            var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
            return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
         }
         
    }
}