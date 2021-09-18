const Discord = require('discord.js')
require('discord-reply')
const client = new Discord.Client({
  disableEveryone: true,
});
require('discord-buttons')(client)

const { MessageEmbed } = require("discord.js")
const fs = require('fs')
const os = require('os')

client.mongoose = require('./utils/db.js')
client.commands = new Discord.Collection();

global.User = require("./schema/User.js")
global.Chs = require("./schema/Chs.js")
global.Config = require('./jsons/config.json')
global.os = os
global.fs = fs

require("dotenv").config()

const hnd = ['cmd']
hnd.forEach(handler => {
  require(`./handlers/${handler}.js`)(client)
})

fs.readdir('./events', (err, files) => {
  if (err) return console.error(err)
  files.forEach(file => {
    if (!file.endsWith('.js')) return;
    const event = require(`./events/${file}`)
    const eventName = file.split('.')[0]
    console.info(`[EVENT] ${eventName} загружен!`)
    client.on(eventName, event.bind(null, client))
  })
})

client.on("guildCreate", guild => {
  let newnewserv = new Discord.MessageEmbed()
  let channel228 = client.channels.cache.get('айди')
  newnewserv.addField('Новый дискорд сервер!', `${guild.name}`)
  newnewserv.setThumbnail(guild.iconURL({dynamic: true}))
  channel228.send(newnewserv)
  //Your other stuff like adding to guildArray
})

//removed from a server
client.on("guildDelete", guild => {
    let newnewserv = new Discord.MessageEmbed()
  let channel228 = client.channels.cache.get('айди')
  newnewserv.addField('Меня удалили с дс сервера сцука(!', `${guild.name}`)
  console.log(guild)
  newnewserv.setThumbnail(guild.iconURL({dynamic: true}))
  channel228.send(newnewserv)
  console.log("Left a guild: " + guild.name);
  //remove from guildArray
})

client.mongoose.init()

client.login(process.env.CLIENT_TOKEN);

module.exports = client
