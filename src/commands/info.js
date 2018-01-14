const Discord = require('discord.js');
const bot = new Discord.Client();

const info = (db,message,ilink, h, m, s) => {
    //var upTime = new Discord.Client(uptime);
    
    //console.log(upTime)
    
    var info_embed = new Discord.RichEmbed()
        .setColor('#D9F200')
        .addField("Mon Créateur", "<@223864389256609792>")
        .addField("Prefix", "+")
        .addField("Version", "1.3")
        .addField("Lien d'invitation", `${ilink}`)
        //.addField("Uptime", `${s} heures ${m} minutes ${h} secondes`)
      
        message.channel.send(info_embed);
        console.log("Info command");
    const guildname = message.guild.name
    const guildid = message.guild.id
    const guildregion = message.guild.region
    console.log(guildregion)
    console.log(message.guild.roles)
    
    db.addGuild({
        nom: guildname,
        id: guildid,
        region: guildregion
      
    });
}

module.exports = info;
