const { Command } = require("discord.js-commando");
const superagent = require("superagent");
const { RichEmbed } = require("discord.js");


module.exports = class CatCommand extends Command {
    constructor(client) {
        super(client, {
            name: "cat",
            aliases: ["chat"],
            memberName: "cat",
            group : "images",
            description: "Le bot envoie une image de chat :-)",
            examples: ["cat"],
        });    
    }

    async run(msg) {
        const { body } = await superagent
	   .get("http://aws.random.cat/meow");
	   const embed = new RichEmbed()
	   .setColor(0x954D23)
	   .setTitle("Meow :cat:")
       .setImage(body.file);
       //.setImage("https://random.cat/index.php")
        return msg.embed(embed);
    }
};
