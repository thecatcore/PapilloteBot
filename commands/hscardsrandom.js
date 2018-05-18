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
            .setTitle("Carte aléatoire");
        if (!card.name) {
                return
        } else {
                embed.addField("Nom", card.name)
        }
        if (!card.cost) {
                return
        } else {
                embed.addField("Coût", card.cost)
        }
        if (!card.attack) {
                return
        } else {
                embed.addField("Attack", card.attack)
        }
        if (!card.health) {
                return
        } else {
                embed.addField("PV", card.health)
        }
        if (!card.rarity) {
                return
        } else {
                embed.addField("Rareté", card.rarity)
        }
        if (!card.text) {
                return
        } else {
                embed.addField("Texte", card.text)
        }
        if (!card.flavor) {
                return
        } else {
                embed.addField("Description dans la collection", card.flavor)
        }
        if (!card.artist) {
                return
        } else {
                embed.addField("Artiste", card.artist)
        }
        if (!card.cardClass) {
                return
        } else {
                embed.addField("Classe", card.cardClass)
        }
        if (!card.race) {
                return
        } else {
                embed.addField("Race", card.race)
        }
        if (!card.type) {
                return
        } else {
                embed.addField("Type", card.type)
        }
        if (!card.id) {
                return
        } else {
                embed.addField("ID texte", card.id)
        }
        if (!card.dbfId) {
                return
        } else {
                embed.addField("ID nombre", card.dbfId)
        }
        if (!packet) {
                return
        } else {
                embed.addField("Collectionable", packet);
        }
        return message.channel.send(embed);
}
