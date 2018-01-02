const Discord = require('discord.js');

const help = (message) => {
    var help_embed = new Discord.RichEmbed()
        .setColor('#D9F200')
        .addField("Commandes du Bot", "+help : affiche les commandes du bot\n+addcitation citation.        auteur : permet d'ajouter une citation\npour la commande +tellcitation \n+tellcitation : écris une citation au hasard parmis les citations enregistrées \n+addanniversaire : ajoute votre date d'anniversaire à une base de donnée, \n exemple: +addanniversaire 04/01.\n+info : donne des infos sur le bot.\n+meteo (nom d'un lieu) : vous donne les condition actuelle du lieu en question.")
      
        message.channel.send(help_embed);
        console.log("Help command");
}

module.exports = help;
