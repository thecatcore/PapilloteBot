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
                
        } else {
                embed.addField("Nom", card.name)
        }
        if (!card.cost) {
                
        } else {
                embed.addField("Coût", card.cost)
        }
        if (!card.attack) {
                
        } else {
                embed.addField("Attack", card.attack)
        }
        if (!card.health) {
                
        } else {
                embed.addField("PV", card.health)
        }
        if (!card.rarity) {
                
        } else {
                embed.addField("Rareté", card.rarity)
        }
        if (!card.text) {
                
        } else {
                embed.addField("Texte", card.text)
        }
        if (!card.flavor) {
                
        } else {
                embed.addField("Description dans la collection", card.flavor)
        }
        if (!card.artist) {
                
        } else {
                embed.addField("Artiste", card.artist)
        }
        if (!card.cardClass) {
                
        } else {
                embed.addField("Classe", card.cardClass)
        }
        if (!card.race) {
                
        } else {
                embed.addField("Race", card.race)
        }
        if (!card.type) {
                
        } else {
                embed.addField("Type", card.type)
        }
        if (!card.id) {
                
        } else {
                embed.addField("ID texte", card.id)
        }
        if (!card.dbfId) {
                
        } else {
                embed.addField("ID nombre", card.dbfId)
        }
        if (!packet) {
                
        } else {
                embed.addField("Collectionable", packet);
        }
        console.log("space")
        return message.channel.send(embed);
}
