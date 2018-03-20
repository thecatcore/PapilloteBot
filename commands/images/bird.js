const { Command } = require("discord.js-commando");
const superagent = require("superagent");
const { RichEmbed } = require("discord.js");


module.exports = class BirdCommand extends Command {
    constructor(client) {
        super(client, {
            name: "bird",
            aliases: ["oiseau"],
            memberName: "bird",
            group : "images",
            description: "Le bot envoie une image d'oiseau :-)",
            examples: ["bird"],
        });    
    }

    async run(msg) {
        const { body } = await superagent
	   .get("https://loremflickr.com/320/240/bird");
	   const embed = new RichEmbed()
	   .setColor(0x954D23)
	   .setTitle("Piou :bird:")
       .setImage(body.file);
        return msg.embed(embed);
    }
};
