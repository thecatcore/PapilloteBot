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
                console.log("Pas de Nom");
        } else {
                embed.addField("Nom", card.name);
        }
        if (!card.cost) {
                console.log("Pas de Coût");
        } else {
                embed.addField("Coût", card.cost);
        }
        if (!card.attack) {
                console.log("Pas de poitn d'attaque");
        } else {
                embed.addField("Attack", card.attack);
        }
        if (!card.health) {
                console.log("Pas de point de vie");
        } else {
                embed.addField("PV", card.health);
        }
        if (!card.rarity) {
                console.log("Pas de niveau de rareté");
        } else {
                embed.addField("Rareté", card.rarity);
        }
        if (!card.text) {
                console.log("Pas de text");
        } else {
                embed.addField("Texte", card.text);
        }
        if (!card.flavor) {
                console.log("Pas de 'flavor'");
        } else {
                embed.addField("Description dans la collection", card.flavor);
        }
        if (!card.artist) {
                console.log("Pas d'artiste");
        } else {
                embed.addField("Artiste", card.artist);
        }
        if (!card.cardClass) {
                console.log("Pas de Classe");
        } else {
                embed.addField("Classe", card.cardClass);
        }
        if (!card.race) {
                console.log("Pas de race");
        } else {
                embed.addField("Race", card.race);
        }
        if (!card.type) {
                console.log("Pas de type");
        } else {
                embed.addField("Type", card.type);
        }
        if (!card.id) {
                console.log("Pas d'id");
        } else {
                embed.addField("ID texte", card.id);
        }
        if (!card.dbfId) {
                console.log("Pas d'id 2");
        } else {
                embed.addField("ID nombre", card.dbfId);
        }
        console.log("carte envoyée");
        return message.channel.send(embed);
}
