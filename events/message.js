const { prefix } = require('../jsons/config.json')
const { MessageEmbed } = require('discord.js')

const moment = require('moment')
module.exports = async (client, message) => {
  if (message.author.bot || message.channel.type == 'dm') return;
  let user = await User.findOne({ userID: message.author.id })
  if (!user) {
    User.create({ userID: message.author.id, balance: 0, bank: 0, fracid: 0, buyrank: 'Пользователь' })
    user = await User.findOne({ userID: message.author.id })
  }

  message.error = (desc) => message.channel.send({ embed: { color: Config.colors.danger, description: desc } })
  message.warning = (desc) => message.channel.send({ embed: { color: Config.colors.warning, description: desc } })
  message.success = (desc) => message.channel.send({ embed: { color: Config.colors.success, description: desc } })
  message.shark = (desc) => message.channel.send({ embed: { color: Config.colors.shark, description: desc } })

  if (message.content === '<@!854431011079979008>' && !message.content.includes('@everyone') && !message.content.includes('@here')) {
    message.shark(`Мой префикс: **${prefix}**\n\nДля получения списка команд, используйте: **${prefix}help**`)
  }

  const isChs = await Chs.findOne({ userID: message.author.id })
  if(!isChs || !isChs.chs) {
  if (message.content.substring(0, prefix.length).toLowerCase() != prefix.toLowerCase()) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const commandName = args.shift().toLowerCase()

  const command =
    client.commands.get(commandName) ||
    client.commands.find((cmd) => cmd.aliases && cmd.aliases.includes(commandName))
  if (!command) return;

  if (command.ownerOnly && !Config.developers.includes(message.author.id)) return;

  if (command.permissions) {
    if (!message.member.hasPermission(command.permissions)) {
      let embed = new MessageEmbed()
        .setTitle("У вас недостаточно прав!")
        .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
      return message.channel.send(embed);
    }
  }

  global.fnc = require('../utils/functions.js')

  try {
    moment.locale('ru')
    command.execute(client, message, args)
    console.log(`[ COMMAND | ${moment(Date.now() + 10800000).format('LLL').split(".,").join(",")} | ${message.guild.id} ] бахнув команду - ${command.name}`)
  } catch (err) {
    console.error(err);
    message.reply("При выполнении команды произошла ошибка!")
  }
}
}