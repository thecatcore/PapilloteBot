const { RichEmbed } = require("discord.js");
const cards = require("./tools/cards.json");
exports.run = (client, message, [type, number, ...texttocode]) => {
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
            .addField("Attack", card.attack)
            .addField("PV", card.health)
            .addField("Rareté", card.rarity)
            .addField("Texte", card.text)
            .addField("Description dans la collection", card.flavor)
            .addField("Artiste", card.artist)
            .addField("Classe", card.cardClass)
            .addField("Race", card.race)
            .addField("Type", card.type)
            .addField("ID texte", card.id)
            .addField("ID nombre", card.dbfId)
            .addField("Collectionable", packet);
return msg.embed(embed);
}
