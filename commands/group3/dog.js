const { Command } = require("discord.js-commando");
const superagent = require("superagent");
const { RichEmbed } = require("discord.js");


module.exports = class DogCommand extends Command {
    constructor(client) {
        super(client, {
            name: "dog",
            group: "group3",
            aliases: ["chien"],
            memberName: "dog",
            description: "Le bot envoie une image de chien :-)",
            examples: ["dog"],
        });    
    }

    async run(msg) {
        const { body } = await superagent
	   .get("https://random.dog/woof");
	   const embed = new RichEmbed()
	   .setColor(0x954D23)
	   .setTitle("Woof :dog:")
	   .setImage(body.file);
        return msg.embed(embed);
    }
};
