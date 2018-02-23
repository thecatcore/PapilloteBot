const { Command } = require("discord.js-commando");
const superagent = require("superagent");
const { RichEmbed } = require("discord.js");


module.exports = class DogCommand extends Command {
    constructor(client) {
        super(client, {
            name: "dog",
            aliases: ["chien"],
            memberName: "dog",
            group : "images",
            description: "Le bot envoie une image de chien :-)",
            examples: ["dog"],
        });    
    }

    async run(msg) {
        const { body } = await superagent
       .get("https://dog.ceo/api/breeds/image/random");
	   const embed = new RichEmbed()
	   .setColor(0x954D23)
	   .setTitle("Woof :dog:")
	   .setImage(body.message);
        return msg.embed(embed);
        //msg.channel.send("https://random.dog");
    }
};
