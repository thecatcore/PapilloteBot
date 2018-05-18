const superagent = require("superagent")
const { RichEmbed } = require("discord.js")
exports.run = (client, msg) => {
  async run(msg) {
     const { body } = await superagent
        .get("https://dog.ceo/api/breeds/image/random");
	   const embed = new RichEmbed()
	   .setColor(0x954D23)
	   .setTitle("Woof :dog:")
	   .setImage(body.message);
     return msg.channel.send(embed);
        //msg.channel.send("https://random.dog");
}
  run();
}
