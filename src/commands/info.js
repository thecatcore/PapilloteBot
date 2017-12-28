const Discord = require('discord.js');

const info = (message) => {
    var info_embed = new Discord.RichEmbed()
        .setColor('#D9F200')
        .addField("Prefix", "+")
        .addField("Uptime", "")
      
        message.channel.send(info_embed);
        console.log("Info command");
}

module.exports = info;
