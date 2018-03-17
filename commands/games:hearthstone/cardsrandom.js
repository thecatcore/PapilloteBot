const { Command } = require("discord.js-commando");
const { RichEmbed } = require("discord.js");
const cards = require("./hearthstone/cards.json");

module.exports = class hscardsrandCommand extends Command {
    constructor(client) {
        super(client, {
            name: "hearthstonecardsrand",
            aliases: ["hscardsrand"],
            memberName: "hearthstonecardsrand",
            group : "games",
            description: "z",
            examples: ["z"]
        });    
    }

    run(msg) {
        var random = Math.floor(Math.random() * cards.length);
        var card = cards[random];
        var packet;
        if (card.collectible === true) {
            packet = "oui";
        } else {
            packet = "non";
        }
        console.log("hearthstone cards random Command");
        var embed = new RichEmbed()
            .setTitle("Carte aléatoire")
            .addField("Nom", card.name)
            .addField("Coût", card.cost)
            .addField("Rareté", card.rarity)
            .addField("Texte", card.text)
            .addField("Description dans la collection", card.flavor)
            .addField("Artiste", card.artist)
            .addField("Classe", card.cardClass)
            .addField("Type", card.type)
            .addField("ID texte", card.id)
            .addField("ID nombre", card.dbfId)
            .addField("Trouvable dans un packet de carte", packet);
        return msg.embed(embed);
    }
};
