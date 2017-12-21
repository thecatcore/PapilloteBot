const Discord = require('discord.js');
var bot = new Discord.Client();
const help = (message, channel) => {
    var help_embed = new Discord.RichEmbed()
        .setColor('#D9F200')
        .addField("Prefix", "c'est le signe + ")
        .addField("Commandes du Bot", "-help : affiche les commandes du bot\n-addcitation <citation+auteur> : permet d'ajouter une citation\npour la commande +tellcitation \n-tellcitation : écris une citation au hasard parmis les citations enregistrées")
      
        message.channel.sendEmbed(help_embed);
        console.log("Help command");
}


module.exports = help;