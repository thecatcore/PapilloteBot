const Discord = require('discord.js');
const bot = new Discord.Client();
const help = (db, message) => {
    // var help_embed = new Discord.RichEmbed()
    //     .setColor('#D9F200')
    //     .addField("Commandes du Bot", "+help : affiche les commandes du bot\n+addcitation citation.        auteur : permet d'ajouter une citation\npour la commande +tellcitation \n+tellcitation : écris une citation au hasard parmis les citations enregistrées \n+addanniversaire : ajoute votre date d'anniversaire à une base de donnée, \n exemple: +addanniversaire 04/01.\n+info : donne des infos sur le bot.\n+meteo (nom d'un lieu) : vous donne les condition actuelle du lieu en question.\n+cat : vous affiche une image de chat aléatoire.")
      console.log(message)
        message.channel.send("Commandes du Bot :");
        message.channel.send("+help : affiche les commandes du bot\n+addcitation citation.        auteur : permet d'ajouter une citation\npour la commande +tellcitation \n+tellcitation : écris une citation au hasard parmis les citations enregistrées \n+addanniversaire : ajoute votre date d'anniversaire à une base de donnée, \n exemple: +addanniversaire 04/01.\n+info : donne des infos sur le bot.\n+meteo (nom d'un lieu) : vous donne les condition actuelle du lieu en question.\n+cat : vous affiche une image de chat aléatoire.")
        console.log("Help command");
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
};    

module.exports = 
help;