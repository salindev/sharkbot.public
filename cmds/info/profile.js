const { MessageEmbed } = require("discord.js")
const { format } = require('formatnumbers');
module.exports = {
  name: "profile",
  category: 'Информация',
  description: 'Показывает ваш профиль',
  usage: 'profile',

  async execute(client, message, args) {

    let user = await User.findOne({ userID: message.author.id })
    let balanceibank = user.balance + user.bank

    let chelID = message.author.id

    if (user.fracid == 0) {
      let embed0 = new MessageEmbed()
        .setColor(Config.colors.shark)
        .setDescription(`Профиль <@${chelID}>`)
        .addField('Баланс', `На руках: ${format(user.balance)}\nВ банке: ${format(user.bank)}\nВсего: ${format(balanceibank)}`)
        .addField('Фракция', 'Нету')
      return message.reply(embed0)
    }
    if (user.fracid == 1) {
      let embed0 = new MessageEmbed()
        .setColor(Config.colors.shark)
        .setDescription(`Профиль <@${chelID}>`)
        .addField('Баланс', `На руках: ${format(user.balance)}\nВ банке: ${format(user.bank)}\nВсего: ${format(balanceibank)}`)
        .addField('Фракция', 'Больница')
      return message.reply(embed0)
    }

    if (user.fracid == 2) {
      let embed0 = new MessageEmbed()
        .setColor(Config.colors.shark)
        .setDescription(`Профиль <@${chelID}>`)
        .addField('Баланс', `На руках: ${format(user.balance)}\nВ банке: ${format(user.bank)}\nВсего: ${format(balanceibank)}`)
        .addField('Фракция', 'Полиция')
      return message.reply(embed0)
    }

  }
}