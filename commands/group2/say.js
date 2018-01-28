const { Command } = require('discord.js-commando');

module.exports = class SayCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'say',
            aliases: ['repeat', 'echo', 'parrot'],
            group: 'group2',
            memberName: 'say',
            description: 'Le bot revoie le message écris après la commande',
            examples: ['say Hi there!'],
            args: [
                {
                    key: 'text',
                    prompt: "Qu'es-ce que vous voulez faire dire au bot ?",
                    type: 'string'
                }
            ]
        });    
    }

    run(msg, { text }) {
        msg.delete();
        return msg.say(text);
    }
};