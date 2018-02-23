const { Command } = require("discord.js-commando");
const { RichEmbed } = require("discord.js");

module.exports = class HelpCommand extends Command {
    constructor(client) {
        super(client, {
            name: "help",
            aliases: ["catégories"],
            group: "help",
            memberName: "help",
            description: "Le bot envoie la liste des catégories de commandes",
            examples: ["+help"]
        });    
    }

    run(msg) {
        console.log(Command.group.group1.citation.description);
        console.log(Command.guild.prefix);
        var embed = new RichEmbed()
            .setTitle("Liste des catégories")
            .setDescription("+citation\n+image\n+message");
        msg.embed(embed);
    }
};
