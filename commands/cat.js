const { RichEmbed } = require("discord.js")
const superagent = require("superagent")
exports.run = (client, message) => {
  async function cat () {
  const { body } = await superagent
	   .get("http://aws.random.cat/meow");
	   const embed = new RichEmbed()
	   .setColor(0x954D23)
	   .setTitle("Meow :cat:")
     .setImage(body.message);
  return message.channel.send(embed);
  }
  cat();
}
