const { Command } = require("discord.js-commando");

module.exports = class DmCommand extends Command {
    constructor(client) {
        super(client, {
            name: "dm",
            group: "group2",
            memberName: "dm",
            description: "Envoyer un message à la personne mentionnée.",
            examples: ["dm @User Hi there!"],
            args: [
                {
                    key: "user",
                    prompt: "à qui souhaite-tu envoyer ce message ?",
                    type: "user"
                },
                {
                    key: "content",
                    prompt: "Quel est le message ?",
                    type: "string"
                }
            ]
        });    
    }

    run(msg, { user, content }) {
        return user.send(content);
    }
};
