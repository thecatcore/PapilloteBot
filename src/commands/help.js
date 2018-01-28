const Discord = require('discord.js');
const bot = new Discord.Client();
const help = (db, message) => {
    var help_embed = new Discord.RichEmbed()
        .setColor('#D9F200')
        .addField("Catégories", "+help : affiche les catégories de commandes du bot\n+recettelist : affiche la liste et le nombre de recette de cuisine du bot.")
        .addField('Citations Commands', "+addcitation citation.        auteur : permet d'ajouter une citation\npour la commande +tellcitation \n+tellcitation : écris une citation au hasard parmis les citations enregistrées")
        .addField('Anniversaire commands', "+addanniversaire : ajoute votre date d'anniversaire à une base de donnée, \n exemple: +addanniversaire 04/01.")
        .addField('Commandes utiles', "+info : donne des infos sur le bot.\n+meteo (nom d'un lieu) : vous donne les condition actuelle du lieu en question.")
        .addField('Image commands', "+cat : vous affiche une image de chat aléatoire.")
        .addField('Games commandes', "+osu_info {nom d'un joueur}: donne des info sur le joueur en question.\nexemple : +osu_info arthurbambou\n+ov_info {nom d'un jour}: donne beaucoup d'info sur le joueur en question, attention il faut remplacer le # par - et prendre les chiffres après le # en compte sinon ça ne marche pas.\nexemple : +ov_info ADA9-2142")
        message.channel.send(help_embed) 
   
   
    console.log("Help command");
    const guildname = message.guild.name;
    const guildid = message.guild.id;
    const guildregion = message.guild.region;
    console.log(guildregion);
    console.log(message.guild.roles);
    
    db.addGuild({
        nom: guildname,
        id: guildid,
        region: guildregion
      
    });
};    

module.exports = 
help;
