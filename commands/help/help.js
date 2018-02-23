const { Command } = require("discord.js-commando");
const { RichEmbed } = require("discord.js");

module.exports = class HelpCommand extends Command {
    constructor(client) {
        super(client, {
            name: "help",
            aliases: ["catégories"],
            memberName: "help",
            group : "help",
            description: "Le bot envoie la liste des catégories de commandes",
            examples: ["+help"]
        });    
    }

    run(msg) {
        var embed = new RichEmbed()
            .setTitle("Liste des catégories")
            .setDescription("+citation\n+image\n+message");
        msg.embed(embed);
    }
};
