const { Command } = require("discord.js-commando");
const { RichEmbed } = require("discord.js");

module.exports = class CitationCommand extends Command {
    constructor(client) {
        super(client, {
            name: "citation",
            aliases: ["citations"],
            memberName: "citation",
            group : "citations",
            description: "Le bot envoie la liste des commandes de la catégorie citation",
            examples: ["+citation"]
        });    
    }

    run(msg) {
        var embed = new RichEmbed()
            .setTitle("Liste des commandes citations")
            .setDescription("+citation add\n+citation tell");
        msg.embed(embed);
    }
};