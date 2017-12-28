const Discord = require('discord.js');

const info = (message, upDays, upHours, upMins, upSecs) => {
    var info_embed = new Discord.RichEmbed()
        .setColor('#D9F200')
        .addField("Mon Créateur", "<@223864389256609792>")
        .addField("Prefix", "+")
        .addField("Uptime", "d" /*"d ``"+upDays+" Jour(s) "+upHours+" heure(s) "+upMins+" Minute(s) "+upSecs+" Seconde(s)```"*/)
      
        message.channel.send(info_embed);
        console.log("Info command");
}

module.exports = info;
