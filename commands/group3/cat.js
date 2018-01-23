const { Command } = require('discord.js-commando');
const superagent = require('superagent');
const { RichEmbed } = require('discord.js');


module.exports = class CatCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'cat',
            group: 'group3',
            aliases: ['chat'],
            memberName: 'cat',
            description: 'Le bot envoie une image de chat :-)',
            examples: ['cat'],
        });    
    }

    async run(msg) {
        const { body } = await superagent
	   .get('http://random.cat/meow');
	   const embed = new RichEmbed()
	   .setColor(0x954D23)
	   .setTitle("Meow :cat:")
	   .setImage(body.file);
        return msg.embed(embed);
    }
};