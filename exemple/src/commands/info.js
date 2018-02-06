const Discord = require("discord.js");
const bot = new Discord.Client();

const info = (db,message,ilink, h, m, s) => {
    
    var infoEmbed = new Discord.RichEmbed()
        .setColor("#D9F200")
        .addField("Mon Créateur", "<@223864389256609792>")
        .addField("Prefix", "+")
        .addField("Version", "1.3")
        .addField("Lien d'invitation", `${ilink}`);
        message.channel.send(infoEmbed);
        console.log("Info command");
};

module.exports = info;
