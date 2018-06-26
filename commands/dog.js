const superagent = require("superagent");
const { RichEmbed } = require("discord.js");
exports.run = async (client, message) => {

     const { body } = await superagent
        .get("https://dog.ceo/api/breeds/image/random");
     const embed = new RichEmbed()
	.setColor(0x954D23)
	.setTitle("Woof :dog:")
	.setImage(body.message);
     return message.channel.send(embed);
        //msg.channel.send("https://random.dog");

};
