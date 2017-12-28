const Discord = require('discord.js');

const info = (message) => {
    var info_embed = new Discord.RichEmbed()
        .setColor('#D9F200')
        .addField("Mon Créateur", "<@223864389256609792>")
        .addField("Prefix", "+")
        .addField("Uptime", "d")
        .addField("Librairies", "`Discord.js`, `lowdb`, `node-schedule`")
      
        message.channel.send(info_embed);
        console.log("Info command");
}

module.exports = info;
